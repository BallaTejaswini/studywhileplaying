// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useState, useEffect, useCallback, useRef } from "react";
// import { updateGameStats } from "../utils/UpdateGameStats";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useCallback,useRef } from "react";
import { updateGameStats } from "../utils/UpdateGameStats";

const QUESTION_BANK = {
  python: {
    easy: [
      { code: `___ x = 10\nprint(x)`, blank: "___", answer: "int", choices: ["int", "var", "let", "num"], explanation: "In Python, variables don't need type declarations. Just write: x = 10", hint: "Python is dynamically typed — no keyword needed" },
      { code: `def greet(name):\n    ___ "Hello, " + name`, blank: "___", answer: "return", choices: ["return", "print", "yield", "give"], explanation: "'return' sends a value back from a function.", hint: "Sends a value back to the caller" },
      { code: `fruits = ["apple", "banana"]\nfruits.___(\"mango\")`, blank: "___", answer: "append", choices: ["append", "push", "add", "insert"], explanation: "append() adds an element to the end of a list.", hint: "Adds to the end of a list" },
      { code: `for i in ___(5):\n    print(i)`, blank: "___", answer: "range", choices: ["range", "loop", "iter", "count"], explanation: "range() generates a sequence of numbers.", hint: "Generates a number sequence" },
      { code: `x = 10\nif x ___ 5:\n    print("big")`, blank: "___", answer: ">", choices: [">", "=>", "gt", ">>"], explanation: "> is the greater-than comparison operator.", hint: "Greater than comparison" },
      { code: `name = "Alice"\nprint(name.___(  ))`, blank: "___", answer: "upper", choices: ["upper", "toUpper", "UP", "caps"], explanation: "upper() converts a string to uppercase.", hint: "Converts to ALL CAPS" },
      { code: `nums = [3, 1, 4, 1, 5]\nnums.___()`, blank: "___", answer: "sort", choices: ["sort", "order", "arrange", "rank"], explanation: "sort() sorts a list in-place.", hint: "Arranges elements in order" },
      { code: `d = {"key": "val"}\nprint(d.___(\"key\"))`, blank: "___", answer: "get", choices: ["get", "fetch", "read", "access"], explanation: "dict.get(key) retrieves a value safely.", hint: "Safely retrieves a dictionary value" },
      { code: `text = "hello world"\nwords = text.___(\" \")`, blank: "___", answer: "split", choices: ["split", "divide", "cut", "break"], explanation: "split() breaks a string into a list by delimiter.", hint: "Splits string into a list" },
      { code: `___ x in [1, 2, 3]:\n    print(x)`, blank: "___", answer: "for", choices: ["for", "loop", "each", "iterate"], explanation: "'for' is used to iterate over sequences in Python.", hint: "Loop keyword for sequences" },
    ],
    medium: [
      { code: `squares = [x**2 ___ x in range(10)]`, blank: "___", answer: "for", choices: ["for", "if", "while", "in"], explanation: "List comprehensions use 'for' to iterate.", hint: "List comprehension iteration keyword" },
      { code: `def gen():\n    ___ 1\n    yield 2`, blank: "___", answer: "yield", choices: ["yield", "return", "give", "emit"], explanation: "'yield' makes a function a generator.", hint: "Makes a generator function" },
      { code: `with open("f.txt") ___ file:\n    data = file.read()`, blank: "___", answer: "as", choices: ["as", "is", "in", "to"], explanation: "'as' assigns the context manager result to a variable.", hint: "Assigns context manager to variable" },
      { code: `try:\n    x = 1/0\n___:\n    print("Error")`, blank: "___", answer: "except", choices: ["except", "catch", "error", "handle"], explanation: "'except' catches exceptions in Python.", hint: "Catches exceptions" },
      { code: `nums = [1,2,3,4,5]\nevens = list(___(lambda x: x%2==0, nums))`, blank: "___", answer: "filter", choices: ["filter", "select", "find", "where"], explanation: "filter() filters items using a function.", hint: "Filters items matching a condition" },
      { code: `class Dog:\n    def __init__(self, name):\n        ___.name = name`, blank: "___", answer: "self", choices: ["self", "this", "cls", "me"], explanation: "'self' refers to the current object instance.", hint: "Refers to the current object" },
      { code: `pairs = [(1,'a'),(2,'b')]\nfor num, ___ in pairs:\n    print(num, letter)`, blank: "___", answer: "letter", choices: ["letter", "char", "str", "val"], explanation: "Tuple unpacking assigns each element to a variable.", hint: "Unpacking the second element" },
      { code: `result = None\nresult = result ___ "default"`, blank: "___", answer: "or", choices: ["or", "and", "if", "??"], explanation: "'or' returns the right value if left is falsy.", hint: "Returns right side if left is falsy" },
      { code: `from functools ___ reduce\nreduce(lambda a,b: a+b, [1,2,3])`, blank: "___", answer: "import", choices: ["import", "get", "use", "require"], explanation: "'import' brings in a function from a module.", hint: "Brings in a specific name from a module" },
      { code: `@___\ndef my_func():\n    pass`, blank: "___", answer: "staticmethod", choices: ["staticmethod", "classmethod", "property", "decorator"], explanation: "@staticmethod makes a method independent of instance.", hint: "Makes method independent of instance/class" },
    ],
    hard: [
      { code: `def outer():\n    x = 10\n    def inner():\n        ___ x\n        x += 1\n    inner()`, blank: "___", answer: "nonlocal", choices: ["nonlocal", "global", "outer", "free"], explanation: "'nonlocal' lets inner functions modify enclosing scope variables.", hint: "Modifies enclosing function's variable" },
      { code: `import asyncio\n___ def fetch():\n    await asyncio.sleep(1)`, blank: "___", answer: "async", choices: ["async", "await", "defer", "promise"], explanation: "'async' defines a coroutine function.", hint: "Defines a coroutine function" },
      { code: `from typing import ___[int]\ndef first(lst: List[int]) -> int:\n    return lst[0]`, blank: "___", answer: "List", choices: ["List", "Array", "Tuple", "Seq"], explanation: "typing.List is used for type hints with lists.", hint: "Type hint for a list" },
      { code: `def cached(func):\n    memo = {}\n    def wrapper(*args):\n        if args not ___ memo:\n            memo[args] = func(*args)\n        return memo[args]\n    return wrapper`, blank: "___", answer: "in", choices: ["in", "of", "at", "is"], explanation: "'in' checks membership in a dictionary.", hint: "Membership check operator" },
      { code: `gen = (x**2 for x in range(10))\nprint(___(gen))`, blank: "___", answer: "next", choices: ["next", "first", "get", "peek"], explanation: "next() retrieves the next value from a generator.", hint: "Gets the next value from a generator" },
      { code: `data = b"hello"\ndecoded = data.___("utf-8")`, blank: "___", answer: "decode", choices: ["decode", "encode", "convert", "parse"], explanation: "decode() converts bytes to a string using encoding.", hint: "Converts bytes to string" },
      { code: `import contextlib\n@contextlib.___manager\ndef ctx():\n    yield`, blank: "___", answer: "context", choices: ["context", "with", "async", "ctx"], explanation: "@contextlib.contextmanager turns a generator into a context manager.", hint: "Part of contextmanager decorator name" },
      { code: `class Singleton:\n    _instance = None\n    def ___new___(cls):\n        if cls._instance is ___:\n            cls._instance = super().__new__(cls)\n        return cls._instance`, blank: "___", answer: "None", choices: ["None", "null", "False", "0"], explanation: "None is Python's null value.", hint: "Python's null value" },
      { code: `@___\ndef my_func():\n    pass`, blank: "___", answer: "staticmethod", choices: ["staticmethod", "classmethod", "property", "decorator"], explanation: "@staticmethod makes a method independent of instance.", hint: "Makes method independent of instance/class" },
      { code: `squares = [x**2 ___ x in range(10)]`, blank: "___", answer: "for", choices: ["for", "if", "while", "in"], explanation: "List comprehensions use 'for' to iterate.", hint: "List comprehension iteration keyword" },
    ],
  },
  java: {
    easy: [
      { code: `___ class Hello {\n    public static void main(String[] args) {}\n}`, blank: "___", answer: "public", choices: ["public", "private", "static", "final"], explanation: "'public' makes the class accessible from anywhere.", hint: "Most permissive access modifier" },
      { code: `int[] arr = ___ int[5];`, blank: "___", answer: "new", choices: ["new", "create", "make", "init"], explanation: "'new' allocates memory for an array in Java.", hint: "Allocates memory for objects" },
      { code: `String s = "hello";\nSystem.out.println(s.___(  ));`, blank: "___", answer: "length", choices: ["length", "size", "count", "len"], explanation: "String.length() returns the number of characters.", hint: "Returns character count of string" },
      { code: `for (___ i = 0; i < 5; i++) {\n    System.out.println(i);\n}`, blank: "___", answer: "int", choices: ["int", "var", "let", "num"], explanation: "Variables in for loops must be declared with a type.", hint: "Integer primitive type" },
      { code: `class Animal {\n    void speak() {}\n}\nclass Dog ___ Animal {}`, blank: "___", answer: "extends", choices: ["extends", "implements", "inherits", "uses"], explanation: "'extends' is used for class inheritance in Java.", hint: "Keyword for class inheritance" },
      { code: `List<String> list = new ArrayList<>();\nlist.___(\"Java\");`, blank: "___", answer: "add", choices: ["add", "push", "append", "insert"], explanation: "add() adds an element to a List.", hint: "Adds an element to a List" },
      { code: `try {\n    int x = 1/0;\n} ___ (Exception e) {\n    e.printStackTrace();\n}`, blank: "___", answer: "catch", choices: ["catch", "except", "handle", "error"], explanation: "'catch' handles exceptions in Java.", hint: "Exception handling block" },
      { code: `Map<String,Integer> map = new HashMap<>();\nmap.___("age", 25);`, blank: "___", answer: "put", choices: ["put", "set", "add", "insert"], explanation: "put() adds a key-value pair to a Map.", hint: "Adds key-value pair to Map" },
      { code: `int x = 5;\nString s = ___.toString(x);`, blank: "___", answer: "Integer", choices: ["Integer", "Int", "Number", "String"], explanation: "Integer is the wrapper class for int.", hint: "Wrapper class for int primitive" },
      { code: `interface Runnable {\n    void ___();\n}`, blank: "___", answer: "run", choices: ["run", "start", "execute", "go"], explanation: "Runnable interface defines the run() method.", hint: "The method defined by Runnable" },
    ],
    medium: [
      { code: `List<Integer> nums = Arrays.asList(1,2,3);\nnums.stream().___(x -> x > 1).forEach(System.out::println);`, blank: "___", answer: "filter", choices: ["filter", "where", "select", "find"], explanation: "Stream.filter() filters elements matching a predicate.", hint: "Filters stream elements" },
      { code: `Optional<String> opt = Optional.of("hi");\nString val = opt.___(\"default\");`, blank: "___", answer: "orElse", choices: ["orElse", "ifNull", "getOr", "default"], explanation: "orElse() returns the value or a default if empty.", hint: "Returns value or default" },
      { code: `String result = Stream.of("a","b","c")\n    .___(Collectors.joining(","));`, blank: "___", answer: "collect", choices: ["collect", "reduce", "gather", "join"], explanation: "collect() is a terminal operation on streams.", hint: "Terminal operation that gathers stream results" },
      { code: `class Box<___> {\n    T value;\n}`, blank: "___", answer: "T", choices: ["T", "E", "K", "?"], explanation: "T is a common type parameter name in Java generics.", hint: "Common generic type parameter" },
      { code: `synchronized (___ ) {\n    count++;\n}`, blank: "___", answer: "this", choices: ["this", "self", "lock", "mutex"], explanation: "'this' is used as the monitor object for synchronization.", hint: "Current object as monitor" },
      { code: `enum Day { MON, TUE, WED }\nDay d = Day.___("MON");`, blank: "___", answer: "valueOf", choices: ["valueOf", "parse", "get", "from"], explanation: "valueOf() converts a String to an enum constant.", hint: "Converts string to enum" },
      { code: `var list = new ArrayList<String>();\nlist.add("hi");\nString s = list.___(0);`, blank: "___", answer: "get", choices: ["get", "fetch", "read", "at"], explanation: "get(index) retrieves an element from a List.", hint: "Gets element at index" },
      { code: `CompletableFuture<String> cf =\n    CompletableFuture.___(() -> "hello");`, blank: "___", answer: "supplyAsync", choices: ["supplyAsync", "runAsync", "supply", "async"], explanation: "supplyAsync runs a Supplier asynchronously.", hint: "Async supplier method" },
      { code: `record Person(String name, int age) {}\nPerson p = new Person("Alice", 30);\np.___;`, blank: "___", answer: "name()", choices: ["name()", "getName()", "name", ".name"], explanation: "Records auto-generate accessor methods matching field names.", hint: "Record accessor — no 'get' prefix" },
      { code: `@FunctionalInterface\ninterface Greeter {\n    String ___(String name);\n}`, blank: "___", answer: "greet", choices: ["greet", "apply", "run", "call"], explanation: "Functional interfaces define exactly one abstract method.", hint: "The single abstract method name" },
    ],
    hard: [
      { code: `class Lazy<T> {\n    private T value;\n    private ___ boolean initialized;\n}`, blank: "___", answer: "volatile", choices: ["volatile", "transient", "static", "final"], explanation: "'volatile' ensures thread-safe visibility of the field.", hint: "Ensures cross-thread visibility" },
      { code: `public <T ___ Comparable<T>> T max(T a, T b) {\n    return a.compareTo(b) > 0 ? a : b;\n}`, blank: "___", answer: "extends", choices: ["extends", "implements", "super", "of"], explanation: "Bounded type parameters use 'extends' even for interfaces.", hint: "Bounds a generic type parameter" },
      { code: `Map<String, List<Integer>> map = new HashMap<>();\nmap.___("k", new ArrayList<>()).add(1);`, blank: "___", answer: "computeIfAbsent", choices: ["computeIfAbsent", "getOrDefault", "putIfAbsent", "merge"], explanation: "computeIfAbsent creates a value if key is missing.", hint: "Creates value if key is absent" },
      { code: `interface Printable {\n    ___ void print() {\n        System.out.println("default");\n    }\n}`, blank: "___", answer: "default", choices: ["default", "static", "abstract", "public"], explanation: "'default' allows interface methods to have implementations.", hint: "Interface method with body keyword" },
      { code: `sealed interface Shape\n    ___ Circle, Rectangle {}`, blank: "___", answer: "permits", choices: ["permits", "allows", "extends", "includes"], explanation: "'permits' lists which classes can implement a sealed interface.", hint: "Lists permitted subclasses" },
      { code: `try (var conn = DriverManager.getConnection(url)) {\n    // ...\n} // auto-___`, blank: "___", answer: "close", choices: ["close", "release", "free", "dispose"], explanation: "Try-with-resources automatically closes AutoCloseable resources.", hint: "Method auto-called on resource" },
      { code: `Predicate<String> p1 = s -> s.length() > 3;\nPredicate<String> p2 = s -> s.startsWith("J");\nPredicate<String> p3 = p1.___(p2);`, blank: "___", answer: "and", choices: ["and", "&&", "combine", "chain"], explanation: "Predicate.and() combines predicates with logical AND.", hint: "Logical AND for predicates" },
      { code: `Stream<String> s = list.stream();\nOptional<String> first = s.filter(x -> x.startsWith("A")).___(  );`, blank: "___", answer: "findFirst", choices: ["findFirst", "first", "getFirst", "head"], explanation: "findFirst() returns the first element as Optional.", hint: "Returns first matching Optional" },
      { code: `var result = IntStream.rangeClosed(1, 10)\n    .___(Integer::sum);`, blank: "___", answer: "reduce", choices: ["reduce", "fold", "collect", "sum"], explanation: "reduce() folds stream elements into a single result.", hint: "Folds elements into one value" },
      { code: `switch (shape) {\n    ___ Circle c -> System.out.println(c.radius());\n    case Rectangle r -> System.out.println(r.width());\n}`, blank: "___", answer: "case", choices: ["case", "when", "match", "if"], explanation: "Pattern matching switch uses 'case' with type patterns.", hint: "Switch branch keyword" },
    ],
  },
  cpp: {
    easy: [
      { code: `#include <___>\nusing namespace std;\nint main() { cout << "hi"; }`, blank: "___", answer: "iostream", choices: ["iostream", "stdio.h", "conio.h", "string"], explanation: "<iostream> provides cout and cin.", hint: "Header for cout/cin" },
      { code: `int* ptr = ___ int;`, blank: "___", answer: "new", choices: ["new", "malloc", "alloc", "create"], explanation: "'new' dynamically allocates memory in C++.", hint: "C++ dynamic allocation keyword" },
      { code: `class Dog {\n___:\n    void bark() {}\n};`, blank: "___", answer: "public", choices: ["public", "private", "open", "shared"], explanation: "'public' makes members accessible outside the class.", hint: "Accessible from outside" },
      { code: `void swap(int& a, int& ___) {\n    int tmp = a; a = b; b = tmp;\n}`, blank: "___", answer: "b", choices: ["b", "*b", "&b", "val"], explanation: "Reference parameters use & in the parameter list.", hint: "Second reference parameter name" },
      { code: `string s = "hello";\ncout << s.___();`, blank: "___", answer: "length", choices: ["length", "size", "len", "count"], explanation: "string.length() returns the string length.", hint: "String length method" },
      { code: `vector<int> v;\nv.___( 42 );`, blank: "___", answer: "push_back", choices: ["push_back", "append", "add", "push"], explanation: "push_back() appends to a vector.", hint: "Appends to vector" },
      { code: `int x = 10;\ncout << ___ x;`, blank: "___", answer: "&", choices: ["&", "*", "->", "@"], explanation: "& (address-of) gets the memory address of a variable.", hint: "Gets memory address" },
      { code: `___ void print() const {}`, blank: "___", answer: "virtual", choices: ["virtual", "abstract", "override", "final"], explanation: "'virtual' enables runtime polymorphism.", hint: "Enables runtime polymorphism" },
      { code: `for (int i = 0; i < 5; ___) {\n    cout << i;\n}`, blank: "___", answer: "i++", choices: ["i++", "i+1", "++i", "i+=1"], explanation: "i++ or ++i both work as loop increment.", hint: "Post-increment expression" },
      { code: `int arr[5] = {1,2,3,4,5};\ncout << arr[___];`, blank: "___", answer: "0", choices: ["0", "1", "first", "-1"], explanation: "Array indices start at 0.", hint: "First element index" },
    ],
    medium: [
      { code: `template<___ T>\nT max(T a, T b) { return a > b ? a : b; }`, blank: "___", answer: "typename", choices: ["typename", "class", "type", "generic"], explanation: "'typename' or 'class' introduces a template type parameter.", hint: "Introduces template type parameter" },
      { code: `unique_ptr<int> p = std::___(new int(42));`, blank: "___", answer: "make_unique", choices: ["make_unique", "unique_ptr", "new_unique", "create"], explanation: "make_unique creates a unique_ptr safely.", hint: "Factory for unique_ptr" },
      { code: `vector<int> v = {3,1,2};\nstd::___(v.begin(), v.end());`, blank: "___", answer: "sort", choices: ["sort", "order", "arrange", "qsort"], explanation: "std::sort sorts a range in-place.", hint: "STL sorting algorithm" },
      { code: `class Base {\n    virtual void fn() = ___;\n};`, blank: "___", answer: "0", choices: ["0", "null", "void", "abstract"], explanation: "= 0 makes a function pure virtual.", hint: "Makes function pure virtual" },
      { code: `void fn(int&& x) {\n    auto y = std::___(x);\n}`, blank: "___", answer: "move", choices: ["move", "forward", "copy", "transfer"], explanation: "std::move casts to rvalue reference.", hint: "Enables move semantics" },
      { code: `auto [a, b] = std::make_pair(1, "hi");\ncout << a << " " << ___;`, blank: "___", answer: "b", choices: ["b", "second", "pair.b", ".second"], explanation: "Structured bindings unpack the pair into a and b.", hint: "The second unpacked variable" },
      { code: `constexpr int square(int n) {\n    return n ___ n;\n}`, blank: "___", answer: "*", choices: ["*", "^", "**", "×"], explanation: "* is the multiplication operator.", hint: "Multiplication operator" },
      { code: `std::map<string,int> m;\nm[\"age\"] = 25;\ncout << m.___(\"age\");`, blank: "___", answer: "at", choices: ["at", "get", "find", "[]"], explanation: "at() accesses a map element with bounds checking.", hint: "Safe access with bounds check" },
      { code: `auto lambda = [&](int x) {\n    return x + ___;\n};`, blank: "___", answer: "captured_var", choices: ["captured_var", "x", "this", "val"], explanation: "[&] captures all local variables by reference.", hint: "A variable captured by reference" },
      { code: `class RAII {\n    FILE* f;\n___:\n    ~RAII() { fclose(f); }\n};`, blank: "___", answer: "public", choices: ["public", "private", "protected", "friend"], explanation: "Destructor should be public to be called externally.", hint: "Access for destructor" },
    ],
    hard: [
      { code: `template<typename T>\nvoid fn(T&& arg) {\n    other(std::___(arg));\n}`, blank: "___", answer: "forward", choices: ["forward", "move", "pass", "cast"], explanation: "std::forward enables perfect forwarding of arguments.", hint: "Preserves value category" },
      { code: `using Fn = std::function<int(___)>;\nFn f = [](int x) { return x*2; };`, blank: "___", answer: "int", choices: ["int", "auto", "T", "void"], explanation: "std::function<int(int)> takes an int and returns an int.", hint: "The parameter type of the callable" },
      { code: `template<int N>\nstruct Factorial {\n    static const int value = N * Factorial<N-___>::value;\n};`, blank: "___", answer: "1", choices: ["1", "0", "N", "2"], explanation: "Template metaprogramming recurses by decrementing N.", hint: "Decrements N in recursion" },
      { code: `std::shared_ptr<int> p1 = std::make_shared<int>(42);\nstd::___ p2 = p1;`, blank: "___", answer: "weak_ptr<int>", choices: ["weak_ptr<int>", "shared_ptr<int>", "unique_ptr<int>", "raw_ptr<int>"], explanation: "weak_ptr observes without owning or incrementing ref count.", hint: "Non-owning smart pointer" },
      { code: `enum class Color : ___ { Red, Green, Blue };\nColor c = Color::Red;`, blank: "___", answer: "uint8_t", choices: ["uint8_t", "int", "char", "byte"], explanation: "Enum underlying type can be specified with ':'.", hint: "Smallest unsigned integer type" },
      { code: `[[___]] void deprecated_fn() {}`, blank: "___", answer: "deprecated", choices: ["deprecated", "unused", "nodiscard", "fallthrough"], explanation: "[[deprecated]] marks a function as deprecated.", hint: "Marks function as deprecated" },
      { code: `void fn() noexcept {\n    // guaranteed no throw\n}\nstatic_assert(___(fn));`, blank: "___", answer: "noexcept", choices: ["noexcept", "is_noexcept", "nothrow", "safe"], explanation: "noexcept() tests if an expression is declared noexcept.", hint: "Tests noexcept guarantee" },
      { code: `template<typename... Args>\nvoid variadic(Args&&... ___) {}`, blank: "___", answer: "args", choices: ["args", "pack", "rest", "params"], explanation: "Parameter packs use ... to accept variadic arguments.", hint: "Parameter pack name" },
      { code: `struct Hash {\n    size_t operator___(const string& s) const {\n        return std::hash<string>{}(s);\n    }\n};`, blank: "___", answer: "()", choices: ["()", "[]", "->", "<<"], explanation: "operator() defines a function call operator (functor).", hint: "Function call operator" },
      { code: `if ___ (auto p = dynamic_cast<Derived*>(base)) {\n    p->method();\n}`, blank: "___", answer: "constexpr", choices: ["constexpr", "auto", "static", "inline"], explanation: "if constexpr evaluates condition at compile time.", hint: "Compile-time conditional" },
    ],
  },
  sql: {
    easy: [
      { code: `___ name, age FROM users;`, blank: "___", answer: "SELECT", choices: ["SELECT", "GET", "FETCH", "READ"], explanation: "SELECT retrieves data from a table.", hint: "Data retrieval keyword" },
      { code: `SELECT * FROM users\n___ age > 18;`, blank: "___", answer: "WHERE", choices: ["WHERE", "FILTER", "IF", "HAVING"], explanation: "WHERE filters rows before grouping.", hint: "Row filter clause" },
      { code: `SELECT * FROM users\n___ BY name ASC;`, blank: "___", answer: "ORDER", choices: ["ORDER", "SORT", "GROUP", "ARRANGE"], explanation: "ORDER BY sorts the result set.", hint: "Sorting clause" },
      { code: `___ INTO users (name, age)\nVALUES ('Alice', 30);`, blank: "___", answer: "INSERT", choices: ["INSERT", "ADD", "PUT", "PUSH"], explanation: "INSERT INTO adds a new row.", hint: "Adding rows keyword" },
      { code: `SELECT ___(age) FROM users;`, blank: "___", answer: "AVG", choices: ["AVG", "MEAN", "AVERAGE", "SUM"], explanation: "AVG() computes the arithmetic mean.", hint: "Average aggregate function" },
      { code: `SELECT name, ___(*) FROM orders\nGROUP BY name;`, blank: "___", answer: "COUNT", choices: ["COUNT", "SUM", "NUM", "TOTAL"], explanation: "COUNT(*) counts rows per group.", hint: "Counts rows" },
      { code: `___ TABLE users;`, blank: "___", answer: "DROP", choices: ["DROP", "DELETE", "REMOVE", "DESTROY"], explanation: "DROP TABLE removes the table entirely.", hint: "Removes table permanently" },
      { code: `SELECT DISTINCT ___\nFROM products;`, blank: "___", answer: "category", choices: ["category", "*", "id", "COUNT(*)"], explanation: "DISTINCT removes duplicate values.", hint: "Column to deduplicate" },
      { code: `UPDATE users\n___ age = 31\nWHERE name = 'Alice';`, blank: "___", answer: "SET", choices: ["SET", "UPDATE", "CHANGE", "TO"], explanation: "SET specifies the columns to update.", hint: "Specifies update values" },
      { code: `SELECT * FROM employees\n___ department = 'Sales';`, blank: "___", answer: "WHERE", choices: ["WHERE", "HAVING", "FILTER", "WHEN"], explanation: "WHERE filters individual rows.", hint: "Filters before aggregation" },
    ],
    medium: [
      { code: `SELECT u.name, o.total\nFROM users u\n___ JOIN orders o ON u.id = o.user_id;`, blank: "___", answer: "INNER", choices: ["INNER", "LEFT", "OUTER", "CROSS"], explanation: "INNER JOIN returns matching rows from both tables.", hint: "Returns only matched rows" },
      { code: `SELECT dept, AVG(salary)\nFROM employees\nGROUP BY dept\n___ AVG(salary) > 50000;`, blank: "___", answer: "HAVING", choices: ["HAVING", "WHERE", "FILTER", "AND"], explanation: "HAVING filters after GROUP BY aggregation.", hint: "Filters grouped results" },
      { code: `SELECT name FROM employees\n___\nSELECT name FROM managers;`, blank: "___", answer: "UNION", choices: ["UNION", "JOIN", "MERGE", "COMBINE"], explanation: "UNION combines result sets, removing duplicates.", hint: "Combines two SELECT results" },
      { code: `WITH cte ___ (\n    SELECT * FROM orders WHERE total > 100\n)\nSELECT * FROM cte;`, blank: "___", answer: "AS", choices: ["AS", "IS", "=", "NAMED"], explanation: "CTE syntax: WITH name AS (query).", hint: "CTE assignment keyword" },
      { code: `SELECT name,\n    ___(salary) OVER (PARTITION BY dept) AS rank\nFROM employees;`, blank: "___", answer: "RANK", choices: ["RANK", "ROW_NUMBER", "DENSE_RANK", "NTILE"], explanation: "RANK() assigns rank with gaps for ties.", hint: "Ranking with gap for ties" },
      { code: `SELECT id, COALESCE(phone, ___)\nFROM users;`, blank: "___", answer: "'N/A'", choices: ["'N/A'", "NULL", "0", "''"], explanation: "COALESCE returns the first non-NULL value.", hint: "Fallback string value" },
      { code: `SELECT * FROM products\nWHERE price BETWEEN 10 ___ 50;`, blank: "___", answer: "AND", choices: ["AND", "TO", "-", "THROUGH"], explanation: "BETWEEN uses AND to define the range.", hint: "Range connector in BETWEEN" },
      { code: `SELECT * FROM users\nWHERE name ___ ('Alice', 'Bob', 'Charlie');`, blank: "___", answer: "IN", choices: ["IN", "OF", "WITHIN", "FROM"], explanation: "IN checks if value is in a list.", hint: "Membership check in list" },
      { code: `SELECT dept,\n    SUM(salary) ___ (PARTITION BY dept) AS dept_total\nFROM employees;`, blank: "___", answer: "OVER", choices: ["OVER", "FOR", "BY", "WITHIN"], explanation: "OVER() defines the window for window functions.", hint: "Window function clause" },
      { code: `CREATE ___ idx_name ON users(email);`, blank: "___", answer: "INDEX", choices: ["INDEX", "KEY", "UNIQUE", "CONSTRAINT"], explanation: "CREATE INDEX creates an index on a column.", hint: "Creates a speed index" },
    ],
    hard: [
      { code: `SELECT id, LAG(salary, 1, 0)\n    ___ (ORDER BY hire_date) AS prev_salary\nFROM employees;`, blank: "___", answer: "OVER", choices: ["OVER", "BY", "FOR", "PARTITION"], explanation: "OVER defines the window for LAG window function.", hint: "Window clause keyword" },
      { code: `EXPLAIN ___\nSELECT * FROM users WHERE email = 'a@b.com';`, blank: "___", answer: "ANALYZE", choices: ["ANALYZE", "VERBOSE", "PLAN", "FORMAT"], explanation: "EXPLAIN ANALYZE runs the query and shows actual stats.", hint: "Shows actual execution stats" },
      { code: `CREATE TABLE orders (\n    id SERIAL PRIMARY KEY,\n    user_id INT ___ REFERENCES users(id)\n);`, blank: "___", answer: "NOT NULL", choices: ["NOT NULL", "UNIQUE", "DEFAULT 0", "CHECK"], explanation: "NOT NULL ensures the foreign key is always set.", hint: "Prevents null foreign key" },
      { code: `MERGE INTO target t\nUSING source s ON t.id = s.id\nWHEN MATCHED ___ UPDATE SET t.val = s.val;`, blank: "___", answer: "THEN", choices: ["THEN", "DO", "AND", "SET"], explanation: "MERGE syntax: WHEN MATCHED THEN UPDATE.", hint: "Follows WHEN MATCHED" },
      { code: `SELECT * FROM orders\nWHERE created_at > NOW() - INTERVAL '___' DAY;`, blank: "___", answer: "30", choices: ["30", "1", "7", "365"], explanation: "INTERVAL '30' DAY selects last 30 days.", hint: "Common rolling window in days" },
      { code: `SELECT dept, salary,\n    PERCENT_RANK() ___ (PARTITION BY dept ORDER BY salary)\nFROM employees;`, blank: "___", answer: "OVER", choices: ["OVER", "FOR", "BY", "IN"], explanation: "OVER() with PARTITION defines the window.", hint: "Window function clause" },
      { code: `ALTER TABLE users\n___ COLUMN phone VARCHAR(20);`, blank: "___", answer: "ADD", choices: ["ADD", "INSERT", "APPEND", "CREATE"], explanation: "ALTER TABLE ADD COLUMN adds a new column.", hint: "Keyword to add a column" },
      { code: `SELECT STRING_AGG(name, ', '\n    ___ BY name) FROM users;`, blank: "___", answer: "ORDER", choices: ["ORDER", "SORT", "GROUP", "ARRANGE"], explanation: "STRING_AGG with ORDER BY sorts concatenated strings.", hint: "Sorts within aggregate" },
      { code: `CREATE MATERIALIZED VIEW mv AS\nSELECT * FROM reports;\n___ MATERIALIZED VIEW mv;`, blank: "___", answer: "REFRESH", choices: ["REFRESH", "UPDATE", "SYNC", "RELOAD"], explanation: "REFRESH MATERIALIZED VIEW updates the cached data.", hint: "Updates materialized view cache" },
      { code: `SELECT *\nFROM users\nWHERE id = ANY(\n    SELECT user_id FROM orders WHERE total > ___\n);`, blank: "___", answer: "1000", choices: ["1000", "NULL", "0", "AVG()"], explanation: "ANY compares value against subquery results.", hint: "A numeric threshold value" },
    ],
  },
  webdev: {
    easy: [
      { code: `<___ href="style.css" rel="stylesheet">`, blank: "___", answer: "link", choices: ["link", "style", "css", "import"], explanation: "<link> connects external stylesheets.", hint: "HTML tag for external CSS" },
      { code: `.box {\n    background-___: #ff0000;\n}`, blank: "___", answer: "color", choices: ["color", "fill", "paint", "shade"], explanation: "background-color sets the element's background.", hint: "CSS background property" },
      { code: `document.___("btn").addEventListener("click", fn);`, blank: "___", answer: "getElementById", choices: ["getElementById", "querySelector", "getElement", "findById"], explanation: "getElementById selects by ID.", hint: "Selects by ID attribute" },
      { code: `<form ___="POST" action="/submit">`, blank: "___", answer: "method", choices: ["method", "type", "action", "send"], explanation: "The method attribute specifies GET or POST.", hint: "HTTP verb attribute" },
      { code: `.container {\n    display: ___;\n    justify-content: center;\n}`, blank: "___", answer: "flex", choices: ["flex", "block", "grid", "inline"], explanation: "display: flex enables flexbox layout.", hint: "Flexbox display value" },
      { code: `const btn = document.querySelector("___");\nbtn.style.color = "red";`, blank: "___", answer: "#btn", choices: ["#btn", ".btn", "btn", "id:btn"], explanation: "# selects by ID in CSS/querySelector.", hint: "ID selector prefix" },
      { code: `<img src="photo.jpg" ___="Profile photo">`, blank: "___", answer: "alt", choices: ["alt", "title", "desc", "caption"], explanation: "alt provides accessible text for images.", hint: "Accessibility text attribute" },
      { code: `window.addEventListener("___", () => {\n    console.log("loaded");\n});`, blank: "___", answer: "load", choices: ["load", "ready", "start", "init"], explanation: "'load' fires when page fully loads.", hint: "Page fully loaded event" },
      { code: `.box {\n    margin: 0 ___;\n}`, blank: "___", answer: "auto", choices: ["auto", "center", "50%", "0"], explanation: "margin: 0 auto centers a block element.", hint: "Centers a block horizontally" },
      { code: `fetch("https://api.example.com")\n    .___(res => res.json())`, blank: "___", answer: "then", choices: ["then", "next", "after", "done"], explanation: ".then() chains a Promise callback.", hint: "Promise chaining method" },
    ],
    medium: [
      { code: `const [count, ___] = useState(0);`, blank: "___", answer: "setCount", choices: ["setCount", "updateCount", "countSetter", "changeCount"], explanation: "useState returns [value, setter].", hint: "State setter convention" },
      { code: `useEffect(() => {\n    fetchData();\n}, [___]);`, blank: "___", answer: "url", choices: ["url", "", "null", "undefined"], explanation: "Dependency array controls when effect re-runs.", hint: "Variable the effect depends on" },
      { code: `<Route ___="/dashboard" component={Dashboard} />`, blank: "___", answer: "path", choices: ["path", "url", "route", "link"], explanation: "path prop defines the URL pattern.", hint: "React Router URL pattern prop" },
      { code: `const doubled = arr.___(x => x * 2);`, blank: "___", answer: "map", choices: ["map", "forEach", "filter", "reduce"], explanation: "map() transforms each element and returns a new array.", hint: "Transforms each array element" },
      { code: `@media (max-width: ___px) {\n    .nav { display: none; }\n}`, blank: "___", answer: "768", choices: ["768", "480", "1024", "320"], explanation: "768px is a common tablet breakpoint.", hint: "Common tablet breakpoint" },
      { code: `async function getData() {\n    const res = await ___(url);\n    return res.json();\n}`, blank: "___", answer: "fetch", choices: ["fetch", "get", "request", "http"], explanation: "fetch() makes HTTP requests.", hint: "Built-in HTTP request API" },
      { code: `localStorage.___("theme", "dark");`, blank: "___", answer: "setItem", choices: ["setItem", "set", "put", "store"], explanation: "setItem stores a key-value pair in localStorage.", hint: "Stores a localStorage value" },
      { code: `const obj = { a: 1, b: 2 };\nconst { a, ___ } = obj;`, blank: "___", answer: "b", choices: ["b", "obj.b", "c", "rest"], explanation: "Destructuring extracts named properties.", hint: "The second property to destructure" },
      { code: `.grid {\n    display: grid;\n    grid-template-columns: ___(3, 1fr);\n}`, blank: "___", answer: "repeat", choices: ["repeat", "loop", "times", "auto"], explanation: "repeat() creates repeated column tracks.", hint: "CSS grid repeat function" },
      { code: `element.classList.___("active");`, blank: "___", answer: "toggle", choices: ["toggle", "switch", "flip", "add"], explanation: "toggle adds class if absent, removes if present.", hint: "Adds or removes class alternately" },
    ],
    hard: [
      { code: `const memoized = useMemo(() => {\n    return expensiveCalc(data);\n}, [___]);`, blank: "___", answer: "data", choices: ["data", "", "null", "props"], explanation: "useMemo recomputes when 'data' changes.", hint: "The dependency that triggers recompute" },
      { code: `const cb = useCallback(() => {\n    doSomething(id);\n}, [___]);`, blank: "___", answer: "id", choices: ["id", "", "cb", "props"], explanation: "useCallback memoizes the function, recreating only when id changes.", hint: "Captured variable in closure" },
      { code: `const ctx = React.createContext(___);\nexport default ctx;`, blank: "___", answer: "null", choices: ["null", "undefined", "{}", "[]"], explanation: "createContext(null) sets the default value.", hint: "Default context value" },
      { code: `function reducer(state, ___) {\n    switch (action.type) {\n        case 'INC': return state + 1;\n    }\n}`, blank: "___", answer: "action", choices: ["action", "event", "payload", "dispatch"], explanation: "Reducers take (state, action) and return new state.", hint: "Second reducer parameter" },
      { code: `const worker = new ___(\"worker.js\");\nworker.postMessage({ data });`, blank: "___", answer: "Worker", choices: ["Worker", "Thread", "WebWorker", "BackgroundTask"], explanation: "Web Workers run scripts on a background thread.", hint: "Web API for background threads" },
      { code: `const obs = new IntersectionObserver(cb, {\n    threshold: ___\n});`, blank: "___", answer: "0.5", choices: ["0.5", "1", "0", "100"], explanation: "threshold: 0.5 triggers when 50% is visible.", hint: "50% visibility threshold" },
      { code: `if ('serviceWorker' ___ navigator) {\n    navigator.serviceWorker.register('/sw.js');\n}`, blank: "___", answer: "in", choices: ["in", "of", "===", "&&"], explanation: "'in' checks if a property exists on an object.", hint: "Property existence check" },
      { code: `const schema = z.object({\n    email: z.string().___(),\n});`, blank: "___", answer: "email", choices: ["email", "isEmail", "validate", "format"], explanation: "Zod's .email() validates email format.", hint: "Zod email validator" },
      { code: `export const getServerSideProps: ___ = async (ctx) => {\n    return { props: {} };\n};`, blank: "___", answer: "GetServerSideProps", choices: ["GetServerSideProps", "ServerProps", "SSRProps", "NextProps"], explanation: "GetServerSideProps is Next.js's type for SSR data fetching.", hint: "Next.js SSR type" },
      { code: `<Suspense fallback={<Spinner />}>\n    <___ component={() => import('./Page')} />\n</Suspense>`, blank: "___", answer: "Route", choices: ["Route", "lazy", "LazyRoute", "Async"], explanation: "React Router's Route inside Suspense enables lazy loading.", hint: "React Router component" },
    ],
  },
  dsa: {
    easy: [
      { code: `# Push to stack\nstack = []\nstack.___( 10 )`, blank: "___", answer: "append", choices: ["append", "push", "add", "insert"], explanation: "Python uses append() to push to a stack (list).", hint: "Python list push equivalent" },
      { code: `# Dequeue\nfrom collections import deque\nq = deque([1,2,3])\nq.___()`, blank: "___", answer: "popleft", choices: ["popleft", "pop", "dequeue", "shift"], explanation: "popleft() removes from the front of a deque.", hint: "Removes from front" },
      { code: `# Binary search base\ndef bsearch(arr, t, lo, hi):\n    if lo > hi: return -1\n    mid = (lo + hi) // ___`, blank: "___", answer: "2", choices: ["2", "hi", "lo", "len"], explanation: "Middle index is (lo + hi) // 2.", hint: "Divides range in half" },
      { code: `# Linked list node\nclass Node:\n    def __init__(self, val):\n        self.val = val\n        self.___ = None`, blank: "___", answer: "next", choices: ["next", "prev", "link", "pointer"], explanation: "Each node has a 'next' pointer to the following node.", hint: "Pointer to next node" },
      { code: `# Graph adjacency list\ngraph = {}\ngraph[1] = ___`, blank: "___", answer: "[]", choices: ["[]", "{}", "()", "None"], explanation: "Adjacency list stores neighbors as a list.", hint: "Empty list for neighbors" },
      { code: `# Count occurrences\nfrom collections import ___\ncounts = Counter(arr)`, blank: "___", answer: "Counter", choices: ["Counter", "Dict", "HashMap", "Freq"], explanation: "Counter is Python's built-in frequency map.", hint: "Python frequency counter class" },
      { code: `# Min heap push\nimport heapq\nheap = []\nheapq.___( heap, 5 )`, blank: "___", answer: "heappush", choices: ["heappush", "push", "insert", "add"], explanation: "heappush maintains heap invariant.", hint: "Heap push function" },
      { code: `# Stack pop\nstack = [1, 2, 3]\nval = stack.___()`, blank: "___", answer: "pop", choices: ["pop", "remove", "take", "delete"], explanation: "pop() removes and returns the last element.", hint: "Removes last element" },
      { code: `# BFS uses a ___\nfrom collections import deque\nqueue = deque()`, blank: "___", answer: "queue", choices: ["queue", "stack", "heap", "list"], explanation: "BFS uses a queue (FIFO) to explore level by level.", hint: "FIFO data structure" },
      { code: `# Set for visited\nvisited = ___\nvisited.add(node)`, blank: "___", answer: "set()", choices: ["set()", "[]", "{}", "list()"], explanation: "A set provides O(1) lookup for visited nodes.", hint: "O(1) lookup collection" },
    ],
    medium: [
      { code: `# DFS recursive\ndef dfs(node, visited):\n    visited.___(node)\n    for nb in graph[node]:\n        if nb not in visited:\n            dfs(nb, visited)`, blank: "___", answer: "add", choices: ["add", "append", "push", "insert"], explanation: "set.add() marks a node as visited.", hint: "Adds to a set" },
      { code: `# Quicksort partition\ndef partition(arr, lo, hi):\n    pivot = arr[___]\n    # ...\n    return idx`, blank: "___", answer: "hi", choices: ["hi", "lo", "mid", "0"], explanation: "Common pivot choice is the last element arr[hi].", hint: "Last element as pivot" },
      { code: `# Memoization decorator\nfrom functools import ___\n@lru_cache(maxsize=None)\ndef fib(n): ...`, blank: "___", answer: "lru_cache", choices: ["lru_cache", "cache", "memoize", "memo"], explanation: "lru_cache caches function results automatically.", hint: "Python memoization decorator" },
      { code: `# Trie insert\nclass Trie:\n    def __init__(self):\n        self.children = {}\n        self.is_end = ___`, blank: "___", answer: "False", choices: ["False", "True", "None", "0"], explanation: "is_end marks whether a word ends at this node.", hint: "Initially not a word end" },
      { code: `# Union-Find\ndef find(parent, x):\n    if parent[x] != x:\n        parent[x] = find(parent, parent[___])\n    return parent[x]`, blank: "___", answer: "x", choices: ["x", "parent[x]", "0", "root"], explanation: "Path compression: recurse on parent[x].", hint: "Recurse on the parent" },
      { code: `# Dijkstra\nimport heapq\nheap = [(0, start)]\nwhile heap:\n    cost, node = heapq.___( heap )`, blank: "___", answer: "heappop", choices: ["heappop", "pop", "dequeue", "min"], explanation: "heappop extracts the minimum element.", hint: "Extracts min from heap" },
      { code: `# Bottom-up DP\ndp = [0] * (n + ___)\ndp[0] = 1`, blank: "___", answer: "1", choices: ["1", "0", "2", "n"], explanation: "dp array size n+1 handles indices 0 through n.", hint: "Extra slot for base case" },
      { code: `# Topological sort (Kahn)\nin_degree = {v: 0 for v in graph}\nqueue = deque([v for v in graph if in_degree[v] == ___])`, blank: "___", answer: "0", choices: ["0", "1", "-1", "None"], explanation: "Nodes with in-degree 0 have no dependencies.", hint: "No incoming edges" },
      { code: `# Two pointers\nleft, right = 0, len(arr) - ___\nwhile left < right:\n    # ...\n    left += 1`, blank: "___", answer: "1", choices: ["1", "0", "2", "n"], explanation: "right starts at the last valid index.", hint: "Last index offset" },
      { code: `# Sliding window max\nfrom collections import deque\nwindow = deque()\nwhile window and window[0] < i - ___:\n    window.popleft()`, blank: "___", answer: "k", choices: ["k", "1", "n", "size"], explanation: "k is the window size; elements older than k are removed.", hint: "Window size variable" },
    ],
    hard: [
      { code: `# Segment tree update\ndef update(tree, node, start, end, idx, val):\n    if start == end:\n        tree[node] = ___\n    else:\n        # recurse`, blank: "___", answer: "val", choices: ["val", "0", "idx", "node"], explanation: "Leaf node stores the actual value.", hint: "The new value being set" },
      { code: `# Fenwick tree query\ndef query(bit, i):\n    s = 0\n    while i > 0:\n        s += bit[i]\n        i -= i & ___\n    return s`, blank: "___", answer: "(-i)", choices: ["(-i)", "i", "1", "i-1"], explanation: "i & (-i) isolates the lowest set bit.", hint: "Lowest set bit trick" },
      { code: `# KMP failure function\ndef build_lps(p):\n    lps = [0] * len(p)\n    j = 0\n    for i in range(1, len(p)):\n        while j > 0 and p[i] != p[j]:\n            j = lps[j - ___]`, blank: "___", answer: "1", choices: ["1", "0", "j", "2"], explanation: "j = lps[j-1] backtracks in the pattern.", hint: "Backtracks by one" },
      { code: `# Bellman-Ford\nfor _ in range(len(vertices) - ___):\n    for u, v, w in edges:\n        if dist[u] + w < dist[v]:\n            dist[v] = dist[u] + w`, blank: "___", answer: "1", choices: ["1", "0", "2", "len(edges)"], explanation: "Relaxation runs V-1 times.", hint: "V minus one iterations" },
      { code: `# Tarjan SCC\ndef tarjan(u):\n    disc[u] = low[u] = timer[0]; timer[0] += 1\n    stack.append(u); on_stack[u] = ___`, blank: "___", answer: "True", choices: ["True", "False", "1", "u"], explanation: "on_stack tracks nodes in current DFS path.", hint: "Marks node as on stack" },
      { code: `# A* heuristic\nh = abs(goal[0]-cur[0]) + ___\nf = g + h`, blank: "___", answer: "abs(goal[1]-cur[1])", choices: ["abs(goal[1]-cur[1])", "0", "g", "1"], explanation: "Manhattan distance heuristic for grid graphs.", hint: "Manhattan distance y component" },
      { code: `# Disjoint set union by rank\ndef union(parent, rank, x, y):\n    rx, ry = find(parent,x), find(parent,y)\n    if rank[rx] < rank[ry]: rx, ry = ry, ___\n    parent[ry] = rx`, blank: "___", answer: "rx", choices: ["rx", "ry", "x", "y"], explanation: "Swap so rx is always the higher-rank root.", hint: "Swap the roots" },
      { code: `# Suffix array (naive)\nsa = sorted(range(len(s)),\n    key=lambda i: s[___ :])`, blank: "___", answer: "i", choices: ["i", "0", "i+1", "-i"], explanation: "Sort suffixes starting at each index i.", hint: "Start of each suffix" },
      { code: `# Z-algorithm\ndef z_func(s):\n    z = [0]*len(s); l=r=0\n    for i in range(1, len(s)):\n        if i < r: z[i] = min(r-i, z[i-___])`, blank: "___", answer: "l", choices: ["l", "r", "0", "1"], explanation: "z[i-l] reuses previously computed Z values.", hint: "Left boundary of current Z-box" },
      { code: `# Convex hull (Graham scan)\npoints.sort(key=lambda p: (p[0], ___))`, blank: "___", answer: "p[1]", choices: ["p[1]", "p[0]", "-p[1]", "p.y"], explanation: "Sort by x then y to find the bottom-left anchor.", hint: "Secondary sort key" },
    ],
  },
  c: {
    easy: [
      { code: `#include <___>\nint main() {\n    printf("Hello");\n}`, blank: "___", answer: "stdio.h", choices: ["stdio.h", "stdlib.h", "iostream", "conio.h"], explanation: "<stdio.h> provides printf() and scanf().", hint: "Standard I/O header" },
      { code: `char* str = "hello";\nprintf("%___", str);`, blank: "___", answer: "s", choices: ["s", "c", "d", "p"], explanation: "%s formats a string.", hint: "String format specifier" },
      { code: `int x = 10;\nint* ptr = ___x;`, blank: "___", answer: "&", choices: ["&", "*", "->", "**"], explanation: "& gets the address of x.", hint: "Address-of operator" },
      { code: `struct Point {\n    int x, y;\n};\nstruct Point p;\np.___ = 5;`, blank: "___", answer: "x", choices: ["x", "y", "X", "first"], explanation: ". accesses struct member directly.", hint: "First struct member" },
      { code: `void* p = malloc(10 * sizeof(___));`, blank: "___", answer: "int", choices: ["int", "void", "char", "10"], explanation: "sizeof(int) gives the correct byte count for int.", hint: "Type to allocate for" },
      { code: `FILE* f = fopen("file.txt", "___");\nfprintf(f, "hello");`, blank: "___", answer: "w", choices: ["w", "r", "a", "x"], explanation: "\"w\" opens a file for writing.", hint: "Write mode flag" },
      { code: `for (int i = 0; i < n; i++) {\n    printf("%d\\n", arr[___]);\n}`, blank: "___", answer: "i", choices: ["i", "0", "n", "i-1"], explanation: "i is the loop variable used as index.", hint: "Current loop index" },
      { code: `int arr[5];\narr[0] = 42;\n// first element`, blank: "___", answer: "42", choices: ["42", "arr[1]", "NULL", "&arr"], explanation: "Array indices start at 0.", hint: "A simple integer value" },
      { code: `int len = 0;\nwhile (str[len] != '\\___') len++;`, blank: "___", answer: "0", choices: ["0", "n", "\\n", "end"], explanation: "'\\0' is the null terminator ending a C string.", hint: "String terminator character" },
      { code: `switch (grade) {\n    ___ 'A':\n        printf("Excellent");\n        break;\n}`, blank: "___", answer: "case", choices: ["case", "when", "if", "match"], explanation: "'case' is the switch branch keyword in C.", hint: "Switch branch keyword" },
    ],
    medium: [
      { code: `int* arr = (int*) malloc(n * sizeof(int));\n// free memory\n___(arr);`, blank: "___", answer: "free", choices: ["free", "delete", "release", "dealloc"], explanation: "free() releases malloc-allocated memory.", hint: "C memory deallocation function" },
      { code: `typedef struct Node {\n    int data;\n    struct Node* ___;\n} Node;`, blank: "___", answer: "next", choices: ["next", "prev", "link", "pointer"], explanation: "Linked list nodes point to the next node.", hint: "Pointer to next node" },
      { code: `void swap(int* a, int* b) {\n    int tmp = *a;\n    *a = *b;\n    *b = ___;\n}`, blank: "___", answer: "tmp", choices: ["tmp", "*a", "*b", "a"], explanation: "tmp holds the original value of *a.", hint: "Temp variable to complete swap" },
      { code: `char* arr = calloc(n, sizeof(___));\n// zero-initialized`, blank: "___", answer: "char", choices: ["char", "int", "void", "1"], explanation: "calloc(n, sizeof(char)) allocates n zero bytes.", hint: "1-byte type" },
      { code: `int (*fp)(int, int) = ___;\nfp(3, 4);`, blank: "___", answer: "add", choices: ["add", "&add", "*add", "NULL"], explanation: "Function pointer assigned the function name.", hint: "Assign function by name" },
      { code: `int matrix[3][3];\nmatrix[1][___] = 5;`, blank: "___", answer: "2", choices: ["2", "0", "1", "3"], explanation: "Indices 0-2 are valid for a 3-element dimension.", hint: "Last valid column index" },
      { code: `#define MAX(a,b) ((a) ___ (b) ? (a) : (b))`, blank: "___", answer: ">", choices: [">", "<", ">=", "=="], explanation: "MAX returns the larger of a or b.", hint: "Greater-than comparison" },
      { code: `static int counter = 0;\ncounter___;\nprintf("%d", counter);`, blank: "___", answer: "++", choices: ["++", "+=1", "+1", "++counter"], explanation: "counter++ post-increments the static variable.", hint: "Post-increment operator" },
      { code: `void recursive(int n) {\n    if (n == 0) ___;\n    recursive(n - 1);\n}`, blank: "___", answer: "return", choices: ["return", "break", "exit", "stop"], explanation: "'return' is the base case exit for void functions.", hint: "Exits a void function" },
      { code: `typedef int (*Comparator)(const void*, const void*);\nvoid qsort(void* base, size_t n, size_t sz, ___ cmp);`, blank: "___", answer: "Comparator", choices: ["Comparator", "int", "void*", "fn"], explanation: "qsort takes a comparator function pointer.", hint: "The typedef'd function pointer type" },
    ],
    hard: [
      { code: `void* memcpy(void* dst, const void* src, size_t ___);\n// copy n bytes`, blank: "___", answer: "n", choices: ["n", "size", "len", "count"], explanation: "memcpy copies n bytes from src to dst.", hint: "Number of bytes to copy" },
      { code: `___ int* hw_reg = (volatile int*)0xFFFF0000;`, blank: "___", answer: "volatile", choices: ["volatile", "const", "static", "register"], explanation: "volatile tells compiler not to cache the value.", hint: "Prevents compiler optimization" },
      { code: `int arr[5] = {1,2,3,4,5};\nint* p = arr;\nprintf("%d", *(p + ___));`, blank: "___", answer: "2", choices: ["2", "0", "5", "&arr"], explanation: "*(p+2) accesses the third element.", hint: "Pointer arithmetic offset" },
      { code: `// Bit manipulation\nint flags = 0;\nflags ___ (1 << 3);\n// set bit 3`, blank: "___", answer: "|=", choices: ["|=", "&=", "^=", "+="], explanation: "|= sets specific bits using OR.", hint: "Bitwise OR assignment" },
      { code: `#include <___>\njmp_buf buf;\nif (!setjmp(buf)) { ... }`, blank: "___", answer: "setjmp.h", choices: ["setjmp.h", "signal.h", "error.h", "jump.h"], explanation: "<setjmp.h> provides setjmp and longjmp.", hint: "Header for non-local jumps" },
      { code: `int* dangling;\n{\n    int x = 5;\n    dangling = ___;\n}\n// x is destroyed`, blank: "___", answer: "&x", choices: ["&x", "x", "*x", "NULL"], explanation: "Taking address of local variable creates a dangling pointer.", hint: "Address of local variable" },
      { code: `struct { int x:4; unsigned int y:___; } bits;`, blank: "___", answer: "4", choices: ["4", "8", "16", "1"], explanation: "Bit fields specify the number of bits used.", hint: "Same field width as x" },
      { code: `__attribute__((___)) void hot_fn() {}`, blank: "___", answer: "optimize(\"O3\")", choices: ["optimize(\"O3\")", "inline", "always_inline", "hot"], explanation: "GCC attribute sets optimization level per function.", hint: "GCC optimization attribute" },
      { code: `// Signal handler\n#include <signal.h>\nstruct sigaction sa;\nsa.sa_handler = ___;\nsigaction(SIGINT, &sa, NULL);`, blank: "___", answer: "handler", choices: ["handler", "SIG_DFL", "SIG_IGN", "NULL"], explanation: "sa_handler is set to your custom signal handler function.", hint: "Custom handler function" },
      { code: `// Alignment\nstruct Aligned {\n    ___ int x;\n} __attribute__((packed));`, blank: "___", answer: "char", choices: ["char", "int", "double", "short"], explanation: "char before int avoids padding in packed struct.", hint: "Smallest integer type" },
    ],
  },
};

// ─── Config ───────────────────────────────────────────────────────────────────
const languageLabels = {
  python: "Python", c: "C", cpp: "C++",
  java: "Java", sql: "SQL", web: "Web Dev",
  webdev: "Web Dev", dsa: "DSA",
};

const levelConfig = {
  easy:   { label: "Easy",   color: "#7C3AED", lives: 3, timeLimit: 30 },
  medium: { label: "Medium", color: "#D97706", lives: 3, timeLimit: 20 },
  hard:   { label: "Hard",   color: "#DC2626", lives: 3, timeLimit: 15 },
};

const TOTAL_Q    = 10;
const PASS_SCORE = 8;
const LETTERS    = ["A", "B", "C", "D"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function fetchFromAPI(language, level) {
  const prompt = `Generate exactly 10 fill-in-the-blank syntax questions for a coding quiz.
Language/Topic: ${language}
Difficulty: ${level}
Each question: a code snippet with "___" as the blank, the correct answer, 3 wrong choices, and a brief explanation.
Return ONLY valid JSON array, no markdown:
[{"code":"...___...","blank":"___","answer":"correct","choices":["correct","wrong1","wrong2","wrong3"],"explanation":"...","hint":"..."}]`;
  const res  = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, messages: [{ role: "user", content: prompt }] }),
  });
  const data = await res.json();
  const text = data.content.map(i => i.text || "").join("");
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

// ── Timer Ring ────────────────────────────────────────────────────────────────
const TimerRing = ({ timeLeft, timeLimit, color }) => {
  const R             = 16;
  const circumference = 2 * Math.PI * R;
  const pct           = timeLeft / timeLimit;
  const dashOffset    = circumference * (1 - pct);
  const ringColor     = pct > 0.5 ? color : pct > 0.25 ? "#D97706" : "#DC2626";
  const isUrgent      = timeLeft <= 5 && timeLeft > 0;

  return (
    <div style={{ position: "relative", width: "44px", height: "44px", flexShrink: 0 }}>
      <svg width="44" height="44" viewBox="0 0 44 44"
        style={{ transform: "rotate(-90deg)", animation: isUrgent ? "urgentPulse 0.55s ease-in-out infinite" : "none" }}>
        <circle cx="22" cy="22" r={R} fill="none" stroke="#EDE8E1" strokeWidth="3.5" />
        <circle cx="22" cy="22" r={R} fill="none" stroke={ringColor} strokeWidth="3.5"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.92s linear, stroke 0.3s ease" }} />
      </svg>
      <span style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: "13px", fontWeight: "800",
        color: ringColor, lineHeight: 1, transition: "color 0.3s ease",
      }}>
        {timeLeft}
      </span>
    </div>
  );
};

// ── Pass & Play Turn Banner ───────────────────────────────────────────────────
const TurnBanner = ({ currentTurn, playerNames, scores, colors }) => (
  <div style={{
    background: colors[currentTurn],
    borderRadius: "12px",
    padding: "10px 16px",
    marginBottom: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "20px" }}>{currentTurn === 0 ? "🟣" : "🔵"}</span>
      <div>
        <div style={{ fontSize: "14px", fontWeight: "800", color: "#fff" }}>
          {playerNames[currentTurn]}'s Turn
        </div>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)" }}>
          Pass &amp; Play Mode
        </div>
      </div>
    </div>
    <div style={{ display: "flex", gap: "16px" }}>
      {[0, 1].map(i => (
        <div key={i} style={{ textAlign: "center" }}>
          <div style={{ fontSize: "18px", fontWeight: "800", color: currentTurn === i ? "#fff" : "rgba(255,255,255,0.5)" }}>
            {scores[i]}
          </div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", maxWidth: "60px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {playerNames[i]}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const GuessSyntax = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { gameId, langId, level } = useParams();
  const { user }  = useAuth();

  // Normalize langId so "web" maps to "webdev" in the question bank
  const normalizedLangId = langId === "web" ? "webdev" : langId?.toLowerCase();

  // ── Pass & Play state ──────────────────────────────────────────────────────
  const { passAndPlay, player1, player2 } = location.state || {};
  const playerNames  = [player1 || "Player 1", player2 || "Player 2"];
  const playerColors = ["#7C3AED", "#0891b2"];
  const [pnpScores,   setPnpScores]   = useState([0, 0]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [showHandoff, setShowHandoff] = useState(false);
  const [nextTurnIdx, setNextTurnIdx] = useState(1);

  const lang = languageLabels[langId] ?? languageLabels[normalizedLangId] ?? langId;
  const lvl  = levelConfig[level] ?? levelConfig.easy;

  // ── Core quiz state ───────────────────────────────────────────────────────
  const [phase,     setPhase]     = useState("loading");
  const [questions, setQuestions] = useState([]);
  const [current,   setCurrent]   = useState(0);
  const [selected,  setSelected]  = useState(null);
  const [lives,     setLives]     = useState(lvl.lives);
  const [score,     setScore]     = useState(0);
  const [wrong,     setWrong]     = useState(0);
  const [showExp,   setShowExp]   = useState(false);
  const [animKey,   setAnimKey]   = useState(0);
  const [showHint,  setShowHint]  = useState(false);
  const [timeLeft,  setTimeLeft]  = useState(lvl.timeLimit);
  const [timedOut,  setTimedOut]  = useState(false);
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  const resetTimer = useCallback(() => {
    clearTimer();
    setTimeLeft(lvl.timeLimit);
    setTimedOut(false);
  }, [lvl.timeLimit]);

  // ── Save stats when game ends ─────────────────────────────────────────────
  useEffect(() => {
    if ((phase === "result" || phase === "gameover") && user && !passAndPlay) {
      updateGameStats({
        userId: user.uid,
        gameId,
        langId,
        level,
        score,
        total: TOTAL_Q,
        passed: score >= PASS_SCORE,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ── Timer tick ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "quiz" || selected !== null || timedOut || showHandoff) return;
    clearTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer();
          setTimedOut(true);
          setShowExp(true);
          setWrong(w => w + 1);
          setLives(l => {
            const next = l - 1;
            if (next <= 0) setTimeout(() => setPhase("gameover"), 1600);
            return Math.max(next, 0);
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return clearTimer;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, selected, timedOut, current, showHandoff]);

  useEffect(() => { if (selected !== null) clearTimer(); }, [selected]);
  useEffect(() => () => clearTimer(), []);

  // ── Load questions ────────────────────────────────────────────────────────
  const loadQuestions = useCallback(async () => {
    setPhase("loading");
    clearTimer();
    const bank    = QUESTION_BANK[normalizedLangId]?.[level];
    const makeSet = (raw) =>
      shuffle(raw && raw.length ? raw : []).slice(0, TOTAL_Q)
        .map(q => ({ ...q, choices: shuffle(q.choices) }));

    let raw = bank && bank.length >= TOTAL_Q ? bank : null;
    if (!raw) {
      try { raw = await fetchFromAPI(lang, level); } catch { raw = bank ?? []; }
    }
    setQuestions(makeSet(raw));
    setCurrent(0); setSelected(null); setShowExp(false); setShowHint(false);
    setTimedOut(false);
    setLives(lvl.lives); setScore(0); setWrong(0);
    setPnpScores([0, 0]); setCurrentTurn(0);
    setAnimKey(k => k + 1);
    resetTimer();
    setPhase("quiz");
  }, [normalizedLangId, level, lang, lvl.lives, resetTimer]);

  useEffect(() => { loadQuestions(); }, [loadQuestions]);

  const q        = questions[current];
  const progress = questions.length ? (current / TOTAL_Q) * 100 : 0;
  const answered = selected !== null || timedOut;
  const isCorrect = selected !== null && selected === q?.answer;

  // ── Answer handler ────────────────────────────────────────────────────────
  const handleAnswer = (choice) => {
    if (answered || !q) return;
    clearTimer();
    setSelected(choice);
    setShowExp(true);
    setShowHint(false);

    const correct = choice === q.answer;
    if (correct) {
      setScore(s => s + 1);
      if (passAndPlay) {
        setPnpScores(s => { const ns = [...s]; ns[currentTurn] += 1; return ns; });
      }
    } else {
      setWrong(w => w + 1);
      setLives(l => {
        const next = l - 1;
        if (next <= 0) setTimeout(() => setPhase("gameover"), 1600);
        return Math.max(next, 0);
      });
    }
  };

  // ── Next handler ──────────────────────────────────────────────────────────
  // FIX: setTimedOut(false) was missing — without it, a single timeout
  // permanently blocks all subsequent questions from being answerable.
  const handleNext = () => {
    const next = current + 1;
    if (next >= TOTAL_Q) { setPhase("result"); return; }

    if (passAndPlay) {
      const nxt = 1 - currentTurn;
      setNextTurnIdx(nxt);
      setShowHandoff(true);
      return;
    }

    setCurrent(next);
    setSelected(null);
    setShowExp(false);
    setShowHint(false);
    setTimedOut(false);   // ← critical fix
    setAnimKey(k => k + 1);
    resetTimer();
  };

  const continueAfterHandoff = () => {
    setCurrentTurn(nextTurnIdx);
    setCurrent(c => c + 1);
    setSelected(null);
    setShowExp(false);
    setShowHint(false);
    setTimedOut(false);   // ← also reset here for Pass & Play path
    setShowHandoff(false);
    setAnimKey(k => k + 1);
    resetTimer();
  };

  const restart = () => loadQuestions();

  // ── Render code with blank ────────────────────────────────────────────────
  const renderCode = (code, blank, answer, sel) => {
    if (!code) return null;
    const parts   = code.split(blank);
    const isTO    = sel === "__TIMEOUT__";
    const filled  = sel !== null && !isTO ? sel : blank;
    const color   = sel === null ? lvl.color : isTO ? "#DC2626" : sel === answer ? "#16A34A" : "#DC2626";
    const bg      = sel === null ? lvl.color + "22" : isTO ? "#FEE2E2" : sel === answer ? "#DCFCE7" : "#FEE2E2";
    return parts.map((part, i) => (
      <span key={i}>
        <span style={{ whiteSpace: "pre" }}>{part}</span>
        {i < parts.length - 1 && (
          <span style={{
            background: bg, color, border: `2px solid ${color}`,
            borderRadius: "6px", padding: "1px 8px",
            fontWeight: "800", fontFamily: "'Fira Code','Cascadia Code',monospace",
            display: "inline-block", minWidth: "48px", textAlign: "center",
            transition: "all 0.25s",
          }}>{filled}</span>
        )}
      </span>
    ));
  };

  // ── Style helpers ─────────────────────────────────────────────────────────
  const endPageWrap  = { minHeight: "100vh", background: "#F5F0EB", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" };
  const endCardStyle = { background: "#FFF", border: "1px solid #E8E2DA", borderRadius: "20px", padding: "40px 28px", textAlign: "center", width: "100%", maxWidth: "420px" };
  const scoreCircle  = (c) => ({ width: "96px", height: "96px", borderRadius: "50%", border: `4px solid ${c}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", background: "#FAFAF8" });
  const btnPrimary   = (c) => ({ background: c, color: "#FFF", border: "none", borderRadius: "12px", padding: "13px 24px", fontSize: "15px", fontWeight: "700", cursor: "pointer", flex: "1 1 auto", minWidth: "120px" });
  const btnSecondary = { background: "#F5F0EB", color: "#4A4540", border: "1.5px solid #DDD7CE", borderRadius: "12px", padding: "13px 20px", fontSize: "14px", fontWeight: "600", cursor: "pointer", flex: "1 1 auto", minWidth: "120px" };
  const btnGroup     = { display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" };

  // ── LOADING ───────────────────────────────────────────────────────────────
  if (phase === "loading") return (
    <div style={{ minHeight: "100vh", background: "#F5F0EB", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width: "44px", height: "44px", borderRadius: "50%", border: "4px solid #EDE8E1", borderTopColor: lvl.color, animation: "spin 0.85s linear infinite", marginBottom: "16px" }} />
      <p style={{ color: lvl.color, fontWeight: "700", fontSize: "15px" }}>Loading {lvl.label} questions…</p>
    </div>
  );

  // ── HANDOFF SCREEN (Pass & Play) ──────────────────────────────────────────
  if (showHandoff) return (
    <div style={{ minHeight: "100vh", background: playerColors[nextTurnIdx] === "#7C3AED" ? "#2D1B69" : "#0C3D52", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <div style={{ textAlign: "center", color: "#FFF" }}>
        <span style={{ fontSize: "56px", display: "block", marginBottom: "16px" }}>
          {nextTurnIdx === 0 ? "🟣" : "🔵"}
        </span>
        <h2 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 8px" }}>
          {playerNames[nextTurnIdx]}'s Turn
        </h2>
        <p style={{ fontSize: "15px", opacity: 0.75, margin: "0 0 12px" }}>
          Question {current + 2} of {TOTAL_Q}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "32px", marginBottom: "32px" }}>
          {[0, 1].map(i => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: "800" }}>{pnpScores[i]}</div>
              <div style={{ fontSize: "13px", opacity: 0.7 }}>{playerNames[i]}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "14px", opacity: 0.65, margin: "0 0 28px", maxWidth: "280px" }}>
          Hand the device to <strong>{playerNames[nextTurnIdx]}</strong> and tap Ready!
        </p>
        <button onClick={continueAfterHandoff}
          style={{ background: "#FFF", color: playerColors[nextTurnIdx], border: "none", borderRadius: "14px", padding: "14px 36px", fontSize: "16px", fontWeight: "800", cursor: "pointer" }}>
          I'm Ready! →
        </button>
      </div>
    </div>
  );

  // ── GAME OVER ─────────────────────────────────────────────────────────────
  if (phase === "gameover") return (
    <div style={endPageWrap}>
      <div style={endCardStyle}>
        <span style={{ fontSize: "52px", marginBottom: "16px", display: "block" }}>💔</span>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#DC2626", marginBottom: "8px" }}>Out of Lives!</h2>
        <div style={scoreCircle("#DC2626")}>
          <span style={{ fontSize: "32px", fontWeight: "800", color: "#DC2626", lineHeight: 1 }}>{score}</span>
          <span style={{ fontSize: "12px", color: "#A09890", fontWeight: "600" }}>/ {TOTAL_Q}</span>
        </div>
        <p style={{ fontSize: "14px", color: "#7A7268", lineHeight: 1.6, marginBottom: "20px" }}>
          You need at least {PASS_SCORE} correct answers to pass.
        </p>
        <div style={btnGroup}>
          <button style={btnPrimary(lvl.color)} onClick={restart}>↺ Restart</button>
          <button style={btnSecondary} onClick={() => navigate(passAndPlay ? "/pass-and-play" : `/games/${gameId}/level/${langId}`)}>← Back</button>
        </div>
      </div>
    </div>
  );

  // ── RESULT ────────────────────────────────────────────────────────────────
  if (phase === "result") {
    if (passAndPlay) {
      const tied   = pnpScores[0] === pnpScores[1];
      const winner = tied ? -1 : pnpScores[0] > pnpScores[1] ? 0 : 1;
      return (
        <div style={endPageWrap}>
          <div style={endCardStyle}>
            <span style={{ fontSize: "52px", display: "block", marginBottom: "16px" }}>{tied ? "🤝" : "🏆"}</span>
            <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#1C1814", margin: "0 0 8px" }}>
              {tied ? "It's a Tie!" : `${playerNames[winner]} Wins!`}
            </h2>
            <p style={{ fontSize: "14px", color: "#7A7268", marginBottom: "24px" }}>
              {tied ? "Both players scored equally — great match!" : `${playerNames[winner]} answered more correctly!`}
            </p>
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
              {[0, 1].map(i => (
                <div key={i} style={{ flex: 1, background: winner === i ? "#F3F0FF" : "#FAFAF8", border: `2px solid ${winner === i ? playerColors[i] : "#E8E2DA"}`, borderRadius: "14px", padding: "16px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: playerColors[i], textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
                    {winner === i ? "🥇 " : ""}{playerNames[i]}
                  </div>
                  <div style={{ fontSize: "36px", fontWeight: "800", color: playerColors[i], lineHeight: 1 }}>{pnpScores[i]}</div>
                  <div style={{ fontSize: "12px", color: "#9C9489", marginTop: "4px" }}>/ {TOTAL_Q}</div>
                </div>
              ))}
            </div>
            <div style={btnGroup}>
              <button style={btnPrimary("#7C3AED")} onClick={restart}>↺ Play Again</button>
              <button style={btnSecondary} onClick={() => navigate("/pass-and-play")}>← Change Game</button>
            </div>
          </div>
        </div>
      );
    }

    const passed    = score >= PASS_SCORE;
    const rc        = passed ? lvl.color : "#DC2626";
    const nextLevel = level === "easy" ? "medium" : level === "medium" ? "hard" : null;
    return (
      <div style={endPageWrap}>
        <div style={endCardStyle}>
          <span style={{ fontSize: "52px", marginBottom: "16px", display: "block" }}>{passed ? "🏆" : "😔"}</span>
          <h2 style={{ fontSize: "24px", fontWeight: "800", color: rc, marginBottom: "8px" }}>{passed ? "Level Complete!" : "Not Quite!"}</h2>
          <div style={scoreCircle(rc)}>
            <span style={{ fontSize: "32px", fontWeight: "800", color: rc, lineHeight: 1 }}>{score}</span>
            <span style={{ fontSize: "12px", color: "#A09890", fontWeight: "600" }}>/ {TOTAL_Q}</span>
          </div>
          <p style={{ fontSize: "14px", color: "#7A7268", lineHeight: 1.6, marginBottom: "8px" }}>
            {passed ? `Excellent! You got ${score} out of ${TOTAL_Q} correct.` : `You need ${PASS_SCORE}/10 to pass. Keep practicing!`}
          </p>
          <span style={{ fontSize: "13px", color: "#9C9489", marginBottom: "28px", display: "block" }}>
            Lives remaining: {"❤️".repeat(lives)}{"🖤".repeat(Math.max(0, lvl.lives - lives))}
          </span>
          <div style={btnGroup}>
            {!passed && <button style={btnPrimary(lvl.color)} onClick={restart}>↺ Try Again</button>}
            {passed && nextLevel && <button style={btnPrimary(lvl.color)} onClick={() => navigate(`/games/${gameId}/play/${langId}/${nextLevel}`)}>Next Level →</button>}
            {passed && !nextLevel && <button style={btnPrimary("#7C3AED")} onClick={() => navigate("/games")}>🎯 All Games</button>}
            <button style={btnSecondary} onClick={() => navigate(`/games/${gameId}/level/${langId}`)}>← Change Level</button>
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ ──────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes spin        { to { transform: rotate(360deg); } }
        @keyframes slideQ      { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeExp     { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes urgentPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.13)} }
        @keyframes timedOutShake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-5px)} 40%{transform:translateX(5px)}
          60%{transform:translateX(-4px)} 80%{transform:translateX(4px)}
        }
        .q-enter   { animation: slideQ  0.32s cubic-bezier(.22,.68,0,1.2) both; }
        .exp-enter { animation: fadeExp 0.24s ease both; }
        .timed-out-shake { animation: timedOutShake 0.45s ease both; }
        .opt-hover:hover:not(:disabled) { transform: translateX(4px); border-color: #C4BADF !important; }
        .next-hover:hover  { opacity: 0.88; }
        .next-hover:active { transform: scale(0.97); }
        .exit-hover:hover  { background: #EDE8E1 !important; }
        .hint-hover:hover  { background: #EDE8E1 !important; }
        @media(max-width:600px){
          .choices-grid-resp { grid-template-columns: 1fr !important; }
          .code-pre-resp     { font-size: 12px !important; }
          .content-resp      { padding: 14px 12px 40px !important; }
          .topbar-resp       { padding: 8px 12px !important; gap: 8px !important; }
          .score-lbl-resp    { font-size: 9px !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#F5F0EB", fontFamily: "'Segoe UI','Inter',system-ui,sans-serif", display: "flex", flexDirection: "column" }}>

        {/* TOP BAR */}
        <div className="topbar-resp" style={{ background: "#FFF", borderBottom: "1px solid #E8E2DA", padding: "10px 20px", display: "flex", alignItems: "center", gap: "12px", position: "sticky", top: 0, zIndex: 10 }}>
          <button className="exit-hover" onClick={() => { clearTimer(); navigate(passAndPlay ? "/pass-and-play" : `/games/${gameId}/level/${langId}`); }}
            style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1.5px solid #E0D8CF", background: "#F5F0EB", cursor: "pointer", fontSize: "15px", color: "#6B6560", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            ✕
          </button>
          <div style={{ flex: 1, height: "8px", background: "#EDE8E1", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ height: "100%", background: passAndPlay ? playerColors[currentTurn] : lvl.color, borderRadius: "999px", width: `${progress}%`, transition: "width 0.45s ease" }} />
          </div>
          <TimerRing timeLeft={timeLeft} timeLimit={lvl.timeLimit} color={passAndPlay ? playerColors[currentTurn] : lvl.color} />
          <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
            {Array.from({ length: lvl.lives }).map((_, i) => (
              <span key={i} style={{ fontSize: "18px", opacity: i < lives ? 1 : 0.22, lineHeight: 1 }}>❤️</span>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="content-resp" style={{ flex: 1, width: "100%", maxWidth: "700px", margin: "0 auto", padding: "20px 16px 48px" }}>

          {/* Meta row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#8B7FB8" }}>
              Guess Syntax • {lang} • {lvl.label}
            </span>
            <span style={{ fontSize: "13px", color: "#9C9489", fontWeight: "600", background: "#EDE8E1", padding: "4px 10px", borderRadius: "999px" }}>
              {current + 1}/{TOTAL_Q}
            </span>
          </div>

          {/* Pass & Play turn banner */}
          {passAndPlay && (
            <TurnBanner
              currentTurn={currentTurn}
              playerNames={playerNames}
              scores={pnpScores}
              colors={playerColors}
            />
          )}

          {/* Score band */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", background: "#FFF", border: "1px solid #E8E2DA", borderRadius: "14px", overflow: "hidden", marginBottom: "18px" }}>
            {[
              { num: passAndPlay ? pnpScores[0] : score, lbl: passAndPlay ? playerNames[0].split(" ")[0] : "Correct", color: "#16A34A" },
              { num: passAndPlay ? pnpScores[1] : wrong,  lbl: passAndPlay ? playerNames[1].split(" ")[0] : "Wrong",   color: passAndPlay ? "#0891b2" : "#DC2626" },
              { num: PASS_SCORE,          lbl: "To Pass", color: "#D97706" },
              { num: `${lvl.timeLimit}s`, lbl: "Per Q",   color: "#6366F1" },
            ].map((s, i, arr) => (
              <div key={s.lbl} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 6px", gap: "2px", borderRight: i < arr.length - 1 ? "1px solid #EDE8E1" : "none" }}>
                <span style={{ fontSize: "18px", fontWeight: "700", lineHeight: 1, color: s.color }}>{s.num}</span>
                <span className="score-lbl-resp" style={{ fontSize: "10px", color: "#A09890", fontWeight: "600", letterSpacing: "0.6px", textTransform: "uppercase" }}>{s.lbl}</span>
              </div>
            ))}
          </div>

          {/* Question area */}
          <div key={animKey} className="q-enter">

            {/* Timed-out banner */}
            {timedOut && (
              <div className="exp-enter timed-out-shake" style={{ background: "#FEF3C7", border: "1.5px solid #FCD34D", borderRadius: "12px", padding: "11px 16px", fontSize: "14px", color: "#92400E", marginBottom: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "20px" }}>⏰</span>
                Time's up! Correct answer:&nbsp;
                <span style={{ background: "#FDE68A", padding: "2px 8px", borderRadius: "6px", fontWeight: "800" }}>
                  {q?.answer}
                </span>
              </div>
            )}

            {/* Instruction + hint toggle */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#A09890", textTransform: "uppercase" }}>Fill in the blank:</span>
              {q?.hint && !answered && (
                <button className="hint-hover" onClick={() => setShowHint(h => !h)}
                  style={{ background: showHint ? "#EDE8E1" : "#F5F0EB", border: "1.5px solid #DDD7CE", borderRadius: "8px", padding: "4px 12px", fontSize: "12px", fontWeight: "600", color: "#6B6560", cursor: "pointer" }}>
                  {showHint ? "Hide Hint" : "💡 Hint"}
                </button>
              )}
            </div>

            {/* Hint box */}
            {showHint && q?.hint && (
              <div className="exp-enter" style={{ background: "#FFFBEB", border: "1.5px solid #FDE68A", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#92400E", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "16px" }}>💡</span>
                <span>{q.hint}</span>
              </div>
            )}

            {/* Code block */}
            <div style={{ background: "#1E1B2E", borderRadius: "14px", padding: "16px", marginBottom: "14px", overflow: "auto" }}>
              <div style={{ display: "flex", gap: "6px", marginBottom: "12px", alignItems: "center" }}>
                {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
                  <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                ))}
                <span style={{ marginLeft: "auto", fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
                  {langId === "sql" ? "sql" : langId === "webdev" || langId === "web" ? "js/html" : langId}
                </span>
              </div>
              <pre className="code-pre-resp" style={{ margin: 0, fontSize: "14px", fontFamily: "'Fira Code','Cascadia Code','Consolas',monospace", color: "#E2E8F0", overflowX: "auto", lineHeight: 1.75 }}>
                <code>{renderCode(q?.code, q?.blank ?? "___", q?.answer, answered ? (timedOut ? "__TIMEOUT__" : selected) : null)}</code>
              </pre>
            </div>

            {/* Choices */}
            <div className="choices-grid-resp" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
              {q?.choices?.map((choice, i) => {
                const isAns = choice === q.answer;
                const isSel = choice === selected;
                let bg = "#FFF", border = "#E8E2DA", txtClr = "#1C1814";
                let letBg = "#F5F0EB", letClr = "#6B6560", letBorder = "#DDD7CE";
                if (answered) {
                  if (isAns)      { bg = "#F0FDF4"; border = "#86EFAC"; txtClr = "#166534"; letBg = "#DCFCE7"; letClr = "#15803D"; letBorder = "#86EFAC"; }
                  else if (isSel) { bg = "#FEF2F2"; border = "#FECACA"; txtClr = "#991B1B"; letBg = "#FEE2E2"; letClr = "#B91C1C"; letBorder = "#FECACA"; }
                  else            { bg = "#FAFAF8"; border = "#EDE8E1"; txtClr = "#C0B8B0"; letClr = "#C0B8B0"; }
                }
                return (
                  <button key={i} className="opt-hover" disabled={answered} onClick={() => handleAnswer(choice)}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", background: bg, border: `1.5px solid ${border}`, borderRadius: "12px", cursor: answered ? "default" : "pointer", width: "100%", textAlign: "left", transition: "transform 0.15s, border-color 0.15s, background 0.15s" }}>
                    <span style={{ width: "28px", height: "28px", borderRadius: "50%", border: `1.5px solid ${letBorder}`, background: letBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: letClr, flexShrink: 0, fontFamily: "monospace" }}>
                      {LETTERS[i]}
                    </span>
                    <span style={{ flex: 1, fontSize: "13px", fontWeight: "600", color: txtClr, fontFamily: "'Fira Code','Cascadia Code',monospace", lineHeight: 1.4 }}>
                      {choice}
                    </span>
                    {answered && isAns && <span style={{ fontSize: "16px", flexShrink: 0 }}>✅</span>}
                    {answered && isSel && !isAns && <span style={{ fontSize: "16px", flexShrink: 0 }}>❌</span>}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExp && !timedOut && q?.explanation && (
              <div className="exp-enter" style={{ background: isCorrect ? "#F0FDF4" : "#FEF2F2", border: `1.5px solid ${isCorrect ? "#86EFAC" : "#FECACA"}`, borderRadius: "12px", padding: "14px 16px", fontSize: "14px", color: isCorrect ? "#166534" : "#991B1B", lineHeight: 1.6, marginBottom: "14px" }}>
                <span style={{ fontWeight: "700", display: "block", marginBottom: "4px", fontSize: "13px" }}>
                  {isCorrect ? "✅ Correct!" : "❌ Incorrect!"}
                  {!isCorrect && (
                    <span style={{ color: "#15803D", marginLeft: "8px" }}>
                      Answer: <code style={{ fontFamily: "monospace", background: "#DCFCE7", padding: "1px 6px", borderRadius: "4px" }}>{q.answer}</code>
                    </span>
                  )}
                </span>
                {q.explanation}
              </div>
            )}

            {/* Next button */}
            {answered && (
              <div className="exp-enter" style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="next-hover" onClick={handleNext}
                  style={{ background: passAndPlay ? playerColors[currentTurn] : lvl.color, color: "#FFF", border: "none", borderRadius: "12px", padding: "12px 24px", fontSize: "15px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: `0 4px 14px rgba(0,0,0,0.2)` }}>
                  {current + 1 >= TOTAL_Q ? "See Result" : passAndPlay ? `Pass to ${playerNames[1 - currentTurn]} →` : "Next →"}
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default GuessSyntax;