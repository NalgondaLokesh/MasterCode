import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ViewSnippet from "./pages/ViewSnippet";
import CreateSnippet from "./pages/CreateSnippet";
import EditSnippet from "./pages/EditSnippet";
import Profile from "./pages/Profile";
import "./styles/index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/snippet/:id" element={<ViewSnippet />} />
              <Route path="/create" element={<CreateSnippet />} />
              <Route path="/edit/:id" element={<EditSnippet />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
