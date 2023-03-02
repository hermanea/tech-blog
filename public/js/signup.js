document.querySelector('#signupForm').addEventListener("click" , event =>{
    event.preventDefault();
    const signUpObj = {
        username:document.querySelector('#signupUsername').value,
        password:document.querySelector('#signupPassword').value
    }
    fetch("api/users", {
        method:"POST",
        body:JSON.stringify(signUpObj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        if(res.ok){
           location.href="/homepage"
        } else {
            alert("An account for this user already exists.")
        }
    })
})