import React, { useCallback, useState } from "react";
import cuid from "cuid";
import Dropzone from "./Dropzone";
import "./style.css";
import { useHistory } from "react-router-dom";
import { useDispatch} from "react-redux";
import { getImages } from "../redux/actionCreator";

function DragAndDrop() {
  const [images, setImages] = useState([]);
  const [userData, setUserData] = useState({
    userName: "",
    description: "",
  });
  const [ formErrorMessage,setFormErrorMessage]=useState({
    userName: "",
    description: "",
  })
  const [ formValid,setFormValid]=useState({
    userName: "",
    description: "",
    buttonActive:false,
  })


  let history = useHistory();
  const dispatch = useDispatch();


  const nextHandler = () => {
    if (images && images.length > 0) {
      dispatch(getImages(images));    
    } 
    history.push("/label-images");
  };


  const handleChange = (e) => {
    const{ name,value} = e.target;
    setUserData({ ...userData, [name]: value });
    validateField(name,value)

  };
  const validateField=(name,value)=>{
    let message="";
    let validity=false;

    switch (name) {
      case "userName":
          value.length >=4 ? message="":message="User Name should have at least 4 letters"
        break;
        case "description":
          value.length >0 ? message="":message="write something"
        break;

      default:
        break;
    }
    let formErrorMessageObj=formErrorMessage;
    formErrorMessageObj[name]=message;
    setUserData({formErrorMessage:formErrorMessageObj})

    message==""?validity=true:validity=false
    let formValidObj=formValid;
    formValidObj[name]=validity;
    formValidObj.buttonActive=formValidObj.userName && formValidObj.description
    setUserData({formValid:formValidObj})

  }


  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        setImages((prevState) => [
          ...prevState,
          { id: cuid(), src: e.target.result },
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
              />
              <span className="text-danger">{formErrorMessage.userName}</span>
            </div>
            <br />
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                placeholder="Type Something"
                name="description"
                onChange={handleChange}
              />
              <span className="text-danger">{formErrorMessage.description}</span>
            </div>
          </form>
        </div>
      </div>
      <div id="overall">
        <button className="btn btn-dark" onClick={nextHandler} disabled={!formValid.buttonActive}>
          create
        </button>
      </div>
    </main>
  );
}

export default DragAndDrop;
