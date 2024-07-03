import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@scss": path.resolve(__dirname, "src/scss"),
      "@components": path.resolve(__dirname, "src/ts/components"),
      "@pages": path.resolve(__dirname, "src/ts/pages"),
      "@utils": path.resolve(__dirname, "src/ts/utils"),
      "@hooks": path.resolve(__dirname, "src/ts/utils/hooks"),
    },
  },
  plugins: [react()],
});
