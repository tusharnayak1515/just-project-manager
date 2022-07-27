import { combineReducers } from "redux";
import userReducer from "./userReducer";
import projectReducer from "./projectReducer";
import taskReducer from "./taskReducer";
import { HYDRATE } from "next-redux-wrapper";

const reducers = combineReducers({
    userReducer: userReducer,
    projectReducer: projectReducer,
    taskReducer: taskReducer
});

const masterReducer = (state,action)=> {
    if(action.type === HYDRATE) {
        // console.log("yes",action.payload.projectReducer.projects);
        // console.log("yes",action.payload);
        // console.log("yes",action.payload.projectReducer);
        // console.log("state",state);
        // console.log("no",state.projectReducer.projects);
        const nextState = {
            ...state,
            userReducer: {
                user: state.userReducer.user ? state.userReducer.user : action.payload.userReducer.user,
                profile : action.payload.userReducer.profile ? action.payload.userReducer.profile : state.userReducer.profile,
                error: action.payload.userReducer.error ? action.payload.userReducer.error : state.userReducer.error,
                isLoading: action.payload.userReducer.isLoading
            },
            projectReducer: {
                projects: [...new Set(action.payload.projectReducer.projects, state.projectReducer.projects)],
                // projects: [...action.payload.projectReducer.projects],
                project: action.payload.projectReducer.project ? action.payload.projectReducer.project : state.projectReducer.project,
                error: action.payload.projectReducer.error ? action.payload.projectReducer.error : state.projectReducer.error,
                isLoading: action.payload.projectReducer.isLoading
            },
            taskReducer: {
                tasks: [...new Set(action.payload.taskReducer.tasks, state.taskReducer.tasks)],
                task: action.payload.taskReducer.task ? action.payload.taskReducer.task : state.taskReducer.task,
                error: action.payload.taskReducer.error ? action.payload.taskReducer.error : state.taskReducer.error,
                isLoading: action.payload.taskReducer.isLoading
            }
        };
        // console.log(nextState);
        return nextState;
    }
    else {
        // console.log("yes",action.payload);
        // console.log("state",state);
        return reducers(state,action);
    }
}

export default masterReducer;