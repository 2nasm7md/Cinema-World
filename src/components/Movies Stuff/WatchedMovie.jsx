const WatchedMovie = ({ onSetDisplayedMov, data, onDeleteMov }) => {
  return (
    <li
      onClick={(e) => {
        e.target.closest("li") && onSetDisplayedMov(data);
        console.log(e.target);
      }}
    >
      <img src={data.Poster} alt="" />
      <h3>{data.Title}</h3>
      <div>
        <p>
          <span>{data.imdbRating}</span>
          <span>⭐️</span>
        </p>
        <p>
          <span>{data.rating}</span>
          <span>🌟</span>
        </p>
        <p>
          <span>🕒</span>
          <span>{data.Runtime}</span>
        </p>
        <button
          className="btn-delete"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteMov(data.imdbID);
          }}
        >
          X
        </button>
      </div>
    </li>
  );
};

export default WatchedMovie;
