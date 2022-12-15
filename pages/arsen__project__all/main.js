let cards__filter = document.querySelector(".cards__filter");
let db = "http://localhost:8080/clothes"
let categoryDb = "http://localhost:8080/clothes?category="
let cardsRow = document.querySelector(".cards__row");



let cardAll = (arg) =>{
    fetch(db)
        .then((res)=>res.json())
        .then((res)=>{

            cardsRow = document.querySelector(".cards__row");
            let pagination = document.querySelector('.card__pagination');




            pagination.innerHTML = ""
            for(let i = 0 ; i < Math.ceil(res.length / 3) ; i++){
                pagination.innerHTML += `
                           <button class="cards__page">${i+1}</button>

            `
            }
            let allPage = document.querySelectorAll(".cards__page");

            allPage.forEach((item)=>{
                item.addEventListener("click", (event)=>{
                         cardAll(event)
                })
            })
            cardsRow.innerHTML = ""
            res.filter((el,idx)=> arg ? (res[idx].id > +arg.target.textContent * 3 - 3 && res[idx].id <= +arg.target.textContent * 3) : idx < 3).forEach(obj=>{
                cardsRow.innerHTML += `
          <a class="cards__row__a" href="../sweetshot/index.html#${obj.id}" >
          <div class="card">
             <img class="card__img" src="/Shop/${obj.image[Object.keys(obj.image)[0]]}" alt="">
             <h2 class="cards__row__h">${obj.category}</h2>
             <p class="cards__row__p">${obj.price}$</p>
          </div></a>

          `
            })
        })

}
cardAll()





let getTabsBtn = () =>{
    fetch(db)
        .then((res)=>res.json())
        .then((res)=>{
            let arr = [];
            res.forEach(item =>{
                !arr.includes(item.category) ? arr.push(item.category) : arr
            })
            arr.forEach(item1 => {
                cards__filter.innerHTML += `
                <button class="cards__row__btn-filter">${item1}</button>
                `
            })
            let btnActive = document.querySelectorAll('.cards__row__btn-filter');
            btnActive.forEach((el)=>{
                el.addEventListener('click',() => {
                    btnActive.forEach(el => {el.classList.remove('cards__row__btn-filter_active')})
                    el.classList.add('cards__row__btn-filter_active')
                })
            })
            let backBtn = document.querySelector('.cards__filter-all');

            backBtn.addEventListener("click",cardAll)
            getCategory()
        })
}

let getCard = (arg) =>{
    fetch(categoryDb +arg)
        .then((res)=>res.json())
        .then((res)=>{
             cardsRow = document.querySelector(".cards__row")
            cardsRow.innerHTML = ""
            res.filter((el,idx)=> idx < 3).forEach(obj=>{
                cardsRow.innerHTML += `
          <a class="cards__row__a" href="../sweetshot/index.html#${obj.id}" >
          <div class="card">
             <img class="card__img" src="/Shop/${obj.image[Object.keys(obj.image)[0]]}" alt="">
             <h2 class="cards__row__h">${obj.category}</h2>
             <p class="cards__row__p">${obj.price}$</p>
          </div></a>

          `
            })
        })

}



function getCategory(){
    let cardsBtnFilter = document.querySelectorAll(".cards__row__btn-filter");
    let category = ""
    cardsBtnFilter.forEach(item =>{
        item.addEventListener('click',(e)=>{
            category = e.target.textContent
            getCard(category)
        })
    })
}
getTabsBtn()

// function hello(arg) {
//    let cardsrow = document.querySelector(".cards__row")
//     cardsrow.innerHTML = `
//     <p> ${arg ? arg : "hello"}
//     </p>`
// }
// hello()
//
// let btn = document.querySelector(".cards__filter-all")
// btn.addEventListener("click",(e)=>{
//     hello(e.target.textContent)
// })