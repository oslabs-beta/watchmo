import React, { createContext, useContext } from "react";

const ProjectContext = React.createContext({});

export default ProjectContext;

export const useProjectContext = () => useContext(ProjectContext)
