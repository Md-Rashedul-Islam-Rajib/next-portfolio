import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TProject } from "@/types/project.types";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface ProjectCardProps {
  project: TProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="w-full md:max-w-md bg-card text-card-foreground shadow-lg">
      {/* Project Image */}
      <div className="relative w-full h-48">
        <Image
          src={project.image}
          alt={project.title}
          layout="fill" // Ensures it covers the div
          objectFit="cover" // Prevents image stretching
          className="rounded-t-md"
          priority // Loads faster
        />
      </div>

      <CardHeader>
        <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{project.descriptions}</p>

        {/* Tech Stack */}
        <div className="mt-3 flex flex-wrap gap-2">
          {project.technology.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        {/* Live Demo */}
        <Button asChild variant="outline" size="sm">
          <a href={project.live_link} target="_blank" rel="noopener noreferrer">
            Live Demo{" "}
            <Icon
              icon="line-md:external-link"
              width="16"
              height="16"
              className="ml-1"
            />
          </a>
        </Button>

        {/* Client GitHub */}
        <Button asChild variant="outline" size="sm">
          <a href={project.client} target="_blank" rel="noopener noreferrer">
            Client{" "}
            <Icon
              icon="akar-icons:github-fill"
              width="16"
              height="16"
              className="ml-1"
            />
          </a>
        </Button>

        {/* Server GitHub (if available) */}
        {project.server && (
          <Button asChild variant="outline" size="sm">
            <a href={project.server} target="_blank" rel="noopener noreferrer">
              Server{" "}
              <Icon
                icon="akar-icons:github-fill"
                width="16"
                height="16"
                className="ml-1"
              />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
