export default function Movie({
  data,
  current,
  onSetCurrent,
  watchedList,
  displayedMov,
  onSetDisplayedMov,
}) {
  const isMovieWatched = watchedList?.find((mov) => mov.imdbID === data.imdbID);
  return (
    <li
      onClick={() => {
        isMovieWatched
          ? onSetDisplayedMov(
              isMovieWatched === displayedMov ? null : isMovieWatched
            )
          : onSetCurrent(data.imdbID === current ? "" : data.imdbID);
      }}
    >
      <img src={data.Poster} alt="" />
      <h3>{data.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{`${data.Year} - 12 - 15`}</span>
        </p>
      </div>
    </li>
  );
}
