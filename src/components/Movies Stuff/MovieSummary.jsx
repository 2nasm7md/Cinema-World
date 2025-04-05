const MovieSummary = ({ watchedList }) => {
  const numMovies = watchedList.length;
  const avgRating = () => {
    const valid = watchedList.filter((m) => !isNaN(Number(m.imdbRating)));
    return valid.length
      ? (
          valid.reduce((acc, m) => acc + Number(m.imdbRating), 0) / valid.length
        ).toFixed(2)
      : 0;
  };

  const avgUserRating = (
    watchedList.reduce((acc, mov) => acc + Number(mov.rating), 0) /
    watchedList.length
  ).toFixed(1);

  const totalTime = () => {
    const totalByMin = watchedList.reduce(
      (acc, mov) => acc + Number(mov.Runtime.split(" ")[0]),
      0
    );
    if (totalByMin > 60) {
      const hours = Math.floor(totalByMin / 60);
      const min = Math.floor((totalByMin / 60 - hours) * 60);
      return `${hours}h ${min}min`;
    }
    if (totalByMin < 60) {
      return `${totalByMin} min`;
    }
  };
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{numMovies} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{isNaN(avgUserRating) ? 0 : avgUserRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgRating()}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{totalTime()}</span>
        </p>
      </div>
    </div>
  );
};

export default MovieSummary;
