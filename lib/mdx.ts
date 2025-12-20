import { compileMDX } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import { useMDXComponents as getMDXComponents } from '@/mdx-components'
import fs from 'fs'
import path from 'path'
import type { ReactElement } from 'react'

const mdxComponents = getMDXComponents({})

export type Frontmatter = {
    title?: string
    description?: string
}

const CONTENT_DIR = path.join(process.cwd(), 'content/docs')

export async function getMDXContent(slug: string[]): Promise<{
    content: ReactElement
    frontmatter: Frontmatter
} | null> {
    // Build file path from slug
    let filePath: string

    if (slug.length === 0) {
        filePath = path.join(CONTENT_DIR, 'index.mdx')
    } else {
        filePath = path.join(CONTENT_DIR, ...slug) + '.mdx'
    }

    // Check if file exists
    if (!fs.existsSync(filePath)) {
        return null
    }

    const source = fs.readFileSync(filePath, 'utf-8')

    const { content, frontmatter } = await compileMDX<Frontmatter>({
        source,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    rehypeSlug,
                    [
                        rehypePrettyCode,
                        {
                            theme: {
                                dark: 'github-dark',
                                light: 'github-light',
                            },
                            keepBackground: false,
                        },
                    ],
                    [
                        rehypeAutolinkHeadings,
                        {
                            properties: {
                                className: ['anchor'],
                                ariaLabel: 'Link to section',
                            },
                        },
                    ],
                ],
            },
        },
        components: mdxComponents,
    })

    return { content, frontmatter }
}

export function getAllSlugs(): string[][] {
    const slugs: string[][] = []

    function walkDir(dir: string, prefix: string[] = []) {
        const files = fs.readdirSync(dir)

        for (const file of files) {
            const filePath = path.join(dir, file)
            const stat = fs.statSync(filePath)

            if (stat.isDirectory()) {
                walkDir(filePath, [...prefix, file])
            } else if (file.endsWith('.mdx')) {
                const name = file.replace('.mdx', '')
                if (name === 'index') {
                    slugs.push(prefix.length === 0 ? [] : prefix)
                } else {
                    slugs.push([...prefix, name])
                }
            }
        }
    }

    walkDir(CONTENT_DIR)
    return slugs
}
