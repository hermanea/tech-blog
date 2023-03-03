fetch("/api/user/logout",{
    method:"GET",
}).then(res=>{
    if(res.ok){
       location.href="/hompage"
    } else {
        alert("error")
    }
})
