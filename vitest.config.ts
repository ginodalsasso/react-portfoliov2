import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()], // load the React plugin
    test: {
        globals: true,
        environment: "jsdom", // simulate a browser environment (DOM APIs)
        setupFiles: "./src/test/setup.ts",
        coverage: { // code coverage configuration
            provider: "v8",
            reporter: ["text", "json", "html"], // output formats
        },
    },
});
