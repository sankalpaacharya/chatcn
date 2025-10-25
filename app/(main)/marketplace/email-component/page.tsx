
import ComponentPreview from '@/components/component-preview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Github, Heart, Users } from 'lucide-react'
import React from 'react'

const EmailComponent = () => {
 
  return (
    <div className="p-12">
      <Card className="bg-background border-muted/90 mb-8">
        <CardHeader>
            <div className="flex flex-row justify-between items-center">
            <CardTitle className="text-3xl font-bold text-primary">
                Email Component
            </CardTitle>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-1 text-sm text-gray-400">
                <Heart className="w-4 h-4" />
                <span>1.9k</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>10.2k</span>
                </div>
                <span className="px-2 py-0.5 bg-muted-foreground/20 rounded text-xs">
                Free
                </span>
            </div>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-start gap-4 text-muted-foreground">
            <span className="text-md">By Nishit Barbhaya</span>
            <a href="https://github.com/Nishit369">
                <Github className="h-4 w-4" />
            </a>
            </div>
            <p className="text-muted-foreground/90 text-md">
            This Email component includes structured sections for recipient, subject, and timestamp, along with the message body - 
  all styled for readability and realism. Perfect for showcasing email UIs, inbox mockups, or 
  message confirmation states in your application.
            </p>
        </CardContent>
       </Card>
      <ComponentPreview component='email' isProse={true} />
    </div>
  )
}

export default EmailComponent