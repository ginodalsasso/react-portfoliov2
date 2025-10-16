import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BurgerMenu from "./BurgerMenu";
import { navLinks } from "../../../../lib/constants/constants";
import styles from "./BurgerMenu.module.css";

describe("BurgerMenu component", () => {
    it("render burger button", () => {
        render(<BurgerMenu navLinks={navLinks} />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("render nav links", async () => {
        render(<BurgerMenu navLinks={navLinks} />);
        for (const link of navLinks) {
            const burgerButton = screen.getByRole("button");
            await userEvent.click(burgerButton);
            expect(screen.getByText(link.title)).toBeInTheDocument();
        }
    });

    it("menu closed by default", () => {
        render(<BurgerMenu navLinks={navLinks} />);
        const menu = screen.getByTestId("mobile-nav");
        expect(menu).not.toHaveClass(styles.open);
        expect(menu).toHaveAttribute("aria-hidden", "true");
    });

    it("open and close menu on button click", async () => {
        render(<BurgerMenu navLinks={[]} />);
        const burgerButton = screen.getByRole("button");
        const menu = screen.getByTestId("mobile-nav");

        await userEvent.click(burgerButton);
        expect(menu).toHaveClass(styles.open);
        expect(menu).toHaveAttribute("aria-hidden", "false");
        expect(burgerButton).toHaveAttribute("aria-expanded", "true");

        await userEvent.click(burgerButton);
        expect(menu).not.toHaveClass(styles.open);
        expect(menu).toHaveAttribute("aria-hidden", "true");
        expect(burgerButton).toHaveAttribute("aria-expanded", "false");
    });

    it("escape key closes the menu", async () => {
        render(<BurgerMenu navLinks={navLinks} />);
        const burgerButton = screen.getByRole("button");
        const menu = screen.getByTestId("mobile-nav");
        await userEvent.click(burgerButton);

        expect(menu).toHaveClass(styles.open);
        expect(menu).toHaveAttribute("aria-hidden", "false");

        await userEvent.keyboard("{Escape}");
        expect(menu).not.toHaveClass(styles.open);
        expect(menu).toHaveAttribute("aria-hidden", "true");
    });
    
    it("clicking a link closes the menu", async () => {
        render(<BurgerMenu navLinks={navLinks} />);
        const burgerButton = screen.getByRole("button");
        const menu = screen.getByTestId("mobile-nav");

        await userEvent.click(burgerButton);
        for (const link of navLinks) {
            await userEvent.click(screen.getByText(link.title));
            expect(menu).not.toHaveClass(styles.open);
            expect(menu).toHaveAttribute("aria-hidden", "true");
            expect(burgerButton).toHaveAttribute("aria-expanded", "false");
        }
    });

    it("has accessible aria attributes", async() => {
        render(<BurgerMenu navLinks={navLinks} />);
        const burgerButton = screen.getByRole("button");

        expect(burgerButton).toHaveAttribute("aria-expanded", "false");
        expect(burgerButton).toHaveAttribute("aria-controls", "mobile-menu");
        expect(burgerButton).toHaveAttribute("aria-label", "Open menu");

        await userEvent.click(burgerButton);
        expect(burgerButton).toHaveAttribute("aria-expanded", "true");
        expect(burgerButton).toHaveAttribute("aria-label", "Close menu");
    });

    it("close the menu when link is clicked", async () => {
        render(<BurgerMenu navLinks={navLinks} />);
        const burgerButton = screen.getByRole("button");
        const menu = screen.getByTestId("mobile-nav");
        
        await userEvent.click(burgerButton);
        expect(menu).toHaveClass(styles.open);
        expect(menu).toHaveAttribute("aria-hidden", "false");
        for (const link of navLinks) {
            await userEvent.click(screen.getByText(link.title));
            expect(menu).not.toHaveClass(styles.open);
            expect(menu).toHaveAttribute("aria-hidden", "true");
            expect(burgerButton).toHaveAttribute("aria-expanded", "false");
        }
    });

});
