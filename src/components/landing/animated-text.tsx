import { motion } from "framer-motion"
import { FC } from "react"

interface WordMotionSpanProps {
  text: string
}

export const AnimatedText: FC<WordMotionSpanProps> = ({ text }) => {
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
      className="mr-2 mb-1"
    >
      {text}
    </motion.span>
  )
}

interface AnimatedTextProps {
  text: string
  className?: string
  chunkSize?: number
}

export const AnimatedTextWordByWord: FC<AnimatedTextProps> = ({
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
      className={`flex flex-wrap ${className}`}
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
        <AnimatedText text={chunk} key={i} />
      ))}
    </motion.span>
  )
}
