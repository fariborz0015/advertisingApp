






const initialState = {
    MyAdvertises: [],
    LastAds: []
}
function GETADVERTISES_reducer(state = initialState, action) {

    switch (action.type) {
        
        case "GET_MY_ADVERISES":

            let AllMyAdvertises = [...state.MyAdvertises, ...action.MyAdvertises];
            let uniqMyAdvertises = Array.from(new Set(AllMyAdvertises.map(a => a.id)))
                .map(id => {
                    return AllMyAdvertises.find(a => a.id === id)
                })

            return {
                ...state,
                MyAdvertises: uniqMyAdvertises
            }

        case "GET_LAST_ADS":


            let AllAds = [...state.LastAds, ...action.LastAds];
            const uniqAds = Array.from(new Set(AllAds.map(a => a.id)))
                .map(id => {
                    return AllAds.find(a => a.id === id)
                })

            return {
                ...state,
                LastAds: uniqAds
            }
        default:
            return state
    }
}


export default GETADVERTISES_reducer