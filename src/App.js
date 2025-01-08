import { useEffect, useState } from "react";
const KEY = "10cfea01";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("")

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
      signal: controller.signal
    })
      .then((res) => res.json())
      .then((data) => data.Response === "True" && setMovies(data.Search));
      //.catch((err) => console.log(err));
    return () => controller.abort();
    }, [query]);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  

  return (
    <div>
      <h1>Movies</h1>
      <input type="text" value={query} onChange={handleChange} placeholder="Search movies..." />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.imdbID}>
              <td>{movie.Title}</td>
              <td>{movie.Year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
