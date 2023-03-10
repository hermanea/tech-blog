document.querySelector('#signupForm').addEventListener("submit" ,event=>{
    event.preventDefault();
    const signUpObj = {
        username:document.querySelector('#signupUsername').value,
        password:document.querySelector('#signupPassword').value
    }
    console.log(signUpObj);
    fetch("/api/users", {
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
            alert("trumpet sound")
        }
    })
})