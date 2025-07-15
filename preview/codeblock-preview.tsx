import React from "react";
import CodeBlock from "@/registry/new-york/codeblock/codeblock";

type Props = {};

const code = `import { FC, useState } from "react";

export const Counter: FC = () => {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = (): void => {
    setCount((prev) => prev + 1);
  };
  return (
    <div className="p-4 rounded-xl shadow-md w-fit bg-white dark:bg-zinc-900 text-center">
      <h2 className="text-xl font-semibold mb-2">Count: {count}</h2>
      <button
        onClick={handleIncrement}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Increment
      </button>
    </div>
  );
};
`;

export default function CodeBlockDemo() {
  return <CodeBlock code={code} language="tsx" />;
}
