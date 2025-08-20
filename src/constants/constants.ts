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
    title: string;
    description: string;
    href?: string ; 
    tags?: string[];
};

export const projects: Project[] = [
    {
        id: 1,
        title: "[ Project One ]",
        description: "Description for project one.",
        href: "/projects/1",
        tags: ["React", "TypeScript"],
    },
    {
        id: 2,
        title: "Project Two",
        description: "Description for project two.",
        href: "/projects/2",
        tags: ["JavaScript", "CSS"],
    },
    {
        id: 3,
        title: "Project Three",
        description: "Description for project three.",
        href: "/projects/3",
        tags: ["HTML", "Sass"],
    },
];
