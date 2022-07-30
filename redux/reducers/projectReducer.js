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
    projectLoading: false
}

const projectReducer = (state = initState, action) => {
    if (action.type === 'project-loading') {
        return {
            ...state,
            projectLoading: true
        }
    }
    else if (action.type === 'get-projects') {
        const { projects, error } = action.payload;
        if(error) {
            return {
                ...state,
                projectLoading: false
            }
        }
        return {
            ...state,
            projects: projects,
            projectLoading: false
        }
    }
    else if (action.type === 'get-project') {
        const { project, error } = action.payload;
        if(error) {
            return {
                ...state,
                projectLoading: false
            }
        }
        return {
            ...state,
            project: project,
            projectLoading: false
        }
    }
    else if (action.type === 'add-project') {
        const { projects, error } = action.payload;
        if(error) {
            return {
                ...state,
                projectLoading: false
            }
        }
        return {
            ...state,
            projects: projects,
            projectLoading: false
        }
    }
    else if (action.type === 'edit-project') {
        const { projects, project, error } = action.payload;
        if(error) {
            return {
                ...state,
                projectLoading: false
            }
        }
        return {
            ...state,
            projects: projects,
            project: project,
            projectLoading: false
        }
    }
    else if (action.type === 'delete-project') {
        const { projects, error } = action.payload;
        if(error) {
            return {
                ...state,
                projectLoading: false
            }
        }
        return {
            ...state,
            projects: projects,
            project: null,
            projectLoading: false
        }
    }
    else if (action.type === 'add-task') {
        const { project, error } = action.payload;
        if(error) {
            return {
                ...state,
                projectLoading: false
            }
        }
        return {
            ...state,
            project: project,
            projectLoading: false
        }
    }
    else if (action.type === 'edit-task') {
        const { project, error } = action.payload;
        if(error) {
            return {
                ...state,
                projectLoading: false
            }
        }
        return {
            ...state,
            project: project,
            projectLoading: false
        }
    }
    else if (action.type === 'delete-task') {
        const { project, error } = action.payload;
        if(error) {
            return {
                ...state,
                projectLoading: false
            }
        }
        return {
            ...state,
            project: project,
            projectLoading: false
        }
    }
    else if (action.type === 'logout') {
        const { projects, project, error } = action.payload;
        if(error) {
            return {
                ...state,
                projectLoading: false
            }
        }
        return {
            ...state,
            projects: projects,
            project: project,
            projectLoading: false
        }
    }
    else {
        return state;
    }
}

export default projectReducer;