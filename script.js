const API_URL = "https://api.github.com/users/";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

search.focus();

async function getUser(userName) {
  try {
    const { data } = await axios(API_URL + userName);
    /*   const data = await res.json();  regular expression without axios*/
    createUserCard(data);
  } catch (err) {
    if (err.response.status == 404) {
      createErrorCard("No profile with this username");
    }
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);
    search.value = "";
  }
});

function createUserCard(user) {
  const cardHTML = `
  <div class="card">
  <div>
    <img
      src="${user.avatar_url}"
      alt="${user.name}"
      class="avatar"
    />
  </div>
  <div class="user-info">
    <h2>${user.name}</h2>
    <p>
    ${user.bio}
    </p>
    <ul>
      <li>${user.followers} <strong>followers</strong></li>
      <li>${user.following} <strong>following</strong></li>
      <li>${user.public_repos} <strong>repos</strong></li>
    </ul>
    <div id="repos">
    </div>
  </div>
</div>`;
  main.innerHTML = cardHTML;
}

function createErrorCard(message) {
  const cardHTML = `
    <div class="card">
    <h1> ${message} </h1>
    </div>`;
  main.innerHTML = cardHTML;
}
