let isTasks = null;

if(typeof window !== 'undefined') {
    if (localStorage.getItem("jpm_tasks") === null) {
        isTasks = null;
    }
    else {
        isTasks = JSON.parse(localStorage.getItem("jpm_tasks"));
    }
}

const initState = {
    tasks: isTasks,
    task: null,
    isLoading: false,
    task_error: null
}

const taskReducer = (state = initState, action) => {
    if (action.type === 'task-loading') {
        return {
            ...state,
            isLoading: true
        }
    }
    else if (action.type === 'get-tasks') {
        const { tasks, error } = action.payload;
        if(error) {
            return {
                ...state,
                task_error: error,
                isLoading: false
            }
        }
        return {
            ...state,
            tasks: tasks,
            isLoading: false
        }
    }
    else if (action.type === 'get-task') {
        const { task, error } = action.payload;
        if(error) {
            return {
                ...state,
                task_error: error,
                isLoading: false
            }
        }
        return {
            ...state,
            task: task,
            isLoading: false
        }
    }
    else if (action.type === 'reset-task') {
        return {
            ...state,
            task: null
        }
    }
    else if (action.type === 'add-task') {
        const { tasks, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            tasks: tasks,
            isLoading: false
        }
    }
    else if (action.type === 'edit-task') {
        const { tasks, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            tasks: tasks,
            isLoading: false
        }
    }
    else if (action.type === 'delete-task') {
        const { tasks, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            tasks: tasks,
            isLoading: false
        }
    }
    else if (action.type === 'logout') {
        const { tasks, task, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            tasks: tasks,
            task: task,
            isLoading: false
        }
    }
    else {
        return state;
    }
}

export default taskReducer;