import api from "../Config/api";
import { CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS } from "./ActionType";

export const fetchProjects = () => async (dispatch) => {
  dispatch({ type: FETCH_PROJECTS_REQUEST });
  try {
      const { data } = await api.get("/api/projects"); // Fetch all projects without parameters
      console.log("all projects", data);
      dispatch({ type: FETCH_PROJECTS_SUCCESS, projects: data });
  } catch (error) {
      console.log("error", error);
      // Handle error appropriately, e.g., dispatch an error action
  }
};

  export const createProject = (projectData) => async (dispatch) => {
    dispatch({ type: CREATE_PROJECT_REQUEST });
    try {
      const { data } = await api.post("/api/projects", projectData);
      console.log("create projects", data);
      dispatch({ type: CREATE_PROJECT_SUCCESS, project: data });
      
    } catch (error) {
      console.log("error", error);
    }
  };