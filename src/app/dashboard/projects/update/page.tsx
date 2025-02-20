'use client'

import { UpdateProjectCard } from '@/components/shared/projects/UpdateCard';
import { useGetAllProjectsQuery } from '@/redux/features/projects/projectApi';
import { TProject } from '@/types/project.types';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react'

const UpdateProject = () => {
    const { data,isLoading } = useGetAllProjectsQuery(undefined);
  const projects = data?.data;

   if (isLoading)
     return (
       <p className="text-center text-lg font-semibold mt-[30%]">Loading...</p>
     );
   if (projects?.length === 0) {
        return (
          
            <div className="flex justify-center gap-1 text-4xl font-semibold mt-[20%]">
              <Icon icon="mingcute:empty-box-line" width="45" height="45" />
              No Projects Found
            
          </div>
        );
      }

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
