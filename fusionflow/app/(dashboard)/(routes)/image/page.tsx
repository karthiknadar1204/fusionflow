"use client";

import axios from 'axios';
import * as z from "zod";
import { Heading } from '@/components/Heading'
import React from 'react'
import Image from "next/image";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Empty from '@/components/empty';
import { Loader } from '@/components/loader';
import { UserAvatar } from '@/components/user-avatar';
import { BotAvatar } from '@/components/bot-avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { amountOptions, resolutionOptions } from "./constants";
import { useProModal } from "@/hooks/use-pro-modal";

const ImagePage = () => {
    const router = useRouter();
    const proModal = useProModal();
    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            setImages([]);
            const response = await axios.post('/api/image', values);
            const data = response.data.data;
            if (Array.isArray(data)) {
                const urls = data.map((image: { url: string }) => image.url);
                setImages(urls);
            } else {
                console.error('Unexpected response structure:', data);
            }
            form.reset();
        } catch (error: any) {
            console.error(error);
            if (error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("Something went wrong.");
            }
        } finally {
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <div className="pt-8 sm:pt-12 md:pt-16">
                <Heading
                    title="AI Image Generation"
                    description="Transform your ideas into stunning visuals with our AI artist."
                    icon={ImageIcon}
                    iconColor="text-pink-400"
                    bgColor="bg-pink-500/10"
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
                                border-pink-500
                                w-full 
                                p-6
                                focus-within:shadow-lg
                                focus-within:shadow-pink-500/50
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
                                                className="bg-gray-700 border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500"
                                                disabled={isLoading} 
                                                placeholder="Describe your image idea..." 
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select 
                                                disabled={isLoading} 
                                                onValueChange={field.onChange} 
                                                value={field.value} 
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-gray-700 border-0 text-white">
                                                        <SelectValue defaultValue={field.value} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {amountOptions.map((option) => (
                                                        <SelectItem 
                                                            key={option.value} 
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="resolution"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select 
                                                disabled={isLoading} 
                                                onValueChange={field.onChange} 
                                                value={field.value} 
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-gray-700 border-0 text-white">
                                                        <SelectValue defaultValue={field.value} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {resolutionOptions.map((option) => (
                                                        <SelectItem 
                                                            key={option.value} 
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button 
                                className="w-full mt-4 bg-pink-600 hover:bg-pink-700 transition-colors duration-300" 
                                type="submit" 
                                disabled={isLoading}
                            >
                                {isLoading ? "Generating..." : "Generate Image"}
                                <ImageIcon className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-8">
                    {isLoading && (
                        <div className="flex justify-center items-center">
                            <Loader />
                        </div>
                    )}
                    {images.length === 0 && !isLoading && (
                        <Empty label="No images generated yet." />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {images.map((src) => (
                            <Card key={src} className="bg-gray-800 border border-pink-500 rounded-lg overflow-hidden">
                                <div className="relative aspect-square">
                                    <Image
                                        fill
                                        alt="Generated"
                                        src={src}
                                    />
                                </div>
                                <CardFooter className="p-2">
                                    <Button onClick={() => window.open(src)} variant="secondary" className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                                        <Download className="h-4 w-4 mr-2" />
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImagePage
