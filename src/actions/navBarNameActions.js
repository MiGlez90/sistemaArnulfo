export function changeName(name) {
    return { type: 'CHANGE_NAME', name};
}

export function resetName(name) {
    return {type: 'RESET_NAME', name}
}