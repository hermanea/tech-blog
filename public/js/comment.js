const weblogId = window.location.href.split('/').pop();

document.querySelector("#weblogComment").addEventListener("click",event=>{
    event.preventDefault();
    const loginObj = {
        text:document.querySelector("#weblogComment").value, 
        WeblogId: weblogId
    }
    console.log(loginObj);
    fetch("/api/comment",{
        method:"POST",
        body:JSON.stringify(loginObj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        if(res.ok){
           location.href="/post/" + weblogId
        } else {
            alert("Error.")
        }
    })
})