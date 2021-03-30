
const initialState={
    path:'/home'
}
function REDIRECT_reducer(state=initialState,action) {
 
    switch (action.type) {
        case "REDIRECT_ACT":
           return {
               ...state,
               path: action.path
           }
        default:
            return state
    }
}

export default REDIRECT_reducer