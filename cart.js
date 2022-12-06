

export let cart = [

]


export const addCart = (item) => {
    cart = [...cart, item]
}

export const deleteCart = (id) => {
    cart = cart.filter((item) => item.id !== +id)
}