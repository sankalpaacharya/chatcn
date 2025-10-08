"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { ChevronRight, Heart, Search, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const MarketPlace = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const scrollToMarketplace = () => {
        const mp = document.getElementById('marketplace')
        if (mp) {
            mp.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const marketplaceItems = [
        {
          id: 1,
          slug: "login-signup",
          title: 'Login/Signup',
          author: 'Nishit',
          likes: '1.4k',
          views: '8.9k',
          free: true,
          image: '/marketplace/login.webp',
          github: 'nishit369.png',
        },
        {
          id: 2,
          slug: "chat-container",
          title: 'Chat container',
          author: 'Sankalpa',
          likes: '2.4k',
          views: '10.2k',
          free: true,
          image: '/marketplace/chat-container.webp',
          github: 'sankalpaacharya.png'
        },
        {
          id: 3,
          slug: "markdown-format",
          title: 'Markdown format',
          author: 'Sankalpa',
          likes: '2.3k',
          views: '8k',
          free: true,
          image: '/marketplace/markdown.webp',
          github: 'sankalpaacharya.png'
        },
        {
          id: 4,
          slug: "prompt-input",
          title: 'Prompt Input',
          author: 'Sankalpa',
          likes: '1.2k',
          views: '4.8k',
          free: true,
          image: '/marketplace/prompt.webp',
          github: 'sankalpaacharya.png'
        },
        {
          id: 5,
          slug: "email-component",
          title: 'Email',
          author: 'Nishit',
          likes: '610',
          views: '2.8k',
          free: true,
          image: '/marketplace/email.webp',
          github: 'nishit369.png'
        },
        {
          id: 6,
          slug: "weather-component",
          title: 'Weather',
          author: 'Sankalpa',
          likes: '1k',
          views: '5.3k',
          free: true,
          image: '/marketplace/weather.webp',
          github: 'sankalpaacharya.png'
        }
      ];

      const filteredItems = marketplaceItems.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8 space-y-4 min-h-screen">
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="pt-6 sm:pt-8 pb-4 sm:pb-6 flex flex-col items-center text-center font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          <p>Explore creative and useful components,</p>
          <p>built by the <span className="italic">awesome</span> community</p>
        </div>
        <div className="relative w-full max-w-xs sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="I'm looking for..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 bg-muted/50 text-primary placeholder:text-gray-80"
          />
        </div>
        <div className="w-full max-w-4xl py-6 sm:py-8">
          <Card className="bg-muted/50 border-none overflow-hidden px-2 sm:px-4 md:px-6 lg:px-8">
            <CardContent className="px-2 sm:px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="flex-1 space-y-2">
                <div className="text-xl sm:text-2xl font-medium py-1">Chatcn Marketplace</div>
                <p className="max-w-md pb-1 text-sm sm:text-base">
                  Browse handpicked community creations and remix them your way.
                </p>
                <div className="flex flex-row gap-2 sm:gap-4">
                  <Button className="flex flex-row text-sm sm:text-base" onClick={scrollToMarketplace}>
                    Start picking <ChevronRight className="ml-1" />
                  </Button>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button className="flex flex-row bg-primary/50 text-sm sm:text-base">
                          Add component <ChevronRight className="ml-1" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>You'll be able to add components soon!</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <div className="w-20 sm:w-40 h-16 sm:h-32 rounded-lg overflow-hidden bg-primary/10 backdrop-blur-sm flex items-center justify-center text-2xl sm:text-4xl">
                </div>
                <div className="flex flex-col gap-2 sm:gap-3">
                  <div className="w-8 sm:w-16 h-6 sm:h-12 rounded-lg bg-primary/10 backdrop-blur-sm" />
                  <div className="w-14 sm:w-28 h-12 sm:h-24 rounded-lg bg-primary/10 backdrop-blur-sm flex items-center justify-center text-xl sm:text-2xl">
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div id="marketplace" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 pb-6 sm:pb-12">
        {filteredItems.map((item) => (
          <Link key={item.id} href={`/marketplace/${item.slug}`} passHref>
            <Card className="aspect-square bg-background border-0 transition-all shadow-none cursor-pointer group overflow-hidden">
              <div className="h-3/4 relative flex items-center justify-center border-2 transition-all rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="absolute inset-0"
                />
              </div>
              <CardFooter className="px-2 sm:px-4 py-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                  <Avatar className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0">
                    <AvatarImage src={`https://github.com/${item.github}`} alt={item.author} />
                    <AvatarFallback className="text-[10px] sm:text-xs">{item.author?.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0 flex-1">
                    <h4 className="font-semibold text-primary text-xs sm:text-sm leading-tight truncate">{item.title}</h4>
                    <span className="text-[10px] sm:text-xs text-muted-foreground truncate">by {item.author}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  {item.free && (
                    <span className="px-1.5 sm:px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap">
                      Free
                    </span>
                  )}
                  <div className="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm text-muted-foreground">
                    <Users className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                    <span className="text-[10px] sm:text-xs whitespace-nowrap">{item.views}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MarketPlace