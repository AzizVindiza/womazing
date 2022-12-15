export const callback = () =>{
    let body = document.querySelector("body")
    let phone = document.createElement("div")

    phone.classList.add("callback")
    phone.style.position = "fixed"
    phone.style.bottom = "40px"
    phone.style.right = "40px"
    phone.style.width = "50px"
    phone.style.height = "50px"
    phone.style.background = "black"
    window.addEventListener("scroll",()=>{
        if(phone){
            body.append(phone)
        }
    })
    phone.addEventListener("click",()=>{
        body.innerHTML += `
        <div class="overlay" style="display: flex;position: fixed;top: 0;right: 0;width: 100vw;row-gap: 20px;height: 100vh;background: rgba(110, 156, 159, 0.95);"> 
        <div class="popup" style="background: pink;margin: auto;flex-direction: column;position: relative;display: flex; align-items: center; justify-content: center">
            <h2 class="popup__title">Заказать обратный звонок</h2>
            <form action="http://localhost:8080/message" method="post" class="popup__form" style="display: flex; flex-direction: column;row-gap: 20px">
               <input class="popup-inputName" name="name" type="text" placeholder="name">
               <input class="popup-inputEmail" name="email" type="email" placeholder="email">
               <input class="popup-input" name="num" type="text" placeholder="number" pattern="+/d+">
               <button type="submit" class="popup__btn" style="display: flex; padding: 22px 108px">Заказать звонок</button>
            </form>
            <button class="popup__close" style="position: absolute; top: 32px;right: 32px">x</button>
        </div>
        </div>
        `
        let overlay = document.querySelector(".overlay")
        let handlerCloseBtn = () => {
            let closeBtn = document.querySelector(".popup__close")
            closeBtn.addEventListener("click", ()=>{
                overlay.remove()
            })
        }
        handlerCloseBtn()
        overlay.addEventListener("click",(e)=>{
            if(e.target.classList.contains("overlay")){
                overlay.remove()
            }
        })
        let popupForm = document.querySelector(".popup__form")
        popupForm.addEventListener("submit", (e)=>{
            e.preventDefault()
            let user = {
                name: e.target.name.value,
                email: e.target.email.value,
                num: e.target.num.value
            }
            fetch("http://localhost:8080/message",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // отправляемые данные
                },
                body: JSON.stringify(user)
            }).then(res => {
                let popup = document.querySelector(".popup")
                popup.innerHTML =`
                <h2 class="popup__successTitle">Отлично! Мы скоро вам перезвоним.</h2>
                <button class="popup__close">Закрыть</button>
                `
                handlerCloseBtn()
            }).catch(res =>{
                let popup = document.querySelector(".popup")
                popup.innerHTML =`
                <h2 class="popup__successTitle">Извините пожалуста сервер не отвечает</h2>
                <button class="popup__close">Закрыть</button>
                `
                handlerCloseBtn()
            })
        })
    })

}
