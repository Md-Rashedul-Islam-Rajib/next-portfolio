
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/utilities/imageUploader";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useCreateMessageMutation } from "@/redux/features/messages/messageApi";
import { toast } from "sonner";



// Project Schema Validation with Zod
const messageSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().min(3, "Email is required"),
  message: z.string().min(10, "Message must be at least 10 words"),
});

type TMessage = z.infer<typeof messageSchema>;

const CreateMessage = () => {
  const [createMessage, { isLoading }] = useCreateMessageMutation();
  const router = useRouter();

  const form = useForm<TMessage>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    },
  });

  const onSubmit = async (data: TMessage) => {
   

      await createMessage(data).unwrap();
    form.reset();
    toast.success("Message sent successfully");
      router.push("/");
    
  };

  return (
    <div className="p-4 md:p-0 md:mt-10">
      <h1 className="text-3xl text-center mb-6">Leave a Message</h1>
      <div className="flex justify-center h-screen w-[90%] mx-auto ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="mt-4 flex items-center gap-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span>Sending...</span>
                  {/* <Gear /> */}
                </div>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateMessage;
