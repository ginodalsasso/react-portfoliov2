import { render, screen } from "@testing-library/react";
import OptimizedImage from "./OptimizedImage";

beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
});

describe("OptimizedImage component", () => {
    it("renders correctly with given props", () => {
        render(
            <OptimizedImage
                src="https://example.com/image.jpg"
                alt="Example Image"
                className="custom-class"
                width={600}
                height={400}
                loading="lazy"
                priority={false}
            />
        );
        expect(screen.getByAltText("Example Image")).toBeInTheDocument();
    });
});
