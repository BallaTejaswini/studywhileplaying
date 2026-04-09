// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useState, useEffect, useCallback, useRef } from "react";
// import { updateGameStats } from "../utils/UpdateGameStats";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect,useCallback,useRef } from "react";
import { updateGameStats } from "../utils/UpdateGameStats";

// ─────────────────────────────────────────────────────────────────────────────
// QUESTION BANK
// ─────────────────────────────────────────────────────────────────────────────
const QUESTION_BANK = {
  python: {
    easy: [
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
    medium: [
      { q: "What does *args allow in a Python function?", options: ["Keyword arguments", "Variable positional args", "Default args", "No arguments"], answer: 1, explanation: "*args allows passing a variable number of positional arguments." },
      { q: "What is the output of [x*2 for x in range(3)]?", options: ["[1,2,3]", "[0,2,4]", "[2,4,6]", "[0,1,2]"], answer: 1, explanation: "range(3) gives 0,1,2 and each is multiplied by 2: [0,2,4]." },
      { q: "Which keyword is used to handle exceptions?", options: ["catch", "except", "error", "handle"], answer: 1, explanation: "Python uses 'except' to catch exceptions in try-except blocks." },
      { q: "What does enumerate() do?", options: ["Returns a list", "Yields index-value pairs", "Sorts items", "Filters items"], answer: 1, explanation: "enumerate() returns index-value pairs from an iterable." },
      { q: "What is a lambda function?", options: ["A class method", "An anonymous function", "A recursive function", "A built-in function"], answer: 1, explanation: "Lambda functions are small anonymous functions defined with the lambda keyword." },
      { q: "Which creates a set in Python?", options: ["[]", "{}", "set()", "Both B and C"], answer: 3, explanation: "set() creates an empty set; {} creates an empty dict." },
      { q: "What does 'pass' do in Python?", options: ["Exits the loop", "Does nothing (placeholder)", "Returns None", "Skips to next iteration"], answer: 1, explanation: "'pass' is a null statement used as a placeholder." },
      { q: "What is the output of 'hello'.upper()?", options: ["HELLO", "Hello", "hello", "hELLO"], answer: 0, explanation: "upper() converts all characters to uppercase." },
      { q: "What does **kwargs allow in a function?", options: ["Positional args", "Variable keyword args", "Default values", "No args"], answer: 1, explanation: "**kwargs lets you pass a variable number of keyword arguments." },
      { q: "What is the output of list(range(2, 8, 2))?", options: ["[2,4,6]", "[2,4,6,8]", "[2,3,4,5,6,7]", "[0,2,4,6]"], answer: 0, explanation: "range(2,8,2) starts at 2, ends before 8, steps by 2: [2,4,6]." },
    ],
    hard: [
      { q: "What is the time complexity of Python dict lookup?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: 2, explanation: "Python dicts use hash tables, giving average O(1) lookup." },
      { q: "What does @staticmethod do?", options: ["Binds to instance", "No access to cls/self", "Creates class var", "Makes method private"], answer: 1, explanation: "@staticmethod creates a method with no access to instance or class." },
      { q: "What is the output of bool([])?", options: ["True", "False", "None", "Error"], answer: 1, explanation: "Empty containers are falsy in Python, so bool([]) is False." },
      { q: "What does __init__ method do?", options: ["Destroys object", "Initializes object", "Copies object", "Imports module"], answer: 1, explanation: "__init__ is the constructor called when an object is created." },
      { q: "What is a generator in Python?", options: ["A list creator", "Uses yield keyword", "A class type", "A decorator"], answer: 1, explanation: "Generators use yield to produce values lazily one at a time." },
      { q: "What is the output of print(type(lambda x: x))?", options: ["<class 'function'>", "<class 'lambda'>", "<class 'method'>", "Error"], answer: 0, explanation: "Lambda functions are of type 'function' in Python." },
      { q: "Which method is called when an object is deleted?", options: ["__del__", "__remove__", "__destroy__", "__end__"], answer: 0, explanation: "__del__ is the destructor method called when an object is garbage collected." },
      { q: "What does zip() do?", options: ["Compresses files", "Combines iterables element-wise", "Sorts lists", "Flattens lists"], answer: 1, explanation: "zip() combines multiple iterables element-by-element into tuples." },
      { q: "What is MRO in Python?", options: ["Module Resolution Order", "Method Resolution Order", "Memory Resource Object", "Multiple Return Order"], answer: 1, explanation: "MRO determines the order in which methods are inherited." },
      { q: "What does the 'global' keyword do?", options: ["Creates a new global var", "References a variable in global scope", "Deletes a variable", "Imports globally"], answer: 1, explanation: "'global' declares that a variable inside a function refers to the global scope." },
    ],
  },
  java: {
    easy: [
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
    medium: [
      { q: "What is method overloading?", options: ["Same name, different params", "Overriding parent method", "Abstract method", "Static method"], answer: 0, explanation: "Overloading means multiple methods with same name but different parameters." },
      { q: "What does 'super' keyword do?", options: ["Accesses parent class members", "Creates object", "Calls interface", "Static access"], answer: 0, explanation: "'super' is used to access parent class methods and constructors." },
      { q: "What does 'abstract' class mean?", options: ["Cannot be instantiated", "Has no methods", "Is private", "Cannot inherit"], answer: 0, explanation: "An abstract class cannot be instantiated directly." },
      { q: "Which exception is thrown for array out of bounds?", options: ["IndexException", "ArrayException", "ArrayIndexOutOfBoundsException", "BoundsException"], answer: 2, explanation: "ArrayIndexOutOfBoundsException is thrown when accessing invalid array index." },
      { q: "What is autoboxing?", options: ["Auto import", "Primitive to wrapper conversion", "Array to list", "String to int"], answer: 1, explanation: "Autoboxing is the automatic conversion of primitive types to wrapper classes." },
      { q: "Which keyword implements an interface?", options: ["extends", "implements", "uses", "inherits"], answer: 1, explanation: "'implements' is used to implement an interface in Java." },
      { q: "What does 'this' keyword refer to?", options: ["Parent class", "Static method", "Current object instance", "Interface"], answer: 2, explanation: "'this' refers to the current instance of the class." },
      { q: "What is a constructor?", options: ["A return method", "A special initialization method", "A static field", "An interface"], answer: 1, explanation: "A constructor initializes a new object and has the same name as the class." },
      { q: "What is the difference between == and .equals()?", options: ["No difference", "== checks reference, .equals() checks value", "== checks value, .equals() checks reference", "Both check value"], answer: 1, explanation: "== checks reference equality; .equals() checks value/content equality." },
      { q: "What is a Java interface?", options: ["A class with fields", "A contract with abstract methods", "A static class", "An enum type"], answer: 1, explanation: "An interface defines a contract of methods that implementing classes must provide." },
    ],
    hard: [
      { q: "What is the difference between ArrayList and LinkedList?", options: ["No difference", "ArrayList uses dynamic array, LinkedList uses nodes", "LinkedList is faster for all ops", "ArrayList uses less memory always"], answer: 1, explanation: "ArrayList uses a dynamic array; LinkedList uses doubly-linked nodes." },
      { q: "What does volatile keyword do in Java?", options: ["Makes variable constant", "Ensures visibility across threads", "Prevents method override", "Marks deprecated code"], answer: 1, explanation: "volatile ensures that a variable's value is always read from main memory." },
      { q: "What is the purpose of 'synchronized'?", options: ["Speeds up code", "Prevents concurrent thread access", "Sorts collections", "Imports libraries"], answer: 1, explanation: "'synchronized' prevents multiple threads from accessing a block simultaneously." },
      { q: "What is a functional interface?", options: ["Interface with multiple methods", "Interface with exactly one abstract method", "Static interface", "Private interface"], answer: 1, explanation: "A functional interface has exactly one abstract method and can be used with lambdas." },
      { q: "What does Optional<T> solve?", options: ["Thread safety", "NullPointerException avoidance", "Type casting", "Memory leaks"], answer: 1, explanation: "Optional<T> is a container that may or may not contain a non-null value." },
      { q: "What is the difference between Heap and Stack memory?", options: ["No difference", "Stack for static, Heap for dynamic allocation", "Heap is faster", "Stack stores objects"], answer: 1, explanation: "Stack stores local variables/calls; Heap stores objects and class instances." },
      { q: "What is method hiding in Java?", options: ["Making method private", "Static method in child hides parent static", "Overriding abstract method", "Using final"], answer: 1, explanation: "When a child class defines a static method with same signature as parent, it hides it." },
      { q: "What is the diamond problem in Java?", options: ["Memory issue", "Ambiguity from multiple interface inheritance", "Null pointer issue", "Threading issue"], answer: 1, explanation: "Diamond problem occurs when a class inherits from two interfaces with same method." },
      { q: "What does Stream.collect() do?", options: ["Filters elements", "Accumulates stream into a collection", "Maps elements", "Sorts elements"], answer: 1, explanation: "collect() is a terminal operation that gathers stream elements into a collection." },
      { q: "What is a deadlock?", options: ["Memory overflow", "Two threads waiting for each other's locks", "CPU overload", "Null reference"], answer: 1, explanation: "Deadlock occurs when two threads hold locks the other needs, causing infinite wait." },
    ],
  },
  cpp: {
    easy: [
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
    medium: [
      { q: "What is function overloading in C++?", options: ["Same function in child class", "Multiple functions with same name, different params", "Virtual function", "Static function"], answer: 1, explanation: "Overloading allows multiple functions with same name but different parameters." },
      { q: "What is a virtual function?", options: ["A static function", "Overridden in derived class via vtable", "A constant function", "A constructor"], answer: 1, explanation: "Virtual functions enable runtime polymorphism using vtable." },
      { q: "What does 'this' pointer refer to?", options: ["Parent class", "Current object", "Static member", "Base class"], answer: 1, explanation: "'this' pointer points to the current object instance." },
      { q: "What is a reference variable in C++?", options: ["A pointer", "An alias for another variable", "A constant", "A global variable"], answer: 1, explanation: "A reference is an alias — another name for an existing variable." },
      { q: "What is the difference between struct and class in C++?", options: ["No difference", "Struct defaults to public, class to private", "Struct has no methods", "Class has no fields"], answer: 1, explanation: "The main difference is default access: struct is public, class is private." },
      { q: "What is copy constructor?", options: ["Creates from scratch", "Creates object as copy of existing object", "Copies pointers only", "A destructor variant"], answer: 1, explanation: "Copy constructor initializes a new object as a copy of an existing object." },
      { q: "What does 'inline' function do?", options: ["Runs async", "Suggests compiler to expand at call site", "Makes function static", "Marks recursive"], answer: 1, explanation: "inline suggests the compiler replace the function call with the function body." },
      { q: "What is a template in C++?", options: ["A design pattern", "Generic programming construct", "A header file", "A macro"], answer: 1, explanation: "Templates enable generic programming, allowing type-independent code." },
      { q: "What is operator overloading?", options: ["Overriding operators in derived class", "Defining custom behavior for operators", "Using two operators together", "Deleting operators"], answer: 1, explanation: "Operator overloading lets you define custom behavior for operators with user types." },
      { q: "What is RAII in C++?", options: ["Runtime Array Init", "Resource Acquisition Is Initialization", "Random Access Iterator", "Recursive Algorithm"], answer: 1, explanation: "RAII ties resource lifetime to object scope to prevent leaks." },
    ],
    hard: [
      { q: "What is a move constructor in C++11?", options: ["Copies object", "Transfers ownership of resources", "Creates const object", "Default constructor"], answer: 1, explanation: "Move constructor transfers resources from a temporary (rvalue) object efficiently." },
      { q: "What does std::unique_ptr provide?", options: ["Shared ownership", "Exclusive ownership of heap object", "Weak reference", "Raw pointer wrapper"], answer: 1, explanation: "unique_ptr enforces single ownership and auto-deletes on scope exit." },
      { q: "What is undefined behavior in C++?", options: ["Runtime error", "Code with no specified behavior by the standard", "Compile error", "Warning"], answer: 1, explanation: "UB means the standard places no requirements on what happens." },
      { q: "What is vtable in C++?", options: ["A variable table", "Table of virtual function pointers", "A memory table", "Hash table"], answer: 1, explanation: "vtable is a table of function pointers used for virtual dispatch." },
      { q: "What does constexpr mean?", options: ["Constant expression evaluated at compile time", "A const pointer", "A runtime constant", "A macro constant"], answer: 0, explanation: "constexpr means the value/function can be evaluated at compile time." },
      { q: "What is std::move()?", options: ["Moves file", "Casts to rvalue reference", "Copies an object", "Frees memory"], answer: 1, explanation: "std::move() casts an lvalue to rvalue reference to enable move semantics." },
      { q: "What is perfect forwarding?", options: ["Copying args", "Forwarding args preserving value category", "Returning references", "Template specialization"], answer: 1, explanation: "Perfect forwarding preserves lvalue/rvalue nature of arguments in templates." },
      { q: "What is CRTP?", options: ["A loop pattern", "Derived class as template arg to base", "Circular dependency", "A sorting algorithm"], answer: 1, explanation: "CRTP is when a class inherits from a template instantiation of itself." },
      { q: "What does 'noexcept' specifier do?", options: ["Prevents exceptions from propagating", "Catches all exceptions", "Throws exceptions", "Ignores exceptions"], answer: 0, explanation: "noexcept declares a function won't throw, enabling compiler optimizations." },
      { q: "What is std::shared_ptr's overhead vs raw pointer?", options: ["No overhead", "Reference count + control block", "Extra copy of object", "Extra vtable"], answer: 1, explanation: "shared_ptr has a control block with reference counts, adding heap overhead." },
    ],
  },
  c: {
    easy: [
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
    medium: [
      { q: "What is a pointer in C?", options: ["A variable storing value", "A variable storing memory address", "A function", "An array"], answer: 1, explanation: "A pointer stores the memory address of another variable." },
      { q: "What does malloc() do?", options: ["Frees memory", "Allocates memory on stack", "Allocates memory on heap", "Declares array"], answer: 2, explanation: "malloc() dynamically allocates a block of memory on the heap." },
      { q: "What is the difference between '.' and '->' operators?", options: ["No difference", ". for struct var, -> for struct pointer", "-> for struct var, . for pointer", ". for arrays only"], answer: 1, explanation: ". accesses struct members directly; -> accesses members through a pointer." },
      { q: "What does free() do?", options: ["Frees CPU", "Deallocates heap memory", "Resets variable", "Clears screen"], answer: 1, explanation: "free() releases memory previously allocated by malloc/calloc/realloc." },
      { q: "What is a typedef in C?", options: ["Type error", "Creates an alias for a type", "Defines a function", "A macro"], answer: 1, explanation: "typedef creates an alternative name (alias) for an existing data type." },
      { q: "What is a struct in C?", options: ["A function group", "A user-defined composite data type", "A pointer type", "A loop construct"], answer: 1, explanation: "struct groups multiple variables of different types under one name." },
      { q: "What does sizeof() return?", options: ["Value of variable", "Size in bytes", "Number of elements", "Memory address"], answer: 1, explanation: "sizeof() returns the size of a variable or type in bytes." },
      { q: "What is recursion?", options: ["A loop", "Function calling itself", "Multiple returns", "Global function"], answer: 1, explanation: "Recursion is when a function calls itself to solve a smaller subproblem." },
      { q: "What is a static variable in C?", options: ["Cannot change value", "Retains value between function calls", "Global variable", "Pointer variable"], answer: 1, explanation: "A static local variable retains its value between function invocations." },
      { q: "What is the purpose of extern keyword?", options: ["External library", "Declares variable defined elsewhere", "External function", "OS call"], answer: 1, explanation: "extern declares a variable that is defined in another file or scope." },
    ],
    hard: [
      { q: "What is a dangling pointer?", options: ["NULL pointer", "Pointer to freed/invalid memory", "Uninitialized pointer", "Void pointer"], answer: 1, explanation: "A dangling pointer points to memory that has been freed or gone out of scope." },
      { q: "What is a memory leak?", options: ["Stack overflow", "Allocated memory never freed", "Invalid pointer", "Buffer overflow"], answer: 1, explanation: "A memory leak occurs when dynamically allocated memory is never freed." },
      { q: "What does volatile keyword do in C?", options: ["Makes variable constant", "Prevents compiler from optimizing the variable", "Allocates in register", "Makes variable global"], answer: 1, explanation: "volatile tells the compiler the variable may change unexpectedly, preventing optimization." },
      { q: "What is a function pointer?", options: ["Pointer to return value", "Pointer storing address of a function", "Static function", "Recursive function"], answer: 1, explanation: "A function pointer stores the address of a function for indirect calls." },
      { q: "What is the difference between calloc() and malloc()?", options: ["No difference", "calloc zero-initializes memory, malloc doesn't", "malloc is faster always", "calloc is for arrays only"], answer: 1, explanation: "calloc allocates and zero-initializes memory; malloc allocates without initialization." },
      { q: "What is a buffer overflow?", options: ["Too much data for a buffer", "Buffer is empty", "Slow buffer read", "Buffer type mismatch"], answer: 0, explanation: "Buffer overflow occurs when data written exceeds the buffer's allocated size." },
      { q: "What is the difference between stack and heap in C?", options: ["No difference", "Stack is automatic/fast, heap is manual/flexible", "Heap is faster", "Stack is larger"], answer: 1, explanation: "Stack is managed automatically and fast; heap requires manual management but is flexible." },
      { q: "What does realloc() do?", options: ["Frees memory", "Resizes previously allocated memory", "Allocates new block", "Copies memory"], answer: 1, explanation: "realloc() resizes a previously allocated memory block." },
      { q: "What is a union in C?", options: ["Multiple structs merged", "All members share the same memory", "A typedef alias", "An enum type"], answer: 1, explanation: "A union's members share the same memory location; only one can hold a value at a time." },
      { q: "What is the purpose of #pragma once?", options: ["Optimization hint", "Prevents header file from being included multiple times", "Platform directive", "Debug mode"], answer: 1, explanation: "#pragma once ensures a header file is only included once during compilation." },
    ],
  },
  sql: {
    easy: [
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
    medium: [
      { q: "What is a JOIN in SQL?", options: ["Splits table", "Combines rows from two or more tables", "Deletes duplicate rows", "Creates new table"], answer: 1, explanation: "JOIN combines rows from multiple tables based on a related column." },
      { q: "What is the difference between INNER JOIN and LEFT JOIN?", options: ["No difference", "INNER returns matching rows; LEFT returns all left + matching right", "LEFT is faster", "INNER includes NULLs"], answer: 1, explanation: "INNER JOIN returns only matching rows; LEFT JOIN returns all left rows with matched right rows." },
      { q: "What does GROUP BY do?", options: ["Sorts rows", "Groups rows with same values for aggregation", "Filters groups", "Joins tables"], answer: 1, explanation: "GROUP BY groups rows with the same values so aggregate functions can be applied." },
      { q: "What is the difference between WHERE and HAVING?", options: ["No difference", "WHERE filters rows; HAVING filters groups", "HAVING is faster", "WHERE works after GROUP BY"], answer: 1, explanation: "WHERE filters individual rows; HAVING filters groups after GROUP BY." },
      { q: "What is a subquery?", options: ["A stored procedure", "A query nested inside another query", "A view", "A trigger"], answer: 1, explanation: "A subquery is a query embedded within another query." },
      { q: "What does COALESCE() do?", options: ["Counts non-null values", "Returns first non-null value in list", "Joins strings", "Rounds numbers"], answer: 1, explanation: "COALESCE() returns the first non-NULL value from its arguments." },
      { q: "What is a primary key?", options: ["First column", "Unique identifier for each row", "Foreign table link", "Auto-increment field"], answer: 1, explanation: "A primary key uniquely identifies each record in a table." },
      { q: "What is a foreign key?", options: ["Key from another database", "Column linking to primary key in another table", "Encrypted key", "Index key"], answer: 1, explanation: "A foreign key references the primary key of another table to enforce referential integrity." },
      { q: "What does UNION do?", options: ["Joins tables", "Combines results of two SELECT queries removing duplicates", "Creates intersection", "Merges columns"], answer: 1, explanation: "UNION combines result sets of two queries, removing duplicate rows." },
      { q: "What is an INDEX in SQL?", options: ["Row number", "Data structure that speeds up data retrieval", "Primary key", "Column alias"], answer: 1, explanation: "An index improves the speed of data retrieval operations on a table." },
    ],
    hard: [
      { q: "What is a CTE (Common Table Expression)?", options: ["A stored procedure", "A temporary named result set using WITH clause", "A permanent view", "A trigger"], answer: 1, explanation: "CTEs define temporary result sets referenced within a query using WITH." },
      { q: "What is a window function in SQL?", options: ["A JOIN type", "Performs calculation across related rows without grouping", "A subquery type", "A cursor"], answer: 1, explanation: "Window functions compute values across a set of rows related to the current row." },
      { q: "What does RANK() differ from ROW_NUMBER()?", options: ["No difference", "RANK() gives same rank to ties; ROW_NUMBER() is always unique", "ROW_NUMBER handles ties", "RANK is faster"], answer: 1, explanation: "RANK() assigns same rank to ties and skips numbers; ROW_NUMBER() is always sequential." },
      { q: "What is database normalization?", options: ["Sorting data", "Organizing data to reduce redundancy", "Indexing all columns", "Encrypting data"], answer: 1, explanation: "Normalization organizes tables to reduce data redundancy and improve integrity." },
      { q: "What is a deadlock in SQL?", options: ["Slow query", "Two transactions blocking each other", "NULL reference", "Index corruption"], answer: 1, explanation: "A deadlock occurs when two transactions wait for each other to release locks." },
      { q: "What is ACID in databases?", options: ["Query optimizer", "Atomicity, Consistency, Isolation, Durability", "A join type", "An index type"], answer: 1, explanation: "ACID properties guarantee reliable database transactions." },
      { q: "What does EXPLAIN do in SQL?", options: ["Shows table structure", "Shows query execution plan", "Explains error", "Describes columns"], answer: 1, explanation: "EXPLAIN shows how the database engine will execute a query." },
      { q: "What is a stored procedure?", options: ["A saved query result", "Precompiled set of SQL statements stored in database", "A view", "A trigger"], answer: 1, explanation: "A stored procedure is a precompiled collection of SQL statements saved in the database." },
      { q: "What is the difference between DELETE and TRUNCATE?", options: ["No difference", "DELETE logs each row; TRUNCATE is faster and unlogged", "TRUNCATE can use WHERE", "DELETE is faster"], answer: 1, explanation: "DELETE logs each row deletion and can use WHERE; TRUNCATE is a bulk operation." },
      { q: "What is a materialized view?", options: ["A regular view", "A view with physically stored results", "A temporary table", "An index"], answer: 1, explanation: "A materialized view stores the query result physically and refreshes periodically." },
    ],
  },
  dsa: {
    easy: [
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
    medium: [
      { q: "What is the time complexity of quicksort on average?", options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"], answer: 1, explanation: "Quicksort averages O(n log n) due to its divide-and-conquer partitioning." },
      { q: "What is a BST (Binary Search Tree)?", options: ["Any binary tree", "Binary tree where left < node < right", "Balanced binary tree", "A heap"], answer: 1, explanation: "In a BST, left subtree has smaller values and right subtree has larger values." },
      { q: "What is BFS (Breadth-First Search)?", options: ["Explores deepest node first", "Explores level by level using queue", "Uses recursion only", "Sorts graph"], answer: 1, explanation: "BFS explores all neighbors at the current level before moving deeper, using a queue." },
      { q: "What is DFS (Depth-First Search)?", options: ["Level-by-level traversal", "Explores as deep as possible before backtracking", "Uses a queue", "Finds shortest path"], answer: 1, explanation: "DFS explores as far as possible along each branch before backtracking." },
      { q: "What is a min-heap?", options: ["Largest element at root", "Smallest element always at root", "Sorted array", "Balanced BST"], answer: 1, explanation: "In a min-heap, the parent node is always smaller than or equal to its children." },
      { q: "What is dynamic programming?", options: ["Runtime code changes", "Solving problems by storing subproblem results", "Object-oriented design", "Recursive only"], answer: 1, explanation: "DP breaks problems into overlapping subproblems and stores results to avoid recomputation." },
      { q: "What is the time complexity of mergesort?", options: ["O(n²)", "O(n)", "O(n log n)", "O(log n)"], answer: 2, explanation: "Mergesort divides array in half recursively and merges, giving O(n log n) always." },
      { q: "What is a graph?", options: ["A tree with root", "Set of nodes (vertices) and edges", "A sorted list", "A hash table"], answer: 1, explanation: "A graph consists of vertices connected by edges, representing relationships." },
      { q: "What is a circular linked list?", options: ["Doubly linked list", "Last node points back to first node", "Sorted linked list", "Array-based list"], answer: 1, explanation: "In a circular linked list, the last node's next pointer points back to the head." },
      { q: "What is memoization?", options: ["Random storage", "Caching results of expensive function calls", "Sorting technique", "Memory allocation"], answer: 1, explanation: "Memoization stores previously computed results to avoid redundant calculations." },
    ],
    hard: [
      { q: "What is the time complexity of Dijkstra's algorithm with min-heap?", options: ["O(V²)", "O((V + E) log V)", "O(E log E)", "O(V log E)"], answer: 1, explanation: "With a min-heap, Dijkstra runs in O((V + E) log V) where V=vertices, E=edges." },
      { q: "What is a Red-Black Tree?", options: ["A type of BST", "Self-balancing BST with color properties", "A heap", "A trie"], answer: 1, explanation: "Red-Black Tree is a self-balancing BST ensuring O(log n) operations via color rules." },
      { q: "What is the difference between Prim's and Kruskal's algorithm?", options: ["No difference", "Prim grows MST from vertex; Kruskal adds cheapest global edge", "Kruskal is always faster", "Prim works on directed graphs"], answer: 1, explanation: "Prim's grows MST one vertex at a time; Kruskal's sorts all edges and adds cheapest valid one." },
      { q: "What is amortized time complexity?", options: ["Average of all runs", "Average per operation over a sequence of operations", "Best case complexity", "Space complexity"], answer: 1, explanation: "Amortized analysis gives the average cost per operation over a sequence of operations." },
      { q: "What is a Trie data structure used for?", options: ["Sorting numbers", "Efficient string search and prefix matching", "Graph traversal", "Hashing"], answer: 1, explanation: "A Trie (prefix tree) stores strings character-by-character for fast prefix searches." },
      { q: "What is the Bellman-Ford algorithm used for?", options: ["MST finding", "Shortest path with negative edge weights", "Topological sort", "BFS optimization"], answer: 1, explanation: "Bellman-Ford finds shortest paths from a source, handling negative edge weights." },
      { q: "What is a segment tree?", options: ["A BST", "Tree for range queries and updates in O(log n)", "A heap variant", "A balanced tree"], answer: 1, explanation: "Segment trees answer range queries (sum, min, max) and point updates in O(log n)." },
      { q: "What is topological sort?", options: ["Alphabetical sort", "Linear ordering of DAG vertices respecting dependencies", "BFS sort", "Quicksort variant"], answer: 1, explanation: "Topological sort orders vertices of a DAG so each edge goes from earlier to later vertex." },
      { q: "What is the NP-Complete problem class?", options: ["Problems solved in O(n)", "Problems verifiable in polynomial time, not known to be solved in polynomial time", "Unsolvable problems", "O(log n) problems"], answer: 1, explanation: "NP-Complete problems are in NP and as hard as any NP problem; no known polynomial solution." },
      { q: "What is a Fenwick Tree (Binary Indexed Tree)?", options: ["A BST variant", "Data structure for prefix sum queries and updates in O(log n)", "A heap", "A trie"], answer: 1, explanation: "Fenwick Tree supports prefix sum queries and point updates both in O(log n) with low overhead." },
    ],
  },
  web: {
    easy: [
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
    medium: [
      { q: "What is the CSS Box Model?", options: ["3D layout system", "Content, padding, border, margin layers", "Grid system", "Flexbox model"], answer: 1, explanation: "The Box Model describes content + padding + border + margin structure of elements." },
      { q: "What does 'position: absolute' do in CSS?", options: ["Sticks to viewport", "Positions relative to nearest positioned ancestor", "Stays in flow", "Centres element"], answer: 1, explanation: "absolute positioning places element relative to its nearest positioned ancestor." },
      { q: "What is an event listener in JavaScript?", options: ["A CSS rule", "A function that responds to user events", "An HTML attribute", "A server request"], answer: 1, explanation: "Event listeners wait for specific events and execute callback functions." },
      { q: "What does 'async/await' do in JavaScript?", options: ["Synchronous code", "Handles asynchronous operations cleanly", "Multi-threading", "Error handling"], answer: 1, explanation: "async/await simplifies working with Promises, making async code look synchronous." },
      { q: "What is the DOM?", options: ["Data Object Method", "Document Object Model — tree of HTML elements", "Default Output Mode", "Dynamic Object Map"], answer: 1, explanation: "DOM is a programming interface representing HTML as a tree of objects." },
      { q: "What does localStorage do?", options: ["Server-side storage", "Stores data in browser with no expiry", "Session-only storage", "Cookie storage"], answer: 1, explanation: "localStorage stores key-value pairs in the browser persistently." },
      { q: "What is Flexbox?", options: ["A JavaScript library", "CSS layout model for flexible containers", "An HTML element", "A grid system"], answer: 1, explanation: "Flexbox is a CSS layout module for distributing space in a container." },
      { q: "What is a media query?", options: ["An API request", "CSS rule applied based on screen size/device", "A JavaScript event", "A database query"], answer: 1, explanation: "Media queries apply CSS rules conditionally based on device characteristics." },
      { q: "What does 'let' vs 'var' differ in JavaScript?", options: ["No difference", "let is block-scoped; var is function-scoped", "var is newer", "let allows redeclaration"], answer: 1, explanation: "let has block scope; var has function scope and is hoisted." },
      { q: "What is the purpose of the 'alt' attribute in <img>?", options: ["Image title", "Alternative text for accessibility/broken image", "Image URL", "Image size"], answer: 1, explanation: "alt provides alternative text when the image cannot be displayed." },
    ],
    hard: [
      { q: "What is the Critical Rendering Path?", options: ["Server routing", "Steps browser takes to render a page", "Network latency", "JavaScript execution"], answer: 1, explanation: "The Critical Rendering Path is the sequence of steps to convert HTML/CSS/JS into pixels." },
      { q: "What is a Service Worker?", options: ["Backend server", "Script running in background for offline/caching", "CSS worker", "Web socket"], answer: 1, explanation: "Service Workers run in background, enabling offline capabilities and push notifications." },
      { q: "What is CORS?", options: ["CSS Framework", "Cross-Origin Resource Sharing — controls cross-domain requests", "A caching policy", "A routing method"], answer: 1, explanation: "CORS is a browser security mechanism controlling cross-origin HTTP requests." },
      { q: "What is the difference between repaint and reflow?", options: ["No difference", "Reflow recalculates layout; repaint redraws visuals only", "Repaint is slower", "Reflow only affects CSS"], answer: 1, explanation: "Reflow recalculates geometry/layout; repaint redraws visual changes without layout changes." },
      { q: "What is Content Security Policy (CSP)?", options: ["A CSS rule", "HTTP header preventing XSS attacks", "Browser storage policy", "A routing policy"], answer: 1, explanation: "CSP is an HTTP header that restricts which resources a page can load, preventing XSS." },
      { q: "What is the Virtual DOM in React?", options: ["A server DOM", "In-memory representation of real DOM for efficient updates", "A CSS feature", "A browser API"], answer: 1, explanation: "Virtual DOM is a lightweight JS representation of the real DOM for efficient diffing." },
      { q: "What is code splitting?", options: ["Splitting CSS files", "Breaking JS bundle into smaller chunks loaded on demand", "Dividing components", "Server-side rendering"], answer: 1, explanation: "Code splitting breaks large bundles into smaller chunks for faster initial load." },
      { q: "What is Web Accessibility (a11y)?", options: ["Mobile design", "Making web content usable by people with disabilities", "Performance optimization", "SEO practice"], answer: 1, explanation: "Web accessibility ensures websites are usable by people with various disabilities." },
      { q: "What is the difference between SSR and CSR?", options: ["No difference", "SSR renders on server; CSR renders in browser", "CSR is faster always", "SSR uses React only"], answer: 1, explanation: "SSR sends complete HTML from server; CSR renders content in the browser via JS." },
      { q: "What is tree shaking?", options: ["DOM manipulation", "Removing unused code from JS bundle", "CSS purging", "Lazy loading"], answer: 1, explanation: "Tree shaking eliminates dead/unused code during the build process." },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const languageLabels = {
  python: "Python", c: "C", cpp: "C++",
  java: "Java", sql: "SQL", web: "Web Dev",
  webdev: "Web Dev", dsa: "DSA",
};

// ✅ FIX: normalize any langId alias to the correct QUESTION_BANK key
function normalizeLangId(id) {
  if (!id) return id;
  const map = { webdev: "web" };
  return map[id.toLowerCase()] ?? id.toLowerCase();
}

const levelConfig = {
  easy:   { label: "Easy",   color: "#7C3AED", lives: 3, timeLimit: 30 },
  medium: { label: "Medium", color: "#D97706", lives: 3, timeLimit: 20 },
  hard:   { label: "Hard",   color: "#DC2626", lives: 3, timeLimit: 15 },
};

const PASS_SCORE = 8;
const TOTAL_Q   = 10;
const LETTERS   = ["A", "B", "C", "D"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function fetchFromAPI(language, level) {
  const prompt = `Generate exactly 10 multiple choice questions for a coding quiz.
Language/Topic: ${language}
Difficulty: ${level}
Rules: each question about ${language}, 4 options, 1 correct answer (0-based index), brief explanation.
Return ONLY valid JSON array, no markdown:
[{"q":"...","options":["A","B","C","D"],"answer":0,"explanation":"..."}]`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
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
const QuizGame = () => {
  const navigate = useNavigate();
  const { gameId, langId: rawLangId, level } = useParams();
  const { user } = useAuth();

  // ✅ FIX: normalize langId so "webdev" → "web", etc.
  const langId = normalizeLangId(rawLangId);

  // ── Pass & Play state ──────────────────────────────────────────────────────
  const location = useLocation();
  const { passAndPlay, player1, player2 } = location.state || {};
  const playerNames   = [player1 || "Player 1", player2 || "Player 2"];
  const playerColors  = ["#7C3AED", "#0891b2"];
  const [pnpScores,   setPnpScores]   = useState([0, 0]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [showHandoff, setShowHandoff] = useState(false);
  const [nextTurnIdx, setNextTurnIdx] = useState(1);

  const lang = languageLabels[langId] ?? langId;
  const lvl  = levelConfig[level] ?? levelConfig.easy;

  const [phase,     setPhase]     = useState("loading");
  const [questions, setQuestions] = useState([]);
  const [current,   setCurrent]   = useState(0);
  const [selected,  setSelected]  = useState(null);
  const [lives,     setLives]     = useState(lvl.lives);
  const [score,     setScore]     = useState(0);
  const [wrong,     setWrong]     = useState(0);
  const [showExp,   setShowExp]   = useState(false);
  const [animKey,   setAnimKey]   = useState(0);
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
            if (next === 0) setTimeout(() => setPhase("gameover"), 1600);
            return next;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return clearTimer;
  }, [phase, selected, timedOut, current, showHandoff]);

  useEffect(() => { if (selected !== null) clearTimer(); }, [selected]);
  useEffect(() => () => clearTimer(), []);

  const loadQuestions = useCallback(async () => {
    setPhase("loading");
    clearTimer();
    const bank = QUESTION_BANK[langId]?.[level];

    if (bank && bank.length >= TOTAL_Q) {
      setQuestions(shuffle(bank).slice(0, TOTAL_Q));
    } else {
      try {
        const qs = await fetchFromAPI(lang, level);
        setQuestions(qs.slice(0, TOTAL_Q));
      } catch {
        setQuestions(shuffle(bank ?? []).slice(0, TOTAL_Q));
      }
    }

    setCurrent(0); setSelected(null); setShowExp(false);
    setLives(lvl.lives); setScore(0); setWrong(0);
    setPnpScores([0, 0]); setCurrentTurn(0);
    setAnimKey(k => k + 1);
    resetTimer();
    setPhase("quiz");
  }, [langId, level, lang, lvl.lives, resetTimer]);

  useEffect(() => { loadQuestions(); }, [loadQuestions]);

  const q        = questions[current];
  const progress = questions.length ? (current / TOTAL_Q) * 100 : 0;
  const answered = selected !== null || timedOut;
  const isCorrect = selected !== null && selected === q?.answer;

  const handleAnswer = (idx) => {
    if (answered || !q) return;
    clearTimer();
    setSelected(idx);
    setShowExp(true);

    if (idx === q.answer) {
      setScore(s => s + 1);
      if (passAndPlay) {
        setPnpScores(s => { const ns = [...s]; ns[currentTurn] += 1; return ns; });
      }
    } else {
      setWrong(w => w + 1);
      setLives(l => {
        const next = l - 1;
        if (next === 0) setTimeout(() => setPhase("gameover"), 1600);
        return next;
      });
    }
  };

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
    setAnimKey(k => k + 1);
    resetTimer();
  };

  const continueAfterHandoff = () => {
    setCurrentTurn(nextTurnIdx);
    setCurrent(c => c + 1);
    setSelected(null);
    setShowExp(false);
    setShowHandoff(false);
    setAnimKey(k => k + 1);
    resetTimer();
  };

  const restart = () => loadQuestions();

  // ── Style helpers ──────────────────────────────────────────────────────────
  const endPageWrap  = { minHeight: "100vh", background: "#F5F0EB", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" };
  const endCardStyle = { background: "#FFF", border: "1px solid #E8E2DA", borderRadius: "20px", padding: "40px 28px", textAlign: "center", width: "100%", maxWidth: "420px" };
  const scoreCircle  = (c) => ({ width: "96px", height: "96px", borderRadius: "50%", border: `4px solid ${c}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", background: "#FAFAF8" });
  const btnPrimary   = (c) => ({ background: c, color: "#FFF", border: "none", borderRadius: "12px", padding: "13px 24px", fontSize: "15px", fontWeight: "700", cursor: "pointer", flex: "1 1 auto", minWidth: "120px" });
  const btnSecondary = { background: "#F5F0EB", color: "#4A4540", border: "1.5px solid #DDD7CE", borderRadius: "12px", padding: "13px 20px", fontSize: "14px", fontWeight: "600", cursor: "pointer", flex: "1 1 auto", minWidth: "120px" };
  const btnGroup     = { display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" };

  // ── LOADING ────────────────────────────────────────────────────────────────
  if (phase === "loading") return (
    <div style={{ minHeight: "100vh", background: "#F5F0EB", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width: "44px", height: "44px", borderRadius: "50%", border: "4px solid #EDE8E1", borderTopColor: lvl.color, animation: "spin 0.85s linear infinite", marginBottom: "16px" }} />
      <p style={{ color: lvl.color, fontWeight: "700", fontSize: "15px" }}>Loading {lvl.label} questions…</p>
    </div>
  );

  // ── HANDOFF SCREEN (Pass & Play) ───────────────────────────────────────────
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

  // ── GAME OVER ──────────────────────────────────────────────────────────────
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
          <button style={btnSecondary} onClick={() => navigate(passAndPlay ? "/pass-and-play" : `/games/${gameId}/level/${rawLangId}`)}>← Back</button>
        </div>
      </div>
    </div>
  );

  // ── RESULT ─────────────────────────────────────────────────────────────────
  if (phase === "result") {
    // ✅ Update Firestore stats on game completion (solo only)
    if (user && !passAndPlay) {
      updateGameStats(user.uid, score).catch(console.error);
    }

    // Pass & Play result
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

    // Solo result
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
            {passed && nextLevel && <button style={btnPrimary(lvl.color)} onClick={() => navigate(`/games/${gameId}/play/${rawLangId}/${nextLevel}`)}>Next Level →</button>}
            {passed && !nextLevel && <button style={btnPrimary("#7C3AED")} onClick={() => navigate("/games")}>🎯 All Games</button>}
            <button style={btnSecondary} onClick={() => navigate(`/games/${gameId}/level/${rawLangId}`)}>← Change Level</button>
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ ───────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes spin        { to { transform:rotate(360deg); } }
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
        .opt-hover:hover:not(:disabled) { transform:translateX(4px); border-color:#C4BADF !important; }
        .next-hover:hover  { opacity:0.88; }
        .next-hover:active { transform:scale(0.97); }
        .exit-hover:hover  { background:#EDE8E1 !important; }
        @media(max-width:600px){
          .q-text-resp{font-size:15px!important}
          .opt-text-resp{font-size:14px!important}
          .content-resp{padding:14px 12px 40px!important}
          .topbar-resp{padding:8px 12px!important;gap:8px!important}
          .q-card-resp{padding:16px 14px 14px!important}
          .score-lbl-resp{font-size:9px!important}
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#F5F0EB", fontFamily: "'Segoe UI','Inter',system-ui,sans-serif", display: "flex", flexDirection: "column" }}>

        {/* TOP BAR */}
        <div className="topbar-resp" style={{ background: "#FFF", borderBottom: "1px solid #E8E2DA", padding: "10px 20px", display: "flex", alignItems: "center", gap: "12px", position: "sticky", top: 0, zIndex: 10 }}>
          <button className="exit-hover" onClick={() => navigate(passAndPlay ? "/pass-and-play" : `/games/${gameId}/level/${rawLangId}`)}
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
        <div className="content-resp" style={{ flex: 1, width: "100%", maxWidth: "680px", margin: "0 auto", padding: "20px 16px 48px" }}>

          {/* Meta row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#8B7FB8" }}>
              Quiz Master • {lang} • {lvl.label}
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
            {timedOut && (
              <div className="exp-enter timed-out-shake" style={{ background: "#FEF3C7", border: "1.5px solid #FCD34D", borderRadius: "12px", padding: "11px 16px", fontSize: "14px", color: "#92400E", marginBottom: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "20px" }}>⏰</span>
                Time's up! Correct answer:&nbsp;
                <span style={{ background: "#FDE68A", padding: "2px 8px", borderRadius: "6px", fontWeight: "800" }}>
                  {q?.options?.[q?.answer]}
                </span>
              </div>
            )}

            <div className="q-card-resp" style={{ background: "#FFF", border: "1px solid #E8E2DA", borderRadius: "16px", padding: "22px 20px 20px", marginBottom: "14px" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#A09890", textTransform: "uppercase", marginBottom: "10px", display: "block" }}>
                Choose the correct answer:
              </span>
              <p className="q-text-resp" style={{ fontSize: "18px", fontWeight: "700", color: "#1C1814", lineHeight: 1.55, margin: 0 }}>
                {q?.q}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "14px" }}>
              {q?.options.map((opt, i) => {
                const isAns = i === q.answer, isSel = i === selected;
                let bg = "#FFF", border = "#E8E2DA", txtClr = "#1C1814";
                let letBg = "#F5F0EB", letClr = "#6B6560", letBorder = "#DDD7CE";
                if (answered) {
                  if (isAns)      { bg = "#F0FDF4"; border = "#86EFAC"; txtClr = "#166534"; letBg = "#DCFCE7"; letClr = "#15803D"; letBorder = "#86EFAC"; }
                  else if (isSel) { bg = "#FEF2F2"; border = "#FECACA"; txtClr = "#991B1B"; letBg = "#FEE2E2"; letClr = "#B91C1C"; letBorder = "#FECACA"; }
                  else            { bg = "#FAFAF8"; border = "#EDE8E1"; txtClr = "#C0B8B0"; letClr = "#C0B8B0"; }
                }
                return (
                  <button key={i} className="opt-hover" disabled={answered} onClick={() => handleAnswer(i)}
                    style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", background: bg, border: `1.5px solid ${border}`, borderRadius: "14px", cursor: answered ? "default" : "pointer", width: "100%", textAlign: "left", transition: "transform 0.15s,border-color 0.15s,background 0.15s" }}>
                    <span style={{ width: "32px", height: "32px", borderRadius: "50%", border: `1.5px solid ${letBorder}`, background: letBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", color: letClr, flexShrink: 0 }}>
                      {LETTERS[i]}
                    </span>
                    <span className="opt-text-resp" style={{ flex: 1, fontSize: "15px", fontWeight: "500", color: txtClr, lineHeight: 1.45 }}>
                      {opt}
                    </span>
                    {answered && isAns && <span style={{ fontSize: "18px", flexShrink: 0 }}>✅</span>}
                    {answered && isSel && !isAns && <span style={{ fontSize: "18px", flexShrink: 0 }}>❌</span>}
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

export default QuizGame;