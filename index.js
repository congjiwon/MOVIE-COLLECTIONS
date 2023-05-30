let movies = [];
const cardWrapper = document.getElementById("card-wrapper");
const cardWrapper123 = document.querySelector(".card");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjA4ZjU5ZDE5ZThjYmRiZTcyMzI3NGM2NDM5NDE0MCIsInN1YiI6IjY0NzFmNGExOTQwOGVjMDBhN2ZhNDBhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WLkluwBQ0KYIj8JX-MpS5i535Dry4NMyKrq9iRnaOA4",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    let arr = response.results;
    console.log(arr);

    arr.forEach((a) => {
      let title = a["title"];
      let overview = a["overview"];
      let poster_path = a["poster_path"];
      let vote_average = a["vote_average"];
      let id = a["id"];

      console.log(poster_path);

      let temp_html = `<div class="card">
                              <img src="https://image.tmdb.org/t/p/w200${poster_path}" alt="" />
                              <h3 id="title">${title}</h3>
                              <p id="score">score: ${vote_average}</p>
                              <p id="explanation">${overview}</p>
                          </div>`;

      cardWrapper.innerHTML += temp_html;
    });
  })
  .catch((err) => console.error(err));
