
//
// let aActive = document.querySelectorAll(".header__a1")
//
// aActive.forEach((el) => {
//  el.addEventListener('click',() =>{
//   aActive.forEach(el => {
//    el.classList.remove('header__a1_active')
//   })
//   el.classList.add('header__a1_active')
//  })
// })


// let category = ""
// let rowInner = (arg) =>{
//  let row = document.querySelector(".cards__row")
//  row.innerHTML = ""
//  fetch(`http://localhost:8080/clothes${arg.length ? "?category=" + arg : ""}`)
//      .then(res => res.json())
//      .then(res=>{
//       res.forEach((item) =>{
//        row.innerHTML += `
//    <div class="cards__row__card">
//       <img class="cards__row__img" src="/Shop/${item.image.white}" alt="">
//       <h2 class="cards__row__h">${item.title}</h2>
//       <p class="cards__row__p">${item.price}$</p>
//    </div>
//   `
//       })
//
//      })
// }
//
// rowInner(category)
//
// let btnCategory = document.querySelectorAll(".cards__btn-filter")
// btnCategory.forEach((item) =>{
//  item.addEventListener("click", (e)=>{
//   category = `${e.target.textContent}`
//   rowInner(category)
//  })
// })


let cards__filter = document.querySelector(".cards__filter");
let db = "http://localhost:8080/clothes"
let categoryDb = "http://localhost:8080/clothes?category="
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
      getCategory()
     })
}

// let getALLCard = () =>{
//     fetch(categoryDb)
//         .then((res)=>res.json())
//         .then((res)=>{
//             let tabsNavBtn = document.querySelectorAll(".tabs__nav-btn");
//             let tabsContent = document.querySelector(".tabs__content")
//
//             tabsNavBtn.forEach(item =>{
//                 item.addEventListener('click',(e)=>{
//
//                     res.forEach(obj=>{
//                         tabsContent.innerHTML += `
//                         <div class="card">
//                                  <img src="/Shop/${obj.image.white}" alt="">
//                                  <h2>${obj.category}</h2>
//                         </div>`
//                     })
//
//
//                 })
//
//             })
//         })
// }
let getCard = (arg) =>{
 fetch(categoryDb +arg)
     .then((res)=>res.json())
     .then((res)=>{
         let cardsRow = document.querySelector(".cards__row")
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
