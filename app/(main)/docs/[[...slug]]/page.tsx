import { getMDXContent, getAllSlugs } from "@/lib/mdx";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export default async function DocsPage({ params }: Props) {
  const { slug = [] } = await params;
  const result = await getMDXContent(slug);

  if (!result) {
    notFound();
  }

  return result.content;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug.length === 0 ? undefined : slug,
  }));
}
