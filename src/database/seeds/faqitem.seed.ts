// src/database/seeds/faqitem.seed.ts
import { FAQItemEntity } from '../../entities/faqitem.entity'; // Assuming path

export interface SeedFAQItem extends Partial<FAQItemEntity> {
    question: string;
    answer: string;
    displayOrder: number;
    category?: string;
}

export const faqitemsSeed: SeedFAQItem[] = [
    {
        question: "什么是MCP (Model Context Protocol)？",
        answer: "<p>MCP（Model Context Protocol）是一种开放标准协议，允许AI模型与外部工具和服务进行交互。它为大型语言模型（LLMs）提供了一种标准化的方式来访问和操作外部数据、API和服务，使AI能够执行更复杂的任务，如查询数据库、访问文件系统或调用第三方API。</p>",
        displayOrder: 1,
        category: "mcpGeneral"
    },
    {
        question: "如何在我的开发环境中设置MCP服务器？",
        answer: "<p>设置MCP服务器通常需要以下步骤：</p><ol><li>安装所需的MCP客户端（如Claude Desktop、Cursor、Windsurf等）；</li><li>在客户端配置文件中添加MCP服务器信息；</li><li>对于本地MCP服务器，需要安装Node.js并使用npm安装相关包；</li><li>配置必要的API密钥和认证信息；</li><li>重启客户端以加载MCP服务器配置。</li></ol><p>具体步骤可能因不同的MCP服务和客户端而略有不同。</p>",
        displayOrder: 2,
        category: "mcpGeneral"
    },
    {
        question: "MCP与传统API调用有什么区别?",
        answer: "<p>MCP与传统API调用的主要区别在于：</p><ul><li>MCP提供了一个统一的接口，使AI模型可以通过自然语言与多种服务交互；</li><li>MCP服务器充当AI模型和外部服务之间的中介，处理认证、格式转换和上下文管理；</li><li>MCP允许双向通信，服务可以主动向AI模型提供信息；</li><li>MCP设计为对AI友好，返回结构化但易于AI理解的数据；</li><li>MCP支持会话上下文，可以在多轮对话中保持状态。</li></ul>",
        displayOrder: 3,
        category: "mcpGeneral"
    },
    {
        question: "哪些编辑器和IDE支持MCP集成？",
        answer: "<p>目前支持MCP集成的编辑器和IDE包括：</p><ol><li>Claude Desktop - Anthropic的AI助手桌面应用；</li><li>Cursor - 专为AI协作设计的代码编辑器；</li><li>Windsurf (Codeium) - 具有AI功能的代码编辑器；</li><li>Cline - Visual Studio Code的扩展；</li><li>Zed - 高性能多人协作代码编辑器。</li></ol><p>随着MCP标准的普及，预计会有更多编辑器和IDE添加MCP支持。</p>",
        displayOrder: 4,
        category: "mcpGeneral"
    },
    {
        question: "如何将我的数据库连接到MCP服务？",
        answer: "<p>连接数据库到MCP服务通常需要：</p><ol><li>选择支持数据库连接的MCP服务，如Neon MCP Server；</li><li>在MCP服务配置中提供数据库连接信息（连接字符串、凭据等）；</li><li>配置适当的权限，通常建议使用只读账户以确保安全；</li><li>在MCP客户端中启用该服务；</li><li>使用自然语言通过MCP客户端查询数据库。</li></ol><p>对于Neon Postgres，可以使用专门的MCP服务器，支持通过自然语言进行数据库操作。</p>",
        displayOrder: 5,
        category: "mcpDevelopment" // Example of a different category
    },
    {
        question: "MCP服务器的安全最佳实践有哪些?",
        answer: "<p>MCP服务器的安全最佳实践包括：</p><ul><li>使用最小权限原则，仅授予MCP服务所需的最低权限；</li><li>实施强认证，使用OAuth或API密钥进行身份验证；</li><li>审核和记录所有MCP请求和操作；</li><li>定期更新MCP服务器和依赖项；</li><li>使用HTTPS加密所有通信；</li><li>对敏感操作实施额外的验证步骤；</li><li>考虑使用沙箱环境隔离MCP服务；</li><li>定期审查和撤销未使用的访问权限。</li></ul>",
        displayOrder: 6,
        category: "mcpDevelopment"
    },
    {
        question: "如何开发自定义MCP服务？",
        answer: "<p>开发自定义MCP服务的步骤包括：</p><ol><li>熟悉MCP规范和协议格式；</li><li>选择适合的编程语言和框架（Node.js是常见选择）；</li><li>实现必要的MCP端点和处理程序；</li><li>设计服务的命令结构和参数；</li><li>实现认证和授权机制；</li><li>处理错误和异常情况；</li><li>优化响应格式，使其对AI友好；</li><li>测试与不同MCP客户端的兼容性；</li><li>编写清晰的文档，说明服务功能和使用方法；</li><li>部署服务并监控性能。</li></ol>",
        displayOrder: 7,
        category: "mcpDevelopment"
    },
    {
        question: "MCP与其他AI工具集成框架(如LangChain、LlamaIndex)有何不同?",
        answer: "<p>MCP与LangChain、LlamaIndex等框架的主要区别在于：</p><ol><li>MCP是一个通信协议，而不是编程框架；</li><li>MCP专注于标准化AI模型与外部工具的通信方式，而不是构建应用程序；</li><li>MCP允许任何支持该协议的客户端与服务交互，无需特定编程语言；</li><li>MCP更适合交互式环境（如IDE和编辑器），而框架更适合构建应用；</li><li>MCP和这些框架可以互补使用，例如，可以使用LangChain构建MCP服务。</li></ol><p>MCP提供了更标准化的接口，而框架提供了更丰富的功能和更灵活的编程模型。</p>",
        displayOrder: 8,
        category: "mcpGeneral"
    }
];
