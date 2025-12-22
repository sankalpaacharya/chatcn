import React from "react";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageActions,
  MessageAction,
} from "@/components/chatcn/ai/message";
import { Button } from "@/components/ui/button";
import {
  Copy01Icon,
  ThumbsUpIcon,
  ThumbsDownIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function AIMessageActions() {
  return (
    <MessageActions className="opacity-0 group-hover/message:opacity-100 transition-opacity ml-11 -mt-1">
      <MessageAction tooltip="Copy">
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <HugeiconsIcon icon={Copy01Icon} className="h-4 w-4" />
        </Button>
      </MessageAction>
      <MessageAction tooltip="Good response">
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <HugeiconsIcon icon={ThumbsUpIcon} className="h-4 w-4" />
        </Button>
      </MessageAction>
      <MessageAction tooltip="Bad response">
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <HugeiconsIcon icon={ThumbsDownIcon} className="h-4 w-4" />
        </Button>
      </MessageAction>
    </MessageActions>
  );
}

function AIMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group/message space-y-1">
      <Message variant="ai">
        <MessageAvatar src="/images/gaia_logo.svg" alt="Gaia" />
        <MessageContent>{children}</MessageContent>
      </Message>
      <AIMessageActions />
    </div>
  );
}

export default function MessagePreview() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl px-4">
        <div className="space-y-6">
          {/* User Message */}
          <Message variant="user">
            <MessageAvatar
              src="https://github.com/sankalpaacharya.png"
              alt="Sankalpa Acharya"
            />
            <MessageContent>
              Hey AI, can you help me with my project?
            </MessageContent>
          </Message>

          {/* AI Message */}
          <AIMessage>Of course! What are you working on right now?</AIMessage>

          {/* User Message */}
          <Message variant="user">
            <MessageAvatar
              src="https://github.com/sankalpaacharya.png"
              alt="Sankalpa Acharya"
            />
            <MessageContent>
              I&apos;m building a finance tracker, but I&apos;m stuck on the
              charts. Any recommendations?
            </MessageContent>
          </Message>

          {/* AI Message */}
          <AIMessage>
            Got it. Are you using Recharts or Chart.js? Both are great options
            for React applications.
          </AIMessage>

          {/* User Message */}
          <Message variant="user">
            <MessageAvatar
              src="https://github.com/sankalpaacharya.png"
              alt="Sankalpa Acharya"
            />
            <MessageContent>
              I&apos;m using Recharts, but the data isn&apos;t updating in real
              time.
            </MessageContent>
          </Message>

          {/* AI Message */}
          <AIMessage>
            We can fix that by adding a useEffect to listen for new transactions
            and re-render your chart. Would you like me to show you an example?
          </AIMessage>
        </div>
      </div>
    </div>
  );
}
