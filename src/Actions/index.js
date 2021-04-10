
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
        type: types.PROFILE_ACT,
        user_info
    }
}
export const loadingAction = LoadingStatus => {
    return {
        type: types.LOADING_ACT,
        LoadingStatus
    }
}
export const getMyAdverisesAction = MyAdvertises => {
    return {
        type: types.GET_MY_ADVERISES,
        MyAdvertises
    }
}
export const getLastAds = LastAds => {
    return {
        type: types.GET_LAST_ADS,
        LastAds: LastAds
    }
}
export const GetAllCategory = Categories => {
    return {
        type: types.GET_ALL_CATEGORIES,
        Categories: Categories
    }
}