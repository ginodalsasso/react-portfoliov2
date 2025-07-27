import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ComponentProps<"button"> {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary";
    size?: "small" | "medium" | "large";  
    type?: "button" | "submit";
    "aria-label"?: string;
}

export default function Button({ 
    children, 
    className, 
    variant = "primary", 
    size = "medium", 
    type = "button",
    ...props 
}: ButtonProps): React.ReactElement {

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
                type={type}
                className={`${styles.button} ${variantStyles[variant]} ${sizeStyles[size]} ${className ?? ""}`} 
                {...props}
            >
                {children}
            </button>;
}