import { getCookie } from 'cookies-next';
let isTasks = null;
let isError;
if(typeof window !== 'undefined') {
    if (localStorage.getItem("jpm_tasks") === null) {
        isTasks = null;
    }
    else {
        isTasks = JSON.parse(localStorage.getItem("jpm_tasks"));
    }
}

if (getCookie("jpm_error") === undefined) {
    isError = null;
}
else {
    isError = getCookie("jpm_error");
}

const initState = {
    tasks: isTasks,
    task: null,
    error: isError,
    isLoading: false
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
                tasks: tasks,
                isLoading: false,
                error: null
            }
        }
    }
    else if (action.type === 'get-task') {
        const { task, error } = action.payload;
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
                task: task,
                isLoading: false,
                error: null
            }
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
                tasks: tasks,
                isLoading: false,
                error: null
            }
        }
    }
    else if (action.type === 'edit-task') {
        const { tasks, error } = action.payload;
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
                tasks: tasks,
                isLoading: false,
                error: null
            }
        }
    }
    else if (action.type === 'delete-task') {
        const { tasks, error } = action.payload;
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
                tasks: tasks,
                isLoading: false,
                error: null
            }
        }
    }
    else if (action.type === 'logout') {
        const { tasks, task, error } = action.payload;
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
                tasks: tasks,
                task: task,
                isLoading: false,
                error: error
            }
        }
    }
    else {
        return state;
    }
}

export default taskReducer;