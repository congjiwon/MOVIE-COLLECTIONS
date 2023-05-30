class movieCard {
  // title(제목), overview(내용 요약), poster_path(포스터 이미지 경로), vote_average(평점), id(영화식별값)
  constructor(title, overview, poster_path, vote_average, id) {
    this.title = title;
    this.overview = overview;
    this.poster_path = poster_path;
    this.vote_average = vote_average;
    this.id = id;
  }
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjA4ZjU5ZDE5ZThjYmRiZTcyMzI3NGM2NDM5NDE0MCIsInN1YiI6IjY0NzFmNGExOTQwOGVjMDBhN2ZhNDBhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WLkluwBQ0KYIj8JX-MpS5i535Dry4NMyKrq9iRnaOA4",
  },
};
movies = [];
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    let arr = response.results;
    arr.forEach((a) => {
      //forEach 돌면서 받아온 api 데이터 중 유의미한 값들만 뽑아오기
      let title = a["title"];
      let overview = a["overview"];
      let poster_path = a["poster_path"];
      let vote_average = a["vote_average"];
      let id = a["id"];

      //class사용해서 각 영화의 정보들을 인스턴스로 만들어주기
      let movieInfo = new movieCard(
        title,
        overview,
        poster_path,
        vote_average,
        id
      );
      movies.push(movieInfo);
    });
  })
  .catch((err) => console.error(err));
