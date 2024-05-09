const user_id = localStorage.getItem('user_id')
const handleCartData=()=>{
    const parent = document.getElementById("cart_table");
    const span = document.getElementById("cart_count");
    let count = 0;
    fetch(`https://thebookishnook.onrender.com/borrow_book/list/?customer_id=${user_id}`)
    .then(res=>res.json())
    .then(data=>{
        span.innerText= data.length ? data.length : '0';
        data.forEach(item=>{
            count++;
            const tr = document.createElement("tr")
            tr.innerHTML = `
            <th scope="row">${count}</th>
            <td>${item.book}</td>
            <td>${item.borrow_date}</td>
            <td> ${
                (item.return_date != null ) ? item.return_date : `<button class="btn btn-danger" onclick= "handleRetrun(${item.id}, ${item.book})" >Return</button>`
            } </td>
            `
            parent.appendChild(tr);
        })
    })
}

const handleRetrun=(id, book_id)=>{
    fetch(`https://thebookishnook.onrender.com/borrow_book/list/${id}/`,{
        method: "PATCH",
        headers:{ "Content-Type" : "application/json"},
        body: JSON.stringify({"return_date": getCurrentDate()})
    })
    .then(res=>res.json())
    let quantity;
    fetch(`https://thebookishnook.onrender.com/book/list/${book_id}/`)
    .then(response=> response.json())
    .then(data=> {
        quantity= data.quantiry;
        quantity++
        fetch(`https://thebookishnook.onrender.com/book/list/${book_id}/`,{
            method: "PATCH",
            headers:{ "Content-Type" : "application/json"},
            body: JSON.stringify({"quantiry": quantity})
        })
        .then(r=> r.json())
        .then(d=>(window.location.reload()))
    })
}
function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  mm = mm < 10 ? '0' + mm : mm;
  dd = dd < 10 ? '0' + dd : dd;

  return yyyy + '-' + mm + '-' + dd;
}
handleCartData();