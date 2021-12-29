import { useEffect, useState } from "react";
import "./App.css";
import { Movie } from "./components/movie";
import "./index.css";

const apiKey = process.env.REACT_APP_apiKey;

const trendingUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`;

function App() {
    const [movie, setMovie] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const [title, setTitle] = useState();

    useEffect(() => {
        fetch(trendingUrl)
            .then((res) => res.json())
            .then((data) => {
                setMovie(data.results);
            });
    }, []);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                data.results.sort((a, b) => b.popularity - a.popularity);
                setMovie(data.results);
                setTitle(searchTerm)
                setSearchTerm("");
            });
    };

    return (
        <>
            <header>
                <h1>movieDB</h1>
                <form onSubmit={handleOnSubmit}>
                    <input
                        className="search"
                        type="search"
                        placeholder="type movie/show"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>
            </header>
            <div className="titlee">
                <h1>{title ? title : "trending"}</h1>
            </div>
            <div className="movie-container">
                {movie.length > 0 &&
                    movie.map((movie) => <Movie key={movie.id} {...movie} />)}
            </div>
        </>
    );
}

export default App;
