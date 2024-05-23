
let adminLogin = JSON.parse(localStorage.getItem("admin_login")) || [];
let adminName = document.getElementById("admin-name");
adminName.innerText = adminLogin.name ;
checkAdminLogin();
function checkAdminLogin(){
    let admin = JSON.parse(localStorage.getItem("admin_login")) || [];
    if(admin.length < 1){
        window.location.href ="http://127.0.0.1:5500/admin/adminlogin.html";
    }
}
function logout(e){
    e.preventDefault();
    console.log("haha");
    localStorage.removeItem("admin_login");
    window.location.href ="http://127.0.0.1:5500/admin/adminlogin.html";
}
