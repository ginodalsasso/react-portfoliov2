import { BrowserRouter } from "react-router";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import Hero from "./components/sections/Hero/Hero";


function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Hero />
            </BrowserRouter>
        </>
    );
}

export default App;
