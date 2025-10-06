
import ComponentPreview from '@/components/component-preview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Github, Heart, Users } from 'lucide-react'
import React from 'react'

const Prompt = () => {
 
  return (
    <div className="p-12">
      <Card className="bg-muted/50 border-muted/90 mb-8">
        <CardHeader>
            <div className="flex flex-row justify-between items-center">
            <CardTitle className="text-3xl font-bold text-primary">
                Prompt Input Component
            </CardTitle>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-1 text-sm text-gray-400">
                <Heart className="w-4 h-4" />
                <span>2.3k</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>11.7k</span>
                </div>
                <span className="px-2 py-0.5 bg-muted-foreground/20 rounded text-xs">
                Free
                </span>
            </div>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-start gap-4 text-muted-foreground">
            <span className="text-md">By Sankalpa Acharya</span>
            <a href="https://github.com/sankalpaacharya">
                <Github className="h-4 w-4" />
            </a>
            </div>
            <p className="text-muted-foreground/90 text-md">
            The Prompt Input component is designed for conversational or AI-driven interfaces. 
            It provides a clean, responsive text input area where users can type prompts, 
            with support for multi-line expansion, keyboard submission, and loading states. 
            Ideal for chatbots, AI assistants, or any context where natural text input and feedback 
            are essential to the user experience.
            </p>
        </CardContent>
       </Card>
      <ComponentPreview component='prompt-input' isProse={true} />
    </div>
  )
}

export default Prompt