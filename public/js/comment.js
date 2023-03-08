
document.querySelector("#weblogComment").addEventListener("click",(event) => {
    event.preventDefault();
    const loginObj = {
        text:document.querySelector("#weblogComment").value, 
        WeblogId: weblogId
    }
    console.log(loginObj);
    fetch("/api/comments",{
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

constweblogTitles = document.querySelectorAll('.weblog h5')

weblogTitles.forEach(title => {
    title.addEventListener('click', () => {
        const commentForm = title.nextElementSibling.nextElementSibling;
        commentForm.style.display = commentForm.style.display === 'none' ? 'block' : 'none';

        const weblogComments = title.nextElementSibling.nextElementSibling.nextElementSibling;
        weblogComments.style.display = comments.style.display === 'none' ? 'block' : 'none';
    });
});
