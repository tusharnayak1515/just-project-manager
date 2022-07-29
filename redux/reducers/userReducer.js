import { getCookie } from 'cookies-next';
let isUser;
let isProfile;
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

const initState = {
    user: isUser,
    profile: isProfile,
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
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            user: user,
            isLoading: false
        }
    }
    else if (action.type === 'login') {
        const { user, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            user: user,
            isLoading: false
        }
    }
    else if (action.type === 'profile') {
        const { profile, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            profile: profile,
            isLoading: false
        }
    }
    // else if (action.type === 'set-profile') {
    //     const { profile, error } = action.payload;
    //     if(error) {
    //         return {
    //             ...state,
    //             isLoading: false
    //         }
    //     }
    //     return {
    //         ...state,
    //         profile: profile,
    //         isLoading: false
    //     }
    // }
    else if (action.type === 'edit-profile') {
        const { profile, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            profile: profile,
            isLoading: false
        }
    }
    else if (action.type === 'logout') {
        const { user, profile, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            user: user,
            profile: profile,
            isLoading: false
        }
    }
    else {
        // console.log(state);
        return state;
    }
}

export default userReducer;