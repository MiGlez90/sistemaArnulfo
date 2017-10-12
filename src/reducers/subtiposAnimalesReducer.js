import initialState from './initialState';

export default function subtiposAnimalesReducer(state = [], action){
    switch(action.type){
        case "LOAD_SUBTIPOSANIMALES_SUCCESS":
            return action.subtiposAnimales;
        default:
            return state;
    }
}