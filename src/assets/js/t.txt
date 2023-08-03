let body = document.body;
let sideBar = document.querySelector(".sidebar");
var menuBtn = document.getElementById("menu-btn");

let profile = document.querySelector(".header .flex .profile");
let searchForm = document.querySelector(".header .flex .search-form");

document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
  profile.classList.remove("active");
};

document.querySelector("#menu-btn").onclick = () => {
  sideBar.classList.toggle("active");
  body.classList.toggle("active");
};

document.querySelector("#user-btn").onclick = () => {
  profile.classList.toggle("active");
  searchForm.classList.remove("active");
};

document.querySelector(".sidebar .close-side-bar").onclick = () => {
  sideBar.classList.remove("active");
  body.classList.remove("active");
};

window.onscroll = () => {
  profile.classList.remove("active");
  searchForm.classList.remove("active");

  if (window.innerWidth < 1200) {
    sideBar.classList.remove("active");
    body.classList.remove("active");
  }
};


// let toggleBtn = document.querySelector('#toggle-btn');

document.querySelector("#toggle-btn").onclick = () => {
    window.location.reload();
}
