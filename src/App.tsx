import { BrowserRouter } from "react-router";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import Hero from "./components/sections/Hero/Hero";
import About from "./components/sections/About/About";
import Approach from "./components/sections/Approach/Approach";
import Goals from "./components/sections/Goals/Goals";
import Footer from "./components/layout/Footer/Footer";
import Projects from "./components/sections/Projects/Projects";


function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <main className="mainContent">
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
