"use client";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

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

import { useGetSingleBlogQuery, useUpdateBlogMutation } from "@/redux/features/blogs/blogApi";

// Project Schema Validation with Zod
const blogSchema = z.object({
  title: z.string().min(3, "Title is required"),
  category: z.string().min(3, "Category is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  image: z.any().nullable(),

});

type TBlog = z.infer<typeof blogSchema>;

const UpdateBlogForm = () => {
  const { id } = useParams();
  const router = useRouter();

  // Fetch the existing project data
  const { data, error, isLoading } = useGetSingleBlogQuery(id);
  const [updateProject, { isLoading: isUpdating }] = useUpdateBlogMutation();

  // Initialize the form
  const form = useForm<TBlog>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      image: null,
    },
  });

  // Set the form default values once data is loaded
  useEffect(() => {
    if (data?.data) {
      form.reset({
        title: data.data.title || "",
        content: data.data.content || "",
        category: data.data.category || "",
        image: null,
      });
    }
  }, [data, form]);

  const onSubmit = async (formData: Partial<TBlog>) => {
    try {
      let imageUrl = data?.data?.image; // Keep existing image if not updated
      if (formData.image && formData.image !== data?.data?.image) {
        imageUrl = await uploadImage(formData.image as File);
      }

      const updatedData = { ...formData, image: imageUrl };
      console.log(updatedData);

      await updateProject({ id, updatedData }).unwrap();
      router.push("/dashboard/blogs/update");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (isLoading)
    return (
      <p className="text-center text-lg font-semibold mt-[30%]">Loading...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 text-lg font-semibold">
        Error loading project
      </p>
    );

  return (
    <div className="p-4 md:p-0">
      <h1 className="text-3xl text-center mb-6">Update Blog</h1>
      <div className="flex justify-center h-screen w-[90%] mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Title:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter blog content"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category:</FormLabel>
                  <FormControl>
                    <Input
                      
                      placeholder="Enter blog category"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Image:</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <Button
              className="mt-4 flex items-center gap-2"
              type="submit"
              disabled={isUpdating}
            >
              {isUpdating ? <span>Updating...</span> : "Update Blog"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateBlogForm;
