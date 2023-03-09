const showFormBtn = document.querySelector('#showFormBtn');
const newWeblogForm = document.querySelector('#newWeblogForm');
const newWeblogBtn = document.querySelector('#newWeblogBtn');

// Display new weblog form on button click.
showFormBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (newWeblogForm.style.display === 'none') {
        newWeblogForm.style.display = 'block';
    } else {
        newWeblogForm.style.display = 'none';
    }
});

document.querySelector("#newWeblogForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const newWeblogObj = {
        title: document.querySelector("#weblogTitle").value,
        text: document.querySelector("#weblogText").value
    }
    console.log(newWeblogObj);
    fetch("/api/weblogs", {
        method: "POST",
        body: JSON.stringify(newWeblogObj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res => {
        if (res.ok){
            location.href="/dashboard"
        } else {
            alert("Error.")
        }
    })
})

