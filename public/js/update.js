const postTitles = document.querySelectorAll('#postTitle');
const updateForms = document.querySelectorAll('#updateForm');
const updateLink = document.querySelector('.update-link');


postTitles.forEach((postTitle, index) => {
    postTitle.addEventListener('click', (event) => {
      event.preventDefault();
      updateForms[index].style.display = updateForms[index].style.display === 'none' ? 'block' : 'none';
    });
  });

document.querySelector("#updateBtn").addEventListener("click", event => {
    event.preventDefault();
    const updateObj = {
        title:document.querySelector("#updateTitle").value,
        content:document.querySelector("#updateText").value
    }
    console.log(updateObj);
    const weblogId = updateLink.dataset.weblogId;
    fetch(`/api/weblogs/${weblogId}`, {
        method:"PUT",
        body:JSON.stringify(updateObj),
        headers:{
            "Content-Type": "application/json",
        }
    })
    .then(res=>{
        if(res.ok){
            location.reload();
        } else {
            alert("trumpet sound")
        }
    })
})

document.querySelector("#deleteBtn").addEventListener("click", event=> {
    event.preventDefault();
    const weblogId = updateLink.dataset.weblogId;
    fetch(`/api/weblogs/${weblogId}`, {
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
        }
    })
    .then(res=>{
        if(res.ok){
            location.reload();
        } else {
            alert("trumpet sound")
        }
    })
})
