"use client";

import * as z from "zod";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FileAudio, Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Heading__second } from "@/components/Heading__second";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import Empty from "@/components/empty";

import { formSchema } from "./constants";
import { useProModal } from "@/hooks/use-pro-modal";

const VideoPage = () => { 
  const router = useRouter();
  const proModal = useProModal();

  const [video, setVideo] = useState<string>();
  const [isGenerating, setIsGenerating] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      setIsGenerating(true);

      const response = await axios.post('/api/video', values);

      console.log("Response:", response.data);
      if (response.data && response.data) {
        setVideo(response.data);
        console.log("Video generated:", response.data);
      } else {
        toast.error("Failed to generate video. Please try again.");
      }
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else if (error?.response?.status === 503) {
        toast.error("API is busy. Please try again in a few seconds.");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsGenerating(false);
      router.refresh();
    }
  }

  useEffect(() => {
    if (video && videoRef.current) {
      videoRef.current.load();
    }
  }, [video]);

  return ( 
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="pt-8 sm:pt-12 md:pt-16">
        <Heading__second
          title="AI Video Generation"
          description="Transform your ideas into captivating videos with our AI creator."
          icon={FileAudio}
          iconColor="text-orange-400"
          bgColor="bg-orange-500/10"
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
                border-orange-500
                w-full 
                p-6
                focus-within:shadow-lg
                focus-within:shadow-orange-500/50
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
                        className="bg-gray-700 border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500"
                        disabled={isLoading || isGenerating} 
                        placeholder="Describe your video idea..." 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button 
                className="w-full mt-4 bg-orange-600 hover:bg-orange-700 transition-colors duration-300" 
                type="submit" 
                disabled={isLoading || isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Video"}
                <Wand2 className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-8">
          {isGenerating && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-gray-800 border border-orange-500">
              <Loader />
            </div>
          )}
          {!video && !isGenerating && (
            <Empty />
          )}
          {video && (
            <div className="bg-gray-800 rounded-lg p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4">Your AI-Generated Video</h3>
              <video ref={videoRef} controls className="w-full aspect-video rounded-lg border bg-black">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
   );
}
 
export default VideoPage;