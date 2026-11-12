import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const { render, renderHead } = await import(resolve(root, "dist-ssr/entry-server.js"));

const template = readFileSync(resolve(dist, "index.html"), "utf8");
if (!template.includes("<!--app-html-->") || !template.includes("<!--app-head-->")) {
  throw new Error("Template is missing the <!--app-html--> / <!--app-head--> placeholders.");
}
const html = template.replace("<!--app-head-->", renderHead()).replace("<!--app-html-->", render());
writeFileSync(resolve(dist, "index.html"), html, "utf8");
console.log(`  prerendered  /  -> dist/index.html  (${Math.round(html.length / 1024)} kB)`);
