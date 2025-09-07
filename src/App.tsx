import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import Hero from "./components/sections/Hero/Hero";
import About from "./components/sections/About/About";
import Approach from "./components/sections/Approach/Approach";
import Goals from "./components/sections/Goals/Goals";
import Footer from "./components/layout/Footer/Footer";
import Projects from "./components/sections/Projects/Projects";
// import { useLayoutEffect } from "react";

function App() {
    // useLayoutEffect(() => {
    //     const cleanup = layeredSectionsAnimation({
    //         sectionsSelector: ".main-section",
    //     });
    //     return () => {
    //         if (cleanup) cleanup();
    //     };
    // }, []);

    return (
        <>
            <BrowserRouter>
                <Navbar />
                    <main className="main-content">
                        <Hero />
                        <About />
                        <Projects />
                        <Approach />
                        <Goals />
                    </main>
                    <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;