/**
 * Cache for the font loading promise to ensure we only check once
 */
let fontsReadyPromise: Promise<void | FontFaceSet> | null = null;

/**
 * Ensures all custom fonts are loaded before proceeding.
 * Includes a timeout fallback to prevent indefinite blocking.
 * 
 * @param timeout - Maximum time to wait for fonts in milliseconds (default: 3000ms)
 * @returns A promise that resolves when fonts are ready or timeout is reached
 */
export function ensureFontsReady(timeout = 3000): Promise<void | FontFaceSet > {
    // Check if the Font Loading API is supported by the browser
    if (!("fonts" in document)) {
        return Promise.resolve(); // degrade for unsupported browsers
    }
    
    // Use cached promise if fonts were already checked 
    if (!fontsReadyPromise) {
        fontsReadyPromise = Promise.race([
            // Promise 1: Resolves when all fonts specified in CSS are loaded
            document.fonts.ready,
            
            // Promise 2: Timeout fallback to prevent blocking indefinitely
            new Promise<void>((resolve) => 
                setTimeout(() => {
                    console.warn('Font loading timeout');
                    resolve();
                }, timeout)
            )
        ]);
    }
    
    return fontsReadyPromise;
}