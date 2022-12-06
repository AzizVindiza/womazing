let tabsNav = document.querySelector(".tabs__nav");
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
            // tabsNav.innerHTML = `
            //     <button class="tabs__nav-btn">All</button>
            //     `
            arr.forEach(item1 => {
                tabsNav.innerHTML += `
                <button class="tabs__nav-btn">${item1}</button>
                `
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
            let tabsContent = document.querySelector(".tabs__content")
            tabsContent.innerHTML = ""
            res.forEach(obj=>{


                tabsContent.innerHTML += `
          <div class="card">
             <img src="/Shop/${obj.image.white}" alt="">
             <h2>${obj.title}</h2>
             <h2>${obj.price}<span>$</span></h2>
             <button class="buy-btn" data-id=${obj.id} data-price=${obj.price} data-title=${obj.title}>купить</button>
          </div>
          `
            })
            buyBtn()
        })
}
function getCategory(){
    let tabsNavBtn = document.querySelectorAll(".tabs__nav-btn");
    let category = ""
    tabsNavBtn.forEach(item =>{
        item.addEventListener('click',(e)=>{
            category = e.target.textContent
            getCard(category)

        })

    })

}
function buyBtn (){
    let buyBtn = document.querySelectorAll(".buy-btn")
    buyBtn.forEach(btn=>{
        btn.addEventListener("click",(e)=>{
            // fetch(db+ `?id=${btn.dataset.id}`)
            localStorage.setItem(`${btn.dataset.id}`, `${btn.dataset.title} , ${btn.dataset.price}`)
        })
    })
}


getTabsBtn()

let searchCloth = () =>{
    let searchInput = document.querySelector(".search__input")
    searchInput.addEventListener("input",(e)=>{
        let tabsContent = document.querySelector(".tabs__content")
        let searchGoods = document.querySelector(".search__goods")
        fetch(db)
            .then(res=>res.json())
            .then(res => {
                searchGoods.innerHTML = ""
                tabsContent.innerHTML = ""
                res.forEach((item) => {

               item.title.toUpperCase().startsWith(e.target.value.toUpperCase()) && e.target.value !== ""
                   ?
                   searchGoods.innerHTML +=
                       `<li>${item.title}</li>
                       `
                   :
                   searchGoods


                    item.title.toUpperCase().startsWith(e.target.value.toUpperCase()) && e.target.value !== ""?
                    tabsContent.innerHTML += `
                     <div class="card">
                    <img src="/Shop/${item.image.white}" alt="">
                      </div>
                    ` : searchGoods
                })
            })

    })
}
searchCloth()

















