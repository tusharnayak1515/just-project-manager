import { getCookie } from 'cookies-next';
let isProjects;
let isError;
if (getCookie("jpm_projects") === undefined) {
    isProjects = null;
}
else {
    // console.log(JSON.parse(getCookie("jpm_projects")));
    isProjects = JSON.parse(getCookie("jpm_projects"));
}

if (getCookie("jpm_error") === undefined) {
    isError = null;
}
else {
    isError = getCookie("jpm_error");
}

const initState = {
    projects: isProjects,
    project: null,
    error: isError,
    isLoading: false
}

const projectReducer = (state = initState, action) => {
    if (action.type === 'project-loading') {
        return {
            ...state,
            isLoading: true
        }
    }
    else if (action.type === 'get-projects') {
        const { projects, error } = action.payload;
        if (error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                projects: projects,
                isLoading: false,
                error: null
            }
        }
    }
    else if (action.type === 'get-project') {
        const { project, error } = action.payload;
        if (error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                project: project,
                isLoading: false,
                error: null
            }
        }
    }
    else if (action.type === 'add-project') {
        const { projects, error } = action.payload;
        if (error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                projects: projects,
                isLoading: false,
                error: null
            }
        }
    }
    else if (action.type === 'edit-project') {
        const { projects, error } = action.payload;
        if (error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                projects: projects,
                isLoading: false,
                error: null
            }
        }
    }
    else if (action.type === 'delete-project') {
        const { projects, error } = action.payload;
        if (error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                projects: projects,
                isLoading: false,
                error: null
            }
        }
    }
    else if (action.type === 'add-task') {
        const { project, error } = action.payload;
        if (error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                project: project,
                isLoading: false,
                error: null
            }
        }
    }
    else if (action.type === 'edit-task') {
        const { project, error } = action.payload;
        if (error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                project: project,
                isLoading: false,
                error: null
            }
        }
    }
    else if (action.type === 'delete-task') {
        const { project, error } = action.payload;
        if (error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                project: project,
                isLoading: false,
                error: null
            }
        }
    }
    else if (action.type === 'logout') {
        const { projects, project, error } = action.payload;
        if (error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                projects: projects,
                project: project,
                isLoading: false,
                error: error
            }
        }
    }
    else {
        return state;
    }
}

export default projectReducer;