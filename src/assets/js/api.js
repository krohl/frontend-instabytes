import { API_URL } from "./env.js";

// Função para buscar os dados do endpoint
export async function fetchImages() {
  try {
    const response = await fetch(API_URL + '/posts', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }); // Usando a URL importada
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

export async function imgUpload(form) {
  const formData = new FormData(form);

  try {
    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }
}

export async function profileImgUpload(form) {
  const formData = new FormData(form);

  try {
    const response = await fetch("http://localhost:3000/user/profile/image", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }
}

export async function getProfileImg() {
  try {
    const response = await fetch("http://localhost:3000/user/profile/image", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

export async function deleteImage(id) {
  try {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    console.log(await response.json());
    // window.location.reload();
  } catch (e) {
    console.error(e);
  }
}

export async function login(email, password) {
  try {
    const body = JSON.stringify({ email, password });
    const response = await fetch(`http://localhost:3000/login`, {
      method: "POST", body: body,
      headers: { 'Content-Type': 'application/json' },
    });
    const token = await response.json();

    if (token.error) {
      alert("Usuário ou senha inválidos");
      return;
    }

    if (!token.token) {
      alert("Erro ao fazer login");
      return;
    }

    localStorage.setItem('token', token.token);

    const login = document.getElementById("login");
    const profile = document.getElementById("profile-container");

    login.style.display = "none";
    profile.style.display = "block";

    console.log("Logado com sucesso!");
    const loginEvent = new CustomEvent("login");
    document.dispatchEvent(loginEvent);

    return token;
  } catch (e) {
    console.error(e);
  }
}

export async function imgSubmit(event) {
  console.log(event);
}
