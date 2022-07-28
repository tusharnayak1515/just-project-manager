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
        const { projects } = action.payload;
        return {
            ...state,
            projects: projects,
            isLoading: false
        }
    }
    else if (action.type === 'get-project') {
        const { project } = action.payload;
        return {
            ...state,
            project: project,
            isLoading: false
        }
    }
    else if (action.type === 'add-project') {
        const { projects } = action.payload;
        return {
            ...state,
            projects: projects,
            isLoading: false
        }
    }
    else if (action.type === 'edit-project') {
        const { projects } = action.payload;
        return {
            ...state,
            projects: projects,
            isLoading: false
        }
    }
    else if (action.type === 'delete-project') {
        const { projects } = action.payload;
        return {
            ...state,
            projects: projects,
            isLoading: false
        }
    }
    else if (action.type === 'add-task') {
        const { project } = action.payload;
        return {
            ...state,
            project: project,
            isLoading: false
        }
    }
    else if (action.type === 'edit-task') {
        const { project } = action.payload;
        return {
            ...state,
            project: project,
            isLoading: false
        }
    }
    else if (action.type === 'delete-task') {
        const { project } = action.payload;
        return {
            ...state,
            project: project,
            isLoading: false
        }
    }
    else if (action.type === 'logout') {
        const { projects, project } = action.payload;
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