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
    taskLoading: false
}

const taskReducer = (state = initState, action) => {
    if (action.type === 'task-loading') {
        return {
            ...state,
            taskLoading: true
        }
    }
    else if (action.type === 'get-tasks') {
        const { tasks, error } = action.payload;
        if(error) {
            return {
                ...state,
                taskLoading: false
            }
        }
        return {
            ...state,
            tasks: tasks,
            taskLoading: false
        }
    }
    else if (action.type === 'get-task') {
        const { task, error } = action.payload;
        if(error) {
            return {
                ...state,
                taskLoading: false
            }
        }
        return {
            ...state,
            task: task,
            taskLoading: false
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
                taskLoading: false
            }
        }
        return {
            ...state,
            tasks: tasks,
            taskLoading: false
        }
    }
    else if (action.type === 'edit-task') {
        const { tasks, error } = action.payload;
        if(error) {
            return {
                ...state,
                taskLoading: false
            }
        }
        return {
            ...state,
            tasks: tasks,
            taskLoading: false
        }
    }
    else if (action.type === 'delete-task') {
        const { tasks, error } = action.payload;
        if(error) {
            return {
                ...state,
                taskLoading: false
            }
        }
        return {
            ...state,
            tasks: tasks,
            taskLoading: false
        }
    }
    else if (action.type === 'logout') {
        const { tasks, task, error } = action.payload;
        if(error) {
            return {
                ...state,
                taskLoading: false
            }
        }
        return {
            ...state,
            tasks: tasks,
            task: task,
            taskLoading: false
        }
    }
    else {
        return state;
    }
}

export default taskReducer;