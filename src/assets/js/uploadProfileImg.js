import { profileImgUpload, getProfileImg } from "./api.js";
import jwt from "jsonwebtoken";

export async function uploadProfileImg() {
    const uploadProfileImgModal = document.getElementById("uploadProfileImgModal");
    const uploadProfileImgCloseBtn = document.querySelector(".uploadProfileImgClose");
    const uploadProfileImgSpinner = document.getElementById("uploadProfileImgSpinner");
    const profilePicContainer = document.getElementById("profilePicContainer");

    uploadProfileImgModal.style.display = "none";

    uploadProfileImgCloseBtn.addEventListener("click", () => {
        uploadProfileImgModal.style.display = "none";
    });

    profilePicContainer.addEventListener("click", () => {
        uploadProfileImgSpinner.style.display = "none";
        uploadProfileImgModal.style.display = "block";
    });

    window.addEventListener("click", function (event) {
        if (event.target === uploadProfileImgModal) {
            uploadProfileImgModal.style.display = "none";
        }
    });

    window.addEventListener("DOMContentLoaded", (event) => {
        const uploadProfileImgForm = document.getElementById("uploadProfileImgForm");
        const uploadProfileImgSpinner = document.getElementById("uploadProfileImgSpinner");
        const uploadProfileImgInputSubmit = document.getElementById("uploadProfileImgInputSubmit");

        uploadProfileImgForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            uploadProfileImgInputSubmit.value = '';
            uploadProfileImgSpinner.style.display = "block";
            await profileImgUpload(uploadProfileImgForm);
            uploadProfileImgSpinner.style.display = "none";
            uploadProfileImgModal.style.display = "none";
            uploadProfileImgInputSubmit.value = 'Enviar';
            await setProfileImgOrDefault();
        });
    });
}

export async function setProfileImgOrDefault() {
    const url = await getProfileImg();
    const profilePic = document.getElementById("profile-pic");
    const profilePicDefault = document.getElementById("profilePicDefault");

    if (url.url) {
        profilePicDefault.style.display = "none";
        profilePic.src = url.url;
        profilePic.style.display = "block";
    } else {
        profilePicDefault.style.display = "block";
        profilePic.style.display = "none";
    }
}

export async function setProfileNickname() {
    const nickname = document.getElementById("nickname");
    const decoded = jwt.decode(localStorage.getItem("token"));
    nickname.innerHTML = decoded.nickname;
}
