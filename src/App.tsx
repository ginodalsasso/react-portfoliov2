import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import Loader from "./components/layout/ui/Loader/Loader";
import BackToTop from "./components/layout/ui/BackToTop/BackToTop";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";


if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    gsap.registerPlugin(ScrollTrigger);

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
    const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLoadComplete(true);
        }, 2000); // Simulate a 2-second loading time

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {!isInitialLoadComplete && <Loader />}
            <Navbar />
            <main className="main-content">
                <Suspense fallback={<Loader />}>
                    <Hero />
                    <About />
                    <Projects />
                    <Approach />
                    <Goals />
                    <Footer />
                </Suspense>
                <BackToTop />
            </main>
        </>
    );
}

export default App;
