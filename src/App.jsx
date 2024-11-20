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
import Documentaries from './Pages/Documentaries/Documentaries';
import WebinarDetails from './Pages/Webinars/WebinarDetails';
import BookDetails from './Pages/Books/BookDetails';
import LectureDetails from './Pages/Documentaries/DocumentariesDetails';
import VideoPlayer from './Components/VideoPlayer';

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
          <Route path="/documentaries" element={<UserProtectedRoute><Documentaries /></UserProtectedRoute>} />

          <Route path="/webinars/:id" element={<UserProtectedRoute><WebinarDetails /></UserProtectedRoute>} />
          <Route path="/books/:id" element={<UserProtectedRoute><BookDetails /></UserProtectedRoute>} />
          <Route path="/documentaries/:id" element={<UserProtectedRoute><LectureDetails /></UserProtectedRoute>} />
          <Route path="/documentaries/details/:id" element={<UserProtectedRoute><VideoPlayer /></UserProtectedRoute>} />

        </Routes>
      </UserLayout>
    </Router>
    </Provider>
  );
};

export default App;
