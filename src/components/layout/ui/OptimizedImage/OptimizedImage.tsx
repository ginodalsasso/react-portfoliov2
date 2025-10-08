import { useState, useEffect, useRef } from "react";

interface OptimizedImageProps {
    src?: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    loading?: "lazy" | "eager";
    priority?: boolean;
}

/**
 * OptimizedImage component for lazy loading and priority loading of images.
 * 
 * Props:
 * - src: Image source URL.
 * - alt: Alternative text for the image.
 * - className: Optional CSS class for styling
 * - width: Optional width of the image.
 * - height: Optional height of the image.
 * - loading: "lazy" or "eager" loading strategy. Default is "lazy".
 * - priority: If true, the image loads immediately (ex: the hero image).
 */

export default function OptimizedImage({
    src,
    alt,
    className = "",
    width,
    height,
    loading = "lazy",
    priority = false,
}: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (priority) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: "50px", // Start loading a bit before the image is in view
            }
        );

        // Observe the image element if it exists
        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [priority]);

    return (
        <img
            ref={imgRef}
            src={isInView ? src : undefined}
            alt={alt}
            className={className}
            width={width}
            height={height}
            loading={loading}
            onLoad={() => setIsLoaded(true)}
            style={{
                opacity: isLoaded ? 1 : 0,
            }}
        />
    );
}
