export default function subtiposGranosReducer(state = [], action){
    switch(action.type){
        case "LOAD_SUBTIPOSGRANOS_SUCCESS":
            return action.subtiposGranos;
        default:
            return state;
    }
}