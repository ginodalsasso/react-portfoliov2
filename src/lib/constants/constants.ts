import gituhubIcon from "../../assets/icons/github.svg";
import tuttoPastaIcon from "../../assets/icons/tuttoPasta.svg";

export type LinkItem = {
    title: string;
    path: string;
};

export const navLinks: LinkItem[] = [
    { title: "about", path: "#about" },
    { title: "projects", path: "#projects" },
    { title: "approach", path: "#approach" },
];

export type Project = {
    id: number;
    icon?: string,
    title: string;
    description: string;
    href?: string ; 
    tags?: string[];
};

export const projects: Project[] = [
    {
        id: 1,
        icon: gituhubIcon,
        title: "TuttoPasta",
        description: "Portfolio and client management web app (studies project) for a freelance art director, with project tracking and appointment booking features using Symfony.",
        href: "https://github.com/ginodalsasso/sf-tuttoPasta",
        tags: ["Symfony", "JavaScript", "Jquery", "GSAP", "PHP", "DQL", "CSS"],
    },
    {
        id: 2,
        icon: gituhubIcon,
        title: "React.Net Boilerplate",
        description: "Fullstack boilerplate with ASP.NET Core 8 and React, featuring secure authentication, 2FA, email confirmation and Google login.",
        href: "https://github.com/ginodalsasso/aspNet-react-auth",
        tags: ["ASP.NET", "React", "TypeScript", "CSS", "Entity Framework"],
    },
    {
        id: 3,
        icon: gituhubIcon,
        title: "Big Meal",
        description: "BigMeal is a web application built with Next.js that helps food enthusiasts create and manage recipes while simplifying grocery shopping through integrated shopping lists.",
        href: "https://github.com/ginodalsasso/next-bigmeal",
        tags: ["NextJS", "TypeScript", "Tailwind", "Prisma", "Mongodb", "PWA"],
    },
    {
        id: 4,
        icon: tuttoPastaIcon,
        title: "Studio TuttoPasta",
        description: "Creative portfolio website for a web designer, built with Webflow and enhanced with GSAP animations for dynamic user interactions.",
        href: "https://www.studiotuttopasta.com/",
        tags: ["Webflow", "GSAP"],
    },
    {
        id: 5,        
        icon: gituhubIcon,
        title: "Portfolio v2",
        description: "My current portfolio website, built with React, TypeScript and GSAP for smooth animations and an engaging user experience.",
        href: "https://github.com/ginodalsasso/react-portfoliov2",
        tags: ["React", "TypeScript", "GSAP", "CSS", "Docker"],
    },
    {
        id: 6,
        title: "Iller shop",
        description: "Designed and developed an order management web application for restaurateurs, handling full-stack development, collaborating with a supervisor for database integration and ensuring code quality.",
        tags: ["PHP", "MySQL", "CSS", "Jquery", "PWA"],
    },
    {
        id: 7,
        icon: gituhubIcon,
        title: "MVC Framework",
        description: "A lightweight PHP MVC framework built as a learning project to understand Model-View-Controller architecture, featuring custom routing, template system, and command-line tools for rapid development.",
        href: "https://github.com/ginodalsasso/mvc-framework",
        tags: ["PHP", "CSS", "MySQL"],
    },
    {
        id: 8,        
        icon: gituhubIcon,
        title: "Portfolio v1",
        description: "My first portfolio website, built with React and Three.js to showcase my projects and skills with a 3D interactive experience.",
        href: "https://github.com/ginodalsasso/react-portfolio",
        tags: ["React", "Three.js", "JavaScript", "Tailwind"],
    },


];
