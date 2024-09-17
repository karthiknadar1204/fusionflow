"use client";

import axios from 'axios';
import * as z from "zod";
import {Heading__second} from '@/components/Heading__second'
import React from 'react'
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Empty from '@/components/empty';
import { Loader } from '@/components/loader';
import { UserAvatar } from '@/components/user-avatar';
import { BotAvatar } from '@/components/bot-avatar';
import { useProModal } from "@/hooks/use-pro-modal";
import { ChatMessage } from '@/lib/types';
import toast from 'react-hot-toast';

const ConversationPage = () => {

    const router = useRouter();
    const proModal = useProModal();
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: ""
        }
      });

      const isLoading = form.formState.isSubmitting;

      const onSubmit=async(values: z.infer<typeof formSchema>)=>{
        console.log(values);
        try {
          const userMessage = { role: "user", content: values.prompt };
          const newMessages = [...messages, userMessage];

          const response = await axios.post('/api/conversation', { messages: newMessages });
          setMessages((current) => [...current, userMessage, response.data]);
          
          form.reset();
            
        } catch (error:any) {
          console.log(error)
          if (error?.response?.status === 403) {
            proModal.onOpen();
          } else {
            toast.error("Something went wrong.");
          }
            
        } finally {
            router.refresh();
        }

      }


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="pt-8 sm:pt-12 md:pt-16">
            <Heading__second
                title="AI Conversation"
                description="Engage in intelligent dialogue with our advanced AI model."
                icon={MessageSquare}
                iconColor="text-blue-400"
                bgColor="bg-blue-500/10"
            />
        </div>
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
            <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="
                bg-gray-800
                rounded-xl 
                border-2
                border-blue-500
                w-full 
                p-6
                focus-within:shadow-lg
                focus-within:shadow-blue-500/50
                transition-all
                duration-300
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-gray-700 border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading} 
                        placeholder="Ask me anything..." 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button 
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition-colors duration-300" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? "Thinking..." : "Ask AI"}
              </Button>
            </form>
          </Form>
            </div>
            <div className="space-y-6 mt-8">
            {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-gray-800 border border-blue-500">
              <Loader />
            </div>
          )}
            {messages.length === 0 && !isLoading && (
            <Empty />
          )}
            <div className="flex flex-col gap-y-6">
            {messages.map((message) => (
              <div 
                key={message.content} 
                className={cn(
                  "p-6 rounded-lg shadow-md",
                  message.role === "user" ? "bg-blue-900 ml-auto" : "bg-gray-800",
                  "max-w-[80%] w-fit"
                )}
              >
                <div className="flex items-start gap-x-4">
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <p className="text-sm leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
            </div>
        </div>
    </div>
  )
}

export default ConversationPage