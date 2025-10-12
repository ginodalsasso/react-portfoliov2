import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Assertion extensions for better DOM element assertions (ex: toBeInTheDocument, toHaveClass...)
expect.extend(matchers);

// Clean up the DOM after each test to prevent memory leaks and ensure test isolation
afterEach(() => {
    cleanup();
});
