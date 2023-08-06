var toggleBtn = document.querySelector(".toggle-button");
var mobileNav = document.querySelector(".mobile-nav");

var backdrop = document.querySelector(".backdrop");
backdrop.addEventListener("click", function(){
    mobileNav.style.display = "none";
    backdrop.style.display = "none";
})

toggleBtn.addEventListener("click", function () {
    mobileNav.style.display = "block";
    backdrop.style.display = "block";
});
