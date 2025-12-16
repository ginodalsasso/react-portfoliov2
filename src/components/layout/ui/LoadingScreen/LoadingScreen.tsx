import { useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const logoDisplayTime = 1000;
        const overlayDuration = 800; 

        const startTimer = setTimeout(() => {
            setIsAnimating(true);
        }, logoDisplayTime);

        const endTimer = setTimeout(() => {
            onComplete();
        }, logoDisplayTime + overlayDuration);
        return () => {
            clearTimeout(startTimer);
            clearTimeout(endTimer);
        };
    }, [onComplete]);

    return (
        <div
            className={`${styles.loadingScreen} ${
                isAnimating ? styles.animate : ""
            }`}
        >
            <div className={styles.content}>
                <Logo size={100} ariaLabel="Logo de chargement" />
            </div>

            <div className={styles.overlay} />
        </div>
    );
}