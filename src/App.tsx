import { lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import Loader from "./components/layout/ui/Loader/Loader";
import BackToTop from "./components/layout/ui/BackToTop/BackToTop";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

// GSAP ScrollTrigger configuration for better performance
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
    return (
        <>
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
