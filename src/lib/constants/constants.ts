import { githubIcon, tuttoPastaIcon, auxArmesAlsaceIcon } from "../../assets/icons";
import { bigMeal, illerShop, tuttoPasta, portfolioV1, studioTuttoPasta, reactboilerplate, mycliTool, mvcFramework, aaa, myGithub } from "../../assets/img";

/**
 * Media query breakpoints for responsive design.
 */
export const BREAKPOINTS = {
    isMobile: "(max-width: 767px)",
    isDesktop: "(min-width: 768px)",
    isReducedMotion: "(prefers-reduced-motion: reduce)",
} as const;

/**
 * Navigation links.
 */
export type LinkItem = {
    title: string;
    path: string;
};

export const navLinks: LinkItem[] = [
    { title: "about", path: "#about" },
    { title: "projects", path: "#projects" },
    { title: "approach", path: "#approach" },
    { title: "goals", path: "#goals" },
] as const;

/**
 * Project details.
 */
export type Project = {
    id: number;
    icon?: string,
    title: string;
    description: string;
    image?: string;
    href?: string;
    tags?: string[];
};

export const projects: Project[] = [
    {
        id: 1,
        icon: githubIcon,
        title: "TuttoPasta",
        description: "Portfolio and client management web app (studies project) for a freelance art director, with project tracking and appointment booking features using Symfony.",
        image: tuttoPasta,
        href: "https://github.com/ginodalsasso/sf-tuttoPasta",
        tags: ["Symfony", "JavaScript", "Jquery", "GSAP", "PHP", "DQL", "CSS"],
    },
    {
        id: 2,
        icon: githubIcon,
        title: "React.Net Boilerplate",
        description: "Fullstack boilerplate with ASP.NET Core 8 and React, featuring secure authentication, 2FA, email confirmation and Google login.",
        image: reactboilerplate,
        href: "https://github.com/ginodalsasso/aspNet-react-auth",
        tags: ["ASP.NET", "React", "TypeScript", "CSS", "Entity Framework"],
    },
    {
        id: 3,
        icon: githubIcon,
        title: "Big Meal",
        description: "BigMeal is a web application built with Next.js that helps food enthusiasts create and manage recipes while simplifying grocery shopping through integrated shopping lists.",
        image: bigMeal,
        href: "https://github.com/ginodalsasso/next-bigmeal",
        tags: ["NextJS", "TypeScript", "Tailwind", "Prisma", "Mongodb", "PWA"],
    },
    {
        id: 4,
        icon: githubIcon,
        title: "My-cli tool",
        description: "A CLI tool to store and quickly reuse my React components and JavaScript utility functions.",
        image: mycliTool,
        href: "https://github.com/ginodalsasso/react-toolkit",
        tags: ["Node.js", "JavaScript", "TypeScript"],
    },
    {
        id: 5,
        icon: tuttoPastaIcon,
        title: "Studio TuttoPasta",
        description: "Creative portfolio website for a web designer, built with Webflow and enhanced with GSAP animations for dynamic user interactions.",
        image: studioTuttoPasta,
        href: "https://www.studiotuttopasta.com/",
        tags: ["Webflow", "GSAP"],
    },
    {
        id: 6,
        title: "Iller shop",
        description: "Designed and developed an order management web application for restaurateurs, handling full-stack development, collaborating with a supervisor for database integration and ensuring code quality.",
        image: illerShop,
        tags: ["PHP", "MySQL", "CSS", "Jquery", "PWA"],
    },
    {
        id: 7,
        icon: githubIcon,
        title: "MVC Framework",
        description: "A lightweight PHP MVC framework built as a learning project to understand Model-View-Controller architecture, featuring custom routing, template system, and command-line tools for rapid development.",
        image: mvcFramework,
        href: "https://github.com/ginodalsasso/mvc-framework",
        tags: ["PHP", "CSS", "MySQL"],
    },
    {
        id: 8,
        icon: auxArmesAlsaceIcon,
        title: "Aux Armes d’Alsace",
        description: "Worked on the front-end integration and technical adjustments of the e-commerce website, specializing in the sale of collectible firearms within WordPress and WooCommerce environments.",
        image: aaa,
        href: "https://auxarmesdalsace.fr/",
        tags: ["WordPress", "PHP", "JavaScript", "CSS", "WooCommerce"],
    },
    {
        id: 9,        
        icon: githubIcon,
        title: "Portfolio v1",
        description: "My first portfolio website, built with React and Three.js to showcase my projects and skills with a 3D interactive experience.",
        image: portfolioV1,
        href: "https://github.com/ginodalsasso/react-portfolio",
        tags: ["React", "Three.js", "JavaScript", "Tailwind"],
    },
    {
        id: 10,        
        icon: githubIcon,
        title: "My GitHub",
        description: "See more cool projects on my GitHub profile.",
        image: myGithub,
        href: "https://github.com/ginodalsasso/",
    }
] as const;