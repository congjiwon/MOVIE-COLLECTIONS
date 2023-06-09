let id = location.href.substr(location.href.lastIndexOf("=") + 1); //문자열을 id 변수에 할당 되기 전 숫잘 변환 (string → number 조건 충족)
const apiURL = "https://api.themoviedb.org/3/movie/" + id;

const movieName = document.getElementById("movieName");
const movieReleasedDate = document.getElementById("movieReleasedDate");
const movieGenre = document.getElementById("movieGenre");
const movieRuntime = document.getElementById("movieRuntime");
const movieRate = document.getElementById("movieRate");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjA4ZjU5ZDE5ZThjYmRiZTcyMzI3NGM2NDM5NDE0MCIsInN1YiI6IjY0NzFmNGExOTQwOGVjMDBhN2ZhNDBhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WLkluwBQ0KYIj8JX-MpS5i535Dry4NMyKrq9iRnaOA4",
  },
};

fetch(apiURL, options)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    let movieGenreArr = [];
    for (let i = 0; i < response.genres.length; i++) {
      movieGenreArr.push(response.genres[i].name);
    }
    moviePoster.innerHTML = `<img
    class="movie_img"
    src="https://image.tmdb.org/t/p/w300${response.poster_path}"
    alt=""
  />`;
    movieName.textContent = response.title;
    movieReleasedDate.textContent = "개봉 | " + response.release_date;
    movieGenre.textContent = "장르 | " + movieGenreArr;
    movieRuntime.textContent = "러닝타임 | " + response.runtime + "분";
    movieOverview.textContent = response.overview;
    movieRate.textContent = "평점 | " + response.vote_average;
  });

let submitBtn = document.getElementById("submitBtn");
let saveCommnetsArr = [];
let commentsList = document.getElementById("comments-list");

//브라우저 새로고침시 localStorage에 저장된 댓글데이터 가지고와서 화면 구성하기
if (localStorage.getItem("comment")) {
  let commentArr = JSON.parse(localStorage.getItem("comment"));

  // let movieId = location.href.substr(location.href.lastIndexOf("=") + 1);
  // let filteredReviews = commentArr.filter((review) => review.Id === movieId);

  console.log(commentArr);

  saveCommnetsArr.push(...commentArr);

  for (let i = 0; i < commentArr.length; i++) {
    let star = "⭐️";
    let score = star.repeat(commentArr[i].score);

    let commentDiv = document.createElement("div");
    commentDiv.className = "comment";
    let template = `
                        <p> <span class="commentName">${commentArr[i].name}</span> <span class="commentScore">${score}</span>
                        <span class="commentTime">${commentArr[i].time}</span></p>
                        <p class="commentContent">${commentArr[i].content}<p>
                        <button type="button" class="deleteBtn">삭제하기</button>
                        <button type="button" class="editBtn">수정하기</button>
    `;

    commentDiv.innerHTML = template;
    document.getElementById("comments-list").append(commentDiv);

    let deleteBtn = commentDiv.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => {
      let getPassword = prompt("비밀번호를 입력하세요");
      deleteComment(i, commentArr[i].password, getPassword);
    });

    let editBtn = commentDiv.querySelector(".editBtn");
    editBtn.addEventListener("click", () => {
      let getPassword = prompt("비밀번호를 입력하세요");
      editComment(i, commentArr[i].password, getPassword);
    });
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let input_name = document.getElementById("name_input");
  let input_score = document.getElementById("score_input");
  let input_password = document.getElementById("password_input");
  let input_content = document.getElementById("content");
  let input_time = currentTime();

  //폼 입력칸 중 하나라도 빈칸이 있다면 alert창 띄우기
  if (
    input_name.value.trim() == "" ||
    input_password.value.trim() == "" ||
    input_content.value.trim() == ""
  ) {
    alert("폼 형식을 다 채워주세요");
    return;
  }

  let comment = {
    name: input_name.value,
    score: input_score.value,
    password: input_password.value,
    content: input_content.value,
    time: input_time,
  };

  saveCommnets(comment);
  showComment();

  input_name.value = "";
  input_score.value = "";
  input_password.value = "";
  input_content.value = "";
});

//localstorage에서 저장된 댓글 데이터 가져와서 html에 보여주기
const showComment = function () {
  let commentObj = JSON.parse(localStorage.getItem("comment"));
  document.getElementById("comments-list").innerHTML = "";

  for (let i = 0; i < commentObj.length; i++) {
    let star = "⭐️";
    let score = star.repeat(commentObj[i].score);

    let commentDiv = document.createElement("div");
    commentDiv.className = "comment";
    let template = `
                        <p><span class="commentName">${commentObj[i].name}</span> <span class="commentScore">${score}</span>
                        <span class="commentTime">${commentObj[i].time}</span></p>
                        <p class="commentContent">${commentObj[i].content}<p>
                        <button type="button" class="deleteBtn">삭제하기</button>
                        <button type="button" class="editBtn">수정하기</button>

                      
    `;

    commentDiv.innerHTML = template;
    document.getElementById("comments-list").append(commentDiv);

    //삭제
    let deleteBtn = commentDiv.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => {
      let getPassword = prompt("비밀번호를 입력하세요");
      deleteComment(i, commentObj[i].password, getPassword);
    });

    //수정
    let editBtn = commentDiv.querySelector(".editBtn");
    editBtn.addEventListener("click", () => {
      let getPassword = prompt("비밀번호를 입력하세요");
      editComment(i, commentObj[i].password, getPassword);
    });
  }
};

//localstorage에 저장
const saveCommnets = function (comment) {
  let commentsList = document.getElementById("comments-list");
  saveCommnetsArr.push(comment);
  const commentObj = JSON.stringify(saveCommnetsArr);
  localStorage.setItem("comment", commentObj);
};

//댓글삭제
const deleteComment = function (index, password, getPassword) {
  let commentObj = JSON.parse(localStorage.getItem("comment"));

  if (password === getPassword) {
    commentObj.splice(index, 1); // 인덱스 위치의 요소를 1개 제거한다는 말
    localStorage.setItem("comment", JSON.stringify(commentObj));
    showComment();
  } else {
    alert("비밀번호가 일치하지 않습니다.");
  }
};

//댓글수정
const editComment = function (index, password, getPassword) {
  let commentArr = JSON.parse(localStorage.getItem("comment"));
  let targetReview = commentArr[index]; // 해당 인덱스에 위치한 리뷰를 가져옴

  if (password === getPassword) {
    let newContent = prompt("수정할 내용을 입력하세요", targetReview.content);
    if (newContent) {
      targetReview.content = newContent;
      // saveCommnetsArr.push(previousReview);
      localStorage.setItem("comment", JSON.stringify(commentArr));
      showComment();
    }
  } else {
    alert("비밀번호가 일치하지 않습니다.");
  }
};

//댓글 입력한 시간 가져로는 시간 함수
const currentTime = function () {
  let today = new Date();

  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);

  let hours = ("0" + today.getHours()).slice(-2);
  let minutes = ("0" + today.getMinutes()).slice(-2);
  let seconds = ("0" + today.getSeconds()).slice(-2);

  let now =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return now;
};
