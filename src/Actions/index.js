
import * as types from '../Constans'


 
export const loginAction = user_info => {
    return {
        type: types.LOGIN_ACT,
        user_info
    }
}
export const logoutAction = user_info => {
    return {
        type: types.LOGOUT_ACT,
        user_info
    }
}

export const redirectAction = path => {
    return {
        type: types.REDIRECT_ACT,
        path
    }
}

export const profileAction = user_info => {
    return {
        type: types.REDIRECT_ACT,
        user_info
    }
}