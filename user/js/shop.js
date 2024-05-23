const PRODUCT = "product";
const DETAILPRODUCT = "detail_product";
const CATEGORY = "category";
const pageList = document.getElementById("page-list");
let pageSize = 5;
let totalPage = 1;
let currentPage = 1;
let imageBase64 = null;
let textSearch = "";
let categoryFilter = "All";
const showProducts = document.getElementById("showProduct");
const productHead = document.getElementById("product-head");
let checkDetailProduct = JSON.parse(localStorage.getItem(DETAILPRODUCT)) || {};
render();
function render(){
    let products = JSON.parse(localStorage.getItem(PRODUCT)) || [];
    //lọc theo category
    if(Object.keys(checkDetailProduct).length > 0){
        let category = JSON.parse(localStorage.getItem(CATEGORY)) || [];
        let categoryIndex = category.findIndex(item => item.id == checkDetailProduct.cate);
        productHead.innerHTML = category[categoryIndex].name;   
        products = products.filter(product => product["category-id"] == checkDetailProduct.cate);
    }else{
        productHead.innerHTML = "All Products"; 
    } 
    //lọc theo search
    products = products.filter(product => product.name.toLowerCase().includes(textSearch));
    renderPaginations(products);
    renderProducts(products);
}
function renderPaginations(products) {
    totalPage = Math.ceil(products.length / pageSize); //làm trên lên 
    let stringHTML = ""
    for (let i = 1; i <= totalPage; i++) {
        if (currentPage === i) {
            stringHTML += `
            <span class="page-item page-active" onclick="clickPage(${i})">${i}</span>
            `
        }
        else {
            stringHTML += `
            <span class="page-item " onclick="clickPage(${i})">${i}</span>
            `
        }
    }
    pageList.innerHTML = stringHTML;
}
function renderProducts(products) {
    let stringProducts = ""
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize
    if (end > products.length) {
        end = products.length
    }
    for (let i = start; i < end; i++) {
        stringProducts+=
            `
               <div class="single-product">
                    <div class="product-f-image" >
                        <img src="${products[i].image}"  style="object-fit: cover;" alt="">
                    </div>             
                    <div class="nameproduct"><a style="cursor:pointer;" onclick = "movetoSingle(${products[i].id})">${trimString(products[i].name,30)}</a></div>
                    <div class="product-carousel-price">
                        <ins>${formatMoney(products[i].price)}</ins> 
                    </div>
                 </div>
            `
    }
    showProducts.innerHTML = stringProducts;
}
function trimString(string, length) {
    return string.length > length ? 
           string.substring(0, length) + '...' :
           string;
};
function formatMoney(money) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}
function changeTextSearch(e) {
    textSearch = e.target.value.toLowerCase();
    render();
}
function changePageProduct(){
    console.log("aa");
    localStorage.removeItem("detail_product");
    window.location.href="http://127.0.0.1:5500/user/pages/shop.html";
}
function clickPage(i) {
    currentPage = i;
    render();
}

//B13 nhấn trái phải nút button
function changePage(status) {
    if (status === -1 && currentPage > 1) {
        currentPage -= 1;
    }
    if (status === 1 && currentPage < totalPage) {
        currentPage += 1;
    }
    render();
}

//B14 tăng số lượng product của 1 trang
function changePageSize(e) {
    pageSize = e.target.value;
    currentPage = 1;
    render();
}
function movetoSingle(id){
    let value = {};
        value ={
            product_id: id,
        }
    localStorage.setItem("single_product", JSON.stringify(value));
    window.location.href="http://127.0.0.1:5500/user/pages/single-product.html";
}