import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/new-york/message";

export default function ChatContainer() {
  return (
    <div>
      <Message className="justify-end">
        <MessageAvatar
          src="https://github.com/sankalpaacharya.png"
          alt="Sankalpa Acharya"
        />
        <MessageContent>
          Hey AI, can you help me with my project?
        </MessageContent>
      </Message>
    </div>
  );
}
