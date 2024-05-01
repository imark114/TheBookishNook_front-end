const loadBooks = ()=>{
    fetch("https://thebookishnook.onrender.com/book/list/")
    .then(res=> res.json())
    .then(data=>handleBooks(data))
}

const handleBooks = (books) =>{
    // console.log(books);
    const books_container = document.getElementById("books")
    books?.forEach(book=>{
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card text-center p-3" style="width: 18rem;">
        <img src=${book.image} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text"><strong>Author: </strong><span class="author">${book.author}</span></p>
          <a href="./book_details.html?bookId=${book.id}" class="btn book_btn">Want To Read</a>
        </div>
      </div>
        `
        books_container?.appendChild(div)
    })
    const signup = document.getElementById("signup_btn")
  const login = document.getElementById("login_btn")
  const logout = document.getElementById("logout_btn")
  const profile = document.querySelector("#profile_btn")
  const user_id = localStorage.getItem('user_id')
    if (user_id === 'undefined' || user_id === null){
      console.log(profile);
      profile?.classList.add("hide_btn");
      logout?.classList.add("hide_btn");
      signup?.classList.remove("hide_btn");
      login?.classList.remove("hide_btn");
      
    }
    else{
      signup?.classList.add("hide_btn");
      login?.classList.add("hide_btn");
      profile?.classList.remove("hide_btn");
      logout?.classList.remove("hide_btn");
    }
}


const handleLogout = ()=>{
  const token = localStorage.getItem('token')
  fetch("https://thebookishnook.onrender.com/accounts/logout/",{
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(res=> res.json())
  .then(data=>console.log(data))
}

loadBooks();
handleBooks();

