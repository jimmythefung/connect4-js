var toggleBtn = document.querySelector(".toggle-button");
var mobileNav = document.querySelector(".mobile-nav");

var backdrop = document.querySelector(".backdrop");
backdrop.addEventListener("click", function(){
    mobileNav.classList.remove('open');
    backdrop.classList.remove('open');
})

toggleBtn.addEventListener("click", function () {
    mobileNav.classList.add('open');
    backdrop.classList.add('open');
});
