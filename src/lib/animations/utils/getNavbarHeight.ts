let cachedNavbarHeight: number | null = null;

export function getNavbarHeight(): number {
    if (cachedNavbarHeight !== null) return cachedNavbarHeight;
    
    const navbar = document.querySelector(".navbar") as HTMLElement;
    cachedNavbarHeight = navbar?.offsetHeight || 0;
    return cachedNavbarHeight;
}

export function invalidateNavbarHeight(): void {
    cachedNavbarHeight = null;
}