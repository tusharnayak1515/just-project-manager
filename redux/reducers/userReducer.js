import { getCookie } from 'cookies-next';
let isUser;
let isProfile;
let isError;
// console.log(getCookie("user_token"));
// console.log(getCookie("jpm_profile"));
if (getCookie("user_token") === undefined) {
    isUser = null;
}
else {
    isUser = getCookie("user_token");
}

if (getCookie("jpm_profile") === undefined) {
    isProfile = null;
}
else {
    isProfile = JSON.parse(getCookie("jpm_profile"));
}

if (getCookie("jpm_error") === undefined) {
    isError = null;
}
else {
    isError = getCookie("jpm_error");
}

const initState = {
    user: isUser,
    profile: isProfile,
    error: isError,
    isLoading: false
}

const userReducer = (state = initState, action) => {
    if (action.type === 'user-loading') {
        return {
            ...state,
            isLoading: true
        }
    }
    else if (action.type === 'register') {
        const { user, error } = action.payload;
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
                user: user,
                isLoading: false,
                error: null
            }
        }
    }
    else if (action.type === 'login') {
        const { user, error } = action.payload;
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
                user: user,
                isLoading: false,
                error: null
            }
        }
    }
    else if (action.type === 'profile') {
        const { profile, error } = action.payload;
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
                profile: profile,
                isLoading: false,
                error: null
            }
        }
    }
    // else if (action.type === 'set-profile') {
    //     const { profile, error } = action.payload;
    //     if (error) {
    //         return {
    //             ...state,
    //             error: error,
    //             isLoading: false
    //         }
    //     }
    //     else {
    //         return {
    //             ...state,
    //             profile: profile,
    //             isLoading: false,
    //             error: null
    //         }
    //     }
    // }
    else if (action.type === 'edit-profile') {
        const { profile, error } = action.payload;
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
                profile: profile,
                isLoading: false,
                error: null
            }
        }
    }
    else if (action.type === 'logout') {
        const { user, profile, error } = action.payload;
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
                user: user,
                profile: profile,
                isLoading: false,
                error: error
            }
        }
    }
    else {
        // console.log(state);
        return state;
    }
}

export default userReducer;