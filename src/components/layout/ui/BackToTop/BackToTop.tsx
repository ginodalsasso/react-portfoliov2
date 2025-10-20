import styles from "./BackToTop.module.css";

export default function BackToTop() {
    return (
        <button
            className={styles.backToTopButton}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            role="button"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <path d="m5 12 7-7 7 7" />
                <path d="M12 19V5" />
            </svg>
        </button>
    );
}
