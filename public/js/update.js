const updateId = window.location.href.split('/').pop();

document.querySelector("#updateForm").addEventListener("click",event=>{
    event.preventDefault();
    const loginObj = {
        title:document.querySelector("#updateTitle").value,
        text:document.querySelector("#updateText").value
    }
    console.log(loginObj);
    fetch(`/api/weblog/${updateId}`,{
        method:"PUT",
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

document.querySelector("#removeForm").addEventListener("click",event=>{
    event.preventDefault();
    fetch(`/api/blog/${updateId}`,{
        method:"DELETE",
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