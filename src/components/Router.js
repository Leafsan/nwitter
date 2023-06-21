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
    <Router base="/">
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
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
          </div>
        ) : (
          <Route exact path="/" element={<Auth />} />
        )}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
