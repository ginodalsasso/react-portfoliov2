interface OptimizedImageProps {
    src?: string;
    alt: string;
    className?: string;
    width?: string | number;
    height?: string | number;
    loading?: "lazy" | "eager";
    priority?: boolean;
}

/**
 * OptimizedImage component for lazy loading and priority loading of images. *
 * Props:
 * - src: Image source URL.
 * - alt: Alternative text for the image.
 * - className: Optional CSS class for styling
 * - width: Optional width of the image
 * - height: Optional height of the image
 * - loading: "lazy" or "eager" loading strategy. Default is "lazy".
 * - priority: If true, uses eager loading (ex: hero image).
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
    // const [isLoaded, setIsLoaded] = useState(priority);

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            width={width}
            height={height}
            loading={priority ? "eager" : loading}
            decoding={priority ? "sync" : "async"}
            fetchPriority={priority ? "high" : "auto"}
        />
    );
}
