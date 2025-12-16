import { useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
    duration?: number;
    onComplete: () => void;
}

export default function LoadingScreen({ duration = 2000, onComplete }: LoadingScreenProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => {
            setIsAnimating(true);
        }, 500);

        const endTimer = setTimeout(() => {
            onComplete();
        }, duration);

        return () => {
            clearTimeout(startTimer);
            clearTimeout(endTimer);
        };
    }, [duration, onComplete]);

    return (
        <div
            className={`${styles.loadingScreen} ${
                isAnimating ? styles.animate : ""
            }`}
        >
            <div className={styles.content}>
                <Logo size={80} ariaLabel="Logo de chargement" />
            </div>

            <div className={styles.overlay} />
        </div>
    );
}