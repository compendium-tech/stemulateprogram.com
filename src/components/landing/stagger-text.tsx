import { motion } from "framer-motion"
import { FC } from "react"

interface StaggerTextProps {
  text: string
  className?: string
  chunkSize?: number
}

export const StaggerText: FC<StaggerTextProps> = ({
  text,
  className,
  chunkSize = 1,
}) => {
  const words = text.split(" ")
  const chunks: string[] = []
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(" "))
  }

  return (
    <motion.span
      className={`${className}`}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.2 },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {chunks.map((chunk, i) => (
        <StaggerTextChunk text={chunk} key={i} />
      ))}
    </motion.span>
  )
}

interface StaggerTextGroupProps {
  text: string
}

const StaggerTextChunk: FC<StaggerTextGroupProps> = ({ text }) => {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
      className="inline-block whitespace-pre"
    >
      {text + " "}
    </motion.span>
  )
}
