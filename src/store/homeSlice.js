// import { createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: "Code While Playing",
  navItems: [
    { label: "Games", path: "/games" },
    { label: "Profile", path: "/profile" },
  ],
  badge: "<Code While Playing />",
  title: {
    normal: "Code While",
    accent: "Playing",
  },
  subtitle:
    "Master programming through 5 interactive coding games. Quiz yourself, trace errors, and level up your skills.",
  actions: [
    { id: "start", label: "Start Playing", path: "/games", style: "primary" },
    { id: "browse", label: "Browse Games", path: "/games", style: "secondary" },
  ],
  stats: [
    { id: "games", icon: "G", value: "5", label: "Games" },
    { id: "languages", icon: "L", value: "7+", label: "Languages" },
    { id: "questions", icon: "Q", value: "150+", label: "Questions" },
  ],
  features: [
    {
      id: "modes",
      icon: ">",
      title: "5 Game Modes",
      description: "Quiz, Syntax, Error Tracing, Shorthand and Output guessing",
    },
    {
      id: "langs",
      icon: "[]",
      title: "7+ Languages",
      description: "Python, C, C++, Java, SQL, Web Dev, DSA",
    },
    {
      id: "difficulty",
      icon: "*",
      title: "3 Difficulty Levels",
      description: "Easy, Medium, Hard - 10 questions each",
    },
  ],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
});

export default homeSlice.reducer;
