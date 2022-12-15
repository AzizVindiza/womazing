let form = document.querySelector(".form")
// Ищу форму в дом элементе
let postUser = (arg)=>{
    fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(arg)
    })
        .then(res => res.json())
        .then(data => data)
}
let reg = () =>{

    // функция reg для регистрации данных
    form.addEventListener("submit",(e)=>{
        let label = document.querySelector(".form__label-nickname")
        let label1 = document.querySelector(".form__label-email")
        e.preventDefault()
        let formData = {
            nickname: e.target.nickname.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }
        fetch('http://localhost:8080/register')
            .then(res => res.json())
            .then(data => {
               let arr = Array.from(data).filter(user => user.email === formData.email || user.nickname === formData.nickname)
                console.log(arr)
                    if(arr.length === 0){
                        postUser(formData)
                    }else if(arr[0].nickname === formData.nickname && arr[0].email === formData.email  ){
                        alert("Такой пользователь уже есть")
                    }else if(arr[0].email === formData.email ) {
                            label1.innerHTML += `
                            <span class="text"> Такой email существует</span>
                            `
                    }else{
                        label.innerHTML += `
                               <span class="text1"> Такой ник существует</span>
                            `
                    }



            })



    })
}

reg()