import styles from "./Loader.module.css";

export default function Loader() {
    return (
        <div
            className={styles.wrapper}
            role="status"
            aria-live="polite"
            aria-label="Loading content"
        >
            <span className={styles.loader} />
        </div>
    );
}
