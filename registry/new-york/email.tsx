"use client"
import { Badge } from '@/components/ui/badge';
import { Check, CircleX, Divide, Mail, Ticket } from 'lucide-react';
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
interface EmailProps {
    icon ?: React.ReactNode;
    status ?: string;
    statusText?: string;
    title: string;
    to:string;
    subject: string;
    sentAt: string | Date;
    body: string;
    sender ?: string;
};
const STATUS_MAP = {
    complete: {
      color: "#43A047",
      icon: <Check strokeWidth="1px" size={18} className="text-[#43A047]" />,
      defaultText: "Completed",
    },
    incomplete: {
      color: "#e53935",
      icon: <CircleX strokeWidth="1px" size={20} className="text-[#e53935]" />,
      defaultText: "Incomplete",
    },
  } as const;

const Email: React.FC<EmailProps> = ({
  icon,
  status,
  statusText,
  title,
  to,
  subject,
  sentAt,
  body,
  sender,
}) =>{
    const statusKey = status?.toLowerCase() as keyof typeof STATUS_MAP;
  const { color, icon: statusIcon, defaultText } =
    STATUS_MAP[statusKey] ?? STATUS_MAP.incomplete;
    return (
        <Accordion
      type="single"
      collapsible
      className='w-full max-w-2xl'
      defaultValue="item-1"
    >
        <AccordionItem value="item-1">
        
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6 w-full max-w-2xl">
        <AccordionTrigger className="hover:no-underline">
        <div className="flex w-full items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
            {statusIcon}
          {icon}
          <span className="font-semibold">Email Sent : <span className='text-muted-foreground'>{title}</span></span>
        </div>
        <Badge
                style={{ backgroundColor: `${color}20`, color }}
              >
                {statusText ?? defaultText}
              </Badge>
      </div>
      </AccordionTrigger>
      
      <AccordionContent>
      <div className="text-md space-y-4 border-t pt-2">
        <div>
          <span className="font-semibold text-muted-foreground">To: </span><span className='font-semibold'>{to}</span>
        </div>
        <hr/>
        <div>
          <span className="font-semibold text-muted-foreground">Subject: </span>{subject}
        </div>
        <hr/>
        <div>
          <span className="font-semibold text-muted-foreground">Sent: </span>{sentAt as any}
        </div>
        <hr/>
      </div>

      <div className="mt-4 text-md whitespace-pre-line">
        {body}
        {sender && <p className="mt-4 font-medium">{sender}</p>}
      </div>
      </AccordionContent>
        </div>
    
        </AccordionItem>
        </Accordion>
      )
}

export default Email