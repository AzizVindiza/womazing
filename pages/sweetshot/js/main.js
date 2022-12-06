import {cart, addCart} from "../../../cart.js";


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
            ...arg,size:sizes,colors:colorImage
        })
        console.log(cart)
    })

}
console.log(location)

