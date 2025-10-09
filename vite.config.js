import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: true,
    port: Number(process.env.VITE_DEV_SERVER_PORT || process.env.PORT || 3000),
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
});
