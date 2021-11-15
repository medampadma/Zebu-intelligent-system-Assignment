import React from "react";
import DragAndDrop from "./components/DragAndDrop/DragAndDrop";
import ImageSlider from './components/ImageSlider/ImageSlider';
import {BrowserRouter, Route, Switch,Redirect } from "react-router-dom";

export default function App() {
 
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/create-project" component={DragAndDrop} />
      <Route path="/label-images" component={ImageSlider} />
      <Route path="/" render={() => (<Redirect to="/create-project" />)} />
     
    </Switch>
    </BrowserRouter>
  
  );
}
