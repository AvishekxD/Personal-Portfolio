import React from 'react';

interface ProjectsSectionProps {
  className?: string;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ className = '' }) => {
    return (
    <section className={`min-h-screen py-16 px-4 ${className}`}>
        <div className='flex justify-center items-center text-2xl font-bold '>
            Projects
        </div>
    </section>
    );
};

export default ProjectsSection;