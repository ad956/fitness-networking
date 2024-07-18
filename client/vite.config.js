import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
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
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    plugins: [react()],
    base: "./",
    define: {
      "process.env": {
        NODE_ENV: env.NODE_ENV,
        VITE_BASE_URL: env.VITE_BASE_URL,
        VITE_SERVER_URL: env.VITE_SERVER_URL,
        VITE_FIREBASE_API_KEY: env.VITE_FIREBASE_API_KEY,
        VITE_FIREBASE_AUTH_DOMAIN: env.VITE_FIREBASE_AUTH_DOMAIN,
        VITE_FIREBASE_PROJECT_ID: env.VITE_FIREBASE_PROJECT_ID,
        VITE_FIREBASE_STORAGE_BUCKET: env.VITE_FIREBASE_STORAGE_BUCKET,
        VITE_FIREBASE_MESSAGING_SENDER_ID:
          env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        VITE_FIREBASE_APP_ID: env.VITE_FIREBASE_APP_ID,
        VITE_FIREBASE_MEASUREMENT_ID: env.VITE_FIREBASE_MEASUREMENT_ID,
      },
    },
  };
});
