import React, { useRef } from "react";
import styles from "./AddMovie.module.css";

const AddMovie = (props) => {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  const submitHandler = function (event) {
    event.preventDefault();
    // console.log(titleRef.current.value);
    // console.log(openingTextRef.current.value);
    // console.log(releaseDateRef.current.value);

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };
    props.onAddMovie(movie);

    titleRef.current.value = "";
    openingTextRef.current.value = "";
    releaseDateRef.current.value = "";
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="title">Title</label>
        <input placeholder="Spider-Man" type="text" id="title" ref={titleRef} />
      </div>
      <div className={styles.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea
          placeholder="Some text...."
          rows="5"
          id="opening-text"
          ref={openingTextRef}
        ></textarea>
      </div>
      <div className={styles.control}>
        <label htmlFor="date">Release Date</label>
        <input
          placeholder="2022-11-25"
          type="text"
          id="date"
          ref={releaseDateRef}
        />
      </div>
      <button>Add Movie</button>
    </form>
  );
};

export default AddMovie;
