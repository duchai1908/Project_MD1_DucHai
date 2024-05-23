function changePic(imgs){
    let expandImg = document.getElementById("expandedImg");
    expandImg.src = imgs.src;
}
relatedProduct();
showDeltail();
var a = document.getElementById("panel-item");
var b = document.getElementById("panel-item1");
var c = document.getElementById("tab-1");
var d = document.getElementById("tab-2")
a.onclick=function(){
    a.classList.add("active");
    b.classList.remove("active");
    d.classList.add("hidden");
    c.classList.remove("hidden");
};
b.onclick = function(){
    a.classList.remove("active");
    b.classList.add("active");
    c.classList.add("hidden");
    d.classList.remove("hidden");
};

const listBox = document.querySelectorAll('.single-product');
const wrapperBox = document.querySelector('.review-box');
const btnLeft = document.querySelector('.btnLeft');
const btnRight = document.querySelector('.btnRight');
const reviewDiv = document.querySelector('.review');
document.addEventListener('DOMContentLoaded', function () {
  // responsive
  // const scrollbarWidth =
  //     window.innerWidth - document.documentElement.clientWidth;

  window.addEventListener('resize', function () {
      if (window.innerWidth >= 1200) {
          make_slide(4);
      } else if (window.innerWidth >= 992) {
          make_slide(3);
      } else {
          make_slide(1);
      }
  });

  const media = [
      window.matchMedia('(max-width: 1366px)'),
      window.matchMedia('(min-width: 992px)'),
  ];

  if (media[0].matches) {
      make_slide(4);
  } else if (media[1].matches) {
      make_slide(3);
  } else {
      make_slide(1);
  }
});

function make_slide(amountSlideAppear) {
  // set width and margin for item slide
  const widthItemAndMargin = reviewDiv.offsetWidth / amountSlideAppear;
  let widthAllBox = widthItemAndMargin * listBox.length;
  wrapperBox.style.width = `${widthAllBox}px`;

  listBox.forEach((element) => {
      element.style.marginRight = '20px';
      element.style.width = `${widthItemAndMargin - 20}px`;
  });

  // handle slide
  let count = 0;
  let spacing = widthAllBox - amountSlideAppear * widthItemAndMargin;
  btnRight.addEventListener('click', function () {
      count += widthItemAndMargin;

      if (count > spacing) {
          count = 0;
      }
      wrapperBox.style.transform = `translateX(${-count}px)`;
  });

  btnLeft.addEventListener('click', function () {
      count -= widthItemAndMargin;

      if (count < 0) {
          count = spacing;
      }
      wrapperBox.style.transform = `translateX(${-count}px)`;
  });
}

function showDeltail(){
    let singleDetailId = JSON.parse(localStorage.getItem("single_product")) || {};
    let product = JSON.parse(localStorage.getItem("product"));
    let findIndexSingle = product.findIndex(item =>item.id == singleDetailId.product_id );
    let mainContent = document.getElementById("main-content-detail");
    let stringHTML = 
    `
            <div class="single-product-img">
                <div class="main-img">
                    <img id="expandedImg" src="${product[findIndexSingle].image}" alt="">
                </div>
                <div class="sub-img">
                    <img src="../../img/product-thumb-1.jpg" alt="" onclick = "changePic(this);">
                    <img src="../../img/product-thumb-2.jpg" alt="" onclick = "changePic(this);">
                    <img src="../../img/product-thumb-3.jpg" alt="" onclick = "changePic(this);">
                </div>
            </div>
            <div class="single-product-info">
                <h2>${product[findIndexSingle].name}</h2>
                <div class="product-inner-price">
                    <ins>${product[findIndexSingle].price}
                </div> 
                <form action="" class="single-cart">  
                    <div class="cart-submit">
                        <input type="number" size="4" class="numberCart" title="Qty" value="1" name="quantity" min="1" step="1">
                        <button class=" btn add_to_cart_button" type="submit">ADD TO CART</button>
                    </div>                        
                </form>
                <div class="product-inner-category">
                    <p>Category: <a href="">Summer</a>. Tags: <a href="">awesome</a>, <a href="">best</a>, <a href="">sale</a>, <a href="">shoes</a>. </p>
                </div>
                <div class="tabpanel">
                    <ul class="panel-list">
                        <li class="panel-item active" id="panel-item"><a class="panel-link" >Description</a></li>
                        <li class="panel-item" id="panel-item1" ><a class="panel-link" >Review</a></li>
                    </ul>
                </div>
                <div class="tab-content">
                    <div class="tab-1" id ="tab-1">
                        <h2>Product Description</h2>
                        ${product[findIndexSingle].description}
                    </div>
                    <div class="tab-2 hidden" id="tab-2">
                        <h2>Reviews</h2>
                        <form class="reviews" action="#">
                            <p>Name</p>
                            <input type="text" name="txtname">
                            <p>Email</p>
                            <input type="text" name="txtemail">
                            <p>Your rating</p>
                            <div class="rating-wrap-post">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <p>Your revidew</p>
                            <textarea></textarea>
                            <p><input type="submit" value="Submit"></p>
                        </form>
                    </div>    
                </div>
            </div>    
    `;
    mainContent.innerHTML= stringHTML;
}

function relatedProduct(){
    let reviewbox = document.getElementById("review-box");
    let singleDetailId = JSON.parse(localStorage.getItem("single_product")) || {};
    let product = JSON.parse(localStorage.getItem("product"));
    let findIndexSingle = product.findIndex(item =>item.id == singleDetailId.product_id );
    let singleProductCate = product[findIndexSingle]["category-id"];
    product = product.filter(item => item["category-id"] == singleProductCate);
    let stringHTML = "";
    for(let i = 0; i< product.length; i++){
    stringHTML += `
        <div class="single-product">
            <div class="product-f-image">
                <img src="${product[i].image}" alt="">
                <div class="product-hover">
                    <a href="#" class="add-to-cart-link"><i class="fa fa-shopping-cart"></i> Add to cart</a>
                    <a href="single-product.html" class="view-details-link"><i class="fa fa-link"></i> See details</a>
                </div>
            </div>
            
            <h2><a href="single-product.html">${product[i].name}</a></h2>
            
            <div class="product-carousel-price">
                <ins>${product[i].price}</ins>
            </div>
        </div>
    `;
    }
    reviewbox.innerHTML =stringHTML;
}
