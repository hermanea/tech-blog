const weblogTitles = document.querySelectorAll('#weblogTitle');
// const commentForms = document.querySelectorAll('#commentForm');
const showCommentForms = document.querySelectorAll('#showCommentForm');
const commentBtn = document.querySelector('#commentBtn');
const commentLink = document.querySelector('.comment-link');

weblogTitles.forEach((weblogTitle, index) => {
    weblogTitle.addEventListener('click', (event) => {
        event.preventDefault();
        showCommentForms[index].style.display = showCommentForms[index].style.display === 'none' ? 'block' : 'none';
        const commentLink = event.target;
        commentBtn.dataset.weblogId = commentLink.dataset.weblogId;
    });
});

commentBtn.addEventListener("click",(event) => {
    event.preventDefault();
    const weblogId = event.target.dataset.weblogId;    
    const commentObj = {
        content:document.querySelector("#addComment").value,
        weblogId: weblogId
    }
    console.log(commentObj);
    console.log(weblogId);
    fetch("/api/comments",{
        method:"POST",
        body:JSON.stringify(commentObj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        if(res.ok){
            location.href=`/viewblog/${weblogId}`
        } else {
            alert("Error.")
        }
    })
})

// fetch(`/api/comments?weblogId=${weblogId}`,{



