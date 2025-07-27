import { BrowserRouter } from "react-router";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import Button from "./components/layout/Button/Button";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";
import { SplitText } from "gsap/all";

function App() {
    // Initialize GSAP TextPlugin
    gsap.registerPlugin(TextPlugin);
    // split elements with the class "split" into words and characters
    SplitText.create(".split", {
        type: "lines, words",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
            return gsap.from(self.words, {
                duration: 1,
                y: 100,
                autoAlpha: 0,
                ease: "power4.out",
                stagger: 0.05,
            });
        },
    });

    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Button aria-label="Click me" className="split" variant="secondary" size="medium">
                    click me
                </Button>
            </BrowserRouter>
        </>
    );
}

export default App;
