
const initialState={
    LoadingStatus:false
}
function LOADING_reducer(state=initialState,action) {

    switch (action.type) {
        case "LOADING_ACT":
           return {
               ...state,
            LoadingStatus: action.LoadingStatus
           }
        default:
            return state
    }
}

export default LOADING_reducer