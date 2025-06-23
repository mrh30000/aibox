// Sample Project Seed Data

export interface SeedProject {
    name: string;
    description: string;
    categorySlug: string; // Slug of the category this project belongs to
    longDescription?: string;
    projectUrl?: string;
    repositoryUrl?: string;
    demoUrl?: string;
    tags?: string[];
    status?: 'active' | 'archived' | 'in-development';
    license?: string;
    imageUrl?: string;
    screenshots?: string[];
    programmingLanguages?: string[];
    technologiesUsed?: string[];
    stars?: number;
    forks?: number;
    contributors?: number;
    lastCommitDate?: Date; // Represent as string if easier, then parse in seeder
    isFeatured?: boolean;
    projectCreatedAt?: Date;
    projectUpdatedAt?: Date; // Last update on platform
}

export const projectsSeed: SeedProject[] = [
    {
        name: "Llama3 by Meta",
        description: "Meta最新开源的大型语言模型，性能卓越。",
        categorySlug: "ai-biancheng", // Or a more general "LLM" category if it exists
        repositoryUrl: "https://github.com/meta-llama/llama3",
        projectUrl: "https://ai.meta.com/llama/",
        tags: ["LLM", "Meta", "Open Source", "AI Model"],
        status: "active",
        license: "Llama 3 Community License",
        programmingLanguages: ["Python"],
        technologiesUsed: ["PyTorch"],
        stars: 50000, // Example value
        forks: 5000,  // Example value
        isFeatured: true,
        projectCreatedAt: new Date("2024-04-18T00:00:00Z"),
        lastCommitDate: new Date("2024-07-15T10:00:00Z"), // Example
        imageUrl: "https://img.aibase.com/static/app/10305.png?imageView2/1/w/120/h/120/q/75" // Example
    },
    {
        name: "Stable Diffusion WebUI",
        description: "一个基于Gradio库的Stable Diffusion浏览器界面。",
        categorySlug: "ai-huihua", // Belongs to AI绘画
        repositoryUrl: "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
        tags: ["Stable Diffusion", "Image Generation", "Web UI", "Gradio"],
        status: "active",
        license: "AGPL-3.0",
        programmingLanguages: ["Python"],
        technologiesUsed: ["Gradio", "PyTorch"],
        stars: 120000, // Example value
        forks: 20000,  // Example value
        isFeatured: true,
        projectCreatedAt: new Date("2022-08-22T00:00:00Z"), // Approx
        lastCommitDate: new Date("2024-07-18T10:00:00Z"), // Example
        imageUrl: "https://img.aibase.com/static/app/10003.png?imageView2/1/w/120/h/120/q/75" // Example
    },
    {
        name: "LangChain",
        description: "用于构建由大型语言模型驱动的应用程序的框架。",
        categorySlug: "ai-biancheng", // Or a specific "AI Frameworks" category
        repositoryUrl: "https://github.com/langchain-ai/langchain",
        projectUrl: "https://www.langchain.com/",
        tags: ["LLM", "Framework", "Development", "Agents"],
        status: "active",
        license: "MIT",
        programmingLanguages: ["Python", "TypeScript"],
        stars: 80000, // Example value
        forks: 10000, // Example value
        isFeatured: false,
        projectCreatedAt: new Date("2022-10-01T00:00:00Z"), // Approx
        lastCommitDate: new Date("2024-07-19T10:00:00Z"), // Example
        imageUrl: "https://img.aibase.com/static/app/10010.png?imageView2/1/w/120/h/120/q/75" // Example
    },
    // Add more projects as needed
];
