import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";
import "highlight.js/styles/github-dark.css";

/**
 * Markdown content conventions:
 * - **bold** for key definitions
 * - `inline code` for technical terms (state, props, useEffect, key, etc.)
 * - > blockquote for important notes / interview callouts
 * - fenced code blocks for code examples
 */

interface MarkdownRendererProps {
  content: string;
}

const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-8 mb-3 text-xl font-bold text-slate-100">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-2 text-base font-semibold text-slate-200">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="my-3 leading-7 text-slate-300">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-100">{children}</strong>
  ),
  code: ({ children, className }) => {
    // Block code (inside pre) keeps highlight.js className
    if (className) {
      return <code className={className}>{children}</code>;
    }
    // Inline code
    return (
      <code className="rounded px-1.5 py-0.5 bg-slate-800 text-sky-300 border border-slate-700 text-sm font-mono">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-4 rounded-lg bg-slate-900 p-4 overflow-x-auto text-sm border border-slate-700">
      {children}
    </pre>
  ),
  ul: ({ children }) => (
    <ul className="my-3 ml-5 list-disc space-y-1 text-slate-300">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 ml-5 list-decimal space-y-1 text-slate-300">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="my-1 leading-7">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-sky-500 bg-sky-950/40 rounded-r-lg px-4 py-3 text-slate-300">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sky-400 hover:underline"
    >
      {children}
    </a>
  ),
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="max-w-none text-slate-300">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
