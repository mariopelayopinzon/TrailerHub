import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Footer from './Footer.js';
import './App.css';
import YouTube from 'react-youtube';

// Accede a las variables de entorno
const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const IMAGE_PATH = process.env.REACT_APP_IMAGE_PATH;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

  const fetchMovies = useCallback(async (searchKey = "") => {
    try {
      const type = searchKey ? "search" : "discover";
      const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
        },
      });

      setMovies(results);
      if (results.length) {
        await fetchMovie(results[0].id);
        setMovie(results[0]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, []);

  const fetchMovie = useCallback(async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
          append_to_response: "videos",
        },
      });

      const trailer = data.videos?.results.find(vid => vid.name === "Official Trailer");
      setTrailer(trailer || data.videos.results[0]);
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }, []);

  const selectMovie = useCallback((movie) => {
    fetchMovie(movie.id);
    setMovie(movie);
    window.scrollTo(0, 0);
  }, [fetchMovie]);

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div>
      <h2 className="text-center mt-5 mb-5">TrailerHub</h2>

      {/* Buscador */}
      <form className="container mb-4" onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button className="btn btn-primary">Search</button>
      </form>

      <div>
        <main>
          {movie && (
            <div
              className="viewtrailer"
              style={{ backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")` }}
            >
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer?.key}
                    className="reproductor container"
                    containerClassName={"youtube-container amru"}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="boton">Close</button>
                </>
              ) : (
                <div className="container">
                  {trailer ? (
                    <button className="boton" onClick={() => setPlaying(true)}>Play Trailer</button>
                  ) : (
                    "Sorry, no trailer available"
                  )}
                  <h1 className="text-white">{movie.title}</h1>
                  <p className="text-white">{movie.overview}</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Posters de películas */}
      <div className="container mt-3">
        <div className="row">
          {movies.map(movie => (
            <div key={movie.id} className="col-md-4 mb-3" onClick={() => selectMovie(movie)}>
              <img
                src={`${IMAGE_PATH + movie.poster_path}`}
                alt={movie.title}
                height={600}
                width="100%"
              />
              <h4 className="text-center">{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>

      <Footer /> {/* Asegúrate de incluir tu footer aquí */}
    </div>
  );
}

export default App;
