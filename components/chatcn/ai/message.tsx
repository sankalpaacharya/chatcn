"use client"
import * as React from "react"
import { createContext, useContext } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { motion, type Variants, AnimatePresence } from "framer-motion"

const messageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.94,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 26,
      mass: 0.9,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(2px)",
    transition: {
      duration: 0.12,
      ease: "easeOut",
    },
  },
}

const avatarVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 24,
    },
  },
}

type MessageVariant = "sent" | "received"

type MessageContextValue = {
  disabled?: boolean
  variant: MessageVariant
  animate: boolean
  onComplete?: () => void
  hasStreaming: boolean
  setHasStreaming: (value: boolean) => void
}

const MessageContext = createContext<MessageContextValue>({
  disabled: false,
  variant: "received",
  animate: true,
  hasStreaming: false,
  setHasStreaming: () => { },
})

function useMessageContext() {
  const ctx = useContext(MessageContext)
  if (!ctx) {
    throw Error("useMessageContext must be used within a Message")
  }
  return ctx
}

export type MessageContainerProps = {
  children: React.ReactNode
  className?: string
  showGlow?: boolean
}

export function MessageContainer({
  children,
  className,
  showGlow = true,
}: MessageContainerProps) {
  return (
    <div className={cn("relative", className)}>
      {showGlow && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-transparent to-indigo-500/5 rounded-3xl blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        </>
      )}
      <div className="relative">
        {children}
      </div>
    </div>
  )
}

export type MessageListProps = {
  children: React.ReactNode
  className?: string
  gap?: "sm" | "md" | "lg"
  sequential?: boolean
  initialDelay?: number
  messageDelay?: number
}

export function MessageList({
  children,
  className,
  gap = "md",
  sequential = true,
  initialDelay = 800,
  messageDelay = 800,
}: MessageListProps) {
  const [visibleCount, setVisibleCount] = React.useState(sequential ? 0 : React.Children.count(children))
  const childArray = React.Children.toArray(children)

  React.useEffect(() => {
    if (!sequential) {
      setVisibleCount(childArray.length)
      return
    }

    const initialTimer = setTimeout(() => {
      setVisibleCount(1)
    }, initialDelay)

    return () => clearTimeout(initialTimer)
  }, [sequential, initialDelay, childArray.length])

  const handleMessageComplete = React.useCallback(() => {
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 1, childArray.length))
    }, messageDelay)
  }, [childArray.length, messageDelay])

  const gapClasses = {
    sm: "gap-3",
    md: "gap-5",
    lg: "gap-7",
  }

  return (
    <div className={cn("flex flex-col", gapClasses[gap], className)}>
      <AnimatePresence mode="sync">
        {childArray.slice(0, visibleCount).map((child, index) => {
          if (!React.isValidElement(child)) return null

          const isLast = index === visibleCount - 1
          const key = child.key || `msg-${index}`

          return React.cloneElement(child as React.ReactElement<MessageProps>, {
            key,
            onComplete: isLast && sequential ? handleMessageComplete : undefined,
          })
        })}
      </AnimatePresence>
    </div>
  )
}

export type MessageProps = {
  children: React.ReactNode
  className?: string
  variant?: MessageVariant
  animate?: boolean
  onComplete?: () => void
}

export function Message({
  children,
  className,
  variant = "received",
  animate = true,
  onComplete,
}: MessageProps) {
  const [hasStreaming, setHasStreaming] = React.useState(false)
  const hasCalledComplete = React.useRef(false)
  const handleAnimationComplete = React.useCallback(() => {
    if (!hasStreaming && onComplete && !hasCalledComplete.current) {
      hasCalledComplete.current = true
      onComplete()
    }
  }, [hasStreaming, onComplete])

  const handleStreamingComplete = React.useCallback(() => {
    if (onComplete && !hasCalledComplete.current) {
      hasCalledComplete.current = true
      onComplete()
    }
  }, [onComplete])

  return (
    <TooltipProvider>
      <MessageContext.Provider
        value={{
          disabled: false,
          variant,
          animate,
          onComplete: handleStreamingComplete,
          hasStreaming,
          setHasStreaming,
        }}
      >
        <motion.div
          initial={animate ? "hidden" : false}
          animate="visible"
          exit="exit"
          layout
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.03 },
            },
          }}
          onAnimationComplete={handleAnimationComplete}
          className={cn(
            "flex gap-3 items-end group",
            variant === "sent" && "flex-row-reverse",
            className
          )}
        >
          {children}
        </motion.div>
      </MessageContext.Provider>
    </TooltipProvider>
  )
}

export type MessageAvatarProps = {
  src?: string
  alt: string
  fallback?: string
  className?: string
  showStatus?: boolean
  status?: "online" | "offline" | "away"
}

export function MessageAvatar({
  src,
  alt,
  fallback,
  className,
  showStatus = false,
  status = "online",
}: MessageAvatarProps) {
  const { animate, variant } = useMessageContext()

  const statusColors = {
    online: "bg-emerald-400",
    offline: "bg-zinc-500",
    away: "bg-amber-400",
  }

  return (
    <motion.div
      variants={animate ? avatarVariants : undefined}
      className="relative flex-shrink-0"
    >
      <Avatar
        className={cn(
          "h-9 w-9 ring-2 ring-black/5 dark:ring-white/5 shadow-lg transition-all duration-300",
          className
        )}
      >
        {src && <AvatarImage src={src} alt={alt} className="object-cover" />}
        <AvatarFallback
          className={cn(
            "text-xs font-semibold",
            variant === "sent"
              ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white"
              : "bg-muted text-muted-foreground dark:bg-zinc-700 dark:text-zinc-200"
          )}
        >
          {(fallback || alt).slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showStatus && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.15 }}
          className={cn(
            "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background",
            statusColors[status]
          )}
        />
      )}
    </motion.div>
  )
}

export type MessageContentProps = {
  children: React.ReactNode
  className?: string
  streaming?: boolean
  streamingSpeed?: number
}

export function MessageContent({
  children,
  className,
  streaming = false,
  streamingSpeed = 20,
}: MessageContentProps) {
  const { animate, variant, onComplete, setHasStreaming } = useMessageContext()
  const [displayedText, setDisplayedText] = React.useState("")
  const [isComplete, setIsComplete] = React.useState(!streaming)
  const hasCompletedRef = React.useRef(false)
  const onCompleteRef = React.useRef(onComplete)
  React.useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  const text = typeof children === "string" ? children : ""
  React.useEffect(() => {
    if (streaming) {
      setHasStreaming(true)
    }
  }, [streaming, setHasStreaming])

  React.useEffect(() => {
    if (hasCompletedRef.current) return

    if (!streaming || typeof children !== "string") {
      setDisplayedText(text)
      setIsComplete(true)
      return
    }

    setDisplayedText("")
    setIsComplete(false)
    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(interval)
        setIsComplete(true)
        hasCompletedRef.current = true
        onCompleteRef.current?.()
      }
    }, streamingSpeed)

    return () => clearInterval(interval)
  }, [children, streaming, streamingSpeed, text])

  return (
    <motion.div
      variants={animate ? messageVariants : undefined}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative max-w-[80%] rounded-[20px] px-4 py-2.5 text-[15px] leading-relaxed font-medium",
        "shadow-lg",
        variant === "sent" && [
          "bg-gradient-to-br from-[#0A84FF] to-[#007AFF]",
          "text-white",
          "shadow-blue-500/25",
          "rounded-br-lg",
        ],
        variant === "received" && [
          "bg-muted dark:bg-zinc-800",
          "text-foreground",
          "shadow-black/10 dark:shadow-black/20",
          "rounded-bl-lg",
        ],
        className
      )}
    >
      <span className="relative z-10 break-words whitespace-pre-wrap">
        {streaming ? displayedText : children}
        {streaming && !isComplete && (
          <motion.span
            className="inline-block w-[2px] h-[1.1em] bg-current opacity-60 ml-0.5 align-middle rounded-full"
            animate={{ opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </span>
    </motion.div>
  )
}

export type MessageTimestampProps = {
  children: React.ReactNode
  className?: string
}

export function MessageTimestamp({ children, className }: MessageTimestampProps) {
  const { animate } = useMessageContext()

  return (
    <motion.span
      initial={animate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.2 }}
      className={cn(
        "text-[10px] text-zinc-500 px-1",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
        className
      )}
    >
      {children}
    </motion.span>
  )
}

// ============================================================================
// MessageStatus
// ============================================================================

export type MessageStatusProps = {
  status: "sending" | "sent" | "delivered" | "read"
  className?: string
}

export function MessageStatus({ status, className }: MessageStatusProps) {
  const { animate } = useMessageContext()

  const statusIcons = {
    sending: (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="h-3 w-3 rounded-full border-2 border-blue-400 border-t-transparent"
      />
    ),
    sent: (
      <svg className="h-3 w-3 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    delivered: (
      <svg className="h-3 w-3 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="18 6 7 17 2 12" />
        <polyline points="22 6 11 17 8 14" />
      </svg>
    ),
    read: (
      <svg className="h-3 w-3 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="18 6 7 17 2 12" />
        <polyline points="22 6 11 17 8 14" />
      </svg>
    ),
  }

  return (
    <motion.span
      initial={animate ? { opacity: 0, scale: 0.5 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 20 }}
      className={cn("flex items-center", className)}
    >
      {statusIcons[status]}
    </motion.span>
  )
}

export type MessageActionsProps = {
  children: React.ReactNode
  className?: string
}

export function MessageActions({ children, className }: MessageActionsProps) {
  const { variant } = useMessageContext()

  return (
    <motion.div
      initial={{ opacity: 0, x: variant === "sent" ? 8 : -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 }}
      className={cn(
        "flex items-center gap-1.5",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export type MessageActionProps = {
  className?: string
  tooltip: React.ReactNode
  children: React.ReactNode
  side?: "top" | "bottom" | "left" | "right"
} & React.ComponentProps<typeof Tooltip>

export function MessageAction({
  className,
  tooltip,
  children,
  ...props
}: MessageActionProps) {
  const { disabled } = useMessageContext()
  return (
    <Tooltip {...props}>
      <TooltipTrigger
        asChild
        disabled={disabled}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent className={className}>{tooltip}</TooltipContent>
    </Tooltip>
  )
}

export { AnimatePresence }
