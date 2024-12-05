import { fetchImages, deleteImage } from "./api";
import { uploadProfileImg, setProfileImgOrDefault, setProfileNickname } from "./uploadProfileImg";

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const posts = document.getElementById("posts");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");
const delBtn = document.querySelector(".del-btn");
const uploadImgCloseBtn = document.querySelector(".uploadImgClose");
// const authClose = document.querySelector(".authClose");

const uploadImgModal = document.getElementById("uploadImgModal");
const imgUploadSpinner = document.getElementById("imgUploadSpinner");
const addBtn = document.getElementById("add-btn");

const logoutBtn = document.getElementById("logout-btn");

const login = document.getElementById("login");
const profile = document.getElementById("profile-container");
const profilePic = document.getElementById("profile-pic");
const profilePicDefault = document.getElementById("profilePicDefault");
const profilePicEdit = document.getElementById("profilePicEdit");

modal.style.display = "none";
uploadImgModal.style.display = "none";

const imageGrid = document.querySelector(".image-grid");

uploadProfileImg();

// Função para buscar e exibir os dados do endpoint
export default async function displayImages() {
  console.log("displayImages");
  const data = await fetchImages();

  if (data.message) {
    login.style.display = "flex";
    profile.style.display = "none";
    return;
  } else {
    login.style.display = "none";
    profile.style.display = "block";
  }

  try {

    imageGrid.innerHTML = "";

    posts.innerHTML = `${data.length} ${data.length === 1 ? "publicação" : "publicações"}`;

    const postsList = data.map(item => {
      return `
            <article data-description="${item.description}">
              <figure>
                <img src="${item.image_url}" alt="${item.alt}" id="${item._id}" />
              </figure>
            </article>
          `
    }).join('');
    imageGrid.insertAdjacentHTML('beforeend', postsList)

    // Adicionando eventos de clique para cada imagem carregada
    addImageClickEvents();
  } catch (error) {
    console.error("Erro ao popular página", error);
  }
}

// Função para adicionar os eventos de clique às imagens
function addImageClickEvents() {
  const images = document.querySelectorAll(".image-grid img");
  images.forEach(img => {
    img.addEventListener("click", function () {
      captionText.textContent = "";
      modal.style.display = "flex";
      modalImg.src = this.src;
      modalImg.id = this.id;

      const article = this.closest("article");
      const description = article ? article.dataset.description : '';
      let caption = description || this.alt;
      caption = caption.replaceAll('\n', '<br />');
      captionText.innerHTML = `<p>${caption}</p>`;
    });
  });
}

profilePic.addEventListener("mouseenter", function () {
  profilePicEdit.setAttribute("style", "display: block !important;");
});

profilePic.addEventListener("mouseleave", function () {
  profilePicEdit.setAttribute("style", "display: none !important;");
});
profilePicDefault.addEventListener("mouseenter", function () {
  profilePicEdit.setAttribute("style", "display: block !important;");
});

profilePicDefault.addEventListener("mouseleave", function () {
  profilePicEdit.setAttribute("style", "display: none !important;");
});

// Evento de fechar o modal
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

uploadImgCloseBtn.addEventListener("click", function () {
  uploadImgModal.style.display = "none";
});

// authClose.addEventListener("click", function () {
//   authModal.style.display = "none";
// });

delBtn.addEventListener("click", async function () {
  delBtn.classList.add('spinner');
  delBtn.innerHTML = '';
  await deleteImage(modalImg.id);
  modal.style.display = "none";
  delBtn.classList.remove('spinner');
  delBtn.innerHTML = 'delete';
  displayImages();
});

addBtn.addEventListener("click", function () {
  imgUploadSpinner.style.display = "none";
  uploadImgModal.style.display = "block";
});

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("token");
  window.location.reload();
});

// Fechar o modal clicando fora dele
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  } else if (event.target === uploadImgModal) {
    uploadImgModal.style.display = "none";
  }
});


// Chamar a função para buscar e exibir as imagens ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
  displayImages();
  setProfileImgOrDefault();
  setProfileNickname();
});
document.addEventListener('login', function () {
  displayImages();
  setProfileImgOrDefault();
  setProfileNickname();
});

export function imgSubmit(event) {
  console.log(event);
}
