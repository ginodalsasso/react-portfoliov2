import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";
import styles from "./Button.module.css";
import { it } from "vitest";

describe("Button component", () => {
    it("render children text", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole("button")).toHaveTextContent("Click me");
    });

    it("use default styles", () => {
        render(<Button>Default</Button>);
        const btn = screen.getByRole("button");

        expect(btn.classList.contains(styles.button)).toBe(true);
        expect(btn.classList.contains(styles.primaryButton)).toBe(true);
        expect(btn.classList.contains(styles.mediumButton)).toBe(true);
    });

    it("change classes based on variant and size", () => {
        render(
            <Button variant="secondary" size="large">
                Secondary Large
            </Button>
        );
        const btn = screen.getByRole("button");

        expect(btn.classList.contains(styles.secondaryButton)).toBe(true);
        expect(btn.classList.contains(styles.largeButton)).toBe(true);
        expect(btn.classList.contains(styles.primaryButton)).toBe(false); // should not have primary styles
    });

    it("accepts an additional class via className", () => {
        render(<Button className="extra-class">Extra</Button>);
        const btn = screen.getByRole("button");
        expect(btn.classList.contains("extra-class")).toBe(true);
    });

    it("triggers a click correctly", async () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        await userEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
