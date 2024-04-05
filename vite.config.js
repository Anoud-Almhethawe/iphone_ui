import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "jsm-bn",
    project: "iphone_ui",
    options: { telemetry: "false" },
  }), sentryVitePlugin({
    org: "jsm-bn",
    project: "iphone_ui"
  })],

  build: {
    sourcemap: true,
  },
});