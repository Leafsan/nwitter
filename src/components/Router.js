import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";
import MyNweet from "../routes/MyNweet";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home userObj={userObj} />} />
            <Route
              exact
              path="/profile"
              element={<Profile refreshUser={refreshUser} userObj={userObj} />}
            />
            <Route
              exact
              path="/myNweet"
              element={<MyNweet userObj={userObj} />}
            />
          </>
        ) : (
          <Route exact path="/" element={<Auth />} />
        )}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
