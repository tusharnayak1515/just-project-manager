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
        const { user } = action.payload;
        return {
            ...state,
            user: user,
            isLoading: false
        }
    }
    else if (action.type === 'login') {
        const { user } = action.payload;
        return {
            ...state,
            user: user,
            isLoading: false
        }
    }
    else if (action.type === 'profile') {
        const { profile } = action.payload;
        return {
            ...state,
            profile: profile,
            isLoading: false
        }
    }
    // else if (action.type === 'set-profile') {
    //     const { profile } = action.payload;
    //     return {
    //         ...state,
    //         profile: profile,
    //         isLoading: false
    //     }
    // }
    else if (action.type === 'edit-profile') {
        const { profile } = action.payload;
        return {
            ...state,
            profile: profile,
            isLoading: false
        }
    }
    else if (action.type === 'logout') {
        const { user, profile } = action.payload;
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