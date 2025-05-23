import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  base: "/",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/styles/_variables.scss" as *;`,
      },
    },
  },
});
