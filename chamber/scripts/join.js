// Timestamp
document.getElementById("timestamp").value = new Date().toISOString();

// Modals
document.querySelectorAll("[data-modal]").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        document.getElementById(link.dataset.modal).showModal();
    });
});

document.querySelectorAll(".close").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest("dialog").close();
    });
});

document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", e => {
        if (e.target === dialog) {
            dialog.close();
        }
    });
});

