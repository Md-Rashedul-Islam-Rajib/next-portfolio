"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
  
} from "@/redux/features/projects/projectApi";
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
import { technologies } from "@/constants/technologies";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/extension/multi-select";

// Project Schema Validation with Zod
const projectSchema = z.object({
  title: z.string().min(3, "Title is required"),
  descriptions: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  live_link: z.string().url("Invalid URL"),
  client: z.string().url("Invalid URL"),
  server: z.string().url("Invalid URL"),
  image: z.any().nullable(),
  technology: z.array(z.string()).nonempty("Select at least one technology"),
});

type TProject = z.infer<typeof projectSchema>;

const UpdateProjectForm = () => {
  const { id } = useParams();
  const router = useRouter();

  // Fetch the existing project data
  const { data, error, isLoading } = useGetSingleProjectQuery(id);
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  // Initialize the form
  const form = useForm<TProject>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      descriptions: "",
      live_link: "",
      client: "",
      server: "",
      image: null,
      technology: [],
    },
  });

  // Set the form default values once data is loaded
  useEffect(() => {
    if (data?.data) {
      form.reset({
        title: data.data.title || "",
        descriptions: data.data.descriptions || "",
        live_link: data.data.live_link || "",
        client: data.data.client || "",
        server: data.data.server || "",
        image: null,
        technology: data.data.technology || [],
      });
    }
  }, [data, form]);

  const onSubmit = async (formData: Partial<TProject>) => {
    try {
      let imageUrl = data?.data?.image; // Keep existing image if not updated
      if (formData.image && formData.image !== data?.data?.image) {
        imageUrl = await uploadImage(formData.image as File);
      }

        const updatedData = { ...formData, image: imageUrl };
        console.log(updatedData);

      await updateProject({ id, updatedData }).unwrap();
      router.push("/dashboard/projects/update");
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
      <h1 className="text-3xl text-center mb-6">Update Project</h1>
      <div className="flex justify-center h-screen w-[90%] mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descriptions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter project description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="live_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Link:</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Enter live site URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Repository:</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Enter client repo URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="server"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Repository:</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Enter server repo URL"
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
                  <FormLabel>Project Image:</FormLabel>
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

            {/* Technology Selection */}
            <FormField
              control={form.control}
              name="technology"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies:</FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="technology"
                      render={({ field }) => (
                        <MultiSelector
                          values={field.value}
                          onValuesChange={field.onChange}
                          loop={false}
                        >
                          <MultiSelectorTrigger>
                            <MultiSelectorInput placeholder="Select technologies" />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent>
                            <MultiSelectorList>
                              {technologies.map((tech, i) => (
                                <MultiSelectorItem key={i} value={tech}>
                                  {tech}
                                </MultiSelectorItem>
                              ))}
                            </MultiSelectorList>
                          </MultiSelectorContent>
                        </MultiSelector>
                      )}
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
              {isUpdating ? <span>Updating...</span> : "Update Project"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProjectForm;
