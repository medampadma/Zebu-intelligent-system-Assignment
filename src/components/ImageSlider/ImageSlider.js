import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [labelName, setLabelName] = useState({ userName: "" });
  let data = useSelector(state => state.images);
  const length = data.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  const save = () => {
    let newObj = {};
    data.map((value, index) => {
      if (current === index) newObj = { ...labelName, ...value };
      return newObj;
    });
    let jsonData = JSON.stringify(newObj);
    const blob = new Blob([jsonData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "data.json";
    link.href = url;
    link.click();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setLabelName(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="slider">
      <div className="img-box">
        <form>
          <div className="form-group">
            <label>Label</label>
            <input
              className="form-control"
              placeholder="Type Something"
              name="userName"
              onChange={handleChange}
              required
            />
          </div>
        </form>
        <br />
        {data.map((slide, index) => {
          return (
            index === current && (
              <img
                src={slide.src}
                alt="images"
                className="slider-img"
                key={index}
              />
            )
          );
        })}
      </div>
      <button className="btn btn-dark" onClick={prevSlide}>
        Prev
      </button>
      &nbsp;
      <button className="btn btn-dark" onClick={nextSlide}>
        Next
      </button>
      &nbsp;
      <button className="btn btn-dark" onClick={save}>
        Save
      </button>
    </div>
  );
}
