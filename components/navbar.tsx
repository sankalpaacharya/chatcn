"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, Sun, Moon, MessageCircle, SearchIcon, StarIcon } from "lucide-react"
import { useTheme } from "next-themes"

import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"
import { Github } from "@/components/icons/social"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { sidebarGroups } from "@/components/sidebar"

const GITHUB_REPO = "sankalpaacharya/chatcn"
const GITHUB_URL = `https://github.com/${GITHUB_REPO}`

export default function Navbar({
	sidebar,
}: {
	sidebar?: React.ReactNode
}) {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = React.useState(false)
	const [open, setOpen] = React.useState(false)
	const [commandOpen, setCommandOpen] = React.useState(false)
	const [starCount, setStarCount] = React.useState<number | null>(null)
	const router = useRouter()
	const isMobile = useIsMobile()

	React.useEffect(() => {
		setMounted(true)
	}, [])

	React.useEffect(() => {
		async function fetchStarCount() {
			try {
				const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`)
				if (response.ok) {
					const data = await response.json()
					setStarCount(data.stargazers_count)
				}
			} catch {
			}
		}
		fetchStarCount()
	}, [])

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setCommandOpen((open) => !open)
			}
		}

		document.addEventListener("keydown", down)
		return () => document.removeEventListener("keydown", down)
	}, [])

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark")
	}

	const handleCommandSelect = (href: string) => {
		setCommandOpen(false)
		router.push(href)
	}

	const formatStarCount = (count: number) => {
		if (count >= 1000) {
			return `${(count / 1000).toFixed(1)}k`
		}
		return count.toString()
	}

	const searchableGroups = sidebarGroups.filter(
		(group) => group.label !== "Social"
	)

	return (
		<>
			<nav className="sticky top-0 z-50 w-full border-b-2 border-dotted bg-background">
				<div className="flex h-16 items-center px-4 md:px-8">
					{sidebar && (
						<Sheet open={open} onOpenChange={setOpen}>
							<SheetTrigger asChild className="xl:hidden mr-2">
								<Button variant="ghost" size="icon">
									<Menu className="h-5 w-5" />
									<span className="sr-only">Open menu</span>
								</Button>
							</SheetTrigger>

							<SheetContent side="left" className="p-0">
								<SheetTitle className="hidden">Navigation</SheetTitle>
								<div className="h-full">{sidebar}</div>
							</SheetContent>
						</Sheet>
					)}

					{/* Logo - desktop */}
					<Logo className="mr-6 hidden xl:flex" />

					<div className="flex flex-1 items-center justify-between">
						<NavigationMenu className="hidden xl:flex" viewport={!isMobile}>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuTrigger>Docs</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid gap-3 p-4 md:w-100 lg:w-125 lg:grid-cols-[.75fr_1fr]">
											<li className="row-span-3">
												<NavigationMenuLink asChild>
													<a
														className="relative flex h-full w-full flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md overflow-hidden bg-cover bg-center"
							style={{ backgroundImage: "url('/images/space3.png')" }}
														href="/docs"
													>
														<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
														<div className="relative z-10">
							<MessageCircle className="h-6 w-6 text-white" />
														<div className="mb-2 mt-4 text-lg font-medium text-white">
															chatcn
														</div>
														<p className="text-sm leading-tight text-white/80">
																Beautiful AI chat components built with shadcn/ui
															</p>
														</div>
													</a>
												</NavigationMenuLink>
											</li>
											<ListItem href="/docs/introduction" title="Introduction">
												Learn about chatcn and how it works.
											</ListItem>
											<ListItem href="/docs/installation" title="Installation">
												How to install and set up chatcn.
											</ListItem>
											<ListItem href="/docs/component/prompt-input" title="Components">
												Browse all AI chat components.
											</ListItem>
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuLink
										asChild
										className={navigationMenuTriggerStyle()}
									>
										<Link href="https://chatcn-template.vercel.app" target="_blank">
											Templates
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuLink
										asChild
										className={navigationMenuTriggerStyle()}
									>
										<Link href="/marketplace">
											Marketplace
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>

						{/* Logo - mobile */}
						<Logo className="xl:hidden" />

						{/* Right side actions */}
						<div className="flex items-center gap-2 ml-auto">
							{/* Search button */}
							<Button
								variant="outline"
								className="relative h-9 w-9 p-0 xl:h-9 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
								onClick={() => setCommandOpen(true)}
							>
								<SearchIcon className="h-4 w-4 xl:mr-2" />
								<span className="hidden xl:inline-flex text-muted-foreground">
									Search docs...
								</span>
								<span className="sr-only">Search docs</span>
								<Kbd className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 hidden xl:inline-flex">
									⌘K
								</Kbd>
							</Button>

							{/* GitHub with star count */}
							<Button
								variant="outline"
								size="sm"
								className="h-9 gap-1.5"
								asChild
							>
								<Link
									href={GITHUB_URL}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Github className="h-4 w-4" />
									{starCount !== null && (
										<>
											<StarIcon className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
											<span className="text-xs font-medium">
												{formatStarCount(starCount)}
											</span>
										</>
									)}
								</Link>
							</Button>

							{mounted && (
								<Button variant="ghost" size="icon" onClick={toggleTheme}>
									<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
									<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
									<span className="sr-only">Toggle theme</span>
								</Button>
							)}
						</div>
					</div>
				</div>
			</nav>

			<CommandDialog
				open={commandOpen}
				onOpenChange={setCommandOpen}
				title="Search Documentation"
				description="Search for components, guides, and more."
			>
				<CommandInput placeholder="Type to search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{searchableGroups.map((group) => (
						<CommandGroup key={group.label} heading={group.label}>
							{group.links.map((link) => (
								<CommandItem
									key={link.href}
									value={link.label}
									onSelect={() => handleCommandSelect(link.href)}
								>
									{link.label}
								</CommandItem>
							))}
						</CommandGroup>
					))}
				</CommandList>
			</CommandDialog>
		</>
	)
}

function Logo({ className = "" }: { className?: string }) {
	return (
		<Link href="/" className={cn("flex items-center space-x-2", className)}>
			<MessageCircle className="h-5 w-5" />
			<span className="font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/80">
				chatcn
			</span>
		</Link>
	)
}

function ListItem({
	className,
	title,
	children,
	href,
	...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; title: string }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link
					href={href}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	)
}
