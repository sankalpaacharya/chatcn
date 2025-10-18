// preview/__index__.ts
export const Index = {
  codeblock: {
    name: "codeblock",
    file: "components/chatcn/codeblock/codeblock.tsx",
    isClient: false,
  },
  calendar: {
    name: "calendar",
    file: "components/chatcn/calendar/calendar.tsx",
    isClient: true,
  },
} as const;
