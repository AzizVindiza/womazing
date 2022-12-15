

export const addCart = (item) => {
    // cart = [...cart, item]
    fetch("http://localhost:8080/cart",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },body: JSON.stringify({...item,id: ""})
    }).then(res => alert("отправленно"))
}
// export const deleteCart = (id) => {
//     res.cart = cart.filter((item) => item.id !== +id)
// }