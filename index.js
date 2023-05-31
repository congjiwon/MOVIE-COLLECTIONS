const cardWrapper = document.getElementById("card-wrapper");
const cards = document.getElementsByClassName("card");
const input = document.getElementById("input");
const searchBtn = document.getElementById("search_btn");

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
    let arr = response.results; //tmdb에서 api 받아와서 arr에 넣어주기

    const makeCard = function (arr) {
      arr.forEach((a) => {
        let title = a["title"];
        let overview = a["overview"];
        let poster_path = a["poster_path"];
        let vote_average = a["vote_average"];
        let id = a["id"];

        let temp_html = `<div class="card" onclick="alert(${id})">
                              <img src="https://image.tmdb.org/t/p/w200${poster_path}" alt="" />
                              <h3 id="title">${title}</h3>
                              <p id="score">score: ${vote_average}</p>
                              <p id="movieId" style="display:none">${id}</p>
                              <p id="explanation">${overview}</p>
                        </div>`;

        cardWrapper.innerHTML += temp_html;
      });
    };
    makeCard(arr);

    //검색창에 입력받은 제목과 카드의 내부카드제목이 같은 영화들을 filterdMovied

    searchBtn.addEventListener("click", () => {
      const inputMovieTitle = input.value.toLowerCase();
      const filteredMovies = arr.filter((arr) =>
        arr.title.toLowerCase().includes(inputMovieTitle)
      );

      if (filteredMovies.length >= 1) {
        cardWrapper.innerHTML = "";
        console.log(filteredMovies);
        makeCard(filteredMovies);
      } else {
        //없으면 빈화면보이게
        cardWrapper.innerHTML = "";
      }
    });
  })
  .catch((err) => console.error(err));
