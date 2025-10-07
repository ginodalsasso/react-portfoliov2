import { lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import Loader from "./components/layout/ui/Loader/Loader";

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
                </Suspense>
                <Suspense fallback={<Loader />}>
                    <About />
                </Suspense>
                <Suspense fallback={<Loader />}>
                    <Projects />
                </Suspense>
                <Suspense fallback={<Loader />}>
                    <Approach />
                </Suspense>
                <Suspense fallback={<Loader />}>
                    <Goals />
                </Suspense>
                <Suspense fallback={<Loader />}>
                    <Footer />
                </Suspense>
            </main>
        </>
    );
}

export default App;
