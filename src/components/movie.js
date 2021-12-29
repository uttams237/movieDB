const imgUrl = "https://image.tmdb.org/t/p/w1280";

export const Movie = ({ title, poster_path, overview, vote_average, name }) => {
    return { poster_path } === null ? null: (
        <div className="movie">
            {/* // <div > */}
            <img src={imgUrl + poster_path} alt={title} />
            <div className="movie-info">
                <h4>{title ? title : name}</h4>
                <span>{vote_average}</span>
            </div>
            <div className="movie-over">
                <h3>Overview</h3>
                <p>{overview}</p>
            </div>
        </div>
    )
};
