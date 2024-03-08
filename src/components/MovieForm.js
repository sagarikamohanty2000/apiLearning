import React,{useState} from "react";
import classes from "./MovieForm.module.css";

const MovieForm = (props) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const textHandler = (event) => {
    setText(event.target.value);
  };

  const dateHandler = (event) => {
    setDate(event.target.value);
  };

  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    const movieDetails = {
      id: Math.random(),
      title: title,
      releaseDate: date,
      openingText: text,
    };

    props.getMovie(movieDetails)
    setTitle("");
    setText("");
    setDate("");
  };
  return (
    <>
      <form className={classes.formModule} onSubmit={onFormSubmitHandler}>
        <div className={classes.titleFrame}>
          <lable>Title</lable>
        </div>
        <div className={classes.inputTitle}>
          <input
            class="form-control"
            onChange={titleHandler}
            value={title}
          ></input>
        </div>
        <div className={classes.textFrame}>
          <label>Opening Text</label>
        </div>
        <div className={classes.inputText}>
          <input
            class="form-control"
            onChange={textHandler}
            value={text}
          ></input>
        </div>

        <div className={classes.releaseFrame}>
          <label>Release Date</label>
        </div>
        <div className={classes.inputRelease}>
          <input
            class="form-control"
            onChange={dateHandler}
            value={date}
          ></input>
        </div>
        <div className={classes.btnAdd}>
          <button type="submit">Add Movie</button>
        </div>
      </form>
    </>
  );
};

export default MovieForm;
