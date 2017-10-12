export function showAnimales(filtro){
    return {type:"SHOW_ANIMALES", filtro}
}

export function showSemillas(filtro){
    return {type:"SHOW_GRANOS", filtro}
}

export function showOtros(filtro) {
    return {type:"SHOW_OTROS", filtro}
}

export function showTodos(filtro){
    return {type:"SHOW_TODOS", filtro}
}
