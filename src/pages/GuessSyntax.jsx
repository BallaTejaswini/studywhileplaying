import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useCallback, useRef } from "react";

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

const languageLabels = { python: "Python", c: "C", cpp: "C++", java: "Java", sql: "SQL", webdev: "Web Dev", dsa: "DSA" };

// Timer config per level (seconds per question)
const levelConfig = {
  easy:   { label: "EASY",   color: "#22c55e", lives: 3, timePerQ: 30 },
  medium: { label: "MEDIUM", color: "#f59e0b", lives: 3, timePerQ: 20 },
  hard:   { label: "HARD",   color: "#ef4444", lives: 3, timePerQ: 15 },
};

const TOTAL_Q    = 10;
const PASS_SCORE = 8;

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

// ─────────────────────────────────────────────────────────────────────────────
const GuessSyntax = () => {
  const navigate = useNavigate();
  const { gameId, langId, level } = useParams();
  const { user } = useAuth();

  const lang = languageLabels[langId] ?? langId;
  const lvl  = levelConfig[level] ?? levelConfig.easy;

  const [phase,    setPhase]    = useState("loading");
  const [questions,setQuestions]= useState([]);
  const [current,  setCurrent]  = useState(0);
  const [selected, setSelected] = useState(null);
  const [lives,    setLives]    = useState(lvl.lives);
  const [score,    setScore]    = useState(0);
  const [wrong,    setWrong]    = useState(0);
  const [showExp,  setShowExp]  = useState(false);
  const [animKey,  setAnimKey]  = useState(0);
  const [showHint, setShowHint] = useState(false);

  // ── Timer state ──
  const [timeLeft, setTimeLeft] = useState(lvl.timePerQ);
  const timerRef  = useRef(null);

  const clearTimer = () => { if (timerRef.current) clearInterval(timerRef.current); };

  const startTimer = useCallback(() => {
    clearTimer();
    setTimeLeft(lvl.timePerQ);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [lvl.timePerQ]);

  // When timer hits 0 — auto-submit wrong
  useEffect(() => {
    if (timeLeft === 0 && phase === "quiz" && selected === null) {
      handleTimeout();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleTimeout = () => {
    clearTimer();
    const q = questions[current];
    if (!q) return;
    setSelected("__TIMEOUT__");
    setShowExp(true);
    const newLives = lives - 1;
    setWrong(w => w + 1);
    setLives(newLives);
    if (newLives === 0) {
      setTimeout(() => setPhase("gameover"), 1800);
    }
  };

  const loadQuestions = useCallback(async () => {
    setPhase("loading");
    clearTimer();
    const bankKey = langId?.toLowerCase();
    const bank    = QUESTION_BANK[bankKey]?.[level];

    if (bank && bank.length >= TOTAL_Q) {
      setQuestions(shuffle(bank).slice(0, TOTAL_Q).map(q => ({ ...q, choices: shuffle(q.choices) })));
    } else {
      try {
        const qs = await fetchFromAPI(lang, level);
        setQuestions(qs.slice(0, TOTAL_Q).map(q => ({ ...q, choices: shuffle(q.choices) })));
      } catch {
        setQuestions(shuffle(bank ?? []).slice(0, TOTAL_Q).map(q => ({ ...q, choices: shuffle(q.choices) })));
      }
    }

    setCurrent(0); setSelected(null); setShowExp(false);
    setLives(lvl.lives); setScore(0); setWrong(0);
    setShowHint(false); setAnimKey(k => k + 1);
    setPhase("quiz");
  }, [langId, level, lang, lvl.lives]);

  // Start timer when phase becomes "quiz"
  useEffect(() => {
    if (phase === "quiz") startTimer();
    return () => clearTimer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => { loadQuestions(); }, [loadQuestions]);

  const q        = questions[current];
  const progress = questions.length ? (current / TOTAL_Q) * 100 : 0;
  const isCorrect = selected !== null && selected === q?.answer;

  // Timer colour
  const timerPct  = timeLeft / lvl.timePerQ;
  const timerColor = timerPct > 0.5 ? "#22c55e" : timerPct > 0.25 ? "#f59e0b" : "#ef4444";

  const handleAnswer = (choice) => {
    if (selected !== null || !q) return;
    clearTimer();
    setSelected(choice);
    setShowExp(true);
    setShowHint(false);

    if (choice === q.answer) {
      setScore(s => s + 1);
    } else {
      const newLives = lives - 1;
      setWrong(w => w + 1);
      setLives(newLives);
      if (newLives === 0) {
        setTimeout(() => setPhase("gameover"), 1600);
        return;
      }
    }
  };

  const handleNext = () => {
    const next = current + 1;
    if (next >= TOTAL_Q) { setPhase("result"); return; }
    setCurrent(next);
    setSelected(null);
    setShowExp(false);
    setShowHint(false);
    setAnimKey(k => k + 1);
    startTimer();
  };

  const restart = () => loadQuestions();

  // ── Render code with blank ──
  const renderCode = (code, blank, answer, sel) => {
    if (!code) return null;
    const parts  = code.split(blank);
    const filled = sel !== null && sel !== "__TIMEOUT__" ? sel : (sel === "__TIMEOUT__" ? "⏰" : blank);
    const isTO   = sel === "__TIMEOUT__";
    const color  = sel === null ? lvl.color : isTO ? "#ef4444" : sel === answer ? "#16a34a" : "#dc2626";
    const bg     = sel === null ? lvl.color + "22" : isTO ? "#fee2e2" : sel === answer ? "#dcfce7" : "#fee2e2";

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

  // ── Shared end page ──
  const EndPage = ({ children }) => (
    <div style={{ minHeight: "100vh", background: "#f5f0eb", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div style={{ background: "#fff", border: "1px solid #e8e2da", borderRadius: "20px", padding: "40px 28px", textAlign: "center", width: "100%", maxWidth: "420px" }}>
        {children}
      </div>
    </div>
  );
  const ScoreCircle = ({ color }) => (
    <div style={{ width: "96px", height: "96px", borderRadius: "50%", border: `4px solid ${color}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", background: "#fafaf8" }}>
      <span style={{ fontSize: "32px", fontWeight: "800", color, lineHeight: 1 }}>{score}</span>
      <span style={{ fontSize: "12px", color: "#a09890", fontWeight: "600" }}>/ {TOTAL_Q}</span>
    </div>
  );
  const BtnGroup   = ({ children }) => <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>{children}</div>;
  const PrimaryBtn = ({ color, onClick, children }) => (
    <button onClick={onClick} style={{ background: color, color: "#fff", border: "none", borderRadius: "12px", padding: "13px 24px", fontSize: "15px", fontWeight: "700", cursor: "pointer", flex: "1 1 auto", minWidth: "120px" }}>{children}</button>
  );
  const SecondaryBtn = ({ onClick, children }) => (
    <button onClick={onClick} style={{ background: "#f5f0eb", color: "#4a4540", border: "1.5px solid #ddd7ce", borderRadius: "12px", padding: "13px 20px", fontSize: "14px", fontWeight: "600", cursor: "pointer", flex: "1 1 auto", minWidth: "120px" }}>{children}</button>
  );

  if (phase === "loading") return (
    <div style={{ minHeight: "100vh", background: "#f5f0eb", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width: "44px", height: "44px", borderRadius: "50%", border: "4px solid #ede8e1", borderTopColor: lvl.color, animation: "spin 0.85s linear infinite", marginBottom: "16px" }} />
      <p style={{ color: lvl.color, fontWeight: "700", fontSize: "15px" }}>Loading {lvl.label} questions…</p>
    </div>
  );

  if (phase === "gameover") return (
    <EndPage>
      <div style={{ fontSize: "52px", marginBottom: "16px" }}>💔</div>
      <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#dc2626", marginBottom: "8px" }}>Out of Lives!</h2>
      <ScoreCircle color="#dc2626" />
      <p style={{ fontSize: "14px", color: "#7a7268", lineHeight: 1.6, marginBottom: "24px" }}>
        You scored <strong>{score}/{TOTAL_Q}</strong>. You need at least {PASS_SCORE} to pass.
      </p>
      <BtnGroup>
        <PrimaryBtn color={lvl.color} onClick={restart}>↺ Restart</PrimaryBtn>
        <SecondaryBtn onClick={() => navigate(`/games/${gameId}/level/${langId}`)}>← Change Level</SecondaryBtn>
      </BtnGroup>
    </EndPage>
  );

  if (phase === "result") {
    const passed    = score >= PASS_SCORE;
    const color     = passed ? lvl.color : "#dc2626";
    const nextLevel = level === "easy" ? "medium" : level === "medium" ? "hard" : null;
    return (
      <EndPage>
        <div style={{ fontSize: "52px", marginBottom: "16px" }}>{passed ? "🏆" : "😔"}</div>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color, marginBottom: "8px" }}>{passed ? "Level Complete!" : "Not Quite!"}</h2>
        <ScoreCircle color={color} />
        <p style={{ fontSize: "14px", color: "#7a7268", lineHeight: 1.6, marginBottom: "8px" }}>
          {passed ? `Great job! You got ${score}/${TOTAL_Q} correct.` : `Need at least ${PASS_SCORE}/10 to pass.`}
        </p>
        <span style={{ fontSize: "13px", color: "#9c9489", display: "block", marginBottom: "24px" }}>
          Lives left: {"❤️".repeat(lives)}{"🖤".repeat(Math.max(0, lvl.lives - lives))}
        </span>
        <BtnGroup>
          {!passed && <PrimaryBtn color={lvl.color} onClick={restart}>↺ Try Again</PrimaryBtn>}
          {passed && nextLevel && <PrimaryBtn color={lvl.color} onClick={() => navigate(`/games/${gameId}/play/${langId}/${nextLevel}`)}>Next Level →</PrimaryBtn>}
          {passed && !nextLevel && <PrimaryBtn color="#7c3aed" onClick={() => navigate("/games")}>🎯 All Games</PrimaryBtn>}
          <SecondaryBtn onClick={() => navigate(`/games/${gameId}/level/${langId}`)}>← Change Level</SecondaryBtn>
        </BtnGroup>
      </EndPage>
    );
  }

  // ── QUIZ ──
  return (
    <>
      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes slideQ  { from { opacity:0;transform:translateX(20px); } to { opacity:1;transform:translateX(0); } }
        @keyframes fadeExp { from { opacity:0;transform:translateY(6px);  } to { opacity:1;transform:translateY(0); } }
        @keyframes pulse   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        .q-enter   { animation: slideQ  0.3s cubic-bezier(.22,.68,0,1.2) both; }
        .exp-enter { animation: fadeExp 0.22s ease both; }
        .opt-choice {
          transition: transform 0.12s, border-color 0.12s, background 0.12s;
          cursor: pointer; border: none; text-align: left; font-family: inherit;
        }
        .opt-choice:hover:not(:disabled) { transform: translateX(4px); }
        .opt-choice:disabled { cursor: default; }
        .timer-urgent { animation: pulse 0.6s ease infinite; }
        .next-btn:hover { opacity: 0.88; }
        .next-btn:active { transform: scale(0.97); }
        .exit-btn:hover { background: #ede8e1 !important; }
        .hint-btn:hover { background: #ede8e1 !important; }

        /* ── Responsive ── */
        .quiz-root { min-height:100vh; background:#f5f0eb; font-family:'Segoe UI',system-ui,sans-serif; display:flex; flex-direction:column; }
        .quiz-content { flex:1; width:100%; max-width:700px; margin:0 auto; padding:18px 16px 48px; box-sizing:border-box; }
        .choices-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .code-pre { font-size:14px; line-height:1.75; }
        .score-band { display:grid; grid-template-columns:1fr 1fr 1fr; }

        @media (max-width:540px) {
          .choices-grid { grid-template-columns:1fr; }
          .code-pre { font-size:12px; }
          .quiz-content { padding:12px 10px 40px; }
        }
        @media (max-width:380px) {
          .code-pre { font-size:11px; }
          .score-band { grid-template-columns:1fr 1fr 1fr; }
        }
      `}</style>

      <div className="quiz-root">

        {/* ── TOP BAR ── */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e8e2da", padding: "10px 16px", display: "flex", alignItems: "center", gap: "10px", position: "sticky", top: 0, zIndex: 10 }}>
          <button className="exit-btn" onClick={() => { clearTimer(); navigate(`/games/${gameId}/level/${langId}`); }}
            style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1.5px solid #e0d8cf", background: "#f5f0eb", cursor: "pointer", fontSize: "14px", color: "#6b6560", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            ✕
          </button>

          {/* Progress bar */}
          <div style={{ flex: 1, height: "7px", background: "#ede8e1", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ height: "100%", background: lvl.color, borderRadius: "999px", width: `${progress}%`, transition: "width 0.4s ease" }} />
          </div>

          {/* Timer pill */}
          <div className={timeLeft <= 5 ? "timer-urgent" : ""} style={{
            display: "flex", alignItems: "center", gap: "5px",
            background: timerColor + "18", border: `1.5px solid ${timerColor}44`,
            borderRadius: "999px", padding: "4px 10px", flexShrink: 0,
          }}>
            {/* Circular timer */}
            <svg width="18" height="18" viewBox="0 0 18 18" style={{ flexShrink: 0 }}>
              <circle cx="9" cy="9" r="7" fill="none" stroke="#ede8e1" strokeWidth="2.5" />
              <circle cx="9" cy="9" r="7" fill="none" stroke={timerColor} strokeWidth="2.5"
                strokeDasharray={`${2 * Math.PI * 7}`}
                strokeDashoffset={`${2 * Math.PI * 7 * (1 - timerPct)}`}
                strokeLinecap="round"
                transform="rotate(-90 9 9)"
                style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
              />
            </svg>
            <span style={{ fontSize: "13px", fontWeight: "800", color: timerColor, fontVariantNumeric: "tabular-nums", minWidth: "18px" }}>
              {timeLeft}s
            </span>
          </div>

          {/* Lives */}
          <div style={{ display: "flex", gap: "2px", flexShrink: 0 }}>
            {Array.from({ length: lvl.lives }).map((_, i) => (
              <span key={i} style={{ fontSize: "16px", opacity: i < lives ? 1 : 0.22 }}>❤️</span>
            ))}
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="quiz-content">

          {/* Meta row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#8b7fb8" }}>📝 {lang} · {lvl.label}</span>
            <span style={{ fontSize: "13px", color: "#9c9489", fontWeight: "600", background: "#ede8e1", padding: "3px 10px", borderRadius: "999px" }}>
              {current + 1} / {TOTAL_Q}
            </span>
          </div>

          {/* Score band */}
          <div className="score-band" style={{ background: "#fff", border: "1px solid #e8e2da", borderRadius: "14px", overflow: "hidden", marginBottom: "16px" }}>
            {[
              { num: score,      lbl: "Correct", color: "#16a34a" },
              { num: wrong,      lbl: "Wrong",   color: "#dc2626" },
              { num: PASS_SCORE, lbl: "To Pass", color: "#d97706" },
            ].map((s, i) => (
              <div key={s.lbl} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 6px", gap: "2px", borderRight: i < 2 ? "1px solid #ede8e1" : "none" }}>
                <span style={{ fontSize: "18px", fontWeight: "700", lineHeight: 1, color: s.color }}>{s.num}</span>
                <span style={{ fontSize: "10px", color: "#a09890", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase" }}>{s.lbl}</span>
              </div>
            ))}
          </div>

          {/* Question */}
          <div key={animKey} className="q-enter">

            {/* Instruction + hint row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#a09890", textTransform: "uppercase" }}>Fill in the blank:</span>
              {q?.hint && selected === null && (
                <button className="hint-btn" onClick={() => setShowHint(h => !h)}
                  style={{ background: showHint ? "#ede8e1" : "#f5f0eb", border: "1.5px solid #ddd7ce", borderRadius: "8px", padding: "4px 12px", fontSize: "12px", fontWeight: "600", color: "#6b6560", cursor: "pointer" }}>
                  {showHint ? "Hide Hint" : "💡 Hint"}
                </button>
              )}
            </div>

            {/* Hint bubble */}
            {showHint && q?.hint && (
              <div className="exp-enter" style={{ background: "#fffbeb", border: "1.5px solid #fde68a", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#92400e", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "16px" }}>💡</span>
                <span>{q.hint}</span>
              </div>
            )}

            {/* Timeout warning */}
            {selected === "__TIMEOUT__" && (
              <div className="exp-enter" style={{ background: "#fef2f2", border: "1.5px solid #fecaca", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#991b1b", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "16px" }}>⏰</span>
                <span><strong>Time's up!</strong> The correct answer was: <code style={{ background: "#dcfce7", color: "#166534", padding: "1px 6px", borderRadius: "4px", fontFamily: "monospace" }}>{q?.answer}</code></span>
              </div>
            )}

            {/* Code block */}
            <div style={{ background: "#1e1b2e", borderRadius: "14px", padding: "16px", marginBottom: "12px", overflow: "auto" }}>
              <div style={{ display: "flex", gap: "6px", marginBottom: "12px", alignItems: "center" }}>
                {["#ff5f57","#febc2e","#28c840"].map((c,i) => <div key={i} style={{ width:"10px",height:"10px",borderRadius:"50%",background:c }} />)}
                <span style={{ marginLeft: "auto", fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
                  {langId === "sql" ? "sql" : langId === "webdev" ? "js/html" : langId}
                </span>
              </div>
              <pre className="code-pre" style={{ margin: 0, fontFamily: "'Fira Code','Cascadia Code','Consolas',monospace", color: "#e2e8f0", overflowX: "auto" }}>
                <code>{renderCode(q?.code, q?.blank ?? "___", q?.answer, selected)}</code>
              </pre>
            </div>

            {/* Choices */}
            <div className="choices-grid" style={{ marginBottom: "12px" }}>
              {q?.choices?.map((choice, i) => {
                const isAns = choice === q.answer;
                const isSel = choice === selected;
                let bg = "#fff", border = "#e8e2da", txtClr = "#1c1814";
                let letBg = "#f5f0eb", letClr = "#6b6560";
                if (selected !== null) {
                  if (isAns)      { bg = "#f0fdf4"; border = "#86efac"; txtClr = "#166534"; letBg = "#dcfce7"; letClr = "#15803d"; }
                  else if (isSel) { bg = "#fef2f2"; border = "#fecaca"; txtClr = "#991b1b"; letBg = "#fee2e2"; letClr = "#b91c1c"; }
                  else            { bg = "#fafaf8"; border = "#ede8e1"; txtClr = "#c0b8b0"; letClr = "#c0b8b0"; }
                }
                return (
                  <button key={i} className="opt-choice" disabled={selected !== null} onClick={() => handleAnswer(choice)}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 13px", background: bg, border: `1.5px solid ${border}`, borderRadius: "12px", width: "100%" }}>
                    <span style={{ width: "26px", height: "26px", borderRadius: "50%", border: `1.5px solid ${border === "#e8e2da" ? "#ddd7ce" : border}`, background: letBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700", color: letClr, flexShrink: 0, fontFamily: "monospace" }}>
                      {["A","B","C","D"][i]}
                    </span>
                    <span style={{ flex: 1, fontSize: "13px", fontWeight: "600", color: txtClr, fontFamily: "'Fira Code','Cascadia Code',monospace", lineHeight: 1.3, textAlign: "left" }}>
                      {choice}
                    </span>
                    {selected !== null && isAns && <span style={{ fontSize: "15px" }}>✅</span>}
                    {selected !== null && isSel && !isAns && <span style={{ fontSize: "15px" }}>❌</span>}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExp && q?.explanation && selected !== "__TIMEOUT__" && (
              <div className="exp-enter" style={{ background: isCorrect ? "#f0fdf4" : "#fef2f2", border: `1.5px solid ${isCorrect ? "#86efac" : "#fecaca"}`, borderRadius: "12px", padding: "12px 14px", fontSize: "14px", color: isCorrect ? "#166534" : "#991b1b", lineHeight: 1.6, marginBottom: "12px" }}>
                <span style={{ fontWeight: "700", display: "block", marginBottom: "4px", fontSize: "13px", color: isCorrect ? "#15803d" : "#b91c1c" }}>
                  {isCorrect ? "✅ Correct!" : "❌ Incorrect!"}
                  {!isCorrect && (
                    <span style={{ color: "#15803d", marginLeft: "8px" }}>
                      Answer: <code style={{ fontFamily: "monospace", background: "#dcfce7", padding: "1px 6px", borderRadius: "4px" }}>{q.answer}</code>
                    </span>
                  )}
                </span>
                {q.explanation}
              </div>
            )}

            {/* Next button */}
            {selected !== null && (
              <div className="exp-enter" style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="next-btn" onClick={handleNext}
                  style={{ background: lvl.color, color: "#fff", border: "none", borderRadius: "12px", padding: "11px 22px", fontSize: "14px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", boxShadow: `0 4px 14px ${lvl.color}55`, transition: "opacity 0.15s, transform 0.1s" }}>
                  {current + 1 >= TOTAL_Q ? "See Result" : "Next"} →
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