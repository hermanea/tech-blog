document.querySelector("#weblogForm").addEventListener("submit",event=>{
    event.preventDefault();
    const loginObj = {
        title:document.querySelector("#weblogTitle").value,
        text:document.querySelector("#weblogText").value
    }
    console.log(loginObj);
    fetch("/api/weblog",{
        method:"POST",
        body:JSON.stringify(loginObj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        if(res.ok){
           location.href="/dashboard"
        } else {
            alert("Error.")
        }
    })
})