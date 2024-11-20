// src/App.js
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Theme CSS
import 'primereact/resources/primereact.min.css'; // PrimeReact core styles
import 'primeicons/primeicons.css'; // PrimeIcons styles
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./layout/UserLayout";
import Homepage from "./Pages/HomePage/Homepage";
import { Provider } from "react-redux";
import { store } from "./store";
import Community from './Pages/Communities/Community';
import Webinars from './Pages/Webinars/Webinars';
import Books from "./Pages/Books/Books"
import UserProtectedRoute from "./ui/UserProtectedRoutes"

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <UserLayout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          
          <Route path="/community" element={<UserProtectedRoute><Community /></UserProtectedRoute>} />
          <Route path="/webinars" element={<UserProtectedRoute><Webinars /></UserProtectedRoute>} />
          <Route path="/books" element={<UserProtectedRoute><Books /></UserProtectedRoute>} />
        </Routes>
      </UserLayout>
    </Router>
    </Provider>
  );
};

export default App;
