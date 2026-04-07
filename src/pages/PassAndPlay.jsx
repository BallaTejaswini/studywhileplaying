import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ─── Question bank (reuse a subset for demo — wire to your full bank in production) ───
const QUESTION_BANK = {
  python: [
      { q: "Which keyword defines a function in Python?", options: ["func", "def", "define", "function"], answer: 1, explanation: "'def' is the keyword used to define functions in Python." },
      { q: "What does len('hello') return?", options: ["4", "5", "6", "Error"], answer: 1, explanation: "'hello' has 5 characters, so len() returns 5." },
      { q: "Which symbol is used for comments in Python?", options: ["//", "/*", "#", "--"], answer: 2, explanation: "# is used for single-line comments in Python." },
      { q: "What is the output of print(2 ** 3)?", options: ["6", "8", "9", "23"], answer: 1, explanation: "** is the exponentiation operator. 2**3 = 8." },
      { q: "Which of these is a valid Python list?", options: ["(1,2,3)", "{1,2,3}", "[1,2,3]", "<1,2,3>"], answer: 2, explanation: "Lists are defined with square brackets []." },
      { q: "What does print(10 // 3) output?", options: ["3.33", "3", "4", "3.0"], answer: 1, explanation: "// is floor division, so 10//3 = 3." },
      { q: "Which function converts a string to integer?", options: ["str()", "float()", "int()", "num()"], answer: 2, explanation: "int() converts a string or float to an integer." },
      { q: "What is the data type of True in Python?", options: ["int", "str", "bool", "bit"], answer: 2, explanation: "True and False are of type bool in Python." },
      { q: "How do you start an if statement in Python?", options: ["if (x > 0):", "if x > 0 then:", "if x > 0:", "IF x > 0:"], answer: 2, explanation: "Python if statements use 'if condition:' syntax." },
      { q: "Which method adds an element to a list?", options: ["add()", "push()", "append()", "insert()"], answer: 2, explanation: "append() adds an element to the end of a list." },
    ],
  java: [
      { q: "Which keyword creates an object in Java?", options: ["create", "new", "make", "object"], answer: 1, explanation: "'new' keyword is used to create objects in Java." },
      { q: "What is the default value of int in Java?", options: ["null", "1", "0", "-1"], answer: 2, explanation: "The default value of an int in Java is 0." },
      { q: "Which method is the entry point of a Java program?", options: ["start()", "run()", "main()", "init()"], answer: 2, explanation: "public static void main(String[] args) is the entry point." },
      { q: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Variable Method", "Java Visual Mode", "Java Version Manager"], answer: 0, explanation: "JVM stands for Java Virtual Machine." },
      { q: "Which keyword prevents inheritance in Java?", options: ["static", "private", "final", "abstract"], answer: 2, explanation: "'final' keyword prevents a class from being subclassed." },
      { q: "What is used to print output in Java?", options: ["console.log()", "print()", "System.out.println()", "echo()"], answer: 2, explanation: "System.out.println() is the standard way to print in Java." },
      { q: "Which symbol is used for single-line comments?", options: ["#", "//", "--", "/*"], answer: 1, explanation: "// is used for single-line comments in Java." },
      { q: "What does 'void' mean as return type?", options: ["Returns 0", "Returns nothing", "Returns null", "Returns false"], answer: 1, explanation: "void means the method does not return any value." },
      { q: "What is the size of int in Java?", options: ["16 bits", "32 bits", "64 bits", "8 bits"], answer: 1, explanation: "int is a 32-bit signed integer in Java." },
      { q: "Which keyword is used for inheritance?", options: ["implements", "inherits", "extends", "uses"], answer: 2, explanation: "'extends' is used for class inheritance in Java." },
    ],
  cpp: [
   { q: "Which operator is used for input in C++?", options: ["<<", ">>", "<>", "=="], answer: 1, explanation: ">> is the extraction operator used with cin for input." },
      { q: "Which header is needed for cout?", options: ["<stdio.h>", "<iostream>", "<conio.h>", "<string>"], answer: 1, explanation: "<iostream> provides cin and cout for I/O operations." },
      { q: "What does 'endl' do in C++?", options: ["Ends program", "Inserts newline and flushes", "Declares end", "Empty line"], answer: 1, explanation: "endl inserts a newline character and flushes the output buffer." },
      { q: "Which keyword defines a constant in C++?", options: ["constant", "final", "const", "fixed"], answer: 2, explanation: "'const' is used to declare constants in C++." },
      { q: "What is the correct way to declare a pointer?", options: ["int ptr;", "int &ptr;", "int *ptr;", "pointer int ptr;"], answer: 2, explanation: "int *ptr; declares a pointer to an integer." },
      { q: "What does 'new' keyword do in C++?", options: ["Creates a class", "Allocates memory on heap", "Declares variable", "Imports library"], answer: 1, explanation: "'new' dynamically allocates memory on the heap." },
      { q: "Which symbol accesses members via a pointer?", options: [".", "->", "::", "=>"], answer: 1, explanation: "-> is used to access members through a pointer." },
      { q: "What is a constructor in C++?", options: ["A return method", "Special method called on object creation", "A destructor", "A static function"], answer: 1, explanation: "A constructor has the same name as the class and initializes objects." },
      { q: "What does 'delete' do in C++?", options: ["Removes a file", "Deallocates heap memory", "Deletes a class", "Removes a variable"], answer: 1, explanation: "'delete' frees memory previously allocated with 'new'." },
      { q: "Which is NOT a C++ access specifier?", options: ["public", "private", "protected", "internal"], answer: 3, explanation: "internal is a C# access modifier, not C++." },
    ],
  sql: [
      { q: "Which SQL statement retrieves data from a table?", options: ["GET", "FETCH", "SELECT", "RETRIEVE"], answer: 2, explanation: "SELECT is the SQL statement used to query and retrieve data." },
      { q: "Which clause filters rows in SQL?", options: ["FILTER", "WHERE", "HAVING", "LIMIT"], answer: 1, explanation: "WHERE clause filters rows based on a condition." },
      { q: "Which SQL keyword removes duplicate rows in SELECT?", options: ["UNIQUE", "DISTINCT", "DIFFERENT", "NODUPE"], answer: 1, explanation: "SELECT DISTINCT returns only unique/distinct values." },
      { q: "Which SQL command inserts data into a table?", options: ["ADD", "INSERT INTO", "PUT", "PUSH"], answer: 1, explanation: "INSERT INTO is used to add new rows to a table." },
      { q: "Which SQL command deletes all rows from a table?", options: ["DELETE TABLE", "DROP", "TRUNCATE", "CLEAR"], answer: 2, explanation: "TRUNCATE removes all rows from a table quickly." },
      { q: "What does ORDER BY do?", options: ["Groups results", "Filters rows", "Sorts results", "Joins tables"], answer: 2, explanation: "ORDER BY sorts query results in ascending or descending order." },
      { q: "What does NULL represent in SQL?", options: ["Zero value", "Empty string", "Unknown/missing value", "False"], answer: 2, explanation: "NULL represents a missing, unknown, or inapplicable value." },
      { q: "Which SQL clause limits the number of rows returned?", options: ["TOP/LIMIT", "MAX", "COUNT", "ROWNUM"], answer: 0, explanation: "LIMIT (MySQL/PostgreSQL) or TOP (SQL Server) restricts the number of rows." },
      { q: "Which function counts rows in SQL?", options: ["SUM()", "COUNT()", "TOTAL()", "NUM()"], answer: 1, explanation: "COUNT() returns the number of rows matching the query." },
      { q: "What does the FROM clause specify?", options: ["Output format", "Which table to query", "Filter condition", "Sort order"], answer: 1, explanation: "FROM specifies the table(s) from which to retrieve data." },
    ],
  dsa: [
      { q: "What is an array?", options: ["Linked list of nodes", "Collection of elements at contiguous memory", "A hash table", "A tree"], answer: 1, explanation: "An array stores elements in contiguous memory locations with index access." },
      { q: "What is a stack data structure?", options: ["FIFO structure", "LIFO (Last In First Out) structure", "Random access structure", "Tree structure"], answer: 1, explanation: "Stack follows LIFO — the last element inserted is the first to be removed." },
      { q: "What is a queue?", options: ["LIFO structure", "FIFO (First In First Out) structure", "Tree structure", "Hash structure"], answer: 1, explanation: "Queue follows FIFO — the first element inserted is the first to be removed." },
      { q: "What is the time complexity of binary search?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], answer: 2, explanation: "Binary search halves the search space each step, giving O(log n) complexity." },
      { q: "What is a linked list?", options: ["Contiguous memory array", "Nodes connected via pointers", "A hash table", "A sorted array"], answer: 1, explanation: "A linked list consists of nodes where each node has data and a pointer to the next." },
      { q: "What is the worst-case time complexity of bubble sort?", options: ["O(n log n)", "O(log n)", "O(n²)", "O(n)"], answer: 2, explanation: "Bubble sort compares all pairs in worst case, giving O(n²)." },
      { q: "What is a binary tree?", options: ["Tree with exactly 2 nodes", "Tree where each node has at most 2 children", "Sorted array", "A graph"], answer: 1, explanation: "A binary tree is a tree data structure where each node has at most 2 children." },
      { q: "What does Big O notation describe?", options: ["Exact runtime", "Upper bound on algorithm's time/space complexity", "Memory usage only", "Best case performance"], answer: 1, explanation: "Big O notation describes the upper bound (worst case) of an algorithm's complexity." },
      { q: "What is a hash table?", options: ["A sorted array", "Key-value store using hash function", "A linked list", "A tree"], answer: 1, explanation: "A hash table maps keys to values using a hash function for O(1) average lookup." },
      { q: "What is recursion?", options: ["A loop", "Function that calls itself", "A sorting method", "A data structure"], answer: 1, explanation: "Recursion is when a function calls itself with a smaller subproblem until a base case." },
    ],
  web: [
      { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Transfer Markup Language", "Home Text Markup Language"], answer: 0, explanation: "HTML stands for HyperText Markup Language." },
      { q: "Which HTML tag creates a hyperlink?", options: ["<link>", "<href>", "<a>", "<url>"], answer: 2, explanation: "<a> (anchor) tag creates hyperlinks using the href attribute." },
      { q: "Which CSS property changes text color?", options: ["font-color", "text-color", "color", "foreground"], answer: 2, explanation: "The 'color' property sets the text color in CSS." },
      { q: "Which HTML tag is used for the largest heading?", options: ["<h6>", "<h1>", "<header>", "<title>"], answer: 1, explanation: "<h1> is the largest heading tag in HTML." },
      { q: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: 1, explanation: "CSS stands for Cascading Style Sheets." },
      { q: "Which JavaScript method selects an element by ID?", options: ["querySelector()", "getElementById()", "getElement()", "selectById()"], answer: 1, explanation: "document.getElementById() selects a DOM element by its ID." },
      { q: "What does the <div> tag represent?", options: ["Division/container element", "Data value", "Document info", "Default view"], answer: 0, explanation: "<div> is a block-level container element used for grouping." },
      { q: "Which CSS property controls the space inside an element?", options: ["margin", "spacing", "padding", "border"], answer: 2, explanation: "padding controls the space between content and the element's border." },
      { q: "Which HTML attribute specifies an image source?", options: ["href", "link", "src", "url"], answer: 2, explanation: "The src attribute specifies the URL of the image in <img> tag." },
      { q: "What is the correct JavaScript syntax to write to the console?", options: ["print('Hello')", "log('Hello')", "console.log('Hello')", "write('Hello')"], answer: 2, explanation: "console.log() outputs messages to the browser's developer console." },
    ],
  c: [
      { q: "Which function is used for output in C?", options: ["print()", "cout", "printf()", "echo()"], answer: 2, explanation: "printf() is the standard output function in C." },
      { q: "Which header file is needed for printf?", options: ["<stdlib.h>", "<string.h>", "<stdio.h>", "<math.h>"], answer: 2, explanation: "<stdio.h> provides printf(), scanf() and other I/O functions." },
      { q: "What is the correct syntax to declare an integer variable?", options: ["integer x;", "int x;", "var x;", "number x;"], answer: 1, explanation: "int x; is the correct way to declare an integer in C." },
      { q: "Which operator is used to get the address of a variable?", options: ["*", "&", "@", "#"], answer: 1, explanation: "& (address-of operator) returns the memory address of a variable." },
      { q: "What does '%d' format specifier represent?", options: ["Double", "String", "Integer", "Character"], answer: 2, explanation: "%d is used to print integer values in printf/scanf." },
      { q: "What is the size of char in C?", options: ["2 bytes", "4 bytes", "1 byte", "8 bytes"], answer: 2, explanation: "char is always 1 byte (8 bits) in C." },
      { q: "Which loop is guaranteed to execute at least once?", options: ["for", "while", "do-while", "foreach"], answer: 2, explanation: "do-while checks condition after execution, so it runs at least once." },
      { q: "What does the 'return 0' in main() mean?", options: ["Error", "Loop end", "Successful program exit", "Function skip"], answer: 2, explanation: "return 0 from main() signals successful program termination to the OS." },
      { q: "Which keyword is used to define a constant in C?", options: ["constant", "final", "#define or const", "static"], answer: 2, explanation: "C uses #define macros or const keyword to define constants." },
      { q: "What is a null terminator in a string?", options: ["Space character", "'\\0' marking end of string", "First character", "Newline character"], answer: 1, explanation: "'\\0' (null character) marks the end of a C string." },
    ],
};


const LANGUAGES = [
  { id: "python", label: "Python", emoji: "🐍" },
  { id: "java",   label: "Java",   emoji: "☕" },
  { id: "cpp",    label: "C++",    emoji: "⚙️" },
  { id: "sql",    label: "SQL",    emoji: "🗄️" },
  { id: "dsa",    label: "DSA",    emoji: "📊" },
  { id: "c",      label: "C",      emoji: "⚙️" },
  { id: "web",    label: "Web Development", emoji: "🌐" }
];

const ROUNDS = 5;
const TIME_PER_Q = 20;
const LETTERS = ["A", "B", "C", "D"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── TimerRing ──────────────────────────────────────────────────────────────
const TimerRing = ({ timeLeft, timeLimit, color }) => {
  const R = 16;
  const circ = 2 * Math.PI * R;
  const pct = timeLeft / timeLimit;
  const ringColor = pct > 0.5 ? color : pct > 0.25 ? "#D97706" : "#DC2626";
  const isUrgent = timeLeft <= 5 && timeLeft > 0;
  return (
    <div style={{ position: "relative", width: "44px", height: "44px", flexShrink: 0 }}>
      <svg width="44" height="44" viewBox="0 0 44 44"
        style={{ transform: "rotate(-90deg)", animation: isUrgent ? "urgentPulse 0.55s ease-in-out infinite" : "none" }}>
        <circle cx="22" cy="22" r={R} fill="none" stroke="#EDE8E1" strokeWidth="3.5" />
        <circle cx="22" cy="22" r={R} fill="none" stroke={ringColor} strokeWidth="3.5"
          strokeLinecap="round" strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          style={{ transition: "stroke-dashoffset 0.92s linear, stroke 0.3s ease" }} />
      </svg>
      <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "800", color: ringColor }}>
        {timeLeft}
      </span>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const PassAndPlay = () => {
  const navigate = useNavigate();

  const [phase, setPhase] = useState("setup");
  const [player1, setPlayer1] = useState("Player 1");
  const [player2, setPlayer2] = useState("Player 2");
  const [selectedLang, setSelectedLang] = useState("python");
  const [questions, setQuestions] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [round, setRound] = useState(0);
  const [scores, setScores] = useState([0, 0]);
  const [selected, setSelected] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [timedOut, setTimedOut] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef(null);

  const clearTimer = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };

  const q = questions[round] ?? null;
  const answered = selected !== null || timedOut;
  const isCorrect = selected !== null && q && selected === q.answer;
  const playerNames = [player1 || "Player 1", player2 || "Player 2"];
  const colors = ["#7C3AED", "#0891b2"];

  useEffect(() => {
    if (phase !== "quiz" || answered) return;
    clearTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer();
          setTimedOut(true);
          setShowExp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return clearTimer;
  }, [phase, answered, animKey]);

  useEffect(() => { if (answered) clearTimer(); }, [answered]);
  useEffect(() => () => clearTimer(), []);

  const startGame = () => {
    const bank = QUESTION_BANK[selectedLang] ?? [];
    const qs = shuffle(bank).slice(0, ROUNDS * 2);
    setQuestions(qs);
    setScores([0, 0]);
    setRound(0);
    setCurrentTurn(0);
    setSelected(null);
    setShowExp(false);
    setTimedOut(false);
    setTimeLeft(TIME_PER_Q);
    setAnimKey(k => k + 1);
    setPhase("handoff");
  };

  const startTurn = () => {
    setSelected(null);
    setShowExp(false);
    setTimedOut(false);
    setTimeLeft(TIME_PER_Q);
    setAnimKey(k => k + 1);
    setPhase("quiz");
  };

  const handleAnswer = (idx) => {
    if (answered || !q) return;
    clearTimer();
    setSelected(idx);
    setShowExp(true);
    if (idx === q.answer) {
      setScores(s => { const ns = [...s]; ns[currentTurn] += 1; return ns; });
    }
  };

  const handleNext = () => {
    const nextRound = round + 1;
    const totalQ = ROUNDS * 2;

    if (nextRound >= totalQ) {
      setPhase("result");
      return;
    }

    setRound(nextRound);
    const nextTurn = nextRound % 2 === 0 ? 0 : 1;
    setCurrentTurn(nextTurn);
    setPhase("handoff");
  };

  // ── SETUP ────────────────────────────────────────────────────────────────
  if (phase === "setup") return (
    <div style={{ minHeight: "100vh", background: "#F5F0EB", fontFamily: "'Segoe UI',system-ui,sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ background: "#FFF", border: "1px solid #E8E2DA", borderRadius: "20px", padding: "36px 28px", width: "100%", maxWidth: "440px", animation: "fadeUp 0.35s ease both" }}>

        {/* ✅ FIXED: navigate("/home") instead of navigate("/") */}
        <button onClick={() => navigate("/home")} style={{ background: "none", border: "none", cursor: "pointer", color: "#9C9489", fontSize: "14px", marginBottom: "20px", padding: 0, display: "flex", alignItems: "center", gap: "6px" }}>← Back</button>

        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <span style={{ fontSize: "40px", display: "block", marginBottom: "10px" }}>🤝</span>
          <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#1C1814", margin: "0 0 6px" }}>Pass &amp; Play</h1>
          <p style={{ fontSize: "14px", color: "#7A7268", margin: 0 }}>Two players, one device — take turns answering!</p>
        </div>

        <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ fontSize: "12px", fontWeight: "700", color: "#7C3AED", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Player 1 Name</label>
            <input value={player1} onChange={e => setPlayer1(e.target.value)} placeholder="Player 1"
              style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #E8E2DA", fontSize: "15px", outline: "none", background: "#FAFAF8", color: "#1C1814" }} />
          </div>
          <div>
            <label style={{ fontSize: "12px", fontWeight: "700", color: "#0891b2", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Player 2 Name</label>
            <input value={player2} onChange={e => setPlayer2(e.target.value)} placeholder="Player 2"
              style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #E8E2DA", fontSize: "15px", outline: "none", background: "#FAFAF8", color: "#1C1814" }} />
          </div>
        </div>

        <div style={{ marginBottom: "28px" }}>
          <label style={{ fontSize: "12px", fontWeight: "700", color: "#6B6560", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>Select Topic</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            {LANGUAGES.map(lang => (
              <button key={lang.id} onClick={() => setSelectedLang(lang.id)}
                style={{ padding: "10px 8px", borderRadius: "10px", border: `2px solid ${selectedLang === lang.id ? "#7C3AED" : "#E8E2DA"}`, background: selectedLang === lang.id ? "#F3F0FF" : "#FAFAF8", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", transition: "all 0.15s" }}>
                <span style={{ fontSize: "18px" }}>{lang.emoji}</span>
                <span style={{ fontSize: "12px", fontWeight: "700", color: selectedLang === lang.id ? "#7C3AED" : "#6B6560" }}>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: "#F3F0FF", borderRadius: "12px", padding: "12px 16px", marginBottom: "24px", fontSize: "13px", color: "#5B4A9F", lineHeight: 1.6 }}>
          <strong>How it works:</strong> Each player answers {ROUNDS} questions in turns. Pass the device when prompted. Highest score wins!
        </div>

        <button onClick={startGame}
          style={{ width: "100%", background: "linear-gradient(90deg,#7C3AED,#a855f7)", color: "#FFF", border: "none", borderRadius: "12px", padding: "14px", fontSize: "16px", fontWeight: "800", cursor: "pointer" }}>
          Start Game 🎮
        </button>
      </div>
    </div>
  );

  // ── HANDOFF ──────────────────────────────────────────────────────────────
  if (phase === "handoff") {
    return (
      <div style={{ minHeight: "100vh", background: colors[currentTurn] === "#7C3AED" ? "#2D1B69" : "#0C3D52", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
        <div style={{ textAlign: "center", color: "#FFF" }}>
          <span style={{ fontSize: "56px", display: "block", marginBottom: "16px" }}>
            {currentTurn === 0 ? "🟣" : "🔵"}
          </span>
          <h2 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 8px" }}>
            {playerNames[currentTurn]}'s Turn
          </h2>
          <p style={{ fontSize: "16px", opacity: 0.75, margin: "0 0 12px" }}>
            Question {round + 1} of {ROUNDS * 2}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "32px", marginBottom: "36px" }}>
            {[0, 1].map(i => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: "800" }}>{scores[i]}</div>
                <div style={{ fontSize: "13px", opacity: 0.7 }}>{playerNames[i]}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "14px", opacity: 0.65, margin: "0 0 28px", maxWidth: "280px" }}>
            Hand the device to {playerNames[currentTurn]} and tap Ready when they're set!
          </p>
          <button onClick={startTurn}
            style={{ background: "#FFF", color: colors[currentTurn], border: "none", borderRadius: "14px", padding: "14px 36px", fontSize: "16px", fontWeight: "800", cursor: "pointer" }}>
            I'm Ready! →
          </button>
        </div>
      </div>
    );
  }

  // ── RESULT ───────────────────────────────────────────────────────────────
  if (phase === "result") {
    const tied = scores[0] === scores[1];
    const winner = tied ? -1 : scores[0] > scores[1] ? 0 : 1;
    return (
      <div style={{ minHeight: "100vh", background: "#F5F0EB", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
        <div style={{ background: "#FFF", border: "1px solid #E8E2DA", borderRadius: "20px", padding: "40px 28px", textAlign: "center", width: "100%", maxWidth: "420px" }}>
          <span style={{ fontSize: "52px", display: "block", marginBottom: "16px" }}>
            {tied ? "🤝" : "🏆"}
          </span>
          <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#1C1814", margin: "0 0 8px" }}>
            {tied ? "It's a Tie!" : `${playerNames[winner]} Wins!`}
          </h2>
          <p style={{ fontSize: "14px", color: "#7A7268", marginBottom: "28px" }}>
            {tied ? "Both players scored equally — great match!" : `${playerNames[winner]} answered more correctly!`}
          </p>

          <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
            {[0, 1].map(i => (
              <div key={i} style={{ flex: 1, background: winner === i ? "#F3F0FF" : "#FAFAF8", border: `2px solid ${winner === i ? colors[i] : "#E8E2DA"}`, borderRadius: "14px", padding: "18px 12px" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: colors[i], letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>
                  {winner === i ? "🥇 " : ""}{playerNames[i]}
                </div>
                <div style={{ fontSize: "36px", fontWeight: "800", color: colors[i], lineHeight: 1 }}>{scores[i]}</div>
                <div style={{ fontSize: "12px", color: "#9C9489", marginTop: "4px" }}>/ {ROUNDS} correct</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button onClick={startGame}
              style={{ flex: 1, background: "#7C3AED", color: "#FFF", border: "none", borderRadius: "12px", padding: "13px", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
              ↺ Play Again
            </button>
            <button onClick={() => navigate("/home")}
              style={{ flex: 1, background: "#F5F0EB", color: "#4A4540", border: "1.5px solid #DDD7CE", borderRadius: "12px", padding: "13px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
              ← Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes slideQ { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeExp{ from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes urgentPulse{ 0%,100%{transform:scale(1)} 50%{transform:scale(1.13)} }
        .q-enter{ animation: slideQ 0.32s cubic-bezier(.22,.68,0,1.2) both; }
        .exp-enter{ animation: fadeExp 0.24s ease both; }
        .opt-btn:hover:not(:disabled){ transform:translateX(4px); }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#F5F0EB", fontFamily: "'Segoe UI',system-ui,sans-serif", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#FFF", borderBottom: "1px solid #E8E2DA", padding: "10px 20px", display: "flex", alignItems: "center", gap: "12px", position: "sticky", top: 0, zIndex: 10 }}>
          <button onClick={() => setPhase("setup")}
            style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1.5px solid #E0D8CF", background: "#F5F0EB", cursor: "pointer", fontSize: "15px", color: "#6B6560", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ✕
          </button>
          <div style={{ flex: 1, height: "8px", background: "#EDE8E1", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ height: "100%", background: colors[currentTurn], borderRadius: "999px", width: `${(round / (ROUNDS * 2)) * 100}%`, transition: "width 0.45s ease" }} />
          </div>
          <TimerRing timeLeft={timeLeft} timeLimit={TIME_PER_Q} color={colors[currentTurn]} />
          <span style={{ fontSize: "13px", fontWeight: "700", color: colors[currentTurn], background: currentTurn === 0 ? "#F3F0FF" : "#E0F2FE", padding: "4px 10px", borderRadius: "999px", whiteSpace: "nowrap" }}>
            {playerNames[currentTurn]}
          </span>
        </div>

        <div style={{ flex: 1, width: "100%", maxWidth: "680px", margin: "0 auto", padding: "20px 16px 48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#8B7FB8" }}>Pass &amp; Play • {LANGUAGES.find(l => l.id === selectedLang)?.label}</span>
            <span style={{ fontSize: "13px", color: "#9C9489", fontWeight: "600", background: "#EDE8E1", padding: "4px 10px", borderRadius: "999px" }}>
              Q{round + 1}/{ROUNDS * 2}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#FFF", border: "1px solid #E8E2DA", borderRadius: "14px", overflow: "hidden", marginBottom: "18px" }}>
            {[0, 1].map(i => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px", gap: "2px", borderRight: i === 0 ? "1px solid #EDE8E1" : "none", background: currentTurn === i ? (i === 0 ? "#F3F0FF" : "#E0F2FE") : "transparent" }}>
                <span style={{ fontSize: "20px", fontWeight: "700", color: colors[i] }}>{scores[i]}</span>
                <span style={{ fontSize: "11px", color: "#A09890", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>{playerNames[i]}</span>
                {currentTurn === i && <span style={{ fontSize: "10px", color: colors[i], fontWeight: "700" }}>← active</span>}
              </div>
            ))}
          </div>

          <div key={animKey} className="q-enter">
            {timedOut && (
              <div className="exp-enter" style={{ background: "#FEF3C7", border: "1.5px solid #FCD34D", borderRadius: "12px", padding: "11px 16px", fontSize: "14px", color: "#92400E", marginBottom: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>⏰</span>
                Time's up! Correct answer: <span style={{ background: "#FDE68A", padding: "2px 8px", borderRadius: "6px", fontWeight: "800" }}>{q?.options?.[q?.answer]}</span>
              </div>
            )}

            <div style={{ background: "#FFF", border: "1px solid #E8E2DA", borderRadius: "16px", padding: "22px 20px", marginBottom: "14px" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#A09890", textTransform: "uppercase", marginBottom: "10px", display: "block" }}>Choose the correct answer:</span>
              <p style={{ fontSize: "17px", fontWeight: "700", color: "#1C1814", lineHeight: 1.55, margin: 0 }}>{q?.q}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "14px" }}>
              {q?.options.map((opt, i) => {
                const isAns = i === q.answer, isSel = i === selected;
                let bg = "#FFF", border = "#E8E2DA", txtClr = "#1C1814";
                if (answered) {
                  if (isAns)      { bg = "#F0FDF4"; border = "#86EFAC"; txtClr = "#166534"; }
                  else if (isSel) { bg = "#FEF2F2"; border = "#FECACA"; txtClr = "#991B1B"; }
                  else            { bg = "#FAFAF8"; border = "#EDE8E1"; txtClr = "#C0B8B0"; }
                }
                return (
                  <button key={i} className="opt-btn" disabled={answered} onClick={() => handleAnswer(i)}
                    style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", background: bg, border: `1.5px solid ${border}`, borderRadius: "14px", cursor: answered ? "default" : "pointer", width: "100%", textAlign: "left", transition: "transform 0.15s,border-color 0.15s,background 0.15s" }}>
                    <span style={{ width: "32px", height: "32px", borderRadius: "50%", border: `1.5px solid ${border}`, background: answered ? "transparent" : "#F5F0EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", color: txtClr, flexShrink: 0 }}>
                      {LETTERS[i]}
                    </span>
                    <span style={{ flex: 1, fontSize: "15px", fontWeight: "500", color: txtClr, lineHeight: 1.45 }}>{opt}</span>
                    {answered && isAns && <span>✅</span>}
                    {answered && isSel && !isAns && <span>❌</span>}
                  </button>
                );
              })}
            </div>

            {showExp && !timedOut && q?.explanation && (
              <div className="exp-enter" style={{ background: isCorrect ? "#F0FDF4" : "#FEF2F2", border: `1.5px solid ${isCorrect ? "#86EFAC" : "#FECACA"}`, borderRadius: "12px", padding: "14px 16px", fontSize: "14px", color: isCorrect ? "#166534" : "#991B1B", lineHeight: 1.6, marginBottom: "14px" }}>
                <span style={{ fontWeight: "700", display: "block", marginBottom: "4px", fontSize: "13px" }}>
                  {isCorrect ? "✅ Correct!" : "❌ Incorrect!"}
                </span>
                {q.explanation}
              </div>
            )}

            {answered && (
              <div className="exp-enter" style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={handleNext}
                  style={{ background: colors[currentTurn], color: "#FFF", border: "none", borderRadius: "12px", padding: "12px 24px", fontSize: "15px", fontWeight: "700", cursor: "pointer", boxShadow: `0 4px 14px ${colors[currentTurn]}44` }}>
                  {round + 1 >= ROUNDS * 2 ? "See Results" : "Next →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PassAndPlay;