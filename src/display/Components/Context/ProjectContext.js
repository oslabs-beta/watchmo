import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

export function ProjectProvider(props) {
  const [project, setProject] = useState({});

  // custom update function
  const updateProject = newProj => {
    setProject(newProj);
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        updateProject
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
}
