import { render, screen } from "@testing-library/react";
import { navLinks } from "../../../lib/constants/constants";
import Navbar from "./Navbar";

describe("Navbar component", () => {
    it("renders Navbar component", () => {
        render(<Navbar />);
        const navbar = screen.getByTestId("desktop-nav");
        expect(navbar).toBeInTheDocument();
    });

    it("renders navigation links", () => {
        render(<Navbar />);
        for (const link of navLinks) {
            const linkElement = screen.getByTestId(`nav-link-${link.title}`);
            expect(linkElement).toBeInTheDocument();
        }
    });

    it("links have correct href attributes", () => {
        render(<Navbar />);
        for (const link of navLinks) {
            const linkElement = screen.getByTestId(`nav-link-${link.title}`).querySelector("a");
            expect(linkElement).toHaveAttribute("href", link.path);
        }
    });
});