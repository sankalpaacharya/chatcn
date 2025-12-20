import React from "react"
import Navbar from "@/components/navbar"

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<div className="flex-1">{children}</div>
		</div>
	)
}
