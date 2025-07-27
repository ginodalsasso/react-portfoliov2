import { BrowserRouter } from "react-router";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import Button from "./components/layout/Button/Button";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";
import { SplitText } from "gsap/dist/SplitText";
import { useEffect } from "react";


function App() {
    gsap.registerPlugin(TextPlugin, SplitText);
    useEffect(() => {
        const split = new SplitText(".split", {
            type: "chars",
        });

        const animation = gsap.fromTo(
            split.chars,
            { opacity: 0 },
            {
                opacity: 1,
                ease: "none",
                duration: 0.05,
                stagger: 0.08,
                repeat: -1,
                yoyo: true,
                repeatDelay: 1,
            }
        );

        const hoverButton = document.querySelector(".split");
        if (hoverButton) {
            hoverButton.addEventListener("mouseenter", () => animation.pause());
            hoverButton.addEventListener("mouseleave", () => animation.resume());
        }

        return () => {
            split.revert(); // Clean up SplitText instance
            animation.kill(); // Kill the animation
            if (hoverButton) { // Remove event listeners in order to prevent memory leaks
                hoverButton.removeEventListener("mouseenter", () => animation.pause());
                hoverButton.removeEventListener("mouseleave", () => animation.resume());
            }
        };
    }, []);

    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Button
                    aria-label="Click me"
                    className="split"
                    variant="primary"
                    size="medium"
                >
                    gino.dalsasso@gmail.com
                </Button>
            </BrowserRouter>
        </>
    );
}

export default App;
