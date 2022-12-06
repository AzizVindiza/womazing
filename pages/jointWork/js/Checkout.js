let getTotal = () =>{
    let arr = Object.values(localStorage)

    let product = document.querySelector(".product")
    let sum = document.querySelector(".sum")

    let clear = document.querySelector(".clear")
    clear.addEventListener("click",()=>{
        localStorage.clear()
        product.innerHTML = ""
        sum.innerHTML = "0"
    })
    arr.forEach(item =>{

        sum.textContent = +sum.textContent + +`${item.split(",")[1]}`
        product.innerHTML +=`
        <tr>
        <th>${item.split(",")[0]}</th>
        <th>${item.split(",")[1]}</th>
        </tr>
        `
    })


}
getTotal()



