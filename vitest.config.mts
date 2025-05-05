import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    globals: true,
    coverage: {
      exclude: [
        "next.config.ts",
        "vitest.config.mts",
        "eslint.config.mjs",
        "**/node_modules/**",
        "**/dist/**",
        "**/.next/**",
        "**/*.d.ts",
        "**/types.ts",
        "**/constants/pages.ts",
      ],
    },
  },
});
