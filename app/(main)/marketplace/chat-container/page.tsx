
import ComponentPreview from '@/components/component-preview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Github, Heart, Users } from 'lucide-react'
import React from 'react'

const LoginSignup = () => {
 
  return (
    <div className="p-12">
            <Card className="bg-muted/50 border-muted/90 mb-8">
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <CardTitle className="text-3xl font-bold text-primary">
              Chat Container Component
            </CardTitle>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Heart className="w-4 h-4" />
                <span>2.3k</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>12.7k</span>
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
            The Chat Container component provides a responsive and elegant messaging interface built for modern web apps. 
            Ideal for real-time chat systems, customer support dashboards, or AI assistant interfaces, 
            it adapts easily to both dark and light themes while maintaining accessibility and clarity.
          </p>
        </CardContent>
      </Card>
      <ComponentPreview component='chat-container' isProse={true} />
    </div>
  )
}

export default LoginSignup