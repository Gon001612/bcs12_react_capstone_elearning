import React from 'react'
import useRoutersCustom from './hooks/useRoutersCustome'
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { NoStyleItemContext } from "antd/es/form/context";
import { Routes } from 'react-router-dom';

export const NotificationContext = React.createContext();

function App() {
  const routers = useRoutersCustom();

  const showNotification = (content, type, duration = 2000) => {
    toast[type](content, {
      position: "top-right",
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <>
      <NotificationContext.Provider
        value={{ showNotification: showNotification }}
      >
        <ToastContainer />
        {routers}
      </NotificationContext.Provider>
    </>
  );
}

export default App
