'use client'
import { ProjectCard } from "@/components/shared/projects/ProjectCard";
import { useGetAllProjectsQuery } from "@/redux/features/projects/projectApi";
import { TProject } from "@/types/project.types";
// import { Loader } from "@/components/ui/loader"; // Custom loader component

export default function ProjectsPage() {
  const { data } = useGetAllProjectsQuery(undefined);
  const projects = data?.data;

  console.log(projects);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">My Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects?.map((project : TProject) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}
