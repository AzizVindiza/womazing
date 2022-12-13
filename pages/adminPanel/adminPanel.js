let tBody = document.querySelector(".tBody")
let getGoods = () =>{
    fetch("http://localhost:8080/clothes")
        .then(res => res.json())
        .then( res => {
            res.forEach(item =>{
                tBody.innerHTML +=`
                <tr class="tableTr" data-id="${item.id}">
                  <td class="title">${item.title}</td>
                  <td class="price">${item.price}</td>
                  <td class="id">${item.id}</td>
                  <td class="delete">
                  <button class="deleteBtn" data-id="${item.id}">Удалить</button>
</td>
                  <td class="edit">
                  <button class="editBtn" data-id="${item.id}" data-title="${item.title}" data-price="${item.price}">Изменить</button>
</td>
                </tr>
                `
            })
            let trs = document.querySelectorAll(".tableTr")
            let deletBtns = document.querySelectorAll(".deleteBtn")
            deletBtns.forEach(btn =>{
                btn.addEventListener("click",(e)=>{
                    if(confirm("Вы точно хотите удалить этот объект?")){
                        fetch(`http://localhost:8080/clothes/${e.target.dataset.id}`,{
                            method: "DELETE"
                        }).then(res =>{
                            alert("Удалено")
                        })
                        let arr = Array.from(trs).filter((tr) => tr.dataset.id === e.target.dataset.id)
                        arr[0].remove()
                    }

                })
            })
            editProduct()
        })

}
let createProduct = () =>{
    let form = document.querySelector(".form")
    form.addEventListener("submit",(e) =>{
        e.preventDefault()
        fetch("http://localhost:8080/clothes",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                title: e.target.title.value,
                price: e.target.price.value
            })
        }).then(res => alert("Форма отправлена"))
            .catch(res => alert("Ошибка"))
    })
}
let editProduct = () =>{
    let editBtns = document.querySelectorAll(".editBtn")
    let formPopup = document.querySelector(".popup-form")
    editBtns.forEach(edit =>{
        edit.addEventListener("click",(e)=>{
            let popup = document.querySelector(".popup")
            let popupBtn = document.querySelector(".popup-form__btn")
            popup.style.display = "flex"
            formPopup.title.value = `${e.target.dataset.title}`
            formPopup.price.value = `${e.target.dataset.price}`
            popupBtn.dataset.id = `${e.target.dataset.id}`


        })
    })
    formPopup.addEventListener("submit", (e)=>{
        e.preventDefault()
        let popupBtn = document.querySelector(".popup-form__btn")
        fetch(`http://localhost:8080/clothes/${popupBtn.dataset.id}`,{
            method: "PATCH",
            body: JSON.stringify({
                title: `${e.target.title.value}`,
                price: `${e.target.price.value}`
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(res =>{
            alert("Изменено")
        })
            .catch(res => alert("ОШИБКА"))
    })
}

createProduct()

getGoods()