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
import Popular from './Pages/Popular/Popular';
import SidebarLayout from './layout/SidebarLayout'
import ProfileSetting from './Pages/Profile Settings/ProfileSetting';
import NotificationsUser from './Pages/Profile Settings/Notifications';
import EditProfile from './Pages/Profile Settings/EditProfile';
import EditEmail from './Pages/Profile Settings/EditEmail';
import EditPassword from './Pages/Profile Settings/EditPassword';
import Favorite from './Pages/Favourite/Favourite';
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminPanelLayout from "./Pages/Admin Pages/Dashboard";
import Webinar from "./Pages/Admin Pages/Webinar";
import VideoLecture from "./Pages/Admin Pages/VideoLecture";
import Subscription from "./Pages/Admin Pages/Subscription";
import Users from "./Pages/Admin Pages/Users";
import BookCreation from "./Pages/Admin Pages/BookCreation";
import Profile from "./Pages/Admin Pages/Profile";
import Notifications from "./Pages/Admin Pages/Notifications";
import AdminHomepage from "./Pages/Admin Pages/Homepage";
import CreateWebinar from "./Pages/Admin Pages/CreateWebinar";
import ManageWebinar from "./Pages/Admin Pages/ManageWebinar";
import RecordedWebinars from "./Pages/Admin Pages/RecordedWebinars";
import CreateLecture from "./Pages/Admin Pages/CreateLecture";
import CreateNewPlan from "./Pages/Admin Pages/CreateNewPlan";
import ManagePlans from "./Pages/Admin Pages/ManagePlans";
import CreateBook from "./Pages/Admin Pages/CreateBook";
import ManageBook from "./Pages/Admin Pages/ManageBook";
import CreateNotifications from "./Pages/Admin Pages/CreateNotifications";
import EditLecture from "./Pages/Admin Pages/EditLecture";
import WebinarStream from "./Pages/Admin Pages/stream/WebinarStream";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditNotifications from "./Pages/Admin Pages/EditNotifications";
import AdminCommunity from "./Pages/Admin Pages/AdminCommunity";


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
          <Route path="/popular" element={<UserProtectedRoute><Popular /></UserProtectedRoute>} />
          <Route path="/profile-settings" element={<UserProtectedRoute><ProfileSetting /></UserProtectedRoute>} />
          <Route path="/notifications" element={<UserProtectedRoute><NotificationsUser /></UserProtectedRoute>} />
          <Route path="/profile-settings/edit-profile" element={<UserProtectedRoute><EditProfile /></UserProtectedRoute>} />
          <Route path="/profile-settings/edit-password" element={<UserProtectedRoute><EditPassword /></UserProtectedRoute>} />
          <Route path="/profile-settings/edit-email" element={<UserProtectedRoute><EditEmail /></UserProtectedRoute>} />
          <Route path="/favourites" element={<UserProtectedRoute><Favorite /></UserProtectedRoute>} />


          <Route path="/webinars/:id" element={<UserProtectedRoute><WebinarDetails /></UserProtectedRoute>} />
          <Route path="/books/:id" element={<UserProtectedRoute><BookDetails /></UserProtectedRoute>} />
          <Route path="/documentaries/:id" element={<UserProtectedRoute><LectureDetails /></UserProtectedRoute>} />
          <Route path="/documentaries/details/:id" element={<UserProtectedRoute><VideoPlayer /></UserProtectedRoute>} />
          

          <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <AdminPanelLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminHomepage />} />
              <Route path="webinars" element={<Webinar />} />
              <Route
                path="webinars/create-webinar"
                element={<CreateWebinar />}
              />
              <Route
                path="webinars/:id/manage-webinar"
                element={<ManageWebinar />}
              />
              <Route path="documentaries" element={<VideoLecture />} />
              <Route
                path="documentaries/create-documentary"
                element={<CreateLecture />}
              />
              <Route
                path="documentaries/:id/edit-documentary"
                element={<EditLecture />}
              />
              <Route path="recordings" element={<RecordedWebinars />} />
              <Route path="subscription" element={<Subscription />} />
              <Route
                path="subscription/create-new-plan"
                element={<CreateNewPlan />}
              />
              <Route
                path="subscription/manage-plan"
                element={<ManagePlans />}
              />
              <Route path="users" element={<Users />} />
              <Route path="book-creation" element={<BookCreation />} />
              <Route
                path="book-creation/create-new-book"
                element={<CreateBook />}
              />
              <Route
                path="book-creation/:id/manage-book"
                element={<ManageBook />}
              />
              <Route
                path="admin-community"
                element={<AdminCommunity />}
              />
              <Route path="profile" element={<Profile />} />
              <Route path="notifications" element={<Notifications />} />
              <Route
                path="notifications/create-notification"
                element={<CreateNotifications />}
              />
              <Route
                path="webinars/:webinarId/webinar-lobby"
                element={<WebinarStream/>}
              />
              <Route 
              path="notifications/edit-notification/:id"
              element= {<EditNotifications/>}
              />
            </Route>
        </Routes>
      </UserLayout>
    </Router>
    </Provider>
  );
};

export default App;
