import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        "@app": "/src/app",
        "@api": "/src/api",
        "@queries": "/src/api/queries",
        "@assets": "/src/assets",
        "@components": "/src/components",
        "@constants": "/src/utils/constants",
        "@images": "/src/assets/images",
        "@features": "/src/features",
        "@hooks": "/src/hooks",
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
