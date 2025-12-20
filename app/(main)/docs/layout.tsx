import React, { ReactNode } from 'react'
import Sidebar from '@/components/sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import DocsBreadcrumb from '@/components/docs-breadcrumb'
import TableOfContents from '@/components/table-of-contents'

export default function DocLayout({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider>
			<div className="flex h-full w-full">
				<SidebarTrigger className="md:hidden fixed top-20 left-4 z-50 shadow-md bg-background border rounded-md" />
				<Sidebar />
				<main className="flex-1 min-w-0 px-5 md:px-0 overflow-auto">
					<div id="docs-content" className="prose dark:prose-invert w-full max-w-4xl mx-auto py-10 prose-h1:m-0 prose-p:m-1 prose-p:text-primary ">
						<DocsBreadcrumb />
						{children}
					</div>
				</main>
				<aside className="w-64 shrink-0 hidden xl:block">
					<div className="sticky top-10 pr-6 max-h-[calc(100vh-5rem)] overflow-auto">
						<TableOfContents />
					</div>
				</aside>
			</div>
		</SidebarProvider>
	)
}





