"use client";

import axios from 'axios';
import * as z from "zod";
import { Heading__second } from '@/components/Heading__second'
import React from 'react'
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OpenAI from "openai";
import Empty from '@/components/empty';
import { Loader } from '@/components/loader';
import { UserAvatar } from '@/components/user-avatar';
import { BotAvatar } from '@/components/bot-avatar';
import ReactMarkdown from "react-markdown";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";

type Message = OpenAI.Chat.ChatCompletionMessage;

const CodePage = () => {
    const router = useRouter();
    const proModal = useProModal();
    const [messages, setMessages] = useState<Message[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            const userMessage: Message = { role: "user", content: values.prompt };
            const newMessages = [...messages, userMessage];

            const response = await axios.post('/api/code', { messages: newMessages });
            setMessages((current) => [...current, userMessage, response.data]);
          
            form.reset();
        } catch (error:any) {
            console.log(error);
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
                    title="AI Code Generation"
                    description="Transform your ideas into code with our AI assistant."
                    icon={Code}
                    iconColor="text-green-400"
                    bgColor="bg-green-500/10"
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
                                border-green-500
                                w-full 
                                p-6
                                focus-within:shadow-lg
                                focus-within:shadow-green-500/50
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
                                                className="bg-gray-700 border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500"
                                                disabled={isLoading} 
                                                placeholder="Describe your code idea..." 
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button 
                                className="w-full mt-4 bg-green-600 hover:bg-green-700 transition-colors duration-300" 
                                type="submit" 
                                disabled={isLoading}
                            >
                                {isLoading ? "Generating..." : "Generate Code"}
                                <Code className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                    </Form>
                    <div className="space-y-4 mt-8">
                        {isLoading && (
                            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-gray-800">
                                <Loader />
                            </div>
                        )}
                        {messages.length === 0 && !isLoading && (
                            <Empty />
                        )}
                        <div className="flex flex-col-reverse gap-y-4">
                            {messages.map((message) => (
                                <div 
                                    key={typeof message.content === 'string' ? message.content : 'non-string-content'}
                                    className={cn(
                                        "p-6 w-full flex items-start gap-x-4 rounded-lg",
                                        message.role === "user" ? "bg-gray-700" : "bg-gray-800",
                                    )}
                                >
                                    {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                    <ReactMarkdown 
                                        components={{
                                            pre: ({ node, ...props }) => (
                                                <div className="overflow-auto w-full my-2 bg-gray-900 p-2 rounded-lg">
                                                    <pre {...props} />
                                                </div>
                                            ),
                                            code: ({ node, ...props }) => (
                                                <code className="bg-gray-900 rounded-lg p-1" {...props} />
                                            )
                                        }} 
                                        className="text-sm overflow-hidden leading-7 text-gray-300"
                                    >
                                        {typeof message.content === 'string' ? message.content : ''}
                                    </ReactMarkdown>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodePage