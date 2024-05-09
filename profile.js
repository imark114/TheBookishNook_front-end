const user_id = localStorage.getItem('user_id')
const loadUserData= ()=>{
    const username = document.getElementById("u_username");
    const first_name = document.getElementById("u_first_name");
    const last_name = document.getElementById("u_last_name");
    const email = document.getElementById("u_email");
    fetch(`https://thebookishnook.onrender.com/accounts/list/${user_id}`)
    .then(res=>res.json())
    .then(data=>{
        username.value = data.username;
        first_name.value = data.first_name;
        last_name.value = data.last_name;
        email.value = data.email;
    })
}

const handleWishlist = ()=>{
    const span  = document.getElementById("count");
    const parent = document.getElementById("wishlist_container");
    fetch(`https://thebookishnook.onrender.com/book/wishlist/?user_id=${user_id}`)
    .then(res=>res.json())
    .then(data=>{
        span.innerText= data.length ? data.length : '0';
        data.forEach(item=>{
            // console.log(item.books[0]);
            const div = document.createElement('div');
            fetch(`https://thebookishnook.onrender.com/book/list/${item.books[0]}`)
            .then(res=>res.json())
            .then(info=> {
                div.innerHTML = `
        <div class="card text-center p-3" style="width: 18rem;">
        <img src=${info.image} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${info.title}</h5>
          <p class="card-text"><strong>Author: </strong><span class="author">${info.author}</span></p>
          <a href="./book_details.html?bookId=${info.id}" class="btn book_btn">Want To Read</a>
        </div>
      </div>
        `
        parent.appendChild(div)
            })
            
        })
    })
}

const updateProfile = (event)=>{
    event.preventDefault();
    const success = document.getElementById("u_success")
    const username = getValue("u_username");
    const first_name = getValue("u_first_name");
    const last_name = getValue("u_last_name");
    const email = getValue("u_email");
    const info = {
        username,
        first_name,
        last_name,
        email
    }
    fetch(`https://thebookishnook.onrender.com/accounts/list/${user_id}/`,{
        method:"PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
    })
    .then(res=>res.json())
    .then(data=> success.innerText="Updated Successfully");
}


const getValue = (id)=>{
    const value = document.getElementById(id).value;
    return value;
  }

loadUserData();
handleWishlist();