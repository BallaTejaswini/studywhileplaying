
import { useParams } from "react-router-dom";
import QuizGame from "../pages/QuizeGame";
import GuessSyntax from "../pages/GuessSyntax";
import TraceTheError from "../pages/TraceTheError";
import ShortenTheSyntax from "../pages/ShortenTheSyntax";
import GuessOutputGame from "../pages/GuessOuputGame"

const GAME_COMPONENTS = {
  "quiz":   QuizGame,
  "syntax": GuessSyntax,
  "error":  TraceTheError,
  "shorten": ShortenTheSyntax,
  "output": GuessOutputGame
  
};

const GameRouter = () => {
  const { gameId } = useParams();
  const Component = GAME_COMPONENTS[gameId];
  if (!Component) return <div>Game not found</div>;
  return <Component />;
};

export default GameRouter;