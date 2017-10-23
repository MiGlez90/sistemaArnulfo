export default function gastoReducer (state = [], action){
    switch (action.type){

        case "LOAD_GASTOS_SUCCESS":
            return action.gastos;

        case "SAVE_NEW_GASTO_SUCCESS":
            return [...state,action.gasto];

        case "CREATE_GASTO":
            return [...state,action.gasto];

        case "TOOGLE_LOCK":
            const item = {...action.gasto, lock:!action.gasto.lock};
            return state.map(c=>{
                if(c.key === action.gasto.key){
                    return item;
                }
                return c;
            });

        case "UPDATE_GASTO_SUCCESS":
            return [...state.map( i => {
                if(i.key === action.gasto.key){
                    return action.gasto;
                }
                return i;
            } )];
        case 'RESET_GASTOS':
            let newState = state.slice(0);
            for( let gasto of newState){
               gasto.lock = false;
            }
            return newState;
        default:
            return state;
    }
}