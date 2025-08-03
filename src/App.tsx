import { BrowserRouter } from "react-router";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import Hero from "./components/sections/Hero/Hero";
import About from "./components/sections/About/About";
import Approach from "./components/sections/Approach/Approach";


function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <main className="mainContent">
                    <Hero />
                    <About />
                    <Approach />
                </main>
            </BrowserRouter>
        </>
    );
}

export default App;
