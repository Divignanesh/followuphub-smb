import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// One page, prerendered to dist/index.html, so no routing is needed here.
const assignedPort = Number(process.env.PORT) || undefined;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: assignedPort ?? 5174 },
  preview: { port: assignedPort ?? 4174 },
});
