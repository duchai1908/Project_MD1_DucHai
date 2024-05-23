var qty = document.getElementById("qty");
var plus = document.getElementById("btnplus");
var minus = document.getElementById("btnminus");
var calculate = document.getElementById("calculate");
var updatetotal = document.getElementById("updateTotal");
var remove_cart = document.getElementsByClassName("btn-del");
plus.addEventListener("click",function(e){
    minus.classList.remove("readOnly");
    e.preventDefault();
    let total = +qty.value + 1;
    qty.value = total;
});

minus.addEventListener("click",function(e){
    e.preventDefault();
    if(qty.value == 1){
        minus.classList.add("readOnly");
    }else{    
        minus.classList.remove("readOnly");
        let total = +qty.value - 1;
        qty.value = total;
    }
});
calculate.addEventListener("click",function(e){
    e.preventDefault();
    updatetotal.classList.toggle("update-totals");
})

