import React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TemplatesPage() {
  const templates = [
    {
      id: "v0-chat",
      title: "V0-Style Chat Interface",
      description:
        "Clean, minimalist chat interface inspired by V0's design language.",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    // Add more templates here as you build them
  ];

  return (
    <div className="container max-w-6xl py-10">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Chat UI Templates</h1>
        <p className="text-muted-foreground">
          Ready-to-use AI chat interface templates built with shadcn components.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                {template.icon}
              </div>
              <CardTitle>{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-muted h-48 flex items-center justify-center">
                {/* We can add screenshots of the templates here */}
                <span className="text-muted-foreground">Preview Image</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-card">
              <Link href={`/templates/${template.id}`} className="w-full">
                <Button className="w-full flex items-center justify-between">
                  <span>View Template</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
