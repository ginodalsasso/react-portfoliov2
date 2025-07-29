import { Link } from "react-router-dom";
import { useEffect } from "react";

import Button from "../../layout/Button/Button";
import { heroAnimations } from "../../../lib/animations/heroAnimations";

export default function Hero() {
    useEffect(() => {
        const cleanup = heroAnimations(".split");
        return () => {
            cleanup();
        };
    }, []);

    return (
        <section className="hero">
            <h1>
                Hi, I’m Gino, full-stack developer From France to NZ
            </h1>
            <Button
                aria-label="Click me"
                className="split"
                variant="primary"
                size="medium"
            >
                <Link to="mailto:gino.dalsasso@gmail.com">
                    gino.dalsasso@gmail.com
                </Link>
            </Button>
        </section>
    );
}
