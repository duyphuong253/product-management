const showAlert = document.querySelector("[show-alert]");

if (showAlert) {
    const time = parseInt(showAlert.dataset.time) || 3000;
    const closeBtn = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
        setTimeout(() => showAlert.remove(), 300);
    }, time);

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            showAlert.classList.add("alert-hidden");
            setTimeout(() => showAlert.remove(), 300);
        });
    }
}

