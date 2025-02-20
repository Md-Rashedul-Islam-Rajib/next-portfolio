"use client";

import BlogCard from "@/components/blog/BlogCard";
import { useGetAllBlogsQuery } from "@/redux/features/blogs/blogApi";
import { TBlog } from "@/types/blog.types";
import { Icon } from "@iconify/react/dist/iconify.js";

// import { Loader } from "@/components/ui/loader"; // Custom loader component

export default function BlogsPage() {
  const { data,isLoading } = useGetAllBlogsQuery(undefined);
  const blogs = data?.data;

   if (isLoading)
     return (
       <p className="text-center text-lg font-semibold mt-[30%]">Loading...</p>
     );
if (blogs?.length === 0) {
    return (
      
        <div className="flex justify-center gap-1 text-4xl font-semibold mt-[20%]">
          <Icon icon="mingcute:empty-box-line" width="45" height="45" />
          No Blogs Found
        
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">My Blogs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs?.map((blog: TBlog) => (
          <BlogCard key={blog._id} blog={blog} action="update" />
        ))}
      </div>
    </div>
  );
}
