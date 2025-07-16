import Link from "next/link";
export default function Footer() {
  return (
    <footer className="w-full text-center py-2 text-xs text-muted-foreground">
      Made with ❤️ by{" "}
      <Link
        href={"https://github.com/sankalpaacharya"}
        className="font-medium underline"
      >
        Sanku
      </Link>
    </footer>
  );
}
