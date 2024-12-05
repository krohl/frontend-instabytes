import { login, imgUpload } from "./api";
import displayImages from "./index";

window.addEventListener("DOMContentLoaded", (event) => {
    const form = document.querySelector("#imgUpload");
    const authForm = document.querySelector("#auth");

    form.addEventListener("submit", async (event) => {
        console.log('form');
        const uploadImgModal = document.getElementById("uploadImgModal");
        const imgUploadSpinner = document.getElementById("imgUploadSpinner");
        const imgUploadInputSubmit = document.getElementById("imgUploadInputSubmit");
        event.preventDefault();
        imgUploadInputSubmit.value = '';
        imgUploadSpinner.style.display = "block";
        await imgUpload(form);
        imgUploadSpinner.style.display = "none";
        uploadImgModal.style.display = "none";
        imgUploadInputSubmit.value = 'Enviar';
        await displayImages();
    });

    authForm.addEventListener("submit", (event) => {
        console.log('authForm');
        event.preventDefault();
        login(authForm.email.value, authForm.password.value);
    });
});
