import "./App.css";
import NavBar from "./components/Separate/NavBar";
import Logo from "./components/Separate/Logo";
import Search from "./components/Separate/Search";
import Sum from "./components/Separate/Sum";
import Box from "./components/Box";
import MovieList from "./components/Movies Stuff/MovieList";
import WatchedList from "./components/Movies Stuff/WatchedList";
import Movie from "./components/Movies Stuff/Movie";
import Loader from "./components/Small/Loader";
import MovieDetalis from "./components/Movies Stuff/MovieDetalis";
import MovieSummary from "./components/Movies Stuff/MovieSummary";
import { useEffect, useState } from "react";
import RatingStars from "./components/Small/RatingStars";
import WatchedMovie from "./components/Movies Stuff/WatchedMovie";
import MovieWindow from "./components/Movies Stuff/MovieWindow";
import { tempMovieData } from "./data";

function App() {
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [current, setCurrent] = useState("");
  const [displayedMov, setDisplayedMov] = useState(null);
  const [searchList, setSearchList] = useState(tempMovieData);
  const [watchedList, setWatchedList] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function SearchMovie() {
      setSearchError("");
      setIsLoadingSearch(true);
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?s=${search}&apikey=d6735e30`,
          { signal }
        );
        const data = await response.json();
        if (data.Response === "False") throw new Error("Movie Not Found");
        setSearchList([...data.Search]);
      } catch (err) {
        if (err.name !== "AbortError") {
          setSearchError(err.message);
          setSearchList([]);
        }
      } finally {
        setIsLoadingSearch(false);
        !search && setSearchError("");
      }
    }

    SearchMovie();

    return () => {
      controller.abort();
    };
  }, [search]);

  useEffect(() => {
    async function getDetailedMovie() {
      try {
        setIsLoadingDetails(true);
        const response = await fetch(
          `http://www.omdbapi.com/?i=${current}&apikey=d6735e30`
        );
        const data = await response.json();
        setDisplayedMov(data);
      } catch (err) {
        setDetailsError(err.message);
      } finally {
        setIsLoadingDetails(false);
      }
    }
    current ? getDetailedMovie() : setDisplayedMov(null);
  }, [current]);

  useEffect(() => {
    displayedMov && (document.title = displayedMov.Title);
    !displayedMov && (document.title = "Cinema World");
  }, [displayedMov]);

  function handleDeleteMovie(id) {
    const filterdArray = watchedList.filter((mov) => mov.imdbID !== id);
    setWatchedList(filterdArray);
  }
  return (
    <>
      <NavBar>
        <Logo />
        <Search search={search} onSearch={setSearch} />
        <Sum results={searchList.length} />
      </NavBar>
      <div className="main">
        <Box>
          {searchError && <div className="error">⛔ {searchError}</div>}
          {!searchError && isLoadingSearch && <Loader />}
          {!searchError && !isLoadingSearch && (
            <MovieList>
              {searchList.map((mov) => (
                <Movie
                  data={mov}
                  current={current}
                  onSetCurrent={setCurrent}
                  displayedMov={displayedMov}
                  onSetDisplayedMov={setDisplayedMov}
                  watchedList={watchedList}
                  key={mov.imdbID}
                />
              ))}
            </MovieList>
          )}
        </Box>
        <Box>
          {detailsError && <div className="error">⛔ {detailsError}</div>}
          {!detailsError && isLoadingDetails && <Loader />}
          {!detailsError && !isLoadingDetails && displayedMov && (
            <MovieDetalis
              displayMov={displayedMov}
              rating={rating}
              onSetRating={setRating}
              watchedList={watchedList}
              onSetWatchedList={setWatchedList}
              onSetDisplayedMov={setDisplayedMov}
            >
              <RatingStars onSetRating={setRating} maxNum={10} />
            </MovieDetalis>
          )}
          {!detailsError && !isLoadingDetails && !displayedMov && (
            <>
              <MovieSummary watchedList={watchedList} />
              <WatchedList>
                {watchedList.map((mov) => (
                  <WatchedMovie
                    key={mov.imdbID}
                    data={mov}
                    onSetDisplayedMov={setDisplayedMov}
                    onDeleteMov={handleDeleteMovie}
                  />
                ))}
              </WatchedList>
            </>
          )}
        </Box>
      </div>
    </>
  );
}

export default App;
