const postTitles = document.querySelectorAll('#postTitle');
const updateWeblogForms = document.querySelectorAll('#updateWeblogForm');

postTitles.forEach((postTitle, index) => {
    postTitle.addEventListener('click', (event) => {
      event.preventDefault();
      updateWeblogForms[index].style.display = updateWeblogForms[index].style.display === 'none' ? 'block' : 'none';
    });
  });



// const titleElement = document.querySelector('#postTitle');
// const updateWeblogForm = document.querySelector('#updateWeblogForm');
// const updateTitleInput = document.querySelector('#updateTitle');
// const updateTextInput = document.querySelector('#updateText');

// const updateWeblogBtn = document.querySelector('#updateWeblogBtn');
// const removeWeblogBtn = document.querySelector('#removeWeblogBtn');


// updateTitleInput.value = '{{title}}';
// updateTextInput.value = '{{post}}';

// Event listener that displays the update form on button click.
// titleElement.addEventListener("click", (event) => {
//     event.preventDefault();

//     const postTitle = event.target.textContent;
//     const postData = User.Weblogs.find(post => post.title === postTitle);

//     updateTitleInput.value = postData.title;
//     updateTextInput.value = postData.post;

//     if (updateWeblogForm.style.display === 'none') {
//         updateWeblogForm.style.display = 'block';
//     } else {
//         updateWeblogForm.style.display = 'none';
//     }
// });

console.log(weblogId)

// Event listener that edits the user's post on button click.
document.querySelector("#updateWeblogForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const loginObj = {
        title:document.querySelector("#updateTitle").value,
        text:document.querySelector("#updateText").value
    }
    console.log(loginObj);
    fetch(`/api/weblogs/${weblogId}`,{
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

// Event listener that delete's the user's post on button click.
document.querySelector("#updateWeblogForm").addEventListener("submit", (event) => {
    event.preventDefault();
    fetch(`/api/weblogs/${weblogId}`,{
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