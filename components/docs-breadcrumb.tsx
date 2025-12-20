'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { sidebarGroups } from '@/components/sidebar'

function getLabelForSegment(segment: string): string {
	const labels: Record<string, string> = {
		docs: 'Docs',
		component: 'AI Components',
		system: 'System Components',
		'3d-components': '3D Components',
	}

	if (labels[segment]) return labels[segment]

	for (const group of sidebarGroups) {
		for (const link of group.links) {
			if (link.href.split('/').pop() === segment) {
				return link.label
			}
		}
	}

	return segment
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}

export default function DocsBreadcrumb() {
	const pathname = usePathname()
	const segments = pathname.split('/').filter(Boolean)

	if (segments.length <= 1) return null

	const breadcrumbItems = segments.map((segment, index) => ({
		label: getLabelForSegment(segment),
		isLast: index === segments.length - 1,
	}))

	return (
		<Breadcrumb className="mb-4 not-prose">
			<BreadcrumbList>
				{breadcrumbItems.map((item, index) => (
					<React.Fragment key={index}>
						<BreadcrumbItem>
							{item.isLast ? (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							) : (
								<BreadcrumbLink asChild>
									<Link href="/docs">{item.label}</Link>
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
						{!item.isLast && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
