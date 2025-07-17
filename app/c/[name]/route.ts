import { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const name = (await (params)).name;

  const filePath = path.join(process.cwd(), "public", "r", `${name}.json`);
  try {
    const content = await readFile(filePath, "utf-8");
    return new Response(content, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "File not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
