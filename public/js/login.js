document.querySelector('#loginBtn').addEventListener("submit" , event =>{
    event.preventDefault();
    const loginObj = {
        username:document.querySelector('#loginUsername').value,
        password:document.querySelector('#loginPassword').value
    }
    fetch("api/users/login", {
        method:"POST",
        body:JSON.stringify(loginObj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        if(res.ok){
           location.href="/homepage"
        } else {
            alert("Login failed.")
        }
    })
})