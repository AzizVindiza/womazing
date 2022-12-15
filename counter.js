const goods = JSON.parse(localStorage.getItem('key'));

export let cartCount = () => {
    let cartWrapper = document.querySelector('.cart__wrapper')
    cartWrapper.style.position = "relative"
    if (goods.length > 0 ){
        cartWrapper.innerHTML += `
        <div class="cart__circle" style="
        background: #998E78;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        position: absolute;
        top: -10px;
        right: -10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;
        font-size: 9px;
        ">
       ${goods.length}
        </div>
        `
    }
}
