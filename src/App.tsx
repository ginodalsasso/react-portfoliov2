import { BrowserRouter } from "react-router";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        </>
    );
}

export default App;
