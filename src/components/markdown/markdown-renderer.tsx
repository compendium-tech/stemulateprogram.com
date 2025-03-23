import ReactMarkdown, { Components } from "react-markdown"
import remarkGfm from "remark-gfm"

export const MarkdownRenderer = ({ content }: { content: string }) => {
  const components: Components = {
    h1: ({ children, ...props }) => (
      <h1 {...props} className="text-3xl font-bold dark:text-white">
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 {...props} className="text-2xl font-bold dark:text-white">
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h2 {...props} className="text-xl font-bold dark:text-white">
        {children}
      </h2>
    ),
    p: ({ children, ...props }) => (
      <p {...props} className="font-medium dark:text-white">
        {children}
      </p>
    ),
    li: ({ children, ...props }) => (
      <li
        {...props}
        className="font-medium dark:marker:text-white dark:text-white"
      >
        {children}
      </li>
    ),
    strong: ({ children, ...props }) => (
      <span {...props} className="font-semibold">
        {children}
      </span>
    ),
    a: ({ children, ...props }) => (
      <span {...props} className="font-semibold underline">
        {children}
      </span>
    ),
  }

  return (
    <div className="markdown prose !max-w-none">
      {" "}
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
