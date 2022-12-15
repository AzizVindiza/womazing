import {cart, addCart} from "../../../cart.js";
import {callback} from "../../../callback.js";
import {cartCount} from "../../../counter.js";
cart.then(res=> res.json())
    .then(res => {
        console.log(res)
    })
callback()

let title = document.querySelector(".name__sweet")
let category = document.querySelector(".category")
let price = document.querySelector('.price__text-new')
let size = document.querySelector(".size__blocks")
let color = document.querySelector(".color__blocks")
let img = document.querySelector(".photo__girl")
let submit = document.querySelector(".basket__text")
let input = document.querySelector(".basket__count")
let db = fetch(`http://localhost:8080/clothes/${location.hash.slice(1)}`).then(res=>res.json())
db.then(res => getInfo(res))
let getSameGoods = (arg) => {
    let sameGoodWrapper = document.querySelector(".path .wrapper")
    fetch(`http://localhost:8080/clothes?category=${arg.category}`)
        .then(res => res.json())
        .then(res => {
            let id ;
          res.filter((el,idx) => el.id !== arg.id && idx < 2).forEach(good =>{
              sameGoodWrapper.innerHTML += `
              
                <a class="wrapper__link" href="./index.html#${good.id}">
                <div class="wrapper__img1">
                    <img src="/Shop/${good.image[Object.keys(good.image)[0]]}" alt="T-shirt">
                    <h2 class="wrapper__img1-text">${good.title}</h2>
                    <span class="wrapper__img1-price">${good.price}</span>
                </div>
                </a>
              `
              id = good.id



          })
            let links = document.querySelectorAll(".wrapper__link")
            links.forEach(link => {
                link.addEventListener("click",()=>{
                    location.hash = `${id}`
                    location.reload()
                })
            })
        })
}
let getInfo = (arg) =>{
    let sizes = arg.size[0]
    title.textContent = `${arg.title}`
    category.textContent = `${arg.category}`
    price.textContent = `${arg.price}`
   let createSizes = () =>{
       size.innerHTML = ""
       arg.size.forEach((item) =>{
           size.innerHTML += `
         <div class="size__blocks-item" style="background: ${item === sizes ? "black" : "white"};color: ${item === sizes ? "white" : "black"}">${item}</div>
        `
       })
       let sizeBtn = document.querySelectorAll(".size__blocks-item")
       sizeBtn.forEach((item)=>{
           item.addEventListener("click",(e)=>{
               sizes = e.target.textContent
               createSizes()
           })
       })
   }
    createSizes()


    let colorImage = arg.colors[0]

    const setColors = () => {
        color.innerHTML = ''
        arg.colors.forEach((item) =>{
            color.innerHTML += `
         <button class="color__blocks-item brown" data-color=${item} style="background: ${item}; color: ${item === 'black' ? 'white' : 'black'}">
            ${item === colorImage ? '+' : ''}
        </button>
        `
        })
        let colorBtn = document.querySelectorAll(".color__blocks-item")
        colorBtn.forEach((item) =>{
            item.addEventListener("click",()=>{
                colorImage = item.dataset.color
                setImg()
                setColors()
            })
        })
    }

    setColors()

    let setImg = () =>{
        img.innerHTML = `
        <img src="/Shop/${arg.image[colorImage]}"  alt="SweetShot">
      `
    }
    setImg()
    submit.addEventListener("click",()=>{
        addCart({
            ...arg,
            "id-item": arg.id,
            size:sizes,
            colors:colorImage
        })
        // localStorage.setItem(`key`,JSON.stringify(cart))
        // const savedUser = JSON.parse(localStorage.getItem('key'));
        // console.log(savedUser)
        cartCount()
    })
    getSameGoods(arg)
}

console.log(location)
cartCount()




