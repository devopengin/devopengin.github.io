let isModalOpen = false; // Переменная для отслеживания состояния модального окна
let isHamburgerOpen = false; // Переменная для отслеживания состояния гамбургерного меню
const html = document.documentElement;
const modal = document.getElementById("myModal");
const modal2 = document.getElementById("myModal2");
const btn = document.getElementById("myBtn");
const btn2 = document.getElementById("myBtn2");
const btn3 = document.querySelectorAll('#myBtn3');
const all_page = document.querySelector(".main-main-page");
const hamburger = document.querySelector(".hamburger");
const points_in_menu = document.querySelector(".points");

// Обработчик клика по гамбургерному меню
hamburger.addEventListener("click", () => {
    if (!isModalOpen) {
        hamburger.classList.toggle("active-hamburger");
        points_in_menu.classList.toggle("active-hamburger");
        html.classList.toggle("noscroll");
        isHamburgerOpen = !isHamburgerOpen;
        // Если гамбургерное меню открыто, закрываем модальные окна
        if (isHamburgerOpen) {
            toggleModal(modal, false);
            toggleModal(modal2, false);
        }
    }
});

// Обработчик клика по элементам меню
document.querySelectorAll(".nav-memu-act").forEach(n => {
    n.addEventListener("click", () => {
        hamburger.classList.remove("active-hamburger");
        points_in_menu.classList.remove("active-hamburger");
        html.classList.remove("noscroll");
        isHamburgerOpen = false;
    });
});

// Функция для открытия/закрытия модального окна
function toggleModal(modalElement, isOpen) {
    // Проверяем, открыто ли гамбургерное меню
    if (!isHamburgerOpen) {
        modalElement.style.display = isOpen ? "block" : "none";
        isModalOpen = isOpen;
    }
}

// Обработчики клика для закрытия модальных окон
const closeButton = modal.querySelector(".close");
const closeButton2 = modal2.querySelector(".close2");
closeButton.addEventListener("click", () => toggleModal(modal, false));
closeButton2.addEventListener("click", () => toggleModal(modal2, false));

// Обработчики клика для открытия модальных окон
btn.onclick = () => toggleModal(modal, true);
btn2.onclick = () => toggleModal(modal2, true);
btn3.forEach(btn => btn.onclick = () => toggleModal(modal2, true));

// Обработчик клика для закрытия модальных окон при клике вне модальных окон
all_page.onclick = event => {
    if (!event.target.matches('.main-main-page') && !event.target.matches('#myBtn3') && !event.target.matches('#myBtn') && !event.target.matches('#myBtn2')) {
        toggleModal(modal, false);
        toggleModal(modal2, false);
    }
};

document.querySelectorAll(".mybtn, .mybtn2").forEach(btn => {
    btn.addEventListener("click", () => {
        toggleModal(modal, true);
        toggleModal(modal2, true);
    });
});

document.querySelectorAll(".close-modal").forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
        toggleModal(modal, false);
        toggleModal(modal2, false);
    });
});

function getAct() {
    const links = Array.from(document.querySelectorAll(".nav-memu-act"));
    links.forEach(link => {
        link.classList.toggle("active", window.location.href === link.href);
    });
}

window.addEventListener("load", getAct);
