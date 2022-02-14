import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AddUser from './pages/AddUser';
import { reset, initialize } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "./redux/actions"

function App() {
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const form = {
      open: () => setOpenForm(true),
      close: () => {
          dispatch(reset("contactForm")); // reset the redux form state of contactForm
          setOpenForm(false);
      },
  };

/*   const onSubmit = (formValues) => {
    form.close();
    if (isEditing) {
        updateContactDetails(formValues);
    } else {
        addUser(formValues);
    }
  }; */

  return (
    <div className="App">
         <Home />
         <AddUser/*  onSubmit={onSubmit} *//>
    </div>
  );
}

export default App;
