import { lazy, useState } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import BackToTop from "./components/layout/ui/BackToTop/BackToTop";
import LoadingScreen from "./components/layout/ui/LoadingScreen/LoadingScreen";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { gsap } from "gsap";

// Single registration point for all GSAP plugins used across the app
if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin);

    ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true,
    });
}

// Lazy loading for performance optimization
const Hero = lazy(() => import("./components/sections/Hero/Hero"));
const About = lazy(() => import("./components/sections/About/About"));
const Projects = lazy(() => import("./components/sections/Projects/Projects"));
const Approach = lazy(() => import("./components/sections/Approach/Approach"));
const Goals = lazy(() => import("./components/sections/Goals/Goals"));
const Footer = lazy(() => import("./components/layout/Footer/Footer"));

function App() {
    const [loadingComplete, setIsLoadingComplete] = useState(false);

    return (
        <>
            {!loadingComplete && (
                <LoadingScreen 
                    onComplete={() => setIsLoadingComplete(true)} 
                />
            )}

            {loadingComplete && (
                <main className="main-content">
                    <Navbar />
                        <Hero />
                        <About />
                        <Projects />
                        <Approach />
                        <Goals />
                        <Footer />
                    <BackToTop />
                </main>
            )}
        </>
    );
}

export default App;
