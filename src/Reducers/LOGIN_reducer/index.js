
const initialState = {
    user_info: {
        name: null,
        phone: null,
        login: false
    }
}
function LOGIN_reducer(state = initialState, action) {

    switch (action.type) {
        case "LOGIN_ACT":

            return {
                ...state,
                user_info: action.user_info
            }
        case "LOGOUT_ACT":

            return {
                ...state,
                user_info: action.user_info
            }
        case "PROFILE_ACT":

            return {
                ...state,
                user_info: action.user_info
            }

        default:
            return state
    }
}

export default LOGIN_reducer