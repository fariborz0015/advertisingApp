const initialState = {
    Categories: [],

}
function GETCATEGORIES_reducer(state = initialState, action) {

    switch (action.type) {
        case "GET_ALL_CATEGORIES":
            return {
                ...state,
                Categories: action.Categories
            }


        default:
            return state
    }
}

export default GETCATEGORIES_reducer

