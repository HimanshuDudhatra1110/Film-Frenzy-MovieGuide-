const movieNameRef = document.getElementById("movie-name");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");

const getMovie = () => {
  const movieName = movieNameRef.value;
  const url = `http://www.omdbapi.com/?t=${movieName}&apikey=df853fe2`;

  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie name <h3>`;
  } else {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response == "True") {
          //   console.log(data);
          const str = data.Type;
          const type = str.charAt(0).toUpperCase() + str.slice(1);
          result.innerHTML = `
          <div class="info">
            <img src="${data.Poster}" class="poster">
            <div>
                <h2>${data.Title}</h2>
                <h4 class="movie-type">${type}</h4>
                <div class="rating">
                    <i class='bx bxs-star'></i>
                    <h4>${data.imdbRating}</h4>
                </div>
                <div class="details">
                    <span>${data.Rated}</span>
                    <span>${data.Year}</span>
                    <span>${data.Runtime}</span>
                </div>
                <div class="genre">
                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                </div>
            </div>
        </div>

        <h3>Plot:</h3>
        <p>${data.Plot}</p>
        <h3>Cast:</h3>
        <p>${data.Actors}</p>
        `;
        } else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<h3>Error Occured</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
movieNameRef.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getMovie();
  }
});
