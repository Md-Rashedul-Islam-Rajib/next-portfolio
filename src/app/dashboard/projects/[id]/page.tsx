"use client";

import { useGetSingleProjectQuery } from "@/redux/features/projects/projectApi";
import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleProjectQuery(id);

  if (isLoading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 text-lg font-semibold">
        Error loading project
      </p>
    );

  const project = data?.data;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Project Image */}
      <Card className="overflow-hidden shadow-md">
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={project?.image}
            alt={project?.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>

        <CardContent className="p-6">
          {/* Project Title */}
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            {project?.title}
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-4">{project?.descriptions}</p>

          {/* Technology Stack */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Tech Stack:</h3>
            <div className="flex flex-wrap gap-2">
              {project?.technology?.map((tech :string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium bg-gray-200 dark:bg-gray-700 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <a
                href={project?.live_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
                <Icon icon="line-md:external-link" className="ml-2" />
              </a>
            </Button>

            <Button asChild variant="outline">
              <a
                href={project?.client}
                target="_blank"
                rel="noopener noreferrer"
              >
                Client Repo
                <Icon icon="akar-icons:github-fill" className="ml-2" />
              </a>
            </Button>

            {project?.server && (
              <Button asChild variant="outline">
                <a
                  href={project?.server}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Server Repo
                  <Icon icon="akar-icons:github-fill" className="ml-2" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetails;
