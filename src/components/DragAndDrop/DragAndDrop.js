import React, { useCallback, useState } from "react";
import cuid from "cuid";
import Dropzone from "./Dropzone";
import "./style.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getImages } from "../redux/actionCreator";

function DragAndDrop() {
  const [images, setImages] = useState([]);
  const [userData, setUserData] = useState({
    userName: "",
    description: ""
  });

  let history = useHistory();
  const dispatch = useDispatch();

  const nextHandler = () => {
    if (images && images.length > 0) {
      dispatch(getImages(images));
    }
    history.push("/label-images");
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.map(file => {
      const reader = new FileReader();
      reader.onload = function(e) {
        setImages(prevState => [
          ...prevState,
          { id: cuid(), src: e.target.result }
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  return (
    <main className="App">
      <div id="overall">
        <Dropzone onDrop={onDrop} accept={"image/*"} />
        <div className="Form-style">
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                placeholder="Type Something"
                name="userName"
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                placeholder="Type Something"
                name="description"
                onChange={handleChange}
                required
              />
            </div>
          </form>
        </div>
      </div>
      <div id="overall">
        <button className="btn btn-dark" onClick={nextHandler}>
          create
        </button>
      </div>
    </main>
  );
}

export default DragAndDrop;
