import { MarkdownRenderer } from "./markdown-renderer"

export const MarkdownPage = ({ content }: { content: string }) => (
  <div className="flex text-zinc-400 justify-center center py-8 px-4 md:px-24">
    <MarkdownRenderer content={content} />
  </div>
)
