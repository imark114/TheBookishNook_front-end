const getBookDetail = ()=>{
    const param = new URLSearchParams(window.location.search).get('bookId')
    fetch(`https://thebookishnook.onrender.com/book/list/${param}`)
    .then(res=>res.json())
    .then(data=> ShowBookDetails(data))
}
const ShowBookDetails = (book)=>{
    // console.log(book);
    const div = document.getElementById("book_detail")
    div.innerHTML = `
    <div class="book_img">
    <img src="${book.image}" alt="">
</div>
<div class="book_details">
    <h2>${book.title}</h2>
    <p class="author">${book.author}</p>
    <p>${book.description}</p>
    <div class="book_details_more">
        <div class="core_details">
            <h4>First Publish:</h4>
            <p>${book.publication_date}</p>
        </div>
        <div class="core_details">
            <h4>ISBN:</h4>
            <p>${book.isbn}</p>
        </div>
        <div class="core_details">
            <h4>Quantity:</h4>
            <p id="book_quantity">${book.quantiry}</p>
        </div>
        <div class="core_details">
            <h4>Genre:</h4>
            <p class="genre"> ${
                book.genres.map(item=> {
                    return `<button>${item}</button>`
                })
            }</p>
        </div>
    </div>
    <div class="book_button mt-4">
    <button class="cart_btn" onclick="handleBorrowBook()">Add to Cart</button>
    <button class="wish_btn" onclick="handleWishlist()">Add to Wishlist</button>
    </div>
</div>
    `
}

const loadBookReviews = ()=>{
    const param = new URLSearchParams(window.location.search).get('bookId')
    fetch(`https://thebookishnook.onrender.com/book/review/?book_id=${param}`)
    .then(res=>res.json())
    .then(data=>showReviews(data))
}



const showReviews = (reviews)=>{
    const parent = document.getElementById("review")
    reviews.forEach(review=>{
        // console.log(review);
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="review_section">
        <h5>User Id: ${review.reviwer}</h5>
        <p>${review.body}</p>
        <p>${review.rating}</p>
    </div>
        `
        parent.appendChild(div);
    })
}

const handleBorrowBook = ()=>{
    const param = new URLSearchParams(window.location.search).get('bookId')
    const book_quantity = document.getElementById("book_quantity").innerHTML
    let quantity = parseInt(book_quantity)
    const user_id = localStorage.getItem('user_id')
    console.log(user_id);
    if (user_id === 'undefined' || user_id === null){
        window.location.href = 'login.html'
        console.log("hello");
    }
    else{
        console.log("world");
        quantity-=1;
        fetch(`https://thebookishnook.onrender.com/book/list/${param}`, {
            method: "PATCH",
            headers:{ "Content-Type" : "application/json"},
            body: JSON.stringify({"quantiry": quantity, "can_review": true})
        })
        .then(res=> res.json())
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
    }
}
const handleWishlist=()=>{
    const param = new URLSearchParams(window.location.search).get('bookId')
    const user = localStorage.getItem("user_id")
    const info = {
        user,
       "books": [param]
    }
    fetch("https://thebookishnook.onrender.com/book/wishlist/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(info),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
}
getBookDetail();
loadBookReviews();