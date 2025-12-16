import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

// Mock the LoadingScreen to immediately call onComplete
vi.mock("./components/layout/ui/LoadingScreen/LoadingScreen", async () => {
    const React = await import("react");

    const MockLoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
        React.useEffect(() => {
            onComplete();
        }, [onComplete]);

        return <div data-testid="loading-screen" />;
    };

    return {
        default: MockLoadingScreen,
    };
});
    

// Mock all the sections and layout components used in App component
// to avoid issues with lazy loading during tests
vi.mock("./components/sections/Hero/Hero", () => ({
    default: () => <div data-testid="hero">Hero Section</div>,
}));

vi.mock("./components/sections/About/About", () => ({
    default: () => <div data-testid="about">About Section</div>,
}));

vi.mock("./components/sections/Projects/Projects", () => ({
    default: () => <div data-testid="projects">Projects Section</div>,
}));

vi.mock("./components/sections/Approach/Approach", () => ({
    default: () => <div data-testid="approach">Approach Section</div>,
}));

vi.mock("./components/sections/Goals/Goals", () => ({
    default: () => <div data-testid="goals">Goals Section</div>,
}));

vi.mock("./components/layout/Footer/Footer", () => ({
    default: () => <div data-testid="footer">Footer Section</div>,
}));

describe("App component", () => {
    it("renders all main sections", async () => {
        render(<App />);
        expect(await screen.findByRole("navigation")).toBeInTheDocument();

        const main = screen.getByRole("main");
        expect(main).toHaveClass("main-content");
    });

    it("renders all lazy-loaded sections", async () => {
        render(<App />);

        // Wait for each lazy-loaded section to appear
        await waitFor(() => {
            expect(screen.getByTestId("hero")).toBeInTheDocument();
            expect(screen.getByTestId("about")).toBeInTheDocument();
            expect(screen.getByTestId("projects")).toBeInTheDocument();
            expect(screen.getByTestId("approach")).toBeInTheDocument();
            expect(screen.getByTestId("goals")).toBeInTheDocument();
            expect(screen.getByTestId("footer")).toBeInTheDocument();
        });
    });

    // ensure no console errors during render
    it("renders without console errors", () => {
        const consoleErrorSpy = vi.spyOn(console, "error");
        render(<App />);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
        consoleErrorSpy.mockRestore();
    });
});
