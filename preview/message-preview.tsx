"use client"
import {
  MessageContainer,
  MessageList,
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/chatcn/ai/message"

export default function MessagePreview() {
  return (
    <MessageContainer className="min-h-screen bg-background flex items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-md py-8">
        <MessageList gap="md" initialDelay={800} messageDelay={800}>
          <Message key="msg-1" variant="sent">
            <MessageAvatar
              src="https://github.com/sankalpaacharya.png"
              alt="You"
            />
            <MessageContent>
              Hey! I need a way to manage all my projects in one place.
            </MessageContent>
          </Message>

          <Message key="msg-2" variant="received">
            <MessageAvatar alt="AI" />
            <MessageContent>
              FlowDesk keeps tasks, chat, and files together so your team never loses track.
            </MessageContent>
          </Message>

          <Message key="msg-3" variant="sent">
            <MessageAvatar
              src="https://github.com/sankalpaacharya.png"
              alt="You"
            />
            <MessageContent>Can I invite clients?</MessageContent>
          </Message>

          <Message key="msg-4" variant="received">
            <MessageAvatar alt="AI" />
            <MessageContent streaming streamingSpeed={50}>
              Sure, just share a link — no account needed.
            </MessageContent>
          </Message>

          <Message key="msg-5" variant="sent">
            <MessageAvatar
              src="https://github.com/sankalpaacharya.png"
              alt="You"
            />
            <MessageContent>Is there a free plan?</MessageContent>
          </Message>

          <Message key="msg-6" variant="received">
            <MessageAvatar alt="AI" />
            <MessageContent streaming streamingSpeed={50}>
              Yep, get started free at flowdesk.app.
            </MessageContent>
          </Message>
        </MessageList>
      </div>
    </MessageContainer>
  )
}
