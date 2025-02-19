'use client'

import { UpdateProjectCard } from '@/components/shared/projects/UpdateCard';
import { useGetAllProjectsQuery } from '@/redux/features/projects/projectApi';
import { TProject } from '@/types/project.types';
import React from 'react'

const UpdateProject = () => {
    const { data } = useGetAllProjectsQuery(undefined);
      const projects = data?.data;
  return (
    <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center mb-6">Select a project</h1>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects?.map((project : TProject) => (
              <UpdateProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
  )
}

export default UpdateProject
