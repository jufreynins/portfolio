'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Project } from '@/data/projects';

interface ProjectModalContextValue {
  activeProject: Project | null;
  openProject: (project: Project) => void;
  closeProject: () => void;
}

const ProjectModalContext = createContext<ProjectModalContextValue | null>(null);

export function ProjectModalProvider({ children }: { children: ReactNode }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const value = useMemo<ProjectModalContextValue>(
    () => ({
      activeProject,
      openProject: (project) => setActiveProject(project),
      closeProject: () => setActiveProject(null),
    }),
    [activeProject]
  );

  return <ProjectModalContext.Provider value={value}>{children}</ProjectModalContext.Provider>;
}

export function useProjectModal() {
  const ctx = useContext(ProjectModalContext);
  if (!ctx) throw new Error('useProjectModal must be used within a ProjectModalProvider');
  return ctx;
}
