
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";


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

const AI_DIFFICULTY = {
  easy:   { label: "Easy",   emoji: "🟢", accuracy: 0.50, delay: [2000, 4000], color: "#16A34A", desc: "Bot answers randomly — ~50% accuracy" },
  medium: { label: "Medium", emoji: "🟡", accuracy: 0.75, delay: [1500, 3000], color: "#D97706", desc: "Bot is decent — ~75% accuracy" },
  hard:   { label: "Hard",   emoji: "🔴", accuracy: 0.92, delay: [800, 1800],  color: "#DC2626", desc: "Bot is tough — ~92% accuracy" },
};

const TOTAL_Q   = 7;
const TIME_PER_Q = 20;
const LETTERS    = ["A", "B", "C", "D"];
const BOT_MSGS   = {
  correct: ["Nice try, but I knew that one.", "Too easy for me!", "Correct — as always.", "Calculating... got it!", "My circuits are warmed up!"],
  wrong:   ["Hmm, that tripped me up.", "Voltage fluctuation — my bad!", "Error 404: correct answer not found.", "Well played! You got me.", "My neural nets need calibrating..."],
  timeout: ["You ran out of time! I got the point.", "The clock beat you, not me!", "Tick tock..."],
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randMsg(arr) { return arr[Math.floor(Math.random() * arr.length)]; }


const TimerRing = ({ timeLeft, timeLimit, color }) => {
  const R = 16, circ = 2 * Math.PI * R;
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

const VsComputer = () => {
  const navigate = useNavigate();

  const [phase,         setPhase]         = useState("setup");
  const [playerName,    setPlayerName]    = useState("You");
  const [selectedLang,  setSelectedLang]  = useState("python");
  const [aiDiff,        setAiDiff]        = useState("medium");
  const [questions,     setQuestions]     = useState([]);
  const [current,       setCurrent]       = useState(0);
  const [scores,        setScores]        = useState({ player: 0, bot: 0 });
  const [selected,      setSelected]      = useState(null);
  const [botSelected,   setBotSelected]   = useState(null);
  const [showExp,       setShowExp]       = useState(false);
  const [timeLeft,      setTimeLeft]      = useState(TIME_PER_Q);
  const [timedOut,      setTimedOut]      = useState(false);
  const [botThinking,   setBotThinking]   = useState(false);
  const [botMsg,        setBotMsg]        = useState("");
  const [animKey,       setAnimKey]       = useState(0);
  const timerRef = useRef(null);
  const botTimeoutRef = useRef(null);

  const clearTimer  = () => { if (timerRef.current)     { clearInterval(timerRef.current);  timerRef.current = null; } };
  const clearBotTO  = () => { if (botTimeoutRef.current){ clearTimeout(botTimeoutRef.current); botTimeoutRef.current = null; } };

  const q        = questions[current] ?? null;
  const answered = selected !== null || timedOut;
  const diff     = AI_DIFFICULTY[aiDiff];

  const triggerBot = useCallback((q, diff) => {
    setBotThinking(true);
    setBotSelected(null);
    setBotMsg("");
    const [minD, maxD] = diff.delay;
    const delay = minD + Math.random() * (maxD - minD);
    const botCorrect = Math.random() < diff.accuracy;

    botTimeoutRef.current = setTimeout(() => {
      let botAns;
      if (botCorrect) {
        botAns = q.answer;
      } else {
        const wrong = [0, 1, 2, 3].filter(i => i !== q.answer);
        botAns = wrong[Math.floor(Math.random() * wrong.length)];
      }
      setBotSelected(botAns);
      setBotThinking(false);
      if (botCorrect) {
        setScores(s => ({ ...s, bot: s.bot + 1 }));
        setBotMsg(randMsg(BOT_MSGS.correct));
      } else {
        setBotMsg(randMsg(BOT_MSGS.wrong));
      }
    }, delay);
  }, []);

  useEffect(() => {
    if (phase !== "quiz" || answered) return;
    clearTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer();
          setTimedOut(true);
          setShowExp(true);
          setBotMsg(randMsg(BOT_MSGS.timeout));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return clearTimer;
  }, [phase, answered, animKey]);

  useEffect(() => { if (answered) clearTimer(); }, [answered]);
  useEffect(() => () => { clearTimer(); clearBotTO(); }, []);

  useEffect(() => {
    if (phase === "quiz" && q && !answered) {
      triggerBot(q, diff);
    }
  }, [phase, animKey]);

  const startGame = () => {
    const bank = QUESTION_BANK[selectedLang] ?? [];
    setQuestions(shuffle(bank).slice(0, TOTAL_Q));
    setScores({ player: 0, bot: 0 });
    setCurrent(0);
    setSelected(null);
    setBotSelected(null);
    setShowExp(false);
    setTimedOut(false);
    setBotThinking(false);
    setBotMsg("");
    setTimeLeft(TIME_PER_Q);
    setAnimKey(k => k + 1);
    setPhase("quiz");
  };

  const handleAnswer = (idx) => {
    if (answered || !q) return;
    clearTimer();
    setSelected(idx);
    setShowExp(true);
    if (idx === q.answer) setScores(s => ({ ...s, player: s.player + 1 }));
  };

  const handleNext = () => {
    clearBotTO();
    const next = current + 1;
    if (next >= TOTAL_Q) { setPhase("result"); return; }
    setCurrent(next);
    setSelected(null);
    setBotSelected(null);
    setShowExp(false);
    setTimedOut(false);
    setBotThinking(false);
    setBotMsg("");
    setTimeLeft(TIME_PER_Q);
    setAnimKey(k => k + 1);
  };

  const bothAnswered = answered && (botSelected !== null || timedOut);
  const playerCorrect = selected !== null && selected === q?.answer;
  const botCorrectThisQ = botSelected !== null && botSelected === q?.answer;

  // ── SETUP ────────────────────────────────────────────────────────────────
  if (phase === "setup") return (
    <div style={{ minHeight: "100vh", background: "#0f0f1a", fontFamily: "'Segoe UI',system-ui,sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} @keyframes botPulse{0%,100%{box-shadow:0 0 0 0 rgba(56,189,248,0.4)}50%{box-shadow:0 0 0 10px rgba(56,189,248,0)}}`}</style>
      <div style={{ background: "#1a1a2e", border: "1px solid #2a2a3e", borderRadius: "20px", padding: "36px 28px", width: "100%", maxWidth: "440px", animation: "fadeUp 0.35s ease both" }}>
        <button onClick={() => navigate("/home")} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: "14px", marginBottom: "20px", padding: 0 }}>← Back</button>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <span style={{ fontSize: "48px", display: "block", marginBottom: "10px", animation: "botPulse 2s ease infinite" }}>🤖</span>
          <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#F0F6FF", margin: "0 0 6px" }}>vs Computer</h1>
          <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>Race the bot — answer before it does!</p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "12px", fontWeight: "700", color: "#38BDF8", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Your Name</label>
          <input value={playerName} onChange={e => setPlayerName(e.target.value)} placeholder="Your name"
            style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #2a2a3e", fontSize: "15px", outline: "none", background: "#0f0f1a", color: "#F0F6FF" }} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "12px", fontWeight: "700", color: "#6B7280", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>Topic</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            {LANGUAGES.map(lang => (
              <button key={lang.id} onClick={() => setSelectedLang(lang.id)}
                style={{ padding: "10px 8px", borderRadius: "10px", border: `2px solid ${selectedLang === lang.id ? "#38BDF8" : "#2a2a3e"}`, background: selectedLang === lang.id ? "#0c2a3a" : "#0f0f1a", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", transition: "all 0.15s" }}>
                <span style={{ fontSize: "18px" }}>{lang.emoji}</span>
                <span style={{ fontSize: "12px", fontWeight: "700", color: selectedLang === lang.id ? "#38BDF8" : "#6B7280" }}>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "28px" }}>
          <label style={{ fontSize: "12px", fontWeight: "700", color: "#6B7280", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>Bot Difficulty</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {Object.entries(AI_DIFFICULTY).map(([key, d]) => (
              <button key={key} onClick={() => setAiDiff(key)}
                style={{ padding: "12px 16px", borderRadius: "10px", border: `2px solid ${aiDiff === key ? d.color : "#2a2a3e"}`, background: aiDiff === key ? "#0f1922" : "#0f0f1a", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", textAlign: "left", transition: "all 0.15s" }}>
                <span style={{ fontSize: "18px" }}>{d.emoji}</span>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: aiDiff === key ? d.color : "#9CA3AF" }}>{d.label}</div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>{d.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button onClick={startGame}
          style={{ width: "100%", background: "linear-gradient(90deg,#0f2d4a,#185FA5)", color: "#FFF", border: "2px solid #38BDF8", borderRadius: "12px", padding: "14px", fontSize: "16px", fontWeight: "800", cursor: "pointer" }}>
          ⚡ Challenge the Bot
        </button>
      </div>
    </div>
  );

  // ── RESULT ───────────────────────────────────────────────────────────────
  if (phase === "result") {
    const playerWon = scores.player > scores.bot;
    const tied      = scores.player === scores.bot;
    return (
      <div style={{ minHeight: "100vh", background: "#0f0f1a", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
        <div style={{ background: "#1a1a2e", border: "1px solid #2a2a3e", borderRadius: "20px", padding: "40px 28px", textAlign: "center", width: "100%", maxWidth: "420px" }}>
          <span style={{ fontSize: "52px", display: "block", marginBottom: "16px" }}>
            {tied ? "🤝" : playerWon ? "🏆" : "💻"}
          </span>
          <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#F0F6FF", margin: "0 0 8px" }}>
            {tied ? "It's a Tie!" : playerWon ? "You Won!" : "Bot Wins!"}
          </h2>
          <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "28px" }}>
            {tied ? "Evenly matched — impressive!" : playerWon ? "You outscored the bot. Well done!" : "The bot got you this time. Try again!"}
          </p>

          <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
            {[
              { label: playerName || "You", score: scores.player, color: "#38BDF8", won: playerWon || tied },
              { label: "🤖 Bot",             score: scores.bot,    color: "#DC2626", won: !playerWon || tied },
            ].map((p, i) => (
              <div key={i} style={{ flex: 1, background: (!tied && ((i === 0 && playerWon) || (i === 1 && !playerWon))) ? "#0c2a3a" : "#0f0f1a", border: `2px solid ${(!tied && ((i === 0 && playerWon) || (i === 1 && !playerWon))) ? p.color : "#2a2a3e"}`, borderRadius: "14px", padding: "18px 12px" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: p.color, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>{p.label}</div>
                <div style={{ fontSize: "36px", fontWeight: "800", color: p.color, lineHeight: 1 }}>{p.score}</div>
                <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>/ {TOTAL_Q} correct</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button onClick={startGame}
              style={{ flex: 1, background: "linear-gradient(90deg,#0f2d4a,#185FA5)", color: "#FFF", border: "2px solid #38BDF8", borderRadius: "12px", padding: "13px", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
              ↺ Rematch
            </button>
            <button onClick={() => setPhase("setup")}
              style={{ flex: 1, background: "#0f0f1a", color: "#9CA3AF", border: "1.5px solid #2a2a3e", borderRadius: "12px", padding: "13px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
              ⚙️ Settings
            </button>
            {/* ✅ FIXED: navigate("/home") instead of navigate("/") */}
            <button onClick={() => navigate("/home")}
              style={{ flex: "0 0 100%", background: "none", color: "#6B7280", border: "none", padding: "8px", fontSize: "14px", cursor: "pointer" }}>
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
        @keyframes botThink { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes botSlide { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
        .q-enter { animation: slideQ 0.32s cubic-bezier(.22,.68,0,1.2) both; }
        .exp-enter{ animation: fadeExp 0.24s ease both; }
        .bot-msg  { animation: botSlide 0.2s ease both; }
        .opt-btn:hover:not(:disabled){ transform:translateX(4px); }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#0f0f1a", fontFamily: "'Segoe UI',system-ui,sans-serif", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#1a1a2e", borderBottom: "1px solid #2a2a3e", padding: "10px 20px", display: "flex", alignItems: "center", gap: "12px", position: "sticky", top: 0, zIndex: 10 }}>
          <button onClick={() => setPhase("setup")}
            style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1.5px solid #2a2a3e", background: "#0f0f1a", cursor: "pointer", fontSize: "15px", color: "#6B7280", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ✕
          </button>
          <div style={{ flex: 1, height: "8px", background: "#2a2a3e", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ height: "100%", background: "#38BDF8", borderRadius: "999px", width: `${(current / TOTAL_Q) * 100}%`, transition: "width 0.45s ease" }} />
          </div>
          <TimerRing timeLeft={timeLeft} timeLimit={TIME_PER_Q} color="#38BDF8" />
          <span style={{ fontSize: "13px", fontWeight: "600", color: "#9CA3AF", background: "#0f0f1a", padding: "4px 10px", borderRadius: "999px" }}>
            {current + 1}/{TOTAL_Q}
          </span>
        </div>

        <div style={{ flex: 1, width: "100%", maxWidth: "680px", margin: "0 auto", padding: "20px 16px 48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#38BDF8" }}>vs Computer • {LANGUAGES.find(l => l.id === selectedLang)?.label} • {diff.label}</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#1a1a2e", border: "1px solid #2a2a3e", borderRadius: "14px", overflow: "hidden", marginBottom: "18px" }}>
            {[
              { label: playerName || "You", score: scores.player, color: "#38BDF8" },
              { label: "🤖 Bot",             score: scores.bot,    color: diff.color },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px", borderRight: i === 0 ? "1px solid #2a2a3e" : "none" }}>
                <span style={{ fontSize: "20px", fontWeight: "700", color: p.color }}>{p.score}</span>
                <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>{p.label}</span>
              </div>
            ))}
          </div>

          <div style={{ background: "#1a1a2e", border: `1px solid #2a2a3e`, borderRadius: "12px", padding: "10px 16px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "10px", minHeight: "44px" }}>
            <span style={{ fontSize: "18px", animation: botThinking ? "botThink 0.8s ease infinite" : "none" }}>🤖</span>
            {botThinking && (
              <span style={{ fontSize: "13px", color: "#6B7280", animation: "botThink 0.8s ease infinite" }}>Thinking...</span>
            )}
            {!botThinking && botSelected !== null && (
              <>
                <span style={{ fontSize: "13px", color: "#6B7280" }}>Done thinking</span>
                {botMsg && <span className="bot-msg" style={{ fontSize: "12px", color: "#6B7280", marginLeft: "auto", fontStyle: "italic", maxWidth: "200px", textAlign: "right" }}>{botMsg}</span>}
              </>
            )}
            {!botThinking && timedOut && botSelected === null && (
              <span style={{ fontSize: "13px", color: "#6B7280" }}>Bot was also thinking...</span>
            )}
          </div>

          <div key={animKey} className="q-enter">
            {timedOut && (
              <div className="exp-enter" style={{ background: "#1a1200", border: "1.5px solid #854d0e", borderRadius: "12px", padding: "11px 16px", fontSize: "14px", color: "#FDE68A", marginBottom: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>⏰</span> Time's up! Correct: <span style={{ background: "#422006", padding: "2px 8px", borderRadius: "6px", fontWeight: "800" }}>{q?.options?.[q?.answer]}</span>
              </div>
            )}

            <div style={{ background: "#1a1a2e", border: "1px solid #2a2a3e", borderRadius: "16px", padding: "22px 20px", marginBottom: "14px" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#4B5563", textTransform: "uppercase", marginBottom: "10px", display: "block" }}>Choose the correct answer:</span>
              <p style={{ fontSize: "17px", fontWeight: "700", color: "#F0F6FF", lineHeight: 1.55, margin: 0 }}>{q?.q}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "14px" }}>
              {q?.options.map((opt, i) => {
                const isAns = i === q.answer, isSel = i === selected;
                let bg = "#1a1a2e", border = "#2a2a3e", txtClr = "#D1D5DB";
                if (bothAnswered) {
                  if (isAns)       { bg = "#052e16"; border = "#16A34A"; txtClr = "#4ADE80"; }
                  else if (isSel)  { bg = "#2a0a0a"; border = "#DC2626"; txtClr = "#F87171"; }
                  else             { bg = "#111827"; border = "#1F2937"; txtClr = "#4B5563"; }
                }

                return (
                  <button key={i} className="opt-btn" disabled={answered} onClick={() => handleAnswer(i)}
                    style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", background: bg, border: `1.5px solid ${border}`, borderRadius: "14px", cursor: answered ? "default" : "pointer", width: "100%", textAlign: "left", transition: "transform 0.15s,border-color 0.15s,background 0.15s", position: "relative" }}>
                    <span style={{ width: "32px", height: "32px", borderRadius: "50%", border: `1.5px solid ${border}`, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", color: txtClr, flexShrink: 0 }}>
                      {LETTERS[i]}
                    </span>
                    <span style={{ flex: 1, fontSize: "15px", fontWeight: "500", color: txtClr, lineHeight: 1.45 }}>{opt}</span>
                    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                      {bothAnswered && isAns  && <span>✅</span>}
                      {bothAnswered && isSel && !isAns && <span>❌</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {showExp && !timedOut && q?.explanation && bothAnswered && (
              <div className="exp-enter" style={{ background: playerCorrect ? "#052e16" : "#2a0a0a", border: `1.5px solid ${playerCorrect ? "#16A34A" : "#DC2626"}`, borderRadius: "12px", padding: "14px 16px", fontSize: "14px", color: playerCorrect ? "#4ADE80" : "#F87171", lineHeight: 1.6, marginBottom: "14px" }}>
                <span style={{ fontWeight: "700", display: "block", marginBottom: "4px", fontSize: "13px" }}>
                  {playerCorrect ? "✅ You got it!" : "❌ Not quite!"}
                </span>
                {q.explanation}
              </div>
            )}

            {timedOut && q?.explanation && (
              <div className="exp-enter" style={{ background: "#1a1000", border: "1.5px solid #854d0e", borderRadius: "12px", padding: "14px 16px", fontSize: "14px", color: "#FCD34D", lineHeight: 1.6, marginBottom: "14px" }}>
                <span style={{ fontWeight: "700", display: "block", marginBottom: "4px", fontSize: "13px" }}>💡 Explanation</span>
                {q.explanation}
              </div>
            )}

            {(bothAnswered || timedOut) && (
              <div className="exp-enter" style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={handleNext}
                  style={{ background: "linear-gradient(90deg,#0f2d4a,#185FA5)", color: "#FFF", border: "2px solid #38BDF8", borderRadius: "12px", padding: "12px 24px", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
                  {current + 1 >= TOTAL_Q ? "See Results" : "Next →"}
                </button>
              </div>
            )}

            {answered && !bothAnswered && !timedOut && (
              <div style={{ display: "flex", justifyContent: "center", padding: "12px", fontSize: "14px", color: "#6B7280" }}>
                <span style={{ animation: "botThink 0.8s ease infinite" }}>⏳ Waiting for bot's answer...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VsComputer;