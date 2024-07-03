/// <reference types="vitest" />
import react from "@vitejs/plugin-react"
import dns from "dns"
import path from "path"
import { env } from "process"
import { defineConfig } from "vite"

// Resolve localhost for Node v16 and older.
// @see https://vitejs.dev/config/server-options.html#server-host.
dns.setDefaultResultOrder("verbatim")

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    api: 7001,
  },
  // Backwards-compat with Gatsby.
  publicDir: "static",
  build: {
    outDir: "public",
  },
  resolve: {
    alias: {
      gatsby: path.resolve(__dirname, "src/compat/gatsby-compat.tsx"),
      "@reach/router": path.resolve(
        __dirname,
        "src/compat/reach-router-compat.tsx"
      ),
    },
  },
  define: {
    __MEDUSA_BACKEND_URL__: JSON.stringify(env.MEDUSA_BACKEND_URL),
    __ADMIN_PATH__: JSON.stringify(env.ADMIN_PATH),
    __NODE_ENV__: JSON.stringify(env.NODE_ENV),
  },
  optimizeDeps: {
    exclude: ["typeorm", "medusa-interfaces"],
  },
})
