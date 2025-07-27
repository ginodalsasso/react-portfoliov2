import { BrowserRouter } from "react-router";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import Button from "./components/layout/Button/Button";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Button variant="secondary" size="medium">
                    click me
                </Button>
            </BrowserRouter>
        </>
    );
}

export default App;
