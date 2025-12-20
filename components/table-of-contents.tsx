'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
ContentWritingIcon
} from "@/components/icons";
import { HugeiconsIcon } from '@hugeicons/react'

interface TocItem {
	id: string
	text: string
	level: number
}

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '')
}

export default function TableOfContents() {
	const pathname = usePathname()
	const [headings, setHeadings] = useState<TocItem[]>([])
	const [activeId, setActiveId] = useState<string>('')

	useEffect(() => {
		const timer = setTimeout(() => {
			const container = document.getElementById('docs-content')
			if (!container) return

			const elements = container.querySelectorAll('h1, h2, h3')
			const items: TocItem[] = []

			elements.forEach((el) => {
				const text = el.textContent || ''
				if (!text.trim()) return

				let id = el.id
				if (!id) {
					id = slugify(text)
					el.id = id
				}

				items.push({
					id,
					text,
					level: parseInt(el.tagName[1]),
				})
			})

			setHeadings(items)
			setActiveId('')
		}, 100)

		return () => clearTimeout(timer)
	}, [pathname])

	useEffect(() => {
		if (headings.length === 0) return

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id)
					}
				})
			},
			{ rootMargin: '-80px 0px -80% 0px' }
		)

		headings.forEach(({ id }) => {
			const el = document.getElementById(id)
			if (el) observer.observe(el)
		})

		return () => observer.disconnect()
	}, [headings])

	if (headings.length === 0) return null

	return (
		<nav className="space-y-1">
			<p className="font-medium text-sm mb-3 flex items-center gap-2">
			<HugeiconsIcon icon={ContentWritingIcon} size={15} />
			On This Page
		</p>
			{headings.map((heading) => (
				<a
					key={heading.id}
					href={`#${heading.id}`}
					className={cn(
						'block text-sm py-1 text-muted-foreground hover:text-foreground transition-colors',
						heading.level === 2 && 'pl-0',
						heading.level === 3 && 'pl-4',
						activeId === heading.id && 'text-foreground font-medium'
					)}
				>
					{heading.text}
				</a>
			))}
		</nav>
	)
}



