"use client";
import { useState } from "react";
import ChatContainer from "@/registry/new-york/chat-container";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/new-york/message";
import { Button } from "@/components/ui/button";

export default function ChatContainerPreview() {
  const initialMessages = [
    { from: "user", text: "Hey AI, can you explain the evolution of Earth?" },
    {
      from: "ai",
      text: `Absolutely! Earth formed about 4.5 billion years ago from a swirling cloud of gas and dust orbiting the Sun. 
During this early period, it was a molten planet, constantly bombarded by asteroids and meteorites. 
As it cooled, a solid crust formed, and water vapor condensed to create the first oceans. 
This set the stage for the beginning of life itself.`,
    },
    {
      from: "user",
      text: "Wow, that’s fascinating! What about the first life forms?",
    },
    {
      from: "ai",
      text: `Around 3.8 billion years ago, the first simple life forms appeared in the oceans—mostly single-celled organisms like bacteria and archaea. 
These microbes were the foundation for all life.`,
    },
    {
      from: "user",
      text: "How did oxygen change the planet’s environment?",
    },
  ];

  const remainingMessages = [
    {
      from: "ai",
      text: `About 2.5 billion years ago, the Great Oxidation Event occurred. 
Oxygen produced by photosynthetic microorganisms began accumulating in the atmosphere, dramatically changing Earth’s environment. 
This led to the formation of the ozone layer, which shielded the planet from harmful solar radiation and enabled more complex life to eventually evolve.`,
    },
    {
      from: "user",
      text: "When did complex life start to appear?",
    },
    {
      from: "ai",
      text: `Multicellular life started appearing around 1 billion years ago. 
From simple algae and soft-bodied organisms to the Cambrian Explosion 541 million years ago, life diversified rapidly. 
Famous groups like trilobites and early fish evolved, creating ecosystems in the oceans.`,
    },
    {
      from: "user",
      text: "How did life transition from water to land?",
    },
    {
      from: "ai",
      text: `Around 450 million years ago, plants and fungi began to colonize the land. 
Later, amphibians, reptiles, and eventually dinosaurs dominated the Earth. 
Mass extinctions periodically reshaped life, paving the way for new species.`,
    },
    {
      from: "user",
      text: "And humans, when did we come into the picture?",
    },
    {
      from: "ai",
      text: `Finally, mammals appeared, and after millions of years, humans emerged around 300,000 years ago. 
Earth’s evolution is a story of constant change and adaptation over billions of years.`,
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [nextIndex, setNextIndex] = useState(0);

  const addMessage = () => {
    if (nextIndex < remainingMessages.length) {
      setMessages((prev) => [...prev, remainingMessages[nextIndex]]);
      setNextIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 ">
      <div className="">
        <ChatContainer className="max-h-[25rem] h-[25rem]">
          {messages.map((msg, i) => (
            <Message
              key={i}
              className={msg.from === "user" ? "justify-end" : ""}
            >
              <MessageAvatar
                src={
                  msg.from === "user"
                    ? "https://github.com/sankalpaacharya.png"
                    : ""
                }
                alt={msg.from === "user" ? "Sankalpa Acharya" : "AI"}
              />
              <MessageContent
                className={msg.from === "ai" ? "bg-transparent" : ""}
              >
                {msg.text}
              </MessageContent>
            </Message>
          ))}
        </ChatContainer>
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          onClick={addMessage}
          disabled={nextIndex >= remainingMessages.length}
        >
          Next Message
        </Button>
      </div>
    </div>
  );
}
