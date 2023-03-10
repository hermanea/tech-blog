const showFormBtn = document.querySelector("#showFormBtn");
const createWeblogForm = document.querySelector("#createWeblogForm");
// const createWeblogBtn = document.querySelector("#createWeblogBtn");

showFormBtn.addEventListener("click",event=>{
    event.preventDefault();
    if (createWeblogForm.style.display === 'none') {
        createWeblogForm.style.display = 'block';
    } else {
        createWeblogForm.style.display = 'none';
    }
});

createWeblogForm.addEventListener("submit",event=>{
    event.preventDefault();
    const weblogObj = {
        title: document.querySelector("#weblogTitle").value,
        content: document.querySelector("#weblogContent").value
    }
    console.log(weblogObj)
    fetch("/api/weblogs",{
        method: "POST",
        body: JSON.stringify(weblogObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})