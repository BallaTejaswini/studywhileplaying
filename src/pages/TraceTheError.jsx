
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useCallback, useRef } from "react";
import { updateGameStats } from "../utils/UpdateGameStats";


// ── COMPLETE QUESTION BANK FOR ALL LANGUAGES ──────────────────────────────────
const QUESTION_BANK = {
  python: {
    easy: [
      { code: `def greet(name)\n    print("Hello", name)`, error: "Missing colon after function definition", options: ["Missing colon after def greet(name)", "Wrong quotes used", "print should be return", "name is not defined"], answer: 0, explanation: "Python function definitions must end with a colon ':'." },
      { code: `x = 10\nif x > 5\n    print("big")`, error: "Missing colon after if condition", options: ["Missing colon after if x > 5", "x is not defined", "Wrong indentation", "print is not a function"], answer: 0, explanation: "if statements in Python must end with a colon ':'." },
      { code: `fruits = ["apple", "banana", "mango"\nprint(fruits)`, error: "Missing closing bracket", options: ["Missing ] to close the list", "fruits is not defined", "print needs parentheses", "Wrong quotes"], answer: 0, explanation: "The list is missing its closing square bracket ]." },
      { code: `for i in range(5)\n    print(i)`, error: "Missing colon after for loop", options: ["Missing colon after range(5)", "range is not defined", "i is not defined", "print is wrong"], answer: 0, explanation: "for loops in Python must end with a colon ':'." },
      { code: `print("Hello World"`, error: "Missing closing parenthesis", options: ["Missing closing parenthesis )", "Missing closing quote", "print is not defined", "Hello is not defined"], answer: 0, explanation: "print() is missing its closing parenthesis." },
      { code: `age = input("Enter age: ")\nif age > 18:\n    print("Adult")`, error: "Comparing string to int", options: ["input() returns string, can't compare with >", "if syntax is wrong", "print is wrong", "age is not defined"], answer: 0, explanation: "input() returns a string. You need int(input()) to compare with a number." },
      { code: `def add(a, b):\nreturn a + b`, error: "Missing indentation", options: ["return must be indented inside def", "return is wrong keyword", "a + b is wrong", "def syntax is wrong"], answer: 0, explanation: "The return statement must be indented to be inside the function body." },
      { code: `x = 5\nprint(X)`, error: "Variable name case mismatch", options: ["X is not defined, variable is x (lowercase)", "print is wrong", "5 is not valid", "x needs quotes"], answer: 0, explanation: "Python is case-sensitive. 'x' and 'X' are different variables." },
      { code: `nums = [1, 2, 3]\nprint(nums[3])`, error: "Index out of range", options: ["Index 3 is out of range, list has indices 0-2", "nums is not defined", "print is wrong", "List needs more items"], answer: 0, explanation: "A list of 3 elements has indices 0, 1, 2. Index 3 doesn't exist." },
      { code: `print("Result: " + 42)`, error: "Cannot concatenate string and int", options: ["Cannot concatenate str and int directly", "print is wrong", "42 is not valid", "Result is not defined"], answer: 0, explanation: "You can't use + to join a string and integer. Use str(42) or f-strings." },
    ],
    medium: [
      { code: `def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n)`, error: "Infinite recursion", options: ["Should be factorial(n-1) not factorial(n)", "return is wrong", "if syntax is wrong", "n is not defined"], answer: 0, explanation: "factorial(n) calls itself with the same n, causing infinite recursion. Should be factorial(n-1)." },
      { code: `my_dict = {"a": 1, "b": 2}\nprint(my_dict["c"])`, error: "KeyError", options: ["Key 'c' does not exist in the dictionary", "dict syntax is wrong", "print is wrong", "my_dict is not defined"], answer: 0, explanation: "Accessing a key that doesn't exist raises a KeyError. Use .get('c') to avoid this." },
      { code: `class Dog:\n    def bark(self):\n        print("Woof!")\n\ndog = Dog\ndog.bark()`, error: "Class not instantiated", options: ["Dog should be Dog() with parentheses to create instance", "bark is wrong", "print is wrong", "self is not needed"], answer: 0, explanation: "Dog creates a reference to the class. Dog() creates an instance of the class." },
      { code: `with open("file.txt", "r") as f:\n    data = f.read()\nprint(f.read())`, error: "File used outside with block", options: ["f is closed after with block ends", "open is wrong", "data is not used", "read() is wrong"], answer: 0, explanation: "The file is automatically closed when the with block ends. f.read() outside fails." },
      { code: `result = []\nfor i in range(5):\n    result.append(i*2)\n    return result`, error: "return outside function", options: ["return cannot be used outside a function", "append is wrong", "range is wrong", "result is not defined"], answer: 0, explanation: "return can only be used inside a function definition, not in a bare loop." },
      { code: `x = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)`, error: "Unexpected mutation of original list", options: ["y = x copies reference, not value — both point to same list", "append is wrong", "print is wrong", "x is not defined"], answer: 0, explanation: "y = x doesn't copy the list, it copies the reference. Modifying y also modifies x." },
      { code: `import math\nprint(Math.sqrt(16))`, error: "Wrong module name case", options: ["Should be math.sqrt not Math.sqrt", "sqrt is wrong", "16 is wrong", "import is wrong"], answer: 0, explanation: "Python is case-sensitive. The module is imported as 'math', not 'Math'." },
      { code: `try:\n    x = int("abc")\nexcept:\n    pass\nprint(x)`, error: "x may be undefined if exception occurs", options: ["x is never assigned if exception is caught", "int is wrong", "pass is wrong", "try syntax is wrong"], answer: 0, explanation: "If the exception is raised, x never gets assigned. print(x) would fail with NameError." },
      { code: `def greet(name="World", greeting):\n    print(greeting, name)`, error: "Non-default argument follows default argument", options: ["Default argument must come after non-default args", "print is wrong", "greeting is wrong", "def syntax is wrong"], answer: 0, explanation: "In Python, parameters with defaults must come after parameters without defaults." },
      { code: `numbers = [3, 1, 4, 1, 5]\nnumbers.sort()\nprint(numbers[0])\nnumbers = sorted(numbers, reverse=True)`, error: "Logic error — wrong sorted order expected", options: ["sort() modifies in-place but sorted() creates new list — original sort lost", "sort is wrong", "reverse is wrong", "print is wrong"], answer: 0, explanation: "sort() modifies in-place. sorted() returns new list. Reassigning loses the in-place sort result." },
    ],
    hard: [
      { code: `def make_list(val, lst=[]):\n    lst.append(val)\n    return lst\n\nprint(make_list(1))\nprint(make_list(2))`, error: "Mutable default argument", options: ["Default list [] is shared across all calls", "append is wrong", "return is wrong", "val is not defined"], answer: 0, explanation: "Mutable default args are created once. Each call shares the same list, giving [1] then [1,2]." },
      { code: `gen = (x for x in range(5))\nlist(gen)\nprint(list(gen))`, error: "Generator exhausted", options: ["Generator is exhausted after first list() call", "range is wrong", "print is wrong", "gen is not defined"], answer: 0, explanation: "Generators can only be iterated once. After list(gen), the generator is exhausted." },
      { code: `x = 10\ndef foo():\n    print(x)\n    x = 20\nfoo()`, error: "UnboundLocalError", options: ["x = 20 makes x local, so print(x) before assignment fails", "print is wrong", "x = 10 is wrong", "def syntax is wrong"], answer: 0, explanation: "Python sees x = 20 inside foo and treats x as local. Reading it before assignment raises UnboundLocalError." },
      { code: `data = {"key": "value"}\nfor k, v in data:\n    print(k, v)`, error: "Iterating dict directly gives keys only", options: ["Should use data.items() to unpack key-value pairs", "print is wrong", "data is wrong", "for syntax is wrong"], answer: 0, explanation: "Iterating a dict directly yields only keys. Use data.items() to get key-value pairs." },
      { code: `result = filter(lambda x: x > 0, [-1, 2, -3, 4])\nprint(result[0])`, error: "filter returns iterator, not list", options: ["filter() returns an iterator, not subscriptable", "lambda is wrong", "print is wrong", "filter is wrong"], answer: 0, explanation: "filter() returns an iterator in Python 3. Use list(filter(...)) first to index it." },
      { code: `async def fetch():\n    return 42\n\nresult = fetch()\nprint(result)`, error: "Coroutine not awaited", options: ["fetch() returns coroutine object, not 42 — must await it", "return is wrong", "print is wrong", "async is wrong"], answer: 0, explanation: "Calling an async function returns a coroutine object. You must await it to get the value." },
      { code: `from copy import copy\nlst = [[1, 2], [3, 4]]\nlst2 = copy(lst)\nlst2[0].append(99)\nprint(lst[0])`, error: "Shallow copy doesn't deep copy nested lists", options: ["copy() is shallow — nested lists are still shared references", "copy is wrong", "append is wrong", "print is wrong"], answer: 0, explanation: "copy() creates a shallow copy. The inner lists are still shared, so lst[0] is also modified." },
      { code: `import os\npath = os.path.join("home", "user", "file.txt")\nprint(path.split("/")[2])`, error: "OS-dependent path separator", options: ["os.path.join uses \\\\ on Windows, split('/') fails", "join is wrong", "print is wrong", "split is wrong"], answer: 0, explanation: "os.path.join uses \\ on Windows. Splitting by '/' is not portable. Use os.path.split instead." },
      { code: `class Counter:\n    count = 0\n    def increment(self):\n        self.count += 1\n\na = Counter()\nb = Counter()\na.increment()\nprint(b.count)`, error: "Class vs instance variable confusion", options: ["self.count creates instance var, b.count still reads class var 0", "increment is wrong", "count is wrong", "class syntax is wrong"], answer: 0, explanation: "self.count += 1 creates an instance variable on 'a'. 'b' still reads the class variable which is 0." },
      { code: `import threading\ncount = 0\ndef increment():\n    global count\n    count += 1\nthreads = [threading.Thread(target=increment) for _ in range(100)]\nfor t in threads: t.start()\nfor t in threads: t.join()\nprint(count)`, error: "Race condition", options: ["count += 1 is not atomic — threads may overwrite each other", "threading is wrong", "global is wrong", "join is wrong"], answer: 0, explanation: "count += 1 is read-modify-write, not atomic. Concurrent threads cause race conditions." },
    ],
  },

  c: {
    easy: [
      { code: `#include <stdio.h>\nint main() {\n    printf("Hello World")\n    return 0;\n}`, error: "Missing semicolon after printf", options: ["Missing semicolon after printf statement", "printf is wrong", "#include is wrong", "return is wrong"], answer: 0, explanation: "Every statement in C must end with a semicolon ';'." },
      { code: `#include <stdio.h>\nint main() {\n    int x = 10\n    printf("%d", x);\n    return 0;\n}`, error: "Missing semicolon after variable declaration", options: ["Missing semicolon after int x = 10", "int is wrong type", "printf format is wrong", "return is wrong"], answer: 0, explanation: "Variable declarations in C must end with a semicolon." },
      { code: `#include <stdio.h>\nint main() {\n    int arr[3] = {1, 2, 3};\n    printf("%d", arr[3]);\n    return 0;\n}`, error: "Array index out of bounds", options: ["arr[3] is out of bounds, valid indices are 0-2", "arr declaration is wrong", "printf format is wrong", "int is wrong"], answer: 0, explanation: "Array arr[3] has indices 0, 1, 2. Accessing index 3 is undefined behavior." },
      { code: `#include <stdio.h>\nvoid greet() {\n    printf("Hi!");\n}\nint main() {\n    greet;\n    return 0;\n}`, error: "Function called without parentheses", options: ["greet should be greet() to call the function", "void is wrong", "printf is wrong", "return is wrong"], answer: 0, explanation: "In C, 'greet' without () is just a reference to the function, not a call." },
      { code: `#include <stdio.h>\nint main() {\n    int x;\n    printf("%d", x);\n    return 0;\n}`, error: "Uninitialized variable used", options: ["x is declared but never initialized — undefined behavior", "int is wrong", "printf is wrong", "return is wrong"], answer: 0, explanation: "Using an uninitialized variable in C leads to undefined behavior." },
      { code: `#include <stdio.h>\nint main() {\n    float pi = 3.14;\n    printf("%d", pi);\n    return 0;\n}`, error: "Wrong format specifier for float", options: ["Use %f for float, not %d (which is for int)", "float is wrong", "pi value is wrong", "printf is wrong"], answer: 0, explanation: "%d is for integers. Use %f for float values." },
      { code: `#include <stdio.h>\nint main() {\n    int x = 5;\n    if (x = 10) {\n        printf("ten");\n    }\n    return 0;\n}`, error: "Assignment instead of comparison", options: ["Use == for comparison, = assigns value", "int is wrong", "printf is wrong", "if syntax is wrong"], answer: 0, explanation: "x = 10 assigns 10 to x (always true). Use x == 10 to compare." },
      { code: `#include <stdio.h>\nint add(int a, int b) {\n    return a + b;\n}\nint main() {\n    printf("%d", add(3));\n    return 0;\n}`, error: "Wrong number of arguments", options: ["add() requires 2 arguments, only 1 passed", "int is wrong", "return is wrong", "printf is wrong"], answer: 0, explanation: "The function add(int a, int b) requires two arguments but only one was provided." },
      { code: `#include <stdio.h>\nint main() {\n    char name = "Alice";\n    printf("%s", name);\n    return 0;\n}`, error: "char cannot hold a string", options: ["Use char name[] or char* name for strings, not char", "printf is wrong", "Alice needs escaping", "printf format is wrong"], answer: 0, explanation: "A single char holds one character. Use char[] or char* to store strings." },
      { code: `#include <stdio.h>\nint main() {\n    for (int i = 0; i < 5; i++)\n        printf("%d ", i);\n        printf("done");\n    return 0;\n}`, error: "printf('done') not inside loop", options: ["No braces means only first printf is in the loop", "i++ is wrong", "printf is wrong", "int i = 0 is wrong"], answer: 0, explanation: "Without curly braces, only the immediately following statement is in the loop body." },
    ],
    medium: [
      { code: `#include <stdio.h>\nint* getVal() {\n    int x = 10;\n    return &x;\n}`, error: "Returning address of local variable", options: ["x is local — its memory is freed when function returns", "int* is wrong", "return is wrong", "x = 10 is wrong"], answer: 0, explanation: "Local variables are on the stack and become invalid after the function returns." },
      { code: `#include <string.h>\nchar s1[5] = "Hello";\nchar s2[] = "World";\nstrcat(s1, s2);`, error: "Buffer overflow in strcat", options: ["s1 has only 5 bytes, not enough for Hello+World", "strcat is wrong", "s2 is wrong", "char is wrong"], answer: 0, explanation: "s1 has room for 5 chars. strcat(s1, s2) would write beyond the buffer." },
      { code: `#include <stdio.h>\nint main() {\n    int* p = NULL;\n    *p = 10;\n    return 0;\n}`, error: "Null pointer dereference", options: ["Dereferencing NULL pointer causes segfault", "int* is wrong", "NULL is wrong", "= 10 is wrong"], answer: 0, explanation: "Dereferencing a NULL pointer causes a segmentation fault." },
      { code: `#include <stdlib.h>\nint main() {\n    int* arr = malloc(5 * sizeof(int));\n    arr[0] = 1;\n    return 0;\n}`, error: "Memory leak — free() not called", options: ["malloc'd memory is never freed with free(arr)", "malloc is wrong", "sizeof is wrong", "arr[0] is wrong"], answer: 0, explanation: "Heap memory allocated with malloc must be freed with free() to avoid memory leaks." },
      { code: `#include <stdio.h>\nint main() {\n    int x = 5;\n    printf("%d %d", x++, x++);\n    return 0;\n}`, error: "Undefined behavior — multiple increments", options: ["Modifying x twice in same expression is undefined behavior", "printf is wrong", "x++ is wrong syntax", "%d is wrong"], answer: 0, explanation: "Evaluating x++ twice in the same function call is undefined behavior in C." },
      { code: `#include <stdio.h>\nint main() {\n    int a = 10, b = 0;\n    printf("%d", a / b);\n    return 0;\n}`, error: "Division by zero", options: ["Dividing by b = 0 causes undefined behavior / crash", "int is wrong", "printf is wrong", "a = 10 is wrong"], answer: 0, explanation: "Integer division by zero is undefined behavior in C and will typically crash." },
      { code: `#include <stdio.h>\nvoid swap(int a, int b) {\n    int t = a; a = b; b = t;\n}\nint main() {\n    int x = 1, y = 2;\n    swap(x, y);\n    printf("%d %d", x, y);\n}`, error: "Pass by value — swap has no effect", options: ["C passes by value; changes inside swap don't affect x and y", "int t is wrong", "printf is wrong", "swap function is wrong"], answer: 0, explanation: "C is pass-by-value. swap modifies local copies, not the originals. Use pointers." },
      { code: `#include <stdio.h>\nint main() {\n    int arr[3];\n    int n = sizeof(arr) / sizeof(int);\n    for(int i = 0; i <= n; i++)\n        printf("%d", arr[i]);\n}`, error: "Off-by-one error in loop", options: ["i <= n accesses arr[3] which is out of bounds", "sizeof is wrong", "int n is wrong", "printf is wrong"], answer: 0, explanation: "Loop should be i < n (not <=). i <= n accesses arr[3] which is out of bounds." },
      { code: `#include <stdio.h>\n#include <string.h>\nint main() {\n    char* s = "Hello";\n    s[0] = 'h';\n    printf("%s", s);\n}`, error: "Modifying string literal is undefined behavior", options: ["String literals are read-only; modification is undefined behavior", "char* is wrong", "s[0] syntax is wrong", "printf is wrong"], answer: 0, explanation: "String literals are stored in read-only memory. Use char s[] = \"Hello\" instead." },
      { code: `#include <stdio.h>\nint main() {\n    int x = 2147483647;\n    x = x + 1;\n    printf("%d", x);\n}`, error: "Integer overflow", options: ["Adding 1 to INT_MAX causes signed integer overflow", "int is wrong", "printf is wrong", "x + 1 is wrong"], answer: 0, explanation: "2147483647 is INT_MAX. Adding 1 causes signed integer overflow, which is undefined behavior." },
    ],
    hard: [
      { code: `#include <stdio.h>\nint main() {\n    char* p;\n    scanf("%s", p);\n    printf("%s", p);\n}`, error: "Uninitialized pointer used with scanf", options: ["p is uninitialized — no memory allocated for input", "scanf is wrong", "printf is wrong", "char* is wrong"], answer: 0, explanation: "p is an uninitialized pointer. scanf writes to an unknown memory location." },
      { code: `#include <stdlib.h>\nvoid process(int n) {\n    int* arr = malloc(n * sizeof(int));\n    if (!arr) return;\n    arr[n] = 0;\n    free(arr);\n}`, error: "Off-by-one buffer overflow", options: ["arr[n] writes past the allocated n elements (valid: 0..n-1)", "malloc is wrong", "free is wrong", "if !arr is wrong"], answer: 0, explanation: "malloc(n) allocates n elements with valid indices 0 to n-1. arr[n] is one past the end." },
      { code: `#include <stdlib.h>\nint main() {\n    int* p = malloc(sizeof(int));\n    *p = 42;\n    free(p);\n    *p = 100;\n}`, error: "Use after free", options: ["Accessing *p after free(p) is undefined behavior", "malloc is wrong", "free is wrong", "int* is wrong"], answer: 0, explanation: "Accessing memory after calling free() on it is undefined behavior (use-after-free)." },
      { code: `#include <stdio.h>\nint main() {\n    int x = 0;\n    int y = (x = 5) && (x = 10);\n    printf("%d", x);\n}`, error: "Sequence point / undefined evaluation order", options: ["Assigning x twice between sequence points is undefined behavior", "int y is wrong", "printf is wrong", "&& is wrong"], answer: 0, explanation: "Modifying x twice without intervening sequence points is undefined behavior." },
      { code: `typedef struct Node {\n    int data;\n    Node* next;\n} Node;`, error: "Using typedef name inside struct before it is defined (C)", options: ["In C, use struct Node* next inside struct, not Node*", "int data is wrong", "typedef is wrong", "next is wrong"], answer: 0, explanation: "In C, the typedef alias isn't visible inside its own struct. Use 'struct Node* next'." },
      { code: `#include <stdio.h>\nint main() {\n    int a = 1;\n    switch(a) {\n        case 1: printf("one");\n        case 2: printf("two");\n        default: printf("other");\n    }\n}`, error: "Missing break causes fall-through", options: ["Without break, execution falls through all cases after match", "switch is wrong", "case syntax is wrong", "printf is wrong"], answer: 0, explanation: "Switch cases fall through without break. 'one', 'two', and 'other' would all print." },
      { code: `#include <stdlib.h>\nint main() {\n    int* p = malloc(4);\n    p++;\n    free(p);\n}`, error: "Freeing modified pointer — invalid free", options: ["free() must receive original malloc'd pointer, not p+1", "malloc is wrong", "int* is wrong", "p++ is wrong"], answer: 0, explanation: "free() must be called with the exact pointer returned by malloc, not an offset of it." },
      { code: `#include <string.h>\nint main() {\n    char dest[5];\n    strcpy(dest, "Hello World");\n}`, error: "strcpy buffer overflow", options: ["dest[5] can't hold 'Hello World' (11 chars + null)", "strcpy is wrong", "char dest is wrong", "Hello World needs quotes"], answer: 0, explanation: "strcpy doesn't check bounds. 'Hello World' is 12 bytes including null terminator, overflowing dest[5]." },
      { code: `#include <stdio.h>\nvoid foo(int arr[]) {\n    int n = sizeof(arr) / sizeof(int);\n    printf("%d", n);\n}\nint main() { int a[5]; foo(a); }`, error: "sizeof on array parameter gives pointer size", options: ["Array decays to pointer in function param — sizeof gives pointer size", "int n is wrong", "sizeof is wrong", "printf is wrong"], answer: 0, explanation: "When an array is passed to a function, it decays to a pointer. sizeof(arr) gives the pointer's size, not the array's." },
      { code: `#include <stdio.h>\nint main() {\n    volatile int x = 0;\n    int* p = (int*)&x;\n    *p = 5;\n    printf("%d", x);\n}`, error: "Casting away volatile is undefined behavior", options: ["Casting volatile int* to int* and modifying is undefined behavior", "volatile is wrong", "int* p is wrong", "printf is wrong"], answer: 0, explanation: "Casting away volatile qualifiers and then modifying the object is undefined behavior." },
    ],
  },

  cpp: {
    easy: [
      { code: `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello" << endl\n    return 0;\n}`, error: "Missing semicolon after endl", options: ["Missing semicolon after cout statement", "cout is wrong", "endl is wrong", "return is wrong"], answer: 0, explanation: "Every statement in C++ must end with a semicolon." },
      { code: `#include <iostream>\nusing namespace std;\nint main() {\n    int x = 10;\n    cout << x << endl;\n    return 0\n}`, error: "Missing semicolon after return 0", options: ["Missing semicolon after return 0", "int x is wrong", "cout is wrong", "endl is wrong"], answer: 0, explanation: "return 0 must be followed by a semicolon in C++." },
      { code: `#include <iostream>\nusing namespace std;\nvoid greet() {\n    cout << "Hi!" << endl;\n}\nint main() {\n    greet;\n    return 0;\n}`, error: "Function not called — missing parentheses", options: ["greet should be greet() to invoke the function", "void is wrong", "cout is wrong", "return is wrong"], answer: 0, explanation: "'greet' without () is a function pointer, not a function call." },
      { code: `#include <iostream>\nusing namespace std;\nint main() {\n    int arr[3] = {1, 2, 3};\n    cout << arr[3] << endl;\n    return 0;\n}`, error: "Array index out of bounds", options: ["Index 3 is out of bounds — valid indices are 0, 1, 2", "arr declaration is wrong", "cout is wrong", "endl is wrong"], answer: 0, explanation: "arr[3] has 3 elements at indices 0-2. Accessing index 3 is undefined behavior." },
      { code: `#include <iostream>\nusing namespace std;\nint main() {\n    string name;\n    cin >> name;\n    cout << "Hello " + name << endl;\n    return 0;\n}`, error: "Missing #include <string>", options: ["Need #include <string> to use std::string", "cin is wrong", "cout is wrong", "endl is wrong"], answer: 0, explanation: "std::string requires #include <string> in C++." },
      { code: `#include <iostream>\nusing namespace std;\nclass Animal {\n    string name;\n    void speak() { cout << name; }\n};`, error: "Members are private by default in class", options: ["name and speak() are private by default in a class", "string is wrong", "cout is wrong", "void is wrong"], answer: 0, explanation: "In a C++ class, members are private by default. Use 'public:' to make them accessible." },
      { code: `#include <iostream>\nusing namespace std;\nint square(int x) {\n    return x * x;\n}\nint main() {\n    cout << Square(5) << endl;\n}`, error: "Function name case mismatch", options: ["square and Square are different — C++ is case-sensitive", "int is wrong", "return is wrong", "cout is wrong"], answer: 0, explanation: "C++ is case-sensitive. The function is 'square' but called as 'Square'." },
      { code: `#include <iostream>\nusing namespace std;\nint main() {\n    const int x = 10;\n    x = 20;\n    cout << x << endl;\n}`, error: "Assigning to const variable", options: ["x is const and cannot be reassigned", "int is wrong", "cout is wrong", "const syntax is wrong"], answer: 0, explanation: "A const variable cannot be modified after initialization." },
      { code: `#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {1, 2, 3};\n    cout << v[5];\n}`, error: "Vector index out of bounds", options: ["v[5] is out of range — vector has only 3 elements", "vector is wrong", "cout is wrong", "int is wrong"], answer: 0, explanation: "Accessing v[5] on a vector of size 3 is undefined behavior." },
      { code: `#include <iostream>\nusing namespace std;\nint divide(int a, int b) {\n    return a / b;\n}\nint main() {\n    cout << divide(10, 0);\n}`, error: "Division by zero", options: ["Calling divide(10, 0) causes integer division by zero", "int is wrong", "return is wrong", "cout is wrong"], answer: 0, explanation: "Integer division by zero is undefined behavior in C++." },
    ],
    medium: [
      { code: `#include <iostream>\nusing namespace std;\nclass MyClass {\npublic:\n    int* data;\n    MyClass() { data = new int(5); }\n};\nint main() {\n    MyClass a;\n    MyClass b = a;\n}`, error: "Shallow copy — two objects share same pointer", options: ["Default copy constructor copies pointer, not data — double delete risk", "new int is wrong", "MyClass() is wrong", "int* is wrong"], answer: 0, explanation: "The default copy constructor does a shallow copy, so a.data and b.data point to the same memory." },
      { code: `#include <iostream>\nusing namespace std;\nvoid process(vector<int> v) {\n    v.push_back(99);\n}\nint main() {\n    vector<int> nums = {1, 2, 3};\n    process(nums);\n    cout << nums.size();\n}`, error: "Vector passed by value — original not modified", options: ["process() receives a copy of nums, so push_back doesn't affect original", "push_back is wrong", "cout is wrong", "vector is wrong"], answer: 0, explanation: "Vectors are passed by value. Changes inside process() don't affect the original. Use & parameter." },
      { code: `class Base {\npublic:\n    void show() { cout << "Base"; }\n};\nclass Derived : public Base {\npublic:\n    void show() { cout << "Derived"; }\n};\nBase* b = new Derived();\nb->show();`, error: "Non-virtual method — Base version called", options: ["show() is not virtual, so Base::show() is called even for Derived object", "public is wrong", "new is wrong", "cout is wrong"], answer: 0, explanation: "Without 'virtual', method resolution is static. b->show() calls Base::show()." },
      { code: `#include <iostream>\nusing namespace std;\nint main() {\n    int* p = new int(10);\n    delete p;\n    delete p;\n}`, error: "Double delete — undefined behavior", options: ["Calling delete twice on same pointer is undefined behavior", "new int is wrong", "int* is wrong", "delete syntax is wrong"], answer: 0, explanation: "Double deleting a pointer is undefined behavior and can crash the program." },
      { code: `#include <iostream>\nusing namespace std;\nstring& getStr() {\n    string s = "hello";\n    return s;\n}\nint main() {\n    string& r = getStr();\n    cout << r;\n}`, error: "Returning reference to local variable", options: ["s is destroyed when getStr() returns — dangling reference", "string is wrong", "return is wrong", "cout is wrong"], answer: 0, explanation: "Returning a reference to a local variable creates a dangling reference after the function ends." },
      { code: `#include <iostream>\nusing namespace std;\ntemplate<typename T>\nvoid print(T val) { cout << val; }\nint main() {\n    print<>(42);\n}`, error: "Empty template argument list", options: ["print<> should be print or print<int> — empty <> is invalid here", "template is wrong", "cout is wrong", "typename is wrong"], answer: 0, explanation: "print<> with empty angle brackets is a syntax error. Use print(42) or print<int>(42)." },
      { code: `#include <iostream>\nusing namespace std;\nint main() {\n    int x = 5;\n    int& ref = x;\n    ref = 10;\n    int& ref2 = ref;\n    ref2 = 20;\n    cout << x;\n}`, error: "Logic confusion — ref2 rebinds, not creates new ref", options: ["int& ref2 = ref makes ref2 an alias to x; x becomes 20", "ref = 10 is wrong", "cout is wrong", "int& is wrong"], answer: 0, explanation: "References cannot be rebound. ref2 refers to x, so x becomes 20. This compiles but the logic may confuse." },
      { code: `struct Point { int x, y; };\nbool cmp(Point a, Point b) {\n    return a.x < b.x;\n    return a.y < b.y;\n}`, error: "Dead code — second return unreachable", options: ["Second return a.y < b.y is unreachable after first return", "struct is wrong", "bool is wrong", "return syntax is wrong"], answer: 0, explanation: "After 'return a.x < b.x', the second return is dead code and never executes." },
      { code: `#include <iostream>\nusing namespace std;\nint main() {\n    auto lambda = [](int x) { return x * 2; };\n    cout << lambda[3];\n}`, error: "Lambda called with [] instead of ()", options: ["Lambdas are called with () not [] — lambda(3) is correct", "auto is wrong", "return is wrong", "cout is wrong"], answer: 0, explanation: "Lambdas are invoked with parentheses: lambda(3). Using [] tries to subscript the lambda object." },
      { code: `#include <iostream>\nusing namespace std;\nint main() {\n    for (int i = 0; i < 10; i++);\n    {\n        cout << i << endl;\n    }\n}`, error: "Semicolon ends for loop — empty body", options: ["Semicolon after for() creates an empty loop; block below is unrelated", "int i = 0 is wrong", "cout is wrong", "endl is wrong"], answer: 0, explanation: "The semicolon after for(...); terminates the loop with an empty body. The block runs once after the loop." },
    ],
    hard: [
      { code: `#include <iostream>\nusing namespace std;\nclass A {\npublic:\n    ~A() { cout << "A destroyed"; }\n};\nclass B : public A {\npublic:\n    ~B() { cout << "B destroyed"; }\n};\nA* obj = new B();\ndelete obj;`, error: "Non-virtual destructor causes incomplete cleanup", options: ["A's destructor is not virtual — only ~A() called, ~B() skipped", "delete is wrong", "new B() is wrong", "cout is wrong"], answer: 0, explanation: "Without virtual destructor in base class, deleting a derived object through base pointer only calls ~A()." },
      { code: `#include <memory>\nusing namespace std;\nstruct Node {\n    shared_ptr<Node> next;\n    shared_ptr<Node> prev;\n};\nint main() {\n    auto a = make_shared<Node>();\n    auto b = make_shared<Node>();\n    a->next = b;\n    b->prev = a;\n}`, error: "Circular shared_ptr reference — memory leak", options: ["Circular shared_ptr keeps ref count > 0 forever — memory never freed", "make_shared is wrong", "struct is wrong", "auto is wrong"], answer: 0, explanation: "Circular references with shared_ptr prevent ref count from reaching 0. Use weak_ptr for back-references." },
      { code: `#include <iostream>\nusing namespace std;\ntemplate<typename T>\nT add(T a, T b) { return a + b; }\nint main() {\n    cout << add(1, 2.5);\n}`, error: "Template deduction conflict", options: ["add(1, 2.5) deduces T as int and double — conflict, won't compile", "template is wrong", "cout is wrong", "return is wrong"], answer: 0, explanation: "Template type deduction requires consistent types. int and double conflict for T." },
      { code: `#include <iostream>\nusing namespace std;\nint main() {\n    int x = 10;\n    auto f = [x]() mutable { x = 20; };\n    f();\n    cout << x;\n}`, error: "Lambda captures by value — original x unchanged", options: ["[x] captures a copy of x; modifying it doesn't change outer x", "auto is wrong", "mutable is wrong", "cout is wrong"], answer: 0, explanation: "Capture by value ([x]) copies x. Even with mutable, changes stay inside the lambda." },
      { code: `#include <iostream>\nusing namespace std;\nstruct S {\n    S() { cout << "ctor"; }\n    S(const S&) { cout << "copy"; }\n};\nvoid take(S s) {}\nint main() {\n    S obj;\n    take(obj);\n}`, error: "Unnecessary copy — should pass by const ref", options: ["take(S s) copies obj on every call — prefer take(const S& s)", "struct is wrong", "cout is wrong", "void is wrong"], answer: 0, explanation: "Passing by value triggers a copy constructor call. Use const S& to avoid the copy." },
      { code: `#include <iostream>\nusing namespace std;\nclass Singleton {\n    static Singleton* instance;\npublic:\n    static Singleton* get() {\n        if (!instance) instance = new Singleton();\n        return instance;\n    }\n};\nSingleton* Singleton::instance;`, error: "Not thread-safe singleton", options: ["Two threads can both see !instance as true and create two instances", "static is wrong", "new is wrong", "if is wrong"], answer: 0, explanation: "Without a mutex, two threads can simultaneously pass the null check and create two Singleton instances." },
      { code: `#include <iostream>\nusing namespace std;\nint main() {\n    const char* a = "foo";\n    const char* b = "foo";\n    if (a == b) cout << "equal";\n    else cout << "not equal";\n}`, error: "Comparing string literals by pointer not content", options: ["a == b compares pointers, not content — use strcmp or std::string", "const char* is wrong", "cout is wrong", "if is wrong"], answer: 0, explanation: "Pointer comparison checks addresses, not string content. Use strcmp(a,b)==0 or std::string." },
      { code: `#include <iostream>\nusing namespace std;\nvoid f(int& x) { x++; }\nint main() {\n    f(5);\n    cout << "done";\n}`, error: "Passing rvalue to non-const reference", options: ["5 is an rvalue — cannot bind to int& (non-const lvalue reference)", "void is wrong", "cout is wrong", "x++ is wrong"], answer: 0, explanation: "Non-const lvalue references cannot bind to rvalues like literals. Use int&&, const int&, or a variable." },
      { code: `#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {1,2,3};\n    for (auto it = v.begin(); it != v.end(); ++it) {\n        if (*it == 2) v.erase(it);\n    }\n}`, error: "Iterator invalidated after erase", options: ["v.erase() invalidates it — accessing it++ is undefined behavior", "auto is wrong", "erase is wrong", "for loop is wrong"], answer: 0, explanation: "Erasing from a vector invalidates all iterators at and after the erased position." },
      { code: `#include <iostream>\nusing namespace std;\nint main() {\n    int arr[] = {1, 2, 3};\n    int* p = arr;\n    cout << *(p + 5);\n}`, error: "Pointer arithmetic out of bounds", options: ["p + 5 points past the 3-element array — undefined behavior", "int* is wrong", "cout is wrong", "arr declaration is wrong"], answer: 0, explanation: "Accessing memory beyond the array's bounds through pointer arithmetic is undefined behavior." },
    ],
  },

  java: {
    easy: [
      { code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello")\n    }\n}`, error: "Missing semicolon", options: ["Missing semicolon after println statement", "println is wrong", "String[] is wrong", "public is wrong"], answer: 0, explanation: "Every statement in Java must end with a semicolon." },
      { code: `public class Main {\n    public static void main(String[] args) {\n        int x = 10;\n        if (x > 5)\n        System.out.println("big");\n    }\n}`, error: "Missing braces (logic error for multi-line)", options: ["Without braces, only one line is inside if — code is misleading", "int is wrong", "println is wrong", "x > 5 is wrong"], answer: 0, explanation: "Without curly braces, only the next statement belongs to the if block." },
      { code: `public class Main {\n    public static void main(String[] args) {\n        String name = null;\n        System.out.println(name.length());\n    }\n}`, error: "NullPointerException", options: ["name is null — calling .length() throws NullPointerException", "String is wrong", "println is wrong", "null is wrong"], answer: 0, explanation: "Calling a method on a null reference throws a NullPointerException." },
      { code: `public class Main {\n    public static void main(String[] args) {\n        int[] arr = new int[3];\n        System.out.println(arr[3]);\n    }\n}`, error: "ArrayIndexOutOfBoundsException", options: ["Index 3 is out of bounds for array of length 3", "new int[3] is wrong", "println is wrong", "int[] is wrong"], answer: 0, explanation: "Array indices run 0 to 2 for length-3 array. Accessing index 3 throws ArrayIndexOutOfBoundsException." },
      { code: `public class Main {\n    public static void main(String[] args) {\n        String s1 = "Hello";\n        String s2 = "Hello";\n        if (s1 == s2)\n            System.out.println("equal");\n    }\n}`, error: "Using == to compare Strings", options: ["== compares references not content — use .equals() for Strings", "String is wrong", "println is wrong", "if is wrong"], answer: 0, explanation: "== checks reference equality. Use s1.equals(s2) to compare String content." },
      { code: `public class Main {\n    public static void main(String[] args) {\n        int result = 10 / 3;\n        System.out.println(result);\n    }\n}`, error: "Integer division truncates decimal", options: ["10/3 gives 3 (truncated) not 3.33 — use double for decimal result", "int is wrong", "println is wrong", "/ operator is wrong"], answer: 0, explanation: "Integer division truncates the result. Use double result = 10.0 / 3 to get 3.33." },
      { code: `public class Main {\n    static int count;\n    public static void main(String[] args) {\n        Main obj = new Main();\n        obj.count = 5;\n        Main obj2 = new Main();\n        System.out.println(obj2.count);\n    }\n}`, error: "Static field shared across all instances", options: ["count is static — all instances share it, obj2.count is 5 too", "static is wrong", "int is wrong", "println is wrong"], answer: 0, explanation: "Static fields are shared across all instances. obj2.count is 5 because count is static." },
      { code: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 0; i < 5; i++) {\n            System.out.println(i);\n        }\n        System.out.println(i);\n    }\n}`, error: "Variable i out of scope outside for loop", options: ["i is declared inside for — not accessible outside the loop", "for loop is wrong", "println is wrong", "int i is wrong"], answer: 0, explanation: "Variable i is scoped to the for loop. It cannot be accessed outside." },
      { code: `public class Animal {\n    void speak() { System.out.println("..."); }\n}\npublic class Dog extends Animal {\n    void Speak() { System.out.println("Woof"); }\n}`, error: "Method not overridden — wrong case", options: ["Dog has Speak() not speak() — doesn't override Animal's speak()", "extends is wrong", "void is wrong", "println is wrong"], answer: 0, explanation: "Java is case-sensitive. Speak() != speak() — the method is not overridden." },
      { code: `public class Main {\n    public static void main(String[] args) {\n        Integer a = 200;\n        Integer b = 200;\n        System.out.println(a == b);\n    }\n}`, error: "Integer cache miss — == returns false", options: ["Integer == compares references; cache only covers -128 to 127", "Integer is wrong", "println is wrong", "= 200 is wrong"], answer: 0, explanation: "Java caches Integer values -128 to 127. For 200, a and b are different objects, so == is false." },
    ],
    medium: [
      { code: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> list = new ArrayList<>();\n        list.add(1); list.add(2); list.add(3);\n        for (Integer i : list) {\n            if (i == 2) list.remove(i);\n        }\n    }\n}`, error: "ConcurrentModificationException", options: ["Modifying list while iterating throws ConcurrentModificationException", "ArrayList is wrong", "remove is wrong", "for-each is wrong"], answer: 0, explanation: "You can't modify a list while iterating with for-each. Use Iterator.remove() or removeIf()." },
      { code: `public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = Integer.parseInt("abc");\n        } catch (Exception e) {\n        }\n        System.out.println(x);\n    }\n}`, error: "Variable x out of scope outside try block", options: ["x is declared inside try — not visible outside it", "parseInt is wrong", "catch is wrong", "println is wrong"], answer: 0, explanation: "Variables declared inside a try block are not accessible outside of it." },
      { code: `public class Main {\n    public static void main(String[] args) {\n        Thread t = new Thread(() -> {\n            for (int i = 0; i < 5; i++)\n                System.out.println(i);\n        });\n        t.run();\n    }\n}`, error: "t.run() called instead of t.start()", options: ["t.run() executes in current thread — use t.start() for new thread", "Thread is wrong", "lambda is wrong", "println is wrong"], answer: 0, explanation: "t.run() calls the runnable directly in the current thread. t.start() creates a new thread." },
      { code: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Map<String, Integer> map = new HashMap<>();\n        map.put(\"a\", 1);\n        int val = map.get(\"b\");\n    }\n}`, error: "NullPointerException from unboxing null", options: ["map.get('b') returns null, unboxing to int throws NullPointerException", "HashMap is wrong", "put is wrong", "int val is wrong"], answer: 0, explanation: "map.get(\"b\") returns null (key doesn't exist). Auto-unboxing null to int throws NullPointerException." },
      { code: `public class Main {\n    static int[] data = new int[10];\n    public static void main(String[] args) {\n        System.out.println(data[10]);\n    }\n}`, error: "ArrayIndexOutOfBoundsException at index 10", options: ["Array length is 10, valid indices 0-9; data[10] is out of bounds", "static is wrong", "int[] is wrong", "println is wrong"], answer: 0, explanation: "new int[10] creates indices 0-9. data[10] throws ArrayIndexOutOfBoundsException." },
      { code: `public class Main {\n    int value;\n    public Main(int v) { this.value = v; }\n    public boolean equals(Main other) {\n        return this.value == other.value;\n    }\n}`, error: "equals() not properly overridden", options: ["equals(Main) doesn't override Object.equals(Object) — wrong signature", "int value is wrong", "this.value is wrong", "boolean is wrong"], answer: 0, explanation: "To override Object.equals(), the parameter must be Object, not Main." },
      { code: `public class Main {\n    public static void main(String[] args) {\n        String s = \"\";\n        for (int i = 0; i < 10000; i++) {\n            s += i;\n        }\n        System.out.println(s.length());\n    }\n}`, error: "String concatenation in loop is inefficient", options: ["+= creates new String object each iteration — use StringBuilder", "String is wrong", "for loop is wrong", "println is wrong"], answer: 0, explanation: "String is immutable. s += i creates a new String object 10000 times. Use StringBuilder.append()." },
      { code: `public class Main {\n    public static void main(String[] args) {\n        Object obj = \"hello\";\n        Integer num = (Integer) obj;\n    }\n}`, error: "ClassCastException — String cast to Integer", options: ["obj holds a String, casting to Integer throws ClassCastException", "Object is wrong", "Integer is wrong", "cast syntax is wrong"], answer: 0, explanation: "obj actually references a String. Casting it to Integer throws ClassCastException at runtime." },
      { code: `public class Main {\n    public static void main(String[] args) throws Exception {\n        int[] arr = {1, 2, 3};\n        int sum = 0;\n        for (int i = 0; i <= arr.length; i++) {\n            sum += arr[i];\n        }\n        System.out.println(sum);\n    }\n}`, error: "Off-by-one — i <= arr.length", options: ["i <= arr.length includes index 3, causing ArrayIndexOutOfBoundsException", "int sum is wrong", "for is wrong", "println is wrong"], answer: 0, explanation: "Loop condition should be i < arr.length. i <= arr.length accesses arr[3] which doesn't exist." },
      { code: `public class Main {\n    public static void main(String[] args) {\n        final List<Integer> list = new ArrayList<>();\n        list = new ArrayList<>();\n    }\n}`, error: "Reassigning final variable", options: ["list is final — it cannot be reassigned to a new object", "ArrayList is wrong", "final is wrong", "List is wrong"], answer: 0, explanation: "final prevents reassignment. You can still modify the list's contents, but not assign a new list to list." },
    ],
    hard: [
      { code: `public class Main {\n    private static Main instance;\n    public static Main getInstance() {\n        if (instance == null) {\n            instance = new Main();\n        }\n        return instance;\n    }\n}`, error: "Non-thread-safe singleton", options: ["Two threads can both see null and create two instances simultaneously", "static is wrong", "if is wrong", "private is wrong"], answer: 0, explanation: "Without synchronization, two threads can simultaneously create instances. Use synchronized or double-checked locking." },
      { code: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List list = new ArrayList();\n        list.add(\"hello\");\n        list.add(42);\n        String s = (String) list.get(1);\n    }\n}`, error: "Raw type — ClassCastException at runtime", options: ["list.get(1) returns 42 (Integer), casting to String throws ClassCastException", "ArrayList is wrong", "add is wrong", "String is wrong"], answer: 0, explanation: "Using raw types loses type safety. list.get(1) is an Integer, not a String." },
      { code: `public class Main {\n    int x = 0;\n    void increment() { x++; }\n    public static void main(String[] args) throws Exception {\n        Main obj = new Main();\n        for (int i = 0; i < 1000; i++) {\n            new Thread(obj::increment).start();\n        }\n        Thread.sleep(1000);\n        System.out.println(obj.x);\n    }\n}`, error: "Race condition on x", options: ["x++ is not atomic — concurrent threads may produce wrong count", "Thread is wrong", "sleep is wrong", "int x is wrong"], answer: 0, explanation: "x++ is read-modify-write and not atomic. Multiple threads can overwrite each other's increments." },
      { code: `import java.util.function.*;\npublic class Main {\n    static Supplier<Integer> makeCounter() {\n        int count = 0;\n        return () -> count++;\n    }\n}`, error: "Cannot modify captured local variable in lambda", options: ["Local variables captured by lambdas must be effectively final — count++ violates this", "Supplier is wrong", "int count is wrong", "return is wrong"], answer: 0, explanation: "Java lambdas can only capture effectively final variables. count++ modifies it, causing a compile error." },
      { code: `public class Main {\n    public static void main(String[] args) {\n        try {\n            throw new RuntimeException(\"error\");\n        } finally {\n            return;\n        }\n    }\n}`, error: "return in finally swallows exception", options: ["return in finally discards the RuntimeException silently", "throw is wrong", "finally is wrong", "return is wrong"], answer: 0, explanation: "A return statement in finally overrides any exception being propagated, silently swallowing it." },
      { code: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Map<List<Integer>, String> map = new HashMap<>();\n        List<Integer> key = new ArrayList<>(Arrays.asList(1, 2));\n        map.put(key, \"value\");\n        key.add(3);\n        System.out.println(map.get(key));\n    }\n}`, error: "Mutable key in HashMap — get returns null", options: ["Mutating the key after put changes its hashCode — map.get returns null", "HashMap is wrong", "ArrayList is wrong", "put is wrong"], answer: 0, explanation: "Modifying a HashMap key after insertion changes its hashCode, so map.get() can't find it." },
      { code: `public class Main {\n    public static void main(String[] args) {\n        String result = null;\n        result += \"hello\";\n        System.out.println(result);\n    }\n}`, error: "null + string gives 'nullhello'", options: ["null concatenated with String gives 'nullhello', not 'hello'", "String is wrong", "println is wrong", "+= is wrong"], answer: 0, explanation: "null + \"hello\" produces the string \"nullhello\" because null is converted to the string \"null\"." },
      { code: `import java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        Stream<Integer> s = Stream.of(1,2,3);\n        s.forEach(System.out::println);\n        s.forEach(System.out::println);\n    }\n}`, error: "Stream already consumed", options: ["Stream cannot be reused — second forEach throws IllegalStateException", "Stream.of is wrong", "forEach is wrong", "println is wrong"], answer: 0, explanation: "Streams can only be consumed once. Calling forEach a second time throws IllegalStateException." },
      { code: `public enum Day { MON, TUE, WED }\npublic class Main {\n    public static void main(String[] args) {\n        Day d = Day.valueOf(\"mon\");\n    }\n}`, error: "valueOf is case-sensitive — throws IllegalArgumentException", options: ["Day.valueOf('mon') fails — enum constants are 'MON', uppercase required", "enum is wrong", "Day is wrong", "String is wrong"], answer: 0, explanation: "Enum.valueOf() is case-sensitive. 'mon' doesn't match 'MON', throwing IllegalArgumentException." },
      { code: `public class Main {\n    public static void main(String[] args) {\n        int[] arr = {3, 1, 4, 1, 5};\n        Arrays.sort(arr);\n        System.out.println(Arrays.binarySearch(arr, 6));\n    }\n}`, error: "binarySearch returns negative for missing element", options: ["6 not in array — binarySearch returns negative insertion point, not -1", "Arrays.sort is wrong", "println is wrong", "int[] is wrong"], answer: 0, explanation: "binarySearch returns -(insertion point) - 1 when element is not found, not necessarily -1." },
    ],
  },

  sql: {
    easy: [
      { code: `SELECT name age FROM employees;`, error: "Missing comma between column names", options: ["Missing comma between name and age", "SELECT is wrong", "FROM is wrong", "employees is wrong"], answer: 0, explanation: "Column names in SELECT must be separated by commas." },
      { code: `SELECT * FROM employees\nWHERE salary > 50000\nORDER name;`, error: "Missing BY in ORDER clause", options: ["Should be ORDER BY name, not just ORDER name", "WHERE is wrong", "SELECT * is wrong", "salary > 50000 is wrong"], answer: 0, explanation: "The ORDER clause requires the BY keyword: ORDER BY name." },
      { code: `SELECT * FROM employees\nWHERE name = Alice;`, error: "String value not quoted", options: ["String values must be in quotes: WHERE name = 'Alice'", "WHERE is wrong", "= is wrong", "SELECT * is wrong"], answer: 0, explanation: "String literals in SQL must be enclosed in single quotes." },
      { code: `SELECT COUNT(*)\nFROM employees\nGROUP BY department\nWHERE salary > 50000;`, error: "WHERE after GROUP BY is invalid", options: ["WHERE must come before GROUP BY; use HAVING for post-group filters", "COUNT(*) is wrong", "GROUP BY is wrong", "SELECT is wrong"], answer: 0, explanation: "WHERE filters rows before grouping. It must come before GROUP BY. Use HAVING to filter groups." },
      { code: `SELECT name, MAX(salary)\nFROM employees;`, error: "Mixing aggregate with non-aggregate without GROUP BY", options: ["name must appear in GROUP BY when used with MAX()", "MAX is wrong", "SELECT is wrong", "FROM is wrong"], answer: 0, explanation: "When using aggregate functions, non-aggregated columns must be in GROUP BY." },
      { code: `UPDATE employees\nSET salary = 60000;`, error: "Missing WHERE clause — updates all rows", options: ["No WHERE clause — this updates every employee's salary", "UPDATE is wrong", "SET is wrong", "salary is wrong"], answer: 0, explanation: "Without WHERE, UPDATE modifies all rows in the table." },
      { code: `DELETE employees\nWHERE id = 5;`, error: "Missing FROM keyword in DELETE", options: ["Syntax should be DELETE FROM employees WHERE id = 5", "DELETE is wrong", "WHERE is wrong", "id = 5 is wrong"], answer: 0, explanation: "DELETE requires the FROM keyword: DELETE FROM table_name." },
      { code: `SELECT * FROM employees\nWHERE department = 'HR' AND OR salary > 50000;`, error: "AND OR is invalid SQL syntax", options: ["Can't use AND OR together — use either AND or OR", "WHERE is wrong", "department = 'HR' is wrong", "salary > 50000 is wrong"], answer: 0, explanation: "You cannot chain AND directly with OR without proper parentheses and conditions." },
      { code: `INSERT INTO employees (name, salary)\nVALUES ('Alice', 50000, 'HR');`, error: "Column count doesn't match value count", options: ["2 columns specified but 3 values provided", "INSERT INTO is wrong", "VALUES is wrong", "name is wrong"], answer: 0, explanation: "The number of columns must match the number of values in an INSERT statement." },
      { code: `SELECT name FROM employees\nWHERE salary BETWEEN 3000 AND 2000;`, error: "BETWEEN range is reversed", options: ["BETWEEN lower AND upper — 3000 > 2000 so no rows match", "BETWEEN is wrong", "salary is wrong", "SELECT is wrong"], answer: 0, explanation: "BETWEEN requires the lower bound first. BETWEEN 3000 AND 2000 returns no rows." },
    ],
    medium: [
      { code: `SELECT e.name, d.dept_name\nFROM employees e\nJOIN departments d ON e.id = d.id;`, error: "Wrong JOIN condition — should join on dept_id", options: ["Should join on e.dept_id = d.id, not e.id = d.id", "JOIN is wrong", "SELECT is wrong", "FROM is wrong"], answer: 0, explanation: "Employees join Departments via dept_id, not employee id." },
      { code: `SELECT name, salary\nFROM employees\nHAVING salary > 50000;`, error: "HAVING without GROUP BY", options: ["HAVING is for filtered groups — use WHERE for row-level filter", "HAVING is wrong syntax", "salary is wrong", "SELECT is wrong"], answer: 0, explanation: "HAVING is used with GROUP BY. Use WHERE salary > 50000 for row-level filtering." },
      { code: `SELECT name FROM employees\nUNION\nSELECT dept_name, location FROM departments;`, error: "UNION requires same number of columns", options: ["First SELECT has 1 column, second has 2 — UNION requires matching columns", "UNION is wrong", "SELECT is wrong", "FROM is wrong"], answer: 0, explanation: "UNION requires the same number of columns with compatible types in each SELECT." },
      { code: `SELECT AVG(salary) FROM employees\nWHERE AVG(salary) > 50000;`, error: "Aggregate function in WHERE clause", options: ["Can't use AVG() in WHERE — use HAVING with GROUP BY instead", "AVG is wrong", "WHERE is wrong", "SELECT is wrong"], answer: 0, explanation: "Aggregate functions cannot be used in WHERE. Use HAVING after GROUP BY." },
      { code: `SELECT name FROM employees\nORDER BY salary\nLIMIT 5\nWHERE salary > 30000;`, error: "WHERE must come before ORDER BY and LIMIT", options: ["Clause order: SELECT, FROM, WHERE, ORDER BY, LIMIT", "ORDER BY is wrong", "LIMIT is wrong", "SELECT is wrong"], answer: 0, explanation: "SQL clauses must follow order: WHERE → ORDER BY → LIMIT." },
      { code: `SELECT department, COUNT(*)\nFROM employees\nGROUP BY department\nHAVING COUNT(*) > 5\nORDER BY COUNT(*) DESC\nWHERE salary > 40000;`, error: "WHERE after HAVING is invalid order", options: ["WHERE must come before GROUP BY and HAVING", "HAVING is wrong", "ORDER BY is wrong", "GROUP BY is wrong"], answer: 0, explanation: "Correct order: WHERE → GROUP BY → HAVING → ORDER BY." },
      { code: `SELECT name FROM employees e\nLEFT JOIN departments d ON e.dept_id = d.id\nWHERE d.location = 'NYC';`, error: "WHERE on right table nullifies LEFT JOIN", options: ["WHERE d.location filters out NULLs — use AND in ON clause or INNER JOIN", "LEFT JOIN is wrong", "ON is wrong", "SELECT is wrong"], answer: 0, explanation: "Filtering on the right table with WHERE turns a LEFT JOIN into an INNER JOIN effectively." },
      { code: `CREATE TABLE orders (\n    id INT PRIMARY KEY,\n    customer_id INT,\n    FOREIGN KEY (customer_id) REFERENCES customers(id)\n        ON DELETE RESTRICT\n);\nDELETE FROM customers WHERE id = 1;`, error: "Foreign key constraint prevents delete", options: ["ON DELETE RESTRICT blocks deleting customers with existing orders", "FOREIGN KEY is wrong", "PRIMARY KEY is wrong", "DELETE is wrong"], answer: 0, explanation: "RESTRICT prevents deleting a parent row that has child rows referencing it." },
      { code: `SELECT name FROM employees\nWHERE id IN (\n    SELECT manager_id FROM departments\n    WHERE manager_id IS NULL\n);`, error: "Subquery returns NULL — IN with NULL never matches", options: ["IN (NULL) never matches any row — use IS NOT NULL in subquery", "IN is wrong", "SELECT is wrong", "WHERE is wrong"], answer: 0, explanation: "NULL values in an IN list cause no matches due to three-valued logic in SQL." },
      { code: `SELECT name, salary * 12 annual\nFROM employees\nWHERE annual > 600000;`, error: "Column alias not usable in WHERE", options: ["Column aliases defined in SELECT can't be used in WHERE — use expression", "WHERE is wrong", "* 12 is wrong", "SELECT is wrong"], answer: 0, explanation: "Column aliases are resolved after WHERE. Repeat the expression: WHERE salary * 12 > 600000." },
    ],
    hard: [
      { code: `SELECT id, name,\n    ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary)\nFROM employees\nWHERE ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary) = 1;`, error: "Window function in WHERE clause is invalid", options: ["Window functions can't be in WHERE — use a subquery or CTE", "ROW_NUMBER is wrong", "PARTITION BY is wrong", "SELECT is wrong"], answer: 0, explanation: "Window functions are not allowed in WHERE. Wrap the query in a subquery or CTE and filter there." },
      { code: `WITH cte AS (\n    SELECT * FROM orders WHERE status = 'pending'\n)\nDELETE FROM cte;`, error: "Cannot DELETE from a CTE directly in most databases", options: ["Most SQL dialects don't support DELETE directly from a CTE", "WITH is wrong", "DELETE is wrong", "status is wrong"], answer: 0, explanation: "Deleting from a CTE is not supported in most SQL databases. Use a subquery in WHERE instead." },
      { code: `SELECT customer_id, SUM(amount)\nFROM orders\nGROUP BY customer_id\nHAVING SUM(amount) > 1000\nORDER BY SUM(amount) DESC\nLIMIT 10 OFFSET 0;`, error: "Correct query — no error", options: ["This query is actually correct SQL", "HAVING is wrong", "OFFSET is wrong", "GROUP BY is wrong"], answer: 0, explanation: "This is valid SQL. The clauses are in correct order with valid syntax." },
      { code: `SELECT *\nFROM employees\nWHERE salary = (\n    SELECT MAX(salary) FROM employees\n    GROUP BY department\n);`, error: "Subquery returns multiple rows — can't use = with multiple rows", options: ["= expects single value but subquery returns one MAX per department", "MAX is wrong", "WHERE is wrong", "SELECT * is wrong"], answer: 0, explanation: "= can only compare with a scalar. Use IN or add a condition to make the subquery return one row." },
      { code: `BEGIN TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n-- application crash here\nCOMMIT;`, error: "COMMIT never reached — transaction partially applied", options: ["If crash occurs before COMMIT, changes are rolled back — but app may think it succeeded", "BEGIN TRANSACTION is wrong", "UPDATE is wrong", "COMMIT is wrong"], answer: 0, explanation: "If the application crashes before COMMIT, the DB rolls back. But the app may not handle this, causing inconsistency." },
      { code: `SELECT name FROM employees\nWHERE department_id NOT IN (\n    SELECT id FROM departments WHERE active = 1\n);`, error: "NOT IN with NULL in subquery returns no rows", options: ["If subquery returns any NULL, NOT IN returns false for all rows", "NOT IN is wrong", "WHERE is wrong", "SELECT is wrong"], answer: 0, explanation: "NOT IN with a NULL value in the subquery results returns no rows due to SQL's three-valued logic." },
      { code: `SELECT a.name, b.name\nFROM employees a, employees b\nWHERE a.manager_id = b.id\nAND a.id = b.id;`, error: "Self-join condition contradicts manager relationship", options: ["a.id = b.id means employee is their own manager — likely a logic error", "self-join is wrong", "FROM syntax is wrong", "AND is wrong"], answer: 0, explanation: "a.manager_id = b.id should find the manager, but AND a.id = b.id means the employee manages themselves." },
      { code: `SELECT department, AVG(salary)\nFROM employees\nGROUP BY department\nHAVING AVG(salary) > (\n    SELECT AVG(salary) FROM employees GROUP BY department\n);`, error: "Correlated subquery returns multiple rows in HAVING", options: ["Subquery returns one AVG per department — HAVING > multiple values is invalid", "HAVING is wrong", "AVG is wrong", "GROUP BY is wrong"], answer: 0, explanation: "The subquery returns multiple average values. Use a scalar subquery (no GROUP BY) to get overall average." },
      { code: `SELECT DISTINCT name, department\nFROM employees\nORDER BY salary DESC;`, error: "ORDER BY column not in SELECT with DISTINCT", options: ["DISTINCT with ORDER BY salary fails — salary must be in SELECT", "DISTINCT is wrong", "ORDER BY is wrong", "FROM is wrong"], answer: 0, explanation: "When using DISTINCT, ORDER BY columns must appear in the SELECT list." },
      { code: `CREATE INDEX idx_salary ON employees(salary);\nSELECT * FROM employees WHERE salary + 0 > 50000;`, error: "Index not used due to function/expression on column", options: ["salary + 0 prevents index usage — use WHERE salary > 50000 directly", "CREATE INDEX is wrong", "WHERE is wrong", "SELECT * is wrong"], answer: 0, explanation: "Applying an expression to the indexed column prevents the database from using the index." },
    ],
  },

  // "web" maps to web dev
  web: {
    easy: [
      { code: `<html>\n<body>\n  <p>Hello World<p>\n</body>\n</html>`, error: "Paragraph tag not properly closed", options: ["Should be </p> to close paragraph, not <p>", "html tag is wrong", "body tag is wrong", "Hello World needs quotes"], answer: 0, explanation: "HTML tags must be closed properly. Use </p> to close the paragraph." },
      { code: `<html>\n<body>\n  <img src="photo.jpg">\n  <a href=google.com>Click</a>\n</body>`, error: "href value not quoted", options: ["href attribute value must be in quotes: href=\"google.com\"", "img tag is wrong", "a tag is wrong", "Click needs quotes"], answer: 0, explanation: "HTML attribute values must be enclosed in quotes." },
      { code: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Page</title>\n<body>\n  <p>Content</p>\n</body>\n</html>`, error: "Missing closing </head> tag", options: ["</head> tag is missing before <body>", "DOCTYPE is wrong", "title is wrong", "body is wrong"], answer: 0, explanation: "The <head> section must be closed with </head> before the <body> opens." },
      { code: `.box {\n  color: red\n  background: blue;\n}`, error: "Missing semicolon in CSS", options: ["Missing semicolon after color: red", "color: red is wrong", "background is wrong", ".box selector is wrong"], answer: 0, explanation: "CSS property declarations must end with a semicolon." },
      { code: `<style>\n  p {\n    font-size: 16;\n  }\n</style>`, error: "Missing CSS unit on font-size", options: ["font-size: 16 needs a unit like px: font-size: 16px", "p selector is wrong", "font-size is wrong", "style tag is wrong"], answer: 0, explanation: "CSS length values require units (px, em, rem, etc.) except for line-height and 0." },
      { code: `const btn = document.getElementById("myBtn")\nbtn.AddEventListener("click", () => {\n  console.log("clicked");\n});`, error: "Wrong method name — AddEventListener should be addEventListener", options: ["JavaScript is case-sensitive: use addEventListener not AddEventListener", "getElementById is wrong", "click is wrong", "console.log is wrong"], answer: 0, explanation: "JavaScript method names are case-sensitive. The correct method is addEventListener (lowercase 'a')." },
      { code: `<form>\n  <input type="text" name="user">\n  <button>Submit</button>\n</form>`, error: "Button inside form defaults to type='submit' — may cause unintended submission", options: ["Add type='button' to prevent unintended form submission", "input is wrong", "form tag is wrong", "name attribute is wrong"], answer: 0, explanation: "A <button> inside a form defaults to type='submit'. Add type='button' if you don't want it to submit." },
      { code: `<div class=container>\n  <p>Hello</p>\n</div>`, error: "Class attribute value not quoted", options: ["Class value must be quoted: class=\"container\"", "div tag is wrong", "p tag is wrong", "Hello needs escaping"], answer: 0, explanation: "HTML attribute values should always be enclosed in quotes." },
      { code: `body {\n  margin: 0;\n  padding: 0;\n}\n\n.header {\n  width: 100%\n  height: 60px;\n}`, error: "Missing semicolon in CSS", options: ["Missing semicolon after width: 100%", "margin: 0 is wrong", "height is wrong", ".header selector is wrong"], answer: 0, explanation: "Every CSS declaration must end with a semicolon." },
      { code: `const x = 5;\nif (x = 10) {\n  console.log("ten");\n}`, error: "Assignment instead of comparison in if", options: ["Use === for comparison, = assigns a value (always truthy)", "const is wrong", "console.log is wrong", "if syntax is wrong"], answer: 0, explanation: "= is assignment. Use === for strict comparison in JavaScript." },
    ],
    medium: [
      { code: `const arr = [1, 2, 3];\narr.forEach(num => {\n  if (num === 2) return arr;\n});\nconsole.log("done");`, error: "return inside forEach doesn't break the loop", options: ["return in forEach only exits current iteration, not the loop", "forEach is wrong", "const is wrong", "console.log is wrong"], answer: 0, explanation: "forEach doesn't support early exit via return. Use for...of or Array.some() to break early." },
      { code: `async function getData() {\n  const res = fetch("https://api.example.com/data");\n  const data = res.json();\n  return data;\n}`, error: "Missing await keywords", options: ["fetch() and res.json() return Promises — must await both", "async is wrong", "const is wrong", "return is wrong"], answer: 0, explanation: "fetch() returns a Promise. Without await, res is a Promise, and res.json() will fail." },
      { code: `const obj = { a: 1, b: 2 };\nconst { a, c } = obj;\nconsole.log(c);`, error: "Destructuring non-existent property", options: ["obj has no 'c' property — c will be undefined", "const is wrong", "console.log is wrong", "destructuring syntax is wrong"], answer: 0, explanation: "Destructuring a property that doesn't exist yields undefined." },
      { code: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n}\n/* parent has no fixed height */`, error: "height: 100% with no set parent height", options: ["100% height requires a parent with explicit height set", "display: flex is wrong", "justify-content is wrong", "align-items is wrong"], answer: 0, explanation: "height: 100% only works if the parent element has an explicit height defined." },
      { code: `for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1000);\n}`, error: "var in loop closure — logs 3 three times", options: ["var is function-scoped; all callbacks share same i which becomes 3", "setTimeout is wrong", "console.log is wrong", "for loop is wrong"], answer: 0, explanation: "var is function-scoped. By the time timeouts run, i is 3. Use let for block scoping." },
      { code: `const p = new Promise((resolve, reject) => {\n  resolve("done");\n  reject("error");\n});\np.then(v => console.log(v)).catch(e => console.log(e));`, error: "reject after resolve has no effect", options: ["Once a Promise is resolved, calling reject has no effect", "new Promise is wrong", "then is wrong", "catch is wrong"], answer: 0, explanation: "Promises can only be settled once. reject() after resolve() is ignored." },
      { code: `<div id="box">\n  <p>Text</p>\n</div>\n<script>\n  const box = document.querySelector('.box');\n  box.style.color = 'red';\n</script>`, error: "Wrong selector — id vs class mismatch", options: ["Element has id='box' but querySelector uses '.box' (class selector)", "querySelector is wrong", "style.color is wrong", "script tag is wrong"], answer: 0, explanation: "'.box' selects by class. The element uses id='box'. Use '#box' selector instead." },
      { code: `const nums = [1, [2, [3, [4]]]];\nconsole.log(nums.flat());`, error: "flat() only flattens one level by default", options: ["flat() without argument flattens only 1 level deep — result: [1, 2, [3, [4]]]", "flat is wrong", "const is wrong", "console.log is wrong"], answer: 0, explanation: "Array.flat() flattens one level by default. Use .flat(Infinity) to fully flatten nested arrays." },
      { code: `function Counter() {\n  this.count = 0;\n  setTimeout(function() {\n    this.count++;\n    console.log(this.count);\n  }, 1000);\n}`, error: "Wrong 'this' context inside regular function callback", options: ["Regular function has its own 'this' — use arrow function to preserve Counter's this", "setTimeout is wrong", "this.count is wrong", "function is wrong"], answer: 0, explanation: "Regular functions have their own 'this'. Use an arrow function (() =>) to inherit 'this' from Counter." },
      { code: `const map = new Map();\nmap.set({id: 1}, "Alice");\nmap.set({id: 1}, "Bob");\nconsole.log(map.size);`, error: "Object keys in Map compared by reference", options: ["Two different object literals are different references — map has 2 entries", "Map is wrong", "set is wrong", "console.log is wrong"], answer: 0, explanation: "Maps use reference equality for object keys. Two {id:1} objects are different keys." },
    ],
    hard: [
      { code: `const obj = {};\nObject.defineProperty(obj, 'x', {\n  get() { return this._x || 0; },\n  set(v) { this._x = v; }\n});\nobj.x = 5;\nconsole.log(obj.x);`, error: "Correct code — no error", options: ["This code is actually correct and works as expected", "defineProperty is wrong", "get/set is wrong", "this._x is wrong"], answer: 0, explanation: "This code correctly uses a getter/setter via Object.defineProperty and outputs 5." },
      { code: `useEffect(() => {\n  fetch('/api/data')\n    .then(r => r.json())\n    .then(data => setData(data));\n}, []);`, error: "No cleanup — potential memory leak on unmount", options: ["If component unmounts before fetch completes, setState on unmounted component leaks", "useEffect is wrong", "fetch is wrong", "setData is wrong"], answer: 0, explanation: "Without cleanup, state updates after unmount cause React memory leak warnings. Use AbortController." },
      { code: `const cache = {};\nfunction memoize(fn) {\n  return function(...args) {\n    const key = args.toString();\n    if (cache[key]) return cache[key];\n    return cache[key] = fn(...args);\n  };\n}`, error: "Shared cache across all memoized functions", options: ["All memoize calls share the same cache object — key collisions possible", "toString is wrong", "function is wrong", "const cache is wrong"], answer: 0, explanation: "cache is defined outside memoize, so all memoized functions share the same cache object." },
      { code: `class EventEmitter {\n  constructor() { this.events = {}; }\n  on(event, cb) {\n    this.events[event] = cb;\n  }\n  emit(event, data) {\n    this.events[event](data);\n  }\n}`, error: "Only one listener per event — overwrites previous", options: ["this.events[event] = cb overwrites previous listener — use array", "constructor is wrong", "emit is wrong", "on is wrong"], answer: 0, explanation: "Assigning directly overwrites previous callbacks. Use this.events[event] = [...(this.events[event]||[]), cb]." },
      { code: `const handler = {\n  get(target, key) {\n    return key in target ? target[key] : 42;\n  }\n};\nconst p = new Proxy({a: 1}, handler);\nconsole.log(p.b);`, error: "Correct Proxy usage — no error", options: ["This is valid Proxy code that returns 42 for missing keys", "Proxy is wrong", "handler is wrong", "get is wrong"], answer: 0, explanation: "This correctly creates a Proxy that returns 42 for properties not in the target." },
      { code: `function* gen() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\nconst g = gen();\nconsole.log([...g]);\nconsole.log([...g]);`, error: "Generator exhausted after first spread", options: ["Generator is consumed by first spread — second spread gives empty array", "function* is wrong", "yield is wrong", "console.log is wrong"], answer: 0, explanation: "Like iterators, generators can only be iterated once. The second spread produces []." },
      { code: `const nums = [1, 2, 3, 4, 5];\nconst result = nums\n  .filter(n => n % 2 === 0)\n  .map(n => n * 2)\n  .reduce((acc, n) => acc + n);`, error: "reduce without initial value on potentially empty array", options: ["If filter returns empty array, reduce without initial value throws TypeError", "filter is wrong", "map is wrong", "reduce is wrong"], answer: 0, explanation: "reduce() without an initial value throws if the array is empty. Always provide an initial value." },
      { code: `const obj = { x: 1 };\nconst frozen = Object.freeze(obj);\nfrozen.x = 99;\nconsole.log(frozen.x);`, error: "Silently fails — frozen object not modified", options: ["Object.freeze prevents modification; frozen.x stays 1 (silently fails in non-strict mode)", "Object.freeze is wrong", "frozen.x is wrong", "const is wrong"], answer: 0, explanation: "Attempting to modify a frozen object silently fails in non-strict mode (throws in strict mode)." },
      { code: `class A {\n  constructor() {\n    this.name = this.getName();\n  }\n  getName() { return 'A'; }\n}\nclass B extends A {\n  getName() { return 'B'; }\n}\nconsole.log(new B().name);`, error: "Virtual dispatch in constructor — getName() resolves to B", options: ["B's getName() is called during A's constructor — name is 'B', not 'A'", "constructor is wrong", "extends is wrong", "console.log is wrong"], answer: 0, explanation: "JavaScript resolves methods polymorphically. During A's constructor, this is a B instance so B.getName() runs." },
      { code: `const a = [1, 2, 3];\nconst b = [1, 2, 3];\nconsole.log(a == b);\nconsole.log(a === b);`, error: "Array equality always false — different references", options: ["Arrays are compared by reference — both == and === return false", "const is wrong", "console.log is wrong", "=== is wrong"], answer: 0, explanation: "Arrays (and all objects) are compared by reference in JavaScript. Two separate arrays are never equal with == or ===." },
    ],
  },

  dsa: {
    easy: [
      { code: `function linearSearch(arr, target) {\n  for (let i = 0; i <= arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}`, error: "Off-by-one in loop condition", options: ["i <= arr.length accesses arr[arr.length] which is undefined", "return -1 is wrong", "=== is wrong", "let i = 0 is wrong"], answer: 0, explanation: "Loop should use i < arr.length. i <= arr.length goes one past the last valid index." },
      { code: `function factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n);\n}`, error: "Infinite recursion — missing base case progression", options: ["Should call factorial(n-1) not factorial(n)", "return 1 is wrong", "=== is wrong", "function is wrong"], answer: 0, explanation: "factorial(n) calls itself with the same n forever. Use factorial(n-1)." },
      { code: `function reverseString(s) {\n  return s.split("").reverse;\n}`, error: "reverse not called — missing parentheses", options: [".reverse should be .reverse() to invoke the method", "split is wrong", "return is wrong", "s.split is wrong"], answer: 0, explanation: ".reverse is a reference to the method. You need .reverse() to call it." },
      { code: `function isPalindrome(s) {\n  return s == s.split("").reverse().join("");\n}`, error: "Using == instead of === for string comparison", options: ["Use === for strict equality — == may coerce types unexpectedly", "split is wrong", "reverse is wrong", "join is wrong"], answer: 0, explanation: "Always use === for comparisons in JavaScript to avoid type coercion surprises." },
      { code: `function binarySearch(arr, t) {\n  let lo = 0, hi = arr.length;\n  while (lo < hi) {\n    let mid = Math.floor((lo + hi) / 2);\n    if (arr[mid] === t) return mid;\n    else if (arr[mid] < t) lo = mid;\n    else hi = mid;\n  }\n  return -1;\n}`, error: "lo = mid causes infinite loop", options: ["Should be lo = mid + 1 to ensure progress past mid", "hi = mid is wrong", "Math.floor is wrong", "while is wrong"], answer: 0, explanation: "Setting lo = mid can cause an infinite loop when lo + 1 == hi. Use lo = mid + 1." },
      { code: `function sumArray(arr) {\n  let sum = 0;\n  for (let i = 1; i < arr.length; i++) {\n    sum += arr[i];\n  }\n  return sum;\n}`, error: "Loop starts at 1 — misses first element", options: ["Loop should start at i = 0 to include arr[0]", "return sum is wrong", "+= is wrong", "let sum = 0 is wrong"], answer: 0, explanation: "Starting the loop at i = 1 skips arr[0], giving an incorrect sum." },
      { code: `function maxElement(arr) {\n  let max = 0;\n  for (const n of arr) {\n    if (n > max) max = n;\n  }\n  return max;\n}`, error: "Initial max = 0 fails for all-negative arrays", options: ["If all elements are negative, max stays 0 — use arr[0] as initial value", "for...of is wrong", "return max is wrong", "const n is wrong"], answer: 0, explanation: "Initializing max to 0 gives wrong results for arrays with all negative numbers." },
      { code: `function countOccurrences(arr, val) {\n  let count = 0;\n  for (const x of arr) {\n    if (x = val) count++;\n  }\n  return count;\n}`, error: "Assignment instead of comparison", options: ["x = val assigns val to x (always truthy) — use x === val", "count++ is wrong", "for...of is wrong", "return count is wrong"], answer: 0, explanation: "x = val assigns the value. Use x === val to compare." },
      { code: `function removeDuplicates(arr) {\n  return [...new Map(arr)];\n}`, error: "Map should be Set for deduplication", options: ["Use new Set(arr) not new Map(arr) to remove duplicates", "spread is wrong", "return is wrong", "arr is wrong"], answer: 0, explanation: "Set stores unique values. Map stores key-value pairs. Use new Set(arr) for deduplication." },
      { code: `function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = 0; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) return [i, j];\n    }\n  }\n}`, error: "Inner loop allows j = i — same element used twice", options: ["j should start at i+1 to avoid using same index twice", "return [i,j] is wrong", "=== is wrong", "outer loop is wrong"], answer: 0, explanation: "Both loops start at 0, so i and j can be equal, using the same element twice." },
    ],
    medium: [
      { code: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\nfunction merge(l, r) {\n  const res = [];\n  while (l.length && r.length) {\n    res.push(l[0] < r[0] ? l.shift() : r.shift());\n  }\n  return res.concat(l, r);\n}`, error: "Array.shift() is O(n) — inefficient merge", options: ["Using shift() inside loop makes merge O(n²) — use index pointers instead", "concat is wrong", "slice is wrong", "push is wrong"], answer: 0, explanation: "shift() removes from the front of an array in O(n). Use index pointers for O(n) merge." },
      { code: `function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[0];\n  const left = arr.filter(x => x < pivot);\n  const right = arr.filter(x => x > pivot);\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}`, error: "Duplicates of pivot are lost", options: ["x > pivot and x < pivot both exclude elements equal to pivot", "filter is wrong", "spread is wrong", "arr[0] is wrong"], answer: 0, explanation: "Elements equal to pivot are excluded from both left and right. Use x >= pivot or include pivot multiple times." },
      { code: `class Stack {\n  constructor() { this.items = []; }\n  push(el) { this.items.push(el); }\n  pop() { return this.items.pop(); }\n  peek() { return this.items[this.items.length]; }\n}`, error: "peek() off-by-one — returns undefined", options: ["Last index is items.length-1, not items.length", "push is wrong", "pop is wrong", "constructor is wrong"], answer: 0, explanation: "Array last index is length - 1. items[items.length] is always undefined." },
      { code: `function hasCycle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}`, error: "Fast pointer only advances one step", options: ["Fast should advance two steps: fast = fast.next.next", "slow = slow.next is wrong", "return true is wrong", "while condition is wrong"], answer: 0, explanation: "Floyd's cycle detection requires fast to move 2 steps. fast = fast.next only moves 1." },
      { code: `function isBalanced(s) {\n  const stack = [];\n  for (const c of s) {\n    if ('([{'.includes(c)) stack.push(c);\n    else {\n      if (stack.pop() !== c) return false;\n    }\n  }\n  return stack.length === 0;\n}`, error: "Closing bracket compared to opening bracket directly", options: ["stack.pop() gives opening bracket but c is closing — need matching check", "stack.push is wrong", "includes is wrong", "return is wrong"], answer: 0, explanation: "You need to check that the popped opening bracket matches the corresponding closing bracket." },
      { code: `function dijkstra(graph, start) {\n  const dist = {};\n  const visited = new Set();\n  dist[start] = 0;\n  while (true) {\n    const node = getMinDist(dist, visited);\n    if (!node) break;\n    visited.add(node);\n    for (const [n, w] of graph[node]) {\n      dist[n] = dist[node] + w;\n    }\n  }\n  return dist;\n}`, error: "Distance not compared before updating", options: ["Should update dist[n] only if dist[node] + w < dist[n]", "visited is wrong", "while is wrong", "for...of is wrong"], answer: 0, explanation: "Dijkstra requires checking if the new path is shorter before updating the distance." },
      { code: `function nthFibonacci(n) {\n  const dp = [0, 1];\n  for (let i = 2; i <= n; i++) {\n    dp[i] = dp[i-1] + dp[i-2];\n  }\n  return dp[n];\n}`, error: "Correct DP Fibonacci — no error for n >= 0", options: ["This code is actually correct for n >= 0", "dp = [0, 1] is wrong", "for loop is wrong", "return dp[n] is wrong"], answer: 0, explanation: "This is valid dynamic programming for Fibonacci numbers." },
      { code: `function bfs(graph, start) {\n  const visited = new Set();\n  const queue = [start];\n  while (queue.length) {\n    const node = queue.pop();\n    if (visited.has(node)) continue;\n    visited.add(node);\n    for (const n of graph[node]) queue.push(n);\n  }\n}`, error: "Using pop() instead of shift() makes it DFS not BFS", options: ["pop() removes from end (LIFO) — use shift() for FIFO queue behavior", "visited.has is wrong", "queue.push is wrong", "while is wrong"], answer: 0, explanation: "BFS needs a queue (FIFO). Array.pop() removes from the end, making it a stack (DFS behavior)." },
      { code: `function longestCommonSubsequence(a, b) {\n  const dp = Array(a.length).fill(0).map(() => Array(b.length).fill(0));\n  for (let i = 1; i <= a.length; i++) {\n    for (let j = 1; j <= b.length; j++) {\n      if (a[i] === b[j]) dp[i][j] = dp[i-1][j-1] + 1;\n      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);\n    }\n  }\n  return dp[a.length][b.length];\n}`, error: "DP table size too small — index out of bounds", options: ["Table is (a.length x b.length) but loop needs (a.length+1 x b.length+1)", "Array.fill is wrong", "Math.max is wrong", "return is wrong"], answer: 0, explanation: "LCS DP needs a (m+1)×(n+1) table. Creating it with m×n causes index out of bounds." },
      { code: `function treeHeight(root) {\n  if (!root) return 0;\n  return 1 + Math.max(treeHeight(root.left), treeHeight(root.right));\n}\n// Called 1000 times on same tree`, error: "Repeated computation — exponential time without memoization", options: ["Recursive calls recompute subtree heights every call — cache results", "Math.max is wrong", "return 0 is wrong", "root.left is wrong"], answer: 0, explanation: "Without memoization, treeHeight recomputes all subtree heights on every call. Cache results." },
    ],
    hard: [
      { code: `function knapsack(weights, values, W) {\n  const n = weights.length;\n  const dp = Array(W+1).fill(0);\n  for (let i = 0; i < n; i++) {\n    for (let w = 0; w <= W; w++) {\n      if (weights[i] <= w)\n        dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);\n    }\n  }\n  return dp[W];\n}`, error: "Inner loop direction wrong — unbounded knapsack instead of 0/1", options: ["0/1 knapsack needs inner loop from W down to weights[i], not 0 to W", "dp = Array is wrong", "Math.max is wrong", "return dp[W] is wrong"], answer: 0, explanation: "Forward iteration allows an item to be used multiple times (unbounded). Iterate w from W down to weights[i] for 0/1 knapsack." },
      { code: `class MinHeap {\n  constructor() { this.heap = []; }\n  push(val) {\n    this.heap.push(val);\n    this._bubbleUp(this.heap.length - 1);\n  }\n  _bubbleUp(i) {\n    while (i > 0) {\n      const parent = Math.floor((i - 1) / 2);\n      if (this.heap[parent] > this.heap[i]) {\n        [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];\n        i = i;\n      } else break;\n    }\n  }\n}`, error: "i = i doesn't update index after swap", options: ["After swapping, i should become parent to continue bubbling up", "Math.floor is wrong", "push is wrong", "while i > 0 is wrong"], answer: 0, explanation: "After swapping with the parent, i must be set to parent to continue the bubble-up process." },
      { code: `function topologicalSort(graph) {\n  const visited = new Set();\n  const result = [];\n  function dfs(node) {\n    visited.add(node);\n    for (const n of graph[node]) {\n      if (!visited.has(n)) dfs(n);\n    }\n    result.push(node);\n  }\n  for (const node of Object.keys(graph)) dfs(node);\n  return result;\n}`, error: "No cycle detection — infinite loop on cyclic graph", options: ["Topological sort only works on DAGs — no check for back edges (cycles)", "result.push is wrong", "dfs is wrong", "visited.add is wrong"], answer: 0, explanation: "Without cycle detection, this will recurse infinitely on cyclic graphs. Add a 'processing' set to detect back edges." },
      { code: `function countIslands(grid) {\n  let count = 0;\n  function dfs(r, c) {\n    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) return;\n    if (grid[r][c] !== '1') return;\n    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);\n  }\n  for (let r = 0; r < grid.length; r++)\n    for (let c = 0; c < grid[0].length; c++)\n      if (grid[r][c] === '1') { count++; dfs(r,c); }\n  return count;\n}`, error: "Cell not marked visited — infinite recursion", options: ["grid[r][c] is never set to '0' after visiting — causes infinite DFS", "count++ is wrong", "dfs calls are wrong", "return count is wrong"], answer: 0, explanation: "Without marking visited cells (set to '0'), DFS will revisit cells and recurse infinitely." },
      { code: `function slidingWindowMax(nums, k) {\n  const result = [];\n  for (let i = 0; i <= nums.length - k; i++) {\n    let max = nums[i];\n    for (let j = i; j < i + k; j++) {\n      max = Math.max(max, nums[j]);\n    }\n    result.push(max);\n  }\n  return result;\n}`, error: "O(n*k) brute force — should use deque for O(n)", options: ["Nested loop is O(n*k) — optimal solution uses a monotonic deque in O(n)", "Math.max is wrong", "result.push is wrong", "for loop is wrong"], answer: 0, explanation: "Brute force sliding window max is O(n*k). A monotonic deque gives O(n) time complexity." },
      { code: `function longestPalindrome(s) {\n  let result = '';\n  for (let i = 0; i < s.length; i++) {\n    expand(i, i);\n    expand(i, i+1);\n  }\n  function expand(l, r) {\n    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }\n    if (r - l - 1 > result.length) result = s.slice(l, r);\n  }\n  return result;\n}`, error: "slice indices wrong — l was decremented one extra", options: ["After while, l is one past the palindrome start — use s.slice(l+1, r)", "expand is wrong", "while is wrong", "let result = '' is wrong"], answer: 0, explanation: "The while loop exits with l one position before the palindrome start. Use s.slice(l+1, r)." },
      { code: `function wordBreak(s, wordDict) {\n  const set = new Set(wordDict);\n  const dp = Array(s.length + 1).fill(false);\n  dp[0] = true;\n  for (let i = 1; i <= s.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (dp[j] && set.has(s.slice(i, j))) { dp[i] = true; break; }\n    }\n  }\n  return dp[s.length];\n}`, error: "slice arguments reversed", options: ["Should be s.slice(j, i) not s.slice(i, j)", "dp[0] = true is wrong", "set.has is wrong", "for loop is wrong"], answer: 0, explanation: "s.slice(i, j) when i > j returns an empty string. The substring from j to i should be s.slice(j, i)." },
      { code: `function robHouses(nums) {\n  let prev2 = 0, prev1 = 0;\n  for (const n of nums) {\n    const curr = Math.max(prev1, prev2 + n);\n    prev1 = curr;\n    prev2 = prev1;\n  }\n  return prev1;\n}`, error: "prev2 updated after prev1 — loses old prev1 value", options: ["prev2 should be set to old prev1 before prev1 is updated", "Math.max is wrong", "return prev1 is wrong", "const curr is wrong"], answer: 0, explanation: "prev2 = prev1 after prev1 = curr stores the new value, not the old prev1. Swap assignment order." },
      { code: `class TrieNode {\n  constructor() { this.children = {}; this.isEnd = false; }\n}\nclass Trie {\n  constructor() { this.root = new TrieNode(); }\n  insert(word) {\n    let node = this.root;\n    for (const c of word) {\n      if (!node.children[c]) node.children[c] = new TrieNode();\n      node = node.children[c];\n    }\n  }\n  search(word) {\n    let node = this.root;\n    for (const c of word) {\n      if (!node.children[c]) return false;\n      node = node.children[c];\n    }\n    return true;\n  }\n}`, error: "search() doesn't check isEnd — prefix matches as full word", options: ["Should return node.isEnd not true — otherwise prefixes match as words", "insert is wrong", "TrieNode is wrong", "constructor is wrong"], answer: 0, explanation: "Returning true at the end of search matches any prefix as a full word. Return node.isEnd instead." },
      { code: `function numWays(n, k) {\n  if (n === 0) return 0;\n  if (n === 1) return k;\n  let same = k, diff = k * (k - 1);\n  for (let i = 3; i <= n; i++) {\n    const total = same + diff;\n    same = diff;\n    diff = total * (k - 1);\n  }\n  return same + diff;\n}`, error: "Correct paint fence DP — no error", options: ["This is valid paint fence DP returning correct total", "same = diff is wrong", "diff = total*(k-1) is wrong", "return same + diff is wrong"], answer: 0, explanation: "This correctly implements the paint fence DP algorithm." },
    ],
  },
};

// Normalise URL param to question bank key
// URL might be "web", "webdev", "Web Dev", etc.
const normaliseLangKey = (langId) => {
  if (!langId) return null;
  const lower = langId.toLowerCase().replace(/[^a-z]/g, "");
  if (lower === "webdev" || lower === "web") return "web";
  if (lower === "cpp" || lower === "c++") return "cpp";
  return lower;
};

const languageLabels = {
  python: "Python", c: "C", cpp: "C++",
  java: "Java", sql: "SQL", web: "Web Dev",
  webdev: "Web Dev", dsa: "DSA",
};

const levelConfig = {
  easy:   { label: "Easy",   color: "#7C3AED", lives: 3, timeLimit: 35 },
  medium: { label: "Medium", color: "#D97706", lives: 3, timeLimit: 25 },
  hard:   { label: "Hard",   color: "#DC2626", lives: 3, timeLimit: 18 },
};

const TOTAL_Q    = 10;
const PASS_SCORE = 8;
const LETTERS    = ["A", "B", "C", "D"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function fetchFromAPI(language, level) {
  const prompt = `Generate exactly 10 "trace the error" coding questions for ${language} at ${level} difficulty.
Each question shows buggy code and asks what the error is.
Return ONLY valid JSON array, no markdown, no extra text:
[{"code":"...","error":"description","options":["correct error description","wrong option 1","wrong option 2","wrong option 3"],"answer":0,"explanation":"..."}]
Rules: answer is always index 0 in the options array. Make options realistic and plausible. Code should be 3-8 lines.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }]
    }),
  });
  const data = await res.json();
  const text = data.content.map(i => i.text || "").join("");
  const cleaned = text.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
  return JSON.parse(cleaned);
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
const TraceTheError = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { gameId, langId, level } = useParams();
  const { user }  = useAuth();

  // ── Pass & Play state ──────────────────────────────────────────────────────
  const { passAndPlay, player1, player2 } = location.state || {};
  const playerNames  = [player1 || "Player 1", player2 || "Player 2"];
  const playerColors = ["#7C3AED", "#0891b2"];
  const [pnpScores,   setPnpScores]   = useState([0, 0]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [showHandoff, setShowHandoff] = useState(false);
  const [nextTurnIdx, setNextTurnIdx] = useState(1);

  const lang    = languageLabels[langId] ?? langId;
  const lvl     = levelConfig[level] ?? levelConfig.easy;
  const bankKey = normaliseLangKey(langId);

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

  // ── Load questions ────────────────────────────────────────────────────────
  const loadQuestions = useCallback(async () => {
    setPhase("loading");
    clearTimer();

    const bank = QUESTION_BANK[bankKey]?.[level];

    const makeSet = (raw) =>
      shuffle(raw && raw.length ? raw : []).slice(0, TOTAL_Q)
        .map(q => {
          const answerText = q.options[q.answer];
          const shuffled   = shuffle([...q.options]);
          return { ...q, options: shuffled, answer: shuffled.indexOf(answerText) };
        });

    let raw = bank && bank.length >= TOTAL_Q ? bank : null;
    if (!raw) {
      try {
        raw = await fetchFromAPI(lang, level);
      } catch (e) {
        console.error("API fetch failed, using bank fallback:", e);
        raw = bank ?? [];
      }
    }

    setQuestions(makeSet(raw));
    setCurrent(0); setSelected(null); setShowExp(false);
    setLives(lvl.lives); setScore(0); setWrong(0);
    setPnpScores([0, 0]); setCurrentTurn(0);
    setAnimKey(k => k + 1);
    resetTimer();
    setPhase("quiz");
  }, [bankKey, level, lang, lvl.lives, resetTimer]);

  useEffect(() => { loadQuestions(); }, [loadQuestions]);

  const q        = questions[current];
  const progress = questions.length ? (current / TOTAL_Q) * 100 : 0;
  const answered = selected !== null || timedOut;
  const isCorrect = selected !== null && selected === q?.answer;

  // ── Answer handler ────────────────────────────────────────────────────────
  const handleAnswer = (idx) => {
    if (answered || !q) return;
    clearTimer();
    setSelected(idx);
    setShowExp(true);

    const correct = idx === q.answer;
    if (correct) {
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

  // ── Next handler ──────────────────────────────────────────────────────────
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

  // ── Shared style helpers ──────────────────────────────────────────────────
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
    <div style={{ minHeight: "100vh", background: nextTurnIdx === 0 ? "#2D1B69" : "#0C3D52", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
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
              {tied ? "Both players spotted the same number of bugs!" : `${playerNames[winner]} caught more bugs!`}
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

        /* Responsive layout */
        .tte-container {
          flex: 1;
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
          padding: 20px 16px 48px;
          box-sizing: border-box;
        }
        .tte-topbar {
          background: #FFF;
          border-bottom: 1px solid #E8E2DA;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .tte-score-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          background: #FFF;
          border: 1px solid #E8E2DA;
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 18px;
        }
        .tte-score-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 6px;
          gap: 2px;
        }
        .tte-code-pre {
          margin: 0;
          font-size: 13px;
          font-family: 'Fira Code','Cascadia Code','Consolas',monospace;
          color: #E2E8F0;
          overflow-x: auto;
          line-height: 1.75;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .tte-opt-btn {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 12px;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: transform 0.15s, border-color 0.15s, background 0.15s;
        }
        .tte-opt-btn:hover:not(:disabled) {
          transform: translateX(4px);
        }
        .tte-opt-text { font-size: 14px; font-weight: 500; line-height: 1.5; flex: 1; }
        .tte-next-btn { transition: opacity 0.15s, transform 0.1s; }
        .tte-next-btn:hover { opacity: 0.88; }
        .tte-next-btn:active { transform: scale(0.97); }
        .tte-exit-btn:hover { background: #EDE8E1 !important; }

        @media (max-width: 480px) {
          .tte-topbar { padding: 8px 12px; gap: 8px; }
          .tte-container { padding: 12px 10px 40px; }
          .tte-score-grid { grid-template-columns: 1fr 1fr; }
          .tte-score-cell { padding: 8px 4px; }
          .tte-score-num { font-size: 16px !important; }
          .tte-score-lbl { font-size: 9px !important; }
          .tte-code-pre { font-size: 11px !important; }
          .tte-opt-text { font-size: 13px !important; }
          .tte-meta-row { flex-direction: column; gap: 4px; }
          .tte-opt-btn { padding: 10px 12px; }
        }
        @media (max-width: 360px) {
          .tte-code-pre { font-size: 10px !important; }
          .tte-opt-text { font-size: 12px !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#F5F0EB", fontFamily: "'Segoe UI','Inter',system-ui,sans-serif", display: "flex", flexDirection: "column" }}>

        {/* TOP BAR */}
        <div className="tte-topbar">
          <button
            className="tte-exit-btn"
            onClick={() => { clearTimer(); navigate(passAndPlay ? "/pass-and-play" : `/games/${gameId}/level/${langId}`); }}
            style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1.5px solid #E0D8CF", background: "#F5F0EB", cursor: "pointer", fontSize: "15px", color: "#6B6560", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
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
        <div className="tte-container">

          {/* Meta row */}
          <div className="tte-meta-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#0891b2" }}>
              🐛 Trace the Error • {lang} • {lvl.label}
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
          <div className="tte-score-grid">
            {[
              { num: passAndPlay ? pnpScores[0] : score, lbl: passAndPlay ? (playerNames[0].split(" ")[0] || "P1") : "Correct", color: "#16A34A" },
              { num: passAndPlay ? pnpScores[1] : wrong,  lbl: passAndPlay ? (playerNames[1].split(" ")[0] || "P2") : "Wrong",   color: passAndPlay ? "#0891b2" : "#DC2626" },
              { num: PASS_SCORE,                          lbl: "To Pass",  color: "#D97706" },
              { num: `${lvl.timeLimit}s`,                 lbl: "Per Q",    color: "#6366F1" },
            ].map((s, i, arr) => (
              <div key={s.lbl} className="tte-score-cell" style={{ borderRight: i < arr.length - 1 ? "1px solid #EDE8E1" : "none" }}>
                <span className="tte-score-num" style={{ fontSize: "18px", fontWeight: "700", lineHeight: 1, color: s.color }}>{s.num}</span>
                <span className="tte-score-lbl" style={{ fontSize: "10px", color: "#A09890", fontWeight: "600", letterSpacing: "0.6px", textTransform: "uppercase" }}>{s.lbl}</span>
              </div>
            ))}
          </div>

          {/* Question area */}
          <div key={animKey} className="q-enter">

            {/* Timed-out banner */}
            {timedOut && (
              <div className="exp-enter timed-out-shake" style={{ background: "#FEF3C7", border: "1.5px solid #FCD34D", borderRadius: "12px", padding: "11px 16px", fontSize: "14px", color: "#92400E", marginBottom: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "20px" }}>⏰</span>
                <span>Time's up! The error was:&nbsp;
                  <span style={{ background: "#FDE68A", padding: "2px 8px", borderRadius: "6px", fontWeight: "800" }}>
                    {q?.error}
                  </span>
                </span>
              </div>
            )}

            <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#A09890", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
              Find the error in this code:
            </span>

            {/* Code block */}
            <div style={{ background: "#1E1B2E", borderRadius: "14px", padding: "16px", marginBottom: "14px", overflow: "auto" }}>
              <div style={{ display: "flex", gap: "6px", marginBottom: "12px", alignItems: "center" }}>
                {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
                  <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                ))}
                <span style={{ marginLeft: "auto", fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>{bankKey}</span>
              </div>
              <pre className="tte-code-pre">
                <code>{q?.code}</code>
              </pre>
            </div>

            <p style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "12px" }}>
              ❓ What is the error?
            </p>

            {/* Choices */}
            <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "14px" }}>
              {q?.options?.map((opt, i) => {
                const isAns = i === q.answer, isSel = i === selected;
                let bg = "#FFF", border = "#E8E2DA", txtClr = "#1C1814";
                let letBg = "#F5F0EB", letClr = "#6B6560", letBorder = "#DDD7CE";
                if (answered) {
                  if (isAns)      { bg = "#F0FDF4"; border = "#86EFAC"; txtClr = "#166534"; letBg = "#DCFCE7"; letClr = "#15803D"; letBorder = "#86EFAC"; }
                  else if (isSel) { bg = "#FEF2F2"; border = "#FECACA"; txtClr = "#991B1B"; letBg = "#FEE2E2"; letClr = "#B91C1C"; letBorder = "#FECACA"; }
                  else            { bg = "#FAFAF8"; border = "#EDE8E1"; txtClr = "#C0B8B0"; letClr = "#C0B8B0"; }
                }
                return (
                  <button
                    key={i}
                    className="tte-opt-btn"
                    disabled={answered}
                    onClick={() => handleAnswer(i)}
                    style={{ background: bg, border: `1.5px solid ${border}` }}
                  >
                    <span style={{ width: "28px", height: "28px", borderRadius: "50%", border: `1.5px solid ${letBorder}`, background: letBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: letClr, flexShrink: 0, fontFamily: "monospace", marginTop: "1px" }}>
                      {LETTERS[i]}
                    </span>
                    <span className="tte-opt-text" style={{ color: txtClr }}>
                      {opt}
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
                      Error: <code style={{ fontFamily: "monospace", background: "#DCFCE7", padding: "1px 6px", borderRadius: "4px" }}>{q.error}</code>
                    </span>
                  )}
                </span>
                {q.explanation}
              </div>
            )}

            {/* Next button */}
            {answered && (
              <div className="exp-enter" style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  className="tte-next-btn"
                  onClick={handleNext}
                  style={{ background: passAndPlay ? playerColors[currentTurn] : lvl.color, color: "#FFF", border: "none", borderRadius: "12px", padding: "12px 24px", fontSize: "15px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 14px rgba(0,0,0,0.2)" }}
                >
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

export default TraceTheError;