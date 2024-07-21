import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env,
    },
    resolve: {
      alias: {
        "@app": "/src/app",
        "@api": "/src/api",
        "@assets": "/src/assets",
        "@components": "/src/components",
        "@constants": "/src/utils/constants",
        "@images": "/src/assets/images",
        "@features": "/src/features",
        "@pages": "/src/pages",
        "@admin": "/src/pages/admin",
        "@user": "/src/pages/user",
        "@partner": "/src/pages/partner",
        "@routes": "/src/routes",
        "@styles": "/src/styles",
        "@utils": "/src/utils",
      },
    },
    build: {
      outDir: "dist",
      minify: "terser",
      terserOptions: {
        compress: {
          // drop_console: true,
          // drop_debugger: true,
        },
      },
    },
    plugins: [react()],
    base: "./",
  };
});
