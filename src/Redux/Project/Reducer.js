import { CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS } from "./ActionType";

const initialState = {
    projects: [],
    loading: false,
    error: null,
    projectDetails: null,
    searchProjects: [],
  };

export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PROJECTS_REQUEST:
      case CREATE_PROJECT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case FETCH_PROJECTS_SUCCESS:
        return {
          ...state,
          loading: false,
          projects: action.projects,
          error: null,
        };
  
      case CREATE_PROJECT_SUCCESS:
        return {
          ...state,
          loading: false,
          projects: [...state.projects, action.project],
          error: null,
        };
        
      default:
        return state;
    }
  };