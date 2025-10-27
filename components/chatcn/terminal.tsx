import { cn } from "@/lib/utils";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";

type TerminalState = "normal" | "minimize" | "maximize";

type TerminalEntry = {
  command: string;
  output: React.ReactNode | string;
};

type TerminalContextType = {
  terminalState: TerminalState;
  setTerminalState: React.Dispatch<React.SetStateAction<TerminalState>>;
  terminalHistory: TerminalEntry[];
  setTerminalHistory: React.Dispatch<React.SetStateAction<TerminalEntry[]>>;
};

const TerminalContext = createContext<TerminalContextType>({
  terminalState: "normal",
  setTerminalState: () => {},
  terminalHistory: [],
  setTerminalHistory: () => {},
});

type TerminalProviderProps = {
  children: ReactNode;
  initialState?: TerminalState;
};

export function TerminalProvider({
  children,
  initialState = "normal",
}: TerminalProviderProps) {
  const [terminalState, setTerminalState] =
    useState<TerminalState>(initialState);
  const [terminalHistory, setTerminalHistory] = useState<TerminalEntry[]>([]);

  return (
    <TerminalContext.Provider
      value={{
        terminalState,
        setTerminalState,
        terminalHistory,
        setTerminalHistory,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
}

type TerminalProps = {
  children: ReactNode;
  className?: string;
};

function getTerminalPositionClasses(state: TerminalState): string {
  switch (state) {
    case "maximize":
      return "fixed inset-0 w-screen h-screen z-[9999] rounded-none";
    case "minimize":
      return "fixed bottom-3 right-3 w-72 h-10 z-[9999] cursor-pointer";
    case "normal":
    default:
      return "relative h-auto";
  }
}

function getTerminalOutput(command: string): string | React.ReactNode {
  const cmd = command.trim();
  switch (cmd) {
    case "whoami":
      return <div className="text-xl text-gray-400">Hello code</div>;
    case "help":
      return (
        <div>
          <div>Available commands:</div>
          <ul className="list-disc ml-6">
            <li>whoami</li>
            <li>help</li>
            <li>clear</li>
          </ul>
        </div>
      );
    case "clear":
      return "CLEAR"; // special marker, handled later
    default:
      return "Command not found 😞";
  }
}

export function Terminal({ children, className }: TerminalProps) {
  const { terminalState } = useContext(TerminalContext);
  const content = (
    <div
      className={cn(
        "flex flex-col border rounded overflow-auto",
        className,
        getTerminalPositionClasses(terminalState)
      )}
    >
      {children}
    </div>
  );

  if (terminalState === "maximize" || terminalState === "minimize") {
    return createPortal(content, document.body);
  }
  return content;
}

type TerminalHeaderProps = {
  children: ReactNode;
  className?: string;
};

export function TerminalHeader({ children, className }: TerminalHeaderProps) {
  return (
    <header className={cn("p-3 bg-muted rounded rounded-b-none", className)}>
      {children}
    </header>
  );
}

export function TerminalInput() {
  const { setTerminalHistory } = useContext(TerminalContext);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const command = inputValue.trim();
      const output = getTerminalOutput(command);

      if (output === "CLEAR") {
        setTerminalHistory([]);
        setInputValue("");
        return;
      }

      // even if empty, still add new prompt
      setTerminalHistory((prev) => [
        ...prev,
        { command, output: command ? output : "" },
      ]);
      setInputValue("");
    }
  };

  return (
    <input
      onKeyDown={handleKeyDown}
      onChange={(e) => setInputValue(e.target.value)}
      value={inputValue}
      className="flex-1 bg-transparent outline-none border-none caret-indigo-400 text-foreground"
      type="text"
      autoFocus
    />
  );
}

export function TerminalPrompt() {
  return (
    <div className="space-x-1">
      <span>sanku</span>
      <span className="text-green-400">→</span>
    </div>
  );
}

type TerminalBodyProps = {
  children: ReactNode;
  className?: string;
};

export function TerminalBody({ children, className }: TerminalBodyProps) {
  return (
    <div className={cn("bg-muted rounded-none rounded-b p-3", className)}>
      {children}
    </div>
  );
}

type TerminalBodyContentProps = {
  className?: string;
};

export function TerminalBodyContent({ className }: TerminalBodyContentProps) {
  const { terminalHistory } = useContext(TerminalContext);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  return (
    <div
      className={cn(
        "rounded-none rounded-b space-y-2 overflow-y-auto",
        className
      )}
    >
      {terminalHistory.map((entry, index) => (
        <div key={index}>
          <div className="flex gap-3">
            <TerminalPrompt />
            <span>{entry.command}</span>
          </div>
          {entry.output && entry.output !== "CLEAR" && (
            <div className="text-sm">{entry.output}</div>
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
