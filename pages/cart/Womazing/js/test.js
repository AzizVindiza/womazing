
let containerGoods = document.querySelector(".items__container")
let getGoods = () => {
    fetch("http://localhost:8080/cart").then(res => res.json()).then(res => {
   res.forEach((item, idx) => {
            containerGoods.innerHTML += `
        <tr class="basket__tr" data-id="${idx}">
         <td class="item__descr">
          <button type="button" class="remove" ><img src="img/remove.svg" alt="" data-id="${idx}"> </button>
          <div class="item__img" style="width: 200px"><img style="width: 100%" src="/Shop/${item.image[item.colors]}" alt=""></div>
            <p class="item__title">${item.title}</p>
        </td>
         <td class="item__price">${item.price}</td>
       <td class="item__quantity"> <input class="item__quantity-input" type="number" placeholder="1" data-id ='${idx}' value="${item.id}" data-price="${item.price}"></td>
        <td class="item__total" data-id ='${idx}'>${+item.price * 2}</td>
         </tr>
        `
        })
    })
    let inputFew = document.querySelectorAll(".item__quantity-input")
    inputFew.forEach(el => {
        el.addEventListener("input", (e) => {
            let totals = document.querySelectorAll(".item__total")
            let total = Array.from(totals).filter(item => item.dataset.id === e.target.dataset.id)
            total[0].textContent = `${e.target.value * e.target.dataset.price}`
        })
    })
    let removeBtn = document.querySelectorAll('.remove')


    removeBtn.forEach(e => {
        e.addEventListener("click",(event)=>{
            let basketTr = document.querySelectorAll(".basket__tr")
            let arr = Array.from(basketTr).filter(tr => tr.dataset.id === event.target.dataset.id)
            arr[0].remove()
            localStorage.setItem('key',JSON.stringify(goods.filter((item,idx)=> idx !== +event.target.dataset.id)))
        })
    })


}
getGoods()

