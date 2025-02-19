/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
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
import { useCreateProjectMutation } from "@/redux/features/projects/projectApi";
import Select from "react-select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
// import MultiSelect from "@/components/shared/projects/MultiSelect";
import { technologies } from "@/constants/technologies";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "@/components/ui/extension/multi-select";

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

const CreateProject = () => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
    const router = useRouter();

    const technologyOptions = technologies.map((tech) => ({
        value: tech, label: tech
    })) as { value: string; label: string }[]

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

  const onSubmit = async (data: TProject) => {
    try {
      let imageUrl = null;
      if (data.image) {
        console.log("Uploading image...");
        try {
          imageUrl = await uploadImage(data.image as File);
          console.log("Uploaded image URL:", imageUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
          return;
        }
      }

      const projectInfo = { ...data, image: imageUrl };

      await createProject(projectInfo).unwrap();
      form.reset();
      router.push("/projects");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 md:p-0">
      <h1 className="text-3xl text-center mb-6">Create Project</h1>
      <div className="flex justify-center h-screen w-[90%] mx-auto ">
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
                              {technologyOptions.map((option, i) => (
                                <MultiSelectorItem key={i} value={option.value}>
                                  {option.label}
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
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span>Creating...</span>
                  {/* <Gear /> */}
                </div>
              ) : (
                "Create Project"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProject;
