export function openModal() {
    if (typeof window !== "undefined") {
        var backdrop = document.querySelector(".backdrop");
        var modal = document.querySelector(".modal");
        backdrop.style.display = "block";
        modal.style.display = "block";

        var modalContinueBtn = document.querySelector(".modal__action--continue");
        modalContinueBtn.addEventListener('click', closeModal);
    }
}

function closeModal() {
    if (typeof window !== "undefined") {
        var backdrop = document.querySelector(".backdrop");
        var modal = document.querySelector(".modal");
        backdrop.style.display = "none";
        modal.style.display = "none";
    }
}
