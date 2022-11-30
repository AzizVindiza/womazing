let btnActive = document.querySelectorAll('.cards__btn');

btnActive.forEach((el)=>{
el.addEventListener('click',(e) => {
btnActive.forEach(el => {el.classList.remove('cards__btn_active')})
 el.classList.add('cards__btn_active')
 })
})

let btnFilterActive = document.querySelectorAll(".cards__btn-filter");

btnFilterActive.forEach((el) => {
el.addEventListener('click',(e) => {
 btnFilterActive.forEach(el => {el.classList.remove('cards__btn-filter_active')})
 el.classList.add('cards__btn-filter_active')
})
})

let aActive = document.querySelectorAll(".header__a1")

aActive.forEach((el) => {
 el.addEventListener('click',(e) =>{
  aActive.forEach(el => {
   el.classList.remove('header__a1_active')
  })
  el.classList.add('header__a1_active')
 })
})


let category = ""
let rowInner = (arg) =>{
 let row = document.querySelector(".cards__row")
 row.innerHTML = ""
 fetch(`http://localhost:8080/clothes${arg.length ? "?category=" + arg : ""}`)
     .then(res => res.json())
     .then(res=>{
      res.forEach((item) =>{
       row.innerHTML += `
   <div class="cards__row__card">
      <img class="cards__row__img" src="/Shop/${item.image.white}" alt="">
      <h2 class="cards__row__h">${item.title}</h2>
      <p class="cards__row__p">${item.price}$</p>
   </div>
  `
      })

     })
}

rowInner(category)

let btnCategory = document.querySelectorAll(".cards__btn-filter")
btnCategory.forEach((item) =>{
 item.addEventListener("click", (e)=>{
  category = `${e.target.textContent}`
  rowInner(category)
 })
})