import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const { VITE_BACKEND_BASE_URL } = env;

  return {
    plugins: [
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
    ],
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: VITE_BACKEND_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    preview: {
      port: 3000,
      proxy: {
        "/api": {
          target: VITE_BACKEND_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@components": "/src/components/index.ts",
        "@shared": "/src/shared/",
        "@services": "/src/shared/services/",
      },
    },
  };
});
