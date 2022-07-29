let isProjects = null;
if(typeof window !== 'undefined') {
    if (localStorage.getItem("jpm_projects") === null) {
        isProjects = null;
    }
    else {
        isProjects = JSON.parse(localStorage.getItem("jpm_projects"));
    }
}

const initState = {
    projects: isProjects,
    project: null,
    isLoading: false,
    project_error: null
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
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            projects: projects,
            isLoading: false
        }
    }
    else if (action.type === 'get-project') {
        const { project, error } = action.payload;
        if(error) {
            return {
                ...state,
                project_error: error,
                isLoading: false
            }
        }
        return {
            ...state,
            project: project,
            isLoading: false
        }
    }
    else if (action.type === 'add-project') {
        const { projects, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            projects: projects,
            isLoading: false
        }
    }
    else if (action.type === 'edit-project') {
        const { projects, project, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            projects: projects,
            project: project,
            isLoading: false
        }
    }
    else if (action.type === 'delete-project') {
        const { projects, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            projects: projects,
            project: null,
            isLoading: false
        }
    }
    else if (action.type === 'add-task') {
        const { project, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            project: project,
            isLoading: false
        }
    }
    else if (action.type === 'edit-task') {
        const { project, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            project: project,
            isLoading: false
        }
    }
    else if (action.type === 'delete-task') {
        const { project, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            project: project,
            isLoading: false
        }
    }
    else if (action.type === 'logout') {
        const { projects, project, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            projects: projects,
            project: project,
            isLoading: false
        }
    }
    else {
        return state;
    }
}

export default projectReducer;