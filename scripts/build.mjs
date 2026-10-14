#!/usr/bin/env node
/* Phosphor build — tiny bundler: concat src modules → dist/.
   Plain CSS in, plain CSS out; lightningcss minify is optional
   (used automatically when installed, skipped silently otherwise). */

import { mkdir, readFile, writeFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "src");
const distDir = path.join(root, "dist");

/* order matters: tokens → theme overrides → bridge → extras */
const bundleOrder = ["tokens.css", "themes/dark.css", "bootstrap-bridge.css"];

const readSrc = (rel) => readFile(path.join(srcDir, rel), "utf8");

async function minify(css) {
  try {
    const { transform } = await import("lightningcss");
    return transform({ css, minify: true, filename: "phosphor.css" }).code.toString();
  } catch {
    return css; // optional dependency not installed — ship unminified
  }
}

async function componentFiles() {
  const dir = path.join(srcDir, "components");
  if (!existsSync(dir)) return [];
  return (await readdir(dir))
    .filter((f) => f.endsWith(".css"))
    .sort()
    .map((f) => `components/${f}`);
}

async function writeDist(rel, content) {
  const out = path.join(distDir, rel);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, content);
  console.log(`  dist/${rel} (${Buffer.byteLength(content)} bytes)`);
}

async function main() {
  console.log("phosphor build → dist/");

  // individual entry modules (unminified, debuggable)
  for (const rel of bundleOrder) {
    await writeDist(rel, await readSrc(rel));
  }

  // umbrella bundle: tokens + themes + bridge + components + utilities
  const parts = [];
  const components = await componentFiles();
  for (const rel of [...bundleOrder, ...components]) {
    parts.push(await readSrc(rel));
  }
  if (existsSync(path.join(srcDir, "utilities.css"))) {
    parts.push(await readSrc("utilities.css"));
  }
  await writeDist("phosphor.css", await minify(parts.join("\n")));

  // per-component entries for the package exports map
  for (const rel of components) {
    await writeDist(rel, await readSrc(rel));
  }

  console.log("done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
