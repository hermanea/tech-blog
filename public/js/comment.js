const weblogTitles = document.querySelectorAll('#weblogTitle');
const commentForms = document.querySelectorAll('#commentForm');
const commentBtn = document.querySelector('#commentBtn');
const commentLink = document.querySelector('.comment-link');

weblogTitles.forEach((weblogTitle, index) => {
    weblogTitle.addEventListener('click', (event) => {
        event.preventDefault();
        commentForms[index].style.display = commentForms[index].style.display === 'none' ? 'block' : 'none';
        const commentLink = event.target;
        commentBtn.dataset.weblogId = commentLink.dataset.weblogId;
    });
});

commentBtn.addEventListener("click",(event) => {
    event.preventDefault();
    const commentObj = {
        content:document.querySelector("#addComment").value, 
    }
    console.log(commentObj);
    const weblogId = event.target.dataset.weblogId;
    fetch("/api/comments",{
        method:"POST",
        body:JSON.stringify(commentObj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        if(res.ok){
            location.href=`/post/${weblogId}`
        } else {
            alert("Error.")
        }
    })
})



