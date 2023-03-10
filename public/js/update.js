const postTitles = document.querySelectorAll('#postTitle');
const updateForms = document.querySelectorAll('#updateForm');
const updateBtns = document.querySelectorAll(".updateBtn");
const removeWeblogBtn = document.querySelector("#removeWeblogBtn");


postTitles.forEach((postTitle, index) => {
    postTitle.addEventListener('click', (event) => {
      event.preventDefault();
      updateForms[index].style.display = updateForms[index].style.display === 'none' ? 'block' : 'none';
      
      const selectedTitle = postTitle.textContent;
      const selectedText = postTexts[index].textContent;
      
      updateTitleInput.value = selectedTitle;
      updateTextInput.value = selectedText;

    });
  });

updateBtns.forEach((btn, index) => {
    btn.addEventListener('click', async (event) => {
        event.preventDefault();
        const updateData = {
            title: updateForms[index].querySelector('.updateTitle').value,
            content: updateForms[index].querySelector('.updateContent').value,
        };
        const response = await fetch(`/api/weblogs/${weblogData[index].id}`, {
            method: "PUT",
            body: JSON.stringify(updateData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            location.reload();
        } else {
            alert('Error.');
        }
    });
});


// updateWeblogBtn.addEventListener("click", (event) => {
    
//     event.preventDefault();
//     const updateObj = {
//         title:document.querySelector("#updateTitle").value,
//         text:document.querySelector("#updateText").value
//     }
//     console.log(updateObj);
//     fetch(`/api/weblogs/${weblogId}`,{
//         method:"PUT",
//         body:JSON.stringify(updateObj),
//         headers:{
//             "Content-Type":"application/json"
//         }
//     })
//     .then(res=>{
//         if(res.ok){
//            location.href="/dashboard"
//         } else {
//             alert("Error.")
//         }
//     })
// })

// removeWeblogBtn.addEventListener("click", (event) => {
//     event.preventDefault();
//     fetch(`/api/weblogs/${weblogId}`,{
//         method:"DELETE",
//         headers:{
//             "Content-Type":"application/json"
//         }
//     })
//     .then(res=>{
//         if(res.ok){
//            location.href="/dashboard"
//         } else {
//             alert("Error.")
//         }
//     })
// })