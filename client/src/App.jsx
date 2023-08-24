import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import IndexPage from "./pages/IndexPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContext, UserContextProvider } from "./UserContext";
import AccountPage from "./pages/ProfilePage";
import { useContext } from "react";
import ProfilePage from "./pages/ProfilePage";
import Events from "./pages/Events";
import EventsFormPage from "./pages/EventsFormPage";
import EventPage from "./pages/EventPage";
import RegisterEvent from "./RegisterEvent";
import RegisteredEvents from "./pages/RegisteredEvents";
import SingleRegister from "./pages/SingleRegister";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
   const { user } = useContext(UserContext);
   return (
      <UserContextProvider>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<IndexPage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/register" element={<RegisterPage />} />
               <Route path="/account" element={<ProfilePage />} />
               <Route path="/account/myevents" element={<Events />} />
               <Route
                  path="/account/myevents/new"
                  element={<EventsFormPage />}
               />
               <Route
                  path="/account/myevents/:id"
                  element={<EventsFormPage />}
               />
               <Route path="/event/:id" element={<EventPage />} />
               <Route
                  path="/account/registrations"
                  element={<RegisteredEvents />}
               />
               <Route
                  path="/account/registrations/:id"
                  element={<SingleRegister />}
               />
            </Route>
         </Routes>
      </UserContextProvider>
   );
}

export default App;
