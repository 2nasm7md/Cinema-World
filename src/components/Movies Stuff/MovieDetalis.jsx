import { useEffect } from "react";

const MovieDetalis = ({
  displayMov,
  onSetDisplayedMov,
  watchedList,
  onSetWatchedList,
  children,
  rating,
  onSetRating,
}) => {
  useEffect(() => {
    const callBack = (e) => {
      if (e.code === "Escape") {
        onSetDisplayedMov(null);
      }
    };
    document.addEventListener("keydown", callBack);
    return () => document.removeEventListener("keydown", callBack);
  }, [onSetDisplayedMov]);

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={() => onSetDisplayedMov(null)}>
          ←
        </button>
        <img src={displayMov.Poster} alt="" />
        <div className="details-overview">
          <h2>{displayMov.Title}</h2>
          <p>{displayMov.Director}</p>
          <p>{displayMov.Year}</p>
          <p>
            <span>⭐️</span>
            {displayMov.imdbRating} Average Rating
          </p>
          <p>
            <span>🕒</span>
            {displayMov.Runtime}
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {watchedList.some((mov) => mov.imdbID === displayMov.imdbID) ? (
            `You have rated this Movie with ${displayMov.rating} ⭐️`
          ) : (
            <>
              {children}
              {rating > 0 && (
                <button
                  className="btn-add"
                  onClick={() => {
                    const updatedWatchedMov = { ...displayMov, rating };
                    onSetWatchedList((prev) => [...prev, updatedWatchedMov]);
                    onSetDisplayedMov(null);
                    onSetRating(0);
                  }}
                >
                  + Add to List
                </button>
              )}
            </>
          )}
        </div>
        <p>
          <em>{displayMov.Plot}</em>
        </p>
        <button className="btn-add">Details</button>
      </section>
    </div>
  );
};

export default MovieDetalis;
