import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
        configure: (proxy) => {
          // Without this, a dead/unreachable API server makes Vite's proxy
          // return an HTML error page, which breaks the frontend's JSON parsing.
          proxy.on("error", (_err, _req, res) => {
            if (!res.headersSent) {
              res.writeHead(502, { "Content-Type": "application/json" });
            }
            res.end(
              JSON.stringify({
                error:
                  "Could not reach the styling API server on :8787. Make sure `npm run dev` is running both processes (look for an [api] line in your terminal).",
              })
            );
          });
        },
      },
    },
  },
});
