import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Games from "./pages/Games";  
import Profile from "./pages/Profile"; 
import LanguageSelect from "./pages/LanguageSelect";  
import LevelSelector from "./pages/LevelSelector"; 
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "./context/AuthContext";
import "./App.css";
import LoadingPage from "./pages/LoadingPage";
import GameRouter from "./components/GameRouter";
import QuizGame from "./pages/QuizeGame";
import GuessSyntax from "./pages/GuessSyntax";
import TraceTheError from "./pages/TraceTheError";
import PassAndPlay from "./pages/PassAndPlay";
import VsComputer from "./pages/VsComputer";
import ShortenTheSyntax from "./pages/ShortenTheSyntax";
import GuessOutputGame from "./pages/GuessOuputGame";






function App() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingPage onComplete={() => setLoading(false)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/home" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/games" element={user ? <Games /> : <Navigate to="/signin" />} />  
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signin" />} />
        <Route path="/games/:gameId/language" element={user ? <LanguageSelect /> : <Navigate to="/home" />} />
        <Route path="/games/:gameId/level/:langId" element={user ? <LevelSelector /> : <Navigate to="/home" />} />
        <Route path="/games/:gameId/play/:langId/:level" element={user ? <GameRouter /> : <Navigate to="/home" />} />
        <Route path="/games/:gameId/level/:langId" element={user ? <QuizGame /> : <Navigate to="/home" />} />
        <Route path="/games/:gameId/level/:langId" element={user ? <GuessSyntax /> : <Navigate to="/home" />} />
        <Route path="/games/:gameId/level/:langId" element={user ? <TraceTheError /> : <Navigate to="/home" />} />
        <Route path="/pass-and-play" element={user ? <PassAndPlay /> : <Navigate to="/home" />} />
        <Route path="/vs-computer" element={user ? <VsComputer /> : <Navigate to="/home" />} />
        <Route path="/games/:gameId/level/:langId" element={user ? <ShortenTheSyntax/> : <Navigate to="/home" />} />
        <Route path="/games/:gameId/play/:langId/:level" element={user ? <GuessOutputGame /> : <Navigate to="/home" />} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;