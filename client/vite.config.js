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
          // drop_console: true,
          drop_debugger: true,
        },
      },
    },
    plugins: [react()],
    base: "./",
    define: {
      "import.meta.env.VITE_BASE_URL": JSON.stringify(env.VITE_BASE_URL),
      "import.meta.env.VITE_SERVER_URL": JSON.stringify(env.VITE_SERVER_URL),
      "import.meta.env.VITE_FIREBASE_API_KEY": JSON.stringify(
        env.VITE_FIREBASE_API_KEY
      ),
      "import.meta.env.VITE_FIREBASE_AUTH_DOMAIN": JSON.stringify(
        env.VITE_FIREBASE_AUTH_DOMAIN
      ),
      "import.meta.env.VITE_FIREBASE_PROJECT_ID": JSON.stringify(
        env.VITE_FIREBASE_PROJECT_ID
      ),
      "import.meta.env.VITE_FIREBASE_STORAGE_BUCKET": JSON.stringify(
        env.VITE_FIREBASE_STORAGE_BUCKET
      ),
      "import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
        env.VITE_FIREBASE_MESSAGING_SENDER_ID
      ),
      "import.meta.env.VITE_FIREBASE_APP_ID": JSON.stringify(
        env.VITE_FIREBASE_APP_ID
      ),
      "import.meta.env.VITE_FIREBASE_MEASUREMENT_ID": JSON.stringify(
        env.VITE_FIREBASE_MEASUREMENT_ID
      ),
    },
  };
});
