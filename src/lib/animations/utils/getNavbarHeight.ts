export function getNavbarHeight(): number {
    const navbar = document.querySelector(".navbar") as HTMLElement;
    return navbar?.offsetHeight || 0;
}