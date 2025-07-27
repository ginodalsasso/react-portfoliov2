import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ComponentProps<"button"> {
    variant?: "primary" | "secondary";
    size?: "small" | "medium" | "large";    
    children: React.ReactNode;
}

export default function Button({ children, variant = "primary", size = "medium", ...props }: ButtonProps): React.ReactElement {
    const variantStyles = { 
        primary: styles.primaryButton,
        secondary: styles.secondaryButton,
    }
    const sizeStyles = {
        small: styles.smallButton,
        medium: styles.mediumButton,
        large: styles.largeButton,
    }

    return <button 
                className={`${styles.button} ${variantStyles[variant]} ${sizeStyles[size]}`} 
                {...props}
            >
                {children}
            </button>;
}