import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  resolve: {
    alias: {
      "@app": "/src/app",
      "@assets": "/src/assets",
      "@components": "/src/components",
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
  plugins: [react()],
});
