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