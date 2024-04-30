const user_id = localStorage.getItem('user_id')
const fethUser= ()=>{
    const span = document.getElementById("name")
    fetch(`https://thebookishnook.onrender.com/accounts/list/${user_id}`)
    .then(res=>res.json())
    .then(data=>( span.innerText= data.first_name +' ' + data.last_name))
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
        </div>
      </div>
        `
        parent.appendChild(div)
            })
            
        })
    })
}

fethUser();
handleWishlist();