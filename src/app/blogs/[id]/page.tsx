"use client";

import { useGetSingleBlogQuery } from "@/redux/features/blogs/blogApi";
import { useParams } from "next/navigation";
import Image from "next/image";
import React from "react";
import { TBlog } from "@/types/blog.types";

const BlogDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleBlogQuery(id);

  if (isLoading)
    return <p className="text-center text-lg font-semibold mt-[30%]">Loading...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 text-lg font-semibold">
        Error loading blog
      </p>
    );

  const blog: TBlog = data?.data;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Blog Title */}
      <h1 className="text-3xl font-bold text-center mb-4">{blog.title}</h1>

      {/* Blog Category */}
      <p className="text-center text-sm text-gray-500 mb-2">
        Category: <span className="font-medium">{blog.category}</span>
      </p>

      {/* Blog Image */}
      <div className="relative w-full h-80 mb-6">
        <Image
          src={blog.image}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          priority
        />
      </div>

      {/* Blog Content */}
      <div className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
        {blog.content}
      </div>
    </div>
  );
};

export default BlogDetails;
