"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { ChevronRight, Heart, Search, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const MarketPlace = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const scrollToMarketplace = ()=>{
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
          author: 'Nishit Barbhaya',
          likes: '1.4k',
          views: '8.9k',
          free: true,
          image: '/marketplace/login.webp',
        },
        {
          id: 2,
          slug: "chat-container",
          title: 'Chat container',
          author: 'Sankalpa Acharya',
          likes: '2.4k',
          views: '10.2k',
          free: true,
          image: '/marketplace/chat-container.webp',
        },
        {
          id: 3,
          slug: "markdown-format",
          title: 'Markdown format',
          author: 'Sankalpa Acharya',
          likes: '2.3k',
          views: '8k',
          free: true,
          image: '/marketplace/markdown.webp',
        },
        {
          id: 4,
          slug: "prompt-input",
          title: 'Prompt Input',
          author: 'Sankalpa Acharya',
          likes: '1.2k',
          views: '4.8k',
          free: true,
          image: '/marketplace/prompt.webp',
        },
        {
          id: 5,
          slug: "email-component",
          title: 'Email Component',
          author: 'Nishit Barbhaya',
          likes: '610',
          views: '2.8k',
          free: true,
          image: '/marketplace/email.webp',
        },
        {
          id: 6,
          slug: "weather-component",
          title: 'Weather Component',
          author: 'Sankalpa Acharya',
          likes: '1k',
          views: '5.3k',
          free: true,
          image: '/marketplace/weather.webp',
        }
      ];

      const filteredItems = marketplaceItems.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 space-y-2 min-h-screen">
    <div className='flex flex-col items-center px-4 sm:px-6 lg:px-8'>
        <div className="pt-12 pb-8 flex flex-col items-center text-center font-medium text-2xl sm:text-3xl md:text-4xl">
            <p>Explore creative and useful components,</p>
            <p>built by the <span className="italic">awesome</span> community</p>
        </div>
        <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="I'm looking for..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 bg-muted/50 text-primary placeholder:text-gray-80"
            />
        </div>
        <div className="w-full max-w-4xl py-12">
        <Card className="bg-muted/50 border-none overflow-scroll px-4 sm:px-6 md:px-6 lg:px-8 xl:px-12">
          <CardContent className="px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 space-y-2">
              <div className="text-2xl font-medium py-1">Chatcn Marketplace</div>
              <p className="max-w-md pb-1">
                Browse handpicked community creations and remix them your way.
              </p>
              <div className='flex flex-row gap-4'>
              <Button className='flex flex-row' onClick={scrollToMarketplace}>
                Start picking <ChevronRight/>
              </Button>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Button className="flex flex-row bg-primary/50">
                        Add component <ChevronRight />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>You’ll be able to add components soon!</p>
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-40 h-32 rounded-lg overflow-hidden bg-primary/10 backdrop-blur-sm flex items-center justify-center text-4xl">
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-16 h-12 rounded-lg bg-primary/10  backdrop-blur-sm" />
                <div className="w-28 h-24 rounded-lg bg-primary/10  backdrop-blur-sm flex items-center justify-center text-2xl">
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
    </div>
     <div id="marketplace" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {filteredItems.map((item) => (
    <Link key={item.id} href={`/marketplace/${item.slug}`} passHref>
       <Card
         key={item.id}
         className="bg-muted/50 border-muted/90 transition-all hover:shadow-lg cursor-pointer group overflow-hidden pt-0"
       >
         <div className="h-56 relative flex items-center justify-center text-6xl">
            <Image
                src={item.image}
                alt={item.title}
                fill
                style={{ objectFit: 'contain' }}
                className="absolute inset-0"
            />
            </div>
         <CardContent className="p-4 flex flex-row justify-between">
            <div className='flex flex-col'>
            <h4 className="font-semibold text-primary mb-1 transition-colors">
             {item.title}
           </h4>
           <div className="flex items-center text-sm text-muted-foreground hover:underline">
             <span>by {item.author}</span>
           </div>
           </div>
            {item.free && (
               <span className="ml-2 px-2 py-0.5 bg-muted-foreground/20 rounded text-xs flex items-center h-6">
                 Free
               </span>
             )}
         </CardContent>
         <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between gap-4 text-sm text-gray-400">
           <div className="flex items-center gap-1">
             <Heart className="w-4 h-4" />
             <span>{item.likes}</span>
           </div>
           <div className="flex items-center gap-1">
             <Users className="w-4 h-4" />
             <span>{item.views}</span>
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