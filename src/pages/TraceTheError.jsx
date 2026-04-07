import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useCallback, useRef } from "react";

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
  java: {
    easy: [
      { code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello")\n    }\n}`, error: "Missing semicolon", options: ["Missing semicolon after println statement", "Main class is wrong", "args is wrong", "String is wrong"], answer: 0, explanation: "Java statements must end with a semicolon ';'." },
      { code: `int x = "hello";`, error: "Type mismatch", options: ["Cannot assign String to int variable", "int is wrong", "hello needs no quotes", "x is wrong"], answer: 0, explanation: "int can only hold integer values, not String values." },
      { code: `public class main {\n    public static void main(String[] args) {}\n}`, error: "Class name not capitalized", options: ["Class name 'main' should be 'Main' (capitalized)", "main method is wrong", "args is wrong", "public is wrong"], answer: 0, explanation: "Java class names should start with a capital letter by convention, and the file must match." },
      { code: `int[] arr = new int[5];\nSystem.out.println(arr[5]);`, error: "ArrayIndexOutOfBoundsException", options: ["Index 5 is out of bounds for array of size 5", "arr is wrong", "int[] is wrong", "println is wrong"], answer: 0, explanation: "An array of size 5 has valid indices 0-4. Index 5 throws ArrayIndexOutOfBoundsException." },
      { code: `String s = null;\nSystem.out.println(s.length());`, error: "NullPointerException", options: ["s is null, calling .length() throws NullPointerException", "length is wrong", "String is wrong", "println is wrong"], answer: 0, explanation: "Calling methods on a null reference throws NullPointerException." },
      { code: `for (int i = 0; i <= 5; i++) {\n    System.out.println(arr[i]);\n}`, error: "Loop goes one index too far", options: ["i <= 5 causes index 5 which is out of bounds for size-5 array", "for syntax is wrong", "println is wrong", "arr is wrong"], answer: 0, explanation: "For an array of size 5, the loop should use i < 5, not i <= 5." },
      { code: `int result = 5 / 2;\nSystem.out.println(result);`, error: "Integer division truncates decimal", options: ["5/2 in integer division gives 2, not 2.5", "result is wrong", "println is wrong", "int is wrong"], answer: 0, explanation: "Integer division truncates the decimal. Use double result = 5.0 / 2 to get 2.5." },
      { code: `if (x = 5) {\n    System.out.println("five");\n}`, error: "Assignment instead of comparison", options: ["= is assignment, should use == for comparison", "if syntax is wrong", "println is wrong", "x is wrong"], answer: 0, explanation: "= assigns a value, == compares values. Java if condition needs ==." },
      { code: `public static void main(String[] args) {\n    System.out.println(x);\n    int x = 10;\n}`, error: "Variable used before declaration", options: ["x is used before it is declared", "int is wrong", "println is wrong", "main is wrong"], answer: 0, explanation: "In Java, variables must be declared before use. Move int x = 10 before println." },
      { code: `String a = "hello";\nString b = "hello";\nif (a == b) System.out.println("equal");`, error: "String comparison with ==", options: ["== compares references, not content — use .equals()", "String is wrong", "if syntax is wrong", "println is wrong"], answer: 0, explanation: "== checks reference equality for objects. Use a.equals(b) to compare String content." },
    ],
    medium: [
      { code: `List<int> list = new ArrayList<>();`, error: "Cannot use primitive type in generics", options: ["Use Integer instead of int in generics", "List is wrong", "ArrayList is wrong", "new is wrong"], answer: 0, explanation: "Java generics require wrapper types. Use List<Integer> instead of List<int>." },
      { code: `public class Animal {\n    void speak() {}\n}\npublic class Dog extends Animal {\n    @Override\n    void Speak() {}\n}`, error: "Method name doesn't match override", options: ["Speak() doesn't match speak() — @Override will fail", "extends is wrong", "void is wrong", "Animal is wrong"], answer: 0, explanation: "@Override requires exact method signature match including name. speak() ≠ Speak()." },
      { code: `try {\n    int x = 1/0;\n} catch (Exception e) {\n    System.out.println(e);\n} finally {\n    return;\n}`, error: "return in finally suppresses exception", options: ["return in finally block suppresses any thrown exception", "try is wrong", "catch is wrong", "finally is wrong"], answer: 0, explanation: "A return in finally block overrides any exception or return in try/catch blocks." },
      { code: `HashMap<String, Integer> map = new HashMap<>();\nmap.put("a", 1);\nint val = map.get("b");`, error: "NullPointerException from missing key", options: ["map.get('b') returns null, unboxing null to int throws NPE", "HashMap is wrong", "put is wrong", "int is wrong"], answer: 0, explanation: "map.get('b') returns null (key doesn't exist). Auto-unboxing null to int throws NullPointerException." },
      { code: `for (String s : list) {\n    if (s.equals("remove"))\n        list.remove(s);\n}`, error: "ConcurrentModificationException", options: ["Removing from list while iterating throws ConcurrentModificationException", "for-each is wrong", "equals is wrong", "remove is wrong"], answer: 0, explanation: "You can't modify a collection while iterating it with for-each. Use Iterator.remove() instead." },
      { code: `int[] arr = {1, 2, 3};\nint[] copy = arr;\ncopy[0] = 99;\nSystem.out.println(arr[0]);`, error: "Array reference copy not value copy", options: ["copy = arr copies reference — both point to same array", "arr is wrong", "copy is wrong", "println is wrong"], answer: 0, explanation: "Arrays are objects. copy = arr copies the reference. Modifying copy also modifies arr." },
      { code: `String result = "";\nfor (int i = 0; i < 10000; i++)\n    result += i;`, error: "Inefficient string concatenation", options: ["String += in loop creates 10000 new String objects — use StringBuilder", "for is wrong", "result is wrong", "int is wrong"], answer: 0, explanation: "Strings are immutable. Each += creates a new String. Use StringBuilder.append() in loops." },
      { code: `Integer a = 200;\nInteger b = 200;\nSystem.out.println(a == b);`, error: "Integer cache only covers -128 to 127", options: ["== on Integer objects outside cache range compares references not values", "Integer is wrong", "println is wrong", "200 is wrong"], answer: 0, explanation: "Java caches Integer objects from -128 to 127. For 200, == compares references, giving false." },
      { code: `class Singleton {\n    private static Singleton instance;\n    public static Singleton getInstance() {\n        if (instance == null)\n            instance = new Singleton();\n        return instance;\n    }\n}`, error: "Not thread-safe singleton", options: ["getInstance is not synchronized — multiple threads may create multiple instances", "instance is wrong", "return is wrong", "class is wrong"], answer: 0, explanation: "Without synchronization, two threads can both see instance == null and create two instances." },
      { code: `public void process(List<Object> list) {}\n// called with:\nList<String> strings = new ArrayList<>();\nprocess(strings);`, error: "Generics are invariant", options: ["List<String> is not a subtype of List<Object>", "List is wrong", "void is wrong", "ArrayList is wrong"], answer: 0, explanation: "Java generics are invariant. List<String> cannot be passed where List<Object> is expected." },
    ],
    hard: [
      { code: `CompletableFuture.runAsync(() -> {\n    throw new RuntimeException("error");\n}).get();`, error: "Exception wrapped in ExecutionException", options: ["get() wraps exceptions in ExecutionException — must unwrap cause", "runAsync is wrong", "get is wrong", "throw is wrong"], answer: 0, explanation: "CompletableFuture.get() wraps exceptions in ExecutionException. Use getCause() to get original." },
      { code: `List<String> list = Arrays.asList("a", "b", "c");\nlist.add("d");`, error: "Fixed-size list from Arrays.asList", options: ["Arrays.asList returns fixed-size list — add() throws UnsupportedOperationException", "Arrays is wrong", "add is wrong", "List is wrong"], answer: 0, explanation: "Arrays.asList returns a fixed-size list backed by the array. add/remove throw UnsupportedOperationException." },
      { code: `void m(Object o) { System.out.println("Object"); }\nvoid m(String s) { System.out.println("String"); }\nObject x = "hello";\nm(x);`, error: "Method overloading resolved at compile time", options: ["m(x) calls Object version because overloading uses compile-time type", "Object is wrong", "String is wrong", "void is wrong"], answer: 0, explanation: "Overloading is resolved at compile time using the declared type. x is Object, so Object version is called." },
      { code: `class MyException extends Exception {}\npublic void foo() throws MyException {\n    throw new MyException();\n}\npublic void bar() {\n    foo();\n}`, error: "Checked exception not handled", options: ["bar() calls foo() but doesn't catch or declare MyException", "throw is wrong", "extends is wrong", "void is wrong"], answer: 0, explanation: "MyException is a checked exception. bar() must either catch it or declare throws MyException." },
      { code: `public class Token {\n    public final String value;\n    Token(String value) { this.value = value; }\n}\nToken t = new Token("x");\nt.value = "y";`, error: "Final field cannot be reassigned", options: ["final field value cannot be reassigned after construction", "Token is wrong", "String is wrong", "this is wrong"], answer: 0, explanation: "final fields can only be assigned once — in the constructor or at declaration. t.value = 'y' is a compile error." },
      { code: `long result = 2000000000 * 2000000000;`, error: "Integer overflow before assignment to long", options: ["Literal arithmetic done in int — overflows before assignment to long", "long is wrong", "result is wrong", "= is wrong"], answer: 0, explanation: "The multiplication happens in int (overflow) before being assigned to long. Use 2000000000L * 2000000000L." },
      { code: `@FunctionalInterface\ninterface Fn {\n    int apply(int x);\n    default int doubled(int x) { return apply(x) * 2; }\n    int negate(int x);\n}`, error: "Two abstract methods breaks @FunctionalInterface", options: ["Fn has two abstract methods (apply and negate) — not a valid functional interface", "@FunctionalInterface is wrong", "default is wrong", "int is wrong"], answer: 0, explanation: "@FunctionalInterface requires exactly one abstract method. apply() and negate() are both abstract." },
      { code: `try (Connection conn = getConnection()) {\n    conn.setAutoCommit(false);\n    executeQuery(conn);\n    conn.commit();\n}`, error: "Missing rollback on exception", options: ["If executeQuery throws, conn is closed without rollback", "try is wrong", "commit is wrong", "setAutoCommit is wrong"], answer: 0, explanation: "Without a catch block to call conn.rollback(), any exception leaves the transaction uncommitted." },
      { code: `class A {\n    static { System.out.println("A static"); }\n    { System.out.println("A instance"); }\n    A() { System.out.println("A constructor"); }\n}\nclass B extends A {\n    B() { System.out.println("B constructor"); }\n}`, error: "Wrong initialization order assumption", options: ["Order is: A static → A instance → A constructor → B constructor", "static is wrong", "extends is wrong", "B is wrong"], answer: 0, explanation: "Java init order: static blocks → instance blocks → constructor. Parent before child." },
      { code: `public class Outer {\n    int x = 10;\n    class Inner {\n        int x = 20;\n        void print() { System.out.println(x); }\n    }\n}`, error: "Ambiguous field access", options: ["x inside Inner refers to Inner.x (20) not Outer.x — use Outer.this.x", "class is wrong", "print is wrong", "int is wrong"], answer: 0, explanation: "Inside Inner, x refers to Inner's x. To access Outer's x use Outer.this.x." },
    ],
  },
  cpp: {
    easy: [
      { code: `#include <iostream>\nint main() {\n    cout << "Hello";\n}`, error: "Missing std:: or using namespace std", options: ["cout needs std:: prefix or 'using namespace std'", "include is wrong", "main is wrong", "return is missing"], answer: 0, explanation: "cout is in the std namespace. Use std::cout or add 'using namespace std;'." },
      { code: `int arr[5];\narr[5] = 10;`, error: "Array out of bounds", options: ["Index 5 is out of bounds for array of size 5", "arr is wrong", "int is wrong", "= is wrong"], answer: 0, explanation: "An array of size 5 has valid indices 0-4. Index 5 is undefined behavior." },
      { code: `int* ptr;\n*ptr = 42;`, error: "Uninitialized pointer dereference", options: ["ptr is uninitialized — dereferencing it is undefined behavior", "int* is wrong", "42 is wrong", "* is wrong"], answer: 0, explanation: "ptr points to a random memory location. Dereferencing it causes undefined behavior or crash." },
      { code: `int x = 5;\nint y = 0;\nint z = x / y;`, error: "Division by zero", options: ["Dividing by zero is undefined behavior in C++", "int is wrong", "x is wrong", "z is wrong"], answer: 0, explanation: "Integer division by zero is undefined behavior in C++. Always check divisor before dividing." },
      { code: `void swap(int a, int b) {\n    int tmp = a;\n    a = b;\n    b = tmp;\n}`, error: "Passed by value, original unchanged", options: ["a and b are copies — original variables are not swapped", "tmp is wrong", "void is wrong", "int is wrong"], answer: 0, explanation: "To swap originals, pass by reference: void swap(int& a, int& b)." },
      { code: `int* getVal() {\n    int x = 42;\n    return &x;\n}`, error: "Returning address of local variable", options: ["x is destroyed when function returns — dangling pointer", "int* is wrong", "return is wrong", "42 is wrong"], answer: 0, explanation: "Local variables are destroyed on function exit. Returning &x gives a dangling pointer." },
      { code: `int* p = new int(5);\ndelete p;\ncout << *p;`, error: "Use after delete (dangling pointer)", options: ["Accessing *p after delete is undefined behavior", "new is wrong", "delete is wrong", "cout is wrong"], answer: 0, explanation: "After delete, p is a dangling pointer. Dereferencing it is undefined behavior." },
      { code: `for (int i = 0; i < 10; i--) {\n    cout << i;\n}`, error: "Infinite loop — decrementing instead of incrementing", options: ["i-- decrements i making loop infinite", "for is wrong", "cout is wrong", "int is wrong"], answer: 0, explanation: "i-- makes i go negative forever. Should be i++ to count up to 10." },
      { code: `class Dog {\n    string name;\npublic:\n    void bark() { cout << name; }\n};`, error: "Missing #include for string", options: ["Need #include <string> to use string type", "class is wrong", "public is wrong", "void is wrong"], answer: 0, explanation: "The std::string type requires #include <string>." },
      { code: `string s = "hello";\ncout << s[10];`, error: "String index out of bounds", options: ["Index 10 is beyond string length — undefined behavior", "string is wrong", "cout is wrong", "s is wrong"], answer: 0, explanation: "s has 5 characters (indices 0-4). Accessing index 10 is undefined behavior." },
    ],
    medium: [
      { code: `int* arr = new int[10];\n// use arr\ndelete arr;`, error: "Wrong delete for array", options: ["Should use delete[] arr for array allocated with new[]", "new is wrong", "int* is wrong", "arr is wrong"], answer: 0, explanation: "Arrays allocated with new[] must be freed with delete[], not delete." },
      { code: `class MyClass {\n    int* data;\npublic:\n    MyClass() { data = new int[100]; }\n};`, error: "Missing destructor — memory leak", options: ["No destructor to delete[] data — memory leak on destruction", "int* is wrong", "new is wrong", "class is wrong"], answer: 0, explanation: "Without ~MyClass() { delete[] data; }, the heap memory leaks when the object is destroyed." },
      { code: `std::vector<int> v = {1,2,3};\nauto it = v.begin();\nv.push_back(4);\ncout << *it;`, error: "Iterator invalidated by push_back", options: ["push_back may reallocate vector — it is now invalid", "begin is wrong", "auto is wrong", "cout is wrong"], answer: 0, explanation: "push_back can trigger reallocation, invalidating all iterators. it is now a dangling iterator." },
      { code: `class Base {\npublic:\n    ~Base() {}\n};\nclass Derived : public Base {\n    int* data;\npublic:\n    Derived() { data = new int[10]; }\n    ~Derived() { delete[] data; }\n};\nBase* b = new Derived();\ndelete b;`, error: "Non-virtual destructor — derived destructor not called", options: ["~Base() must be virtual or Derived destructor won't be called", "delete is wrong", "Base is wrong", "Derived is wrong"], answer: 0, explanation: "Without virtual ~Base(), delete b calls only ~Base(), leaking Derived's data." },
      { code: `template<typename T>\nT add(T a, T b) { return a + b; }\nadd(1, 2.0);`, error: "Template type deduction conflict", options: ["1 is int and 2.0 is double — T can't be deduced", "template is wrong", "return is wrong", "typename is wrong"], answer: 0, explanation: "T must be one type. int and double conflict. Call add<double>(1, 2.0) to resolve." },
      { code: `shared_ptr<int> p1 = make_shared<int>(42);\nshared_ptr<int> p2(p1.get());`, error: "Double free via raw pointer to shared_ptr", options: ["Two shared_ptrs from same raw pointer cause double delete", "make_shared is wrong", "int is wrong", "get is wrong"], answer: 0, explanation: "p2 wraps the raw pointer without sharing ownership with p1. Both will delete the same memory." },
      { code: `struct Node {\n    shared_ptr<Node> next;\n    shared_ptr<Node> prev;\n};\nauto a = make_shared<Node>();\nauto b = make_shared<Node>();\na->next = b;\nb->prev = a;`, error: "Circular reference — memory leak", options: ["Circular shared_ptrs never reach zero refcount — memory leaks", "struct is wrong", "make_shared is wrong", "next is wrong"], answer: 0, explanation: "a and b reference each other, keeping refcount at 1. Use weak_ptr for back-references." },
      { code: `void process(vector<int> v) {\n    // modify v\n}`, error: "Vector passed by value — expensive copy", options: ["Passing vector by value copies all elements — use const reference", "void is wrong", "vector is wrong", "int is wrong"], answer: 0, explanation: "Passing by value copies the entire vector. Use const vector<int>& v for read-only access." },
      { code: `int x = 5;\nauto f = [&]() { return x * 2; };\nx = 10;\ncout << f();`, error: "Capture by reference — value changed after capture", options: ["[&] captures x by reference — f() returns 20 not 10", "auto is wrong", "return is wrong", "cout is wrong"], answer: 0, explanation: "Capture by reference means f() uses x's current value (10) when called, giving 20." },
      { code: `constexpr int size = -1;\nint arr[size];`, error: "Negative array size", options: ["Array size must be positive — negative size is ill-formed", "constexpr is wrong", "int is wrong", "arr is wrong"], answer: 0, explanation: "Array sizes must be positive integers. size = -1 makes the declaration ill-formed." },
    ],
    hard: [
      { code: `void foo(int& x) { x = 42; }\nfoo(5);`, error: "Cannot bind non-const reference to rvalue", options: ["5 is an rvalue — cannot bind to non-const lvalue reference", "void is wrong", "int& is wrong", "42 is wrong"], answer: 0, explanation: "Non-const lvalue references can't bind to rvalues like literals. Use int&& or const int&." },
      { code: `char* str = "hello";\nstr[0] = 'H';`, error: "Modifying string literal — undefined behavior", options: ["String literals are read-only — modification is UB", "char* is wrong", "str is wrong", "= is wrong"], answer: 0, explanation: "String literals live in read-only memory. Assigning to char* (not const char*) and modifying is UB." },
      { code: `int arr[3] = {1, 2, 3};\nint* p = arr + 5;\ncout << *p;`, error: "Pointer arithmetic out of bounds", options: ["arr+5 is past the end of array — dereferencing is UB", "int* is wrong", "arr is wrong", "cout is wrong"], answer: 0, explanation: "arr has 3 elements. arr+5 points far past the end. Dereferencing it is undefined behavior." },
      { code: `std::string s = "hello";\nconst char* p = s.c_str();\ns += " world";\nstd::cout << p;`, error: "c_str() pointer invalidated by string modification", options: ["s += may reallocate — p is now a dangling pointer", "c_str is wrong", "const is wrong", "cout is wrong"], answer: 0, explanation: "Modifying the string may trigger reallocation, invalidating the pointer returned by c_str()." },
      { code: `class Foo {\n    Foo(const Foo&) = delete;\n};\nFoo a;\nFoo b = a;`, error: "Copy constructor deleted", options: ["Copy constructor is deleted — Foo b = a is ill-formed", "class is wrong", "delete is wrong", "= is wrong"], answer: 0, explanation: "= delete on copy constructor prevents copying. Foo b = a won't compile." },
      { code: `void f(int n) {\n    int arr[n];\n}`, error: "VLA not standard in C++", options: ["Variable-length arrays are not standard C++ — use vector instead", "void is wrong", "int is wrong", "arr is wrong"], answer: 0, explanation: "VLAs (variable-length arrays) are a C99 feature. They are not part of standard C++. Use std::vector<int> arr(n)." },
      { code: `int x = 0;\nstd::thread t([&x]() { x++; });\nt.detach();\nstd::cout << x;`, error: "Race condition with detached thread", options: ["Detached thread may run after x is destroyed — data race", "thread is wrong", "detach is wrong", "cout is wrong"], answer: 0, explanation: "detach() lets thread run independently. If main exits first, x may be destroyed while thread uses it." },
      { code: `template<typename T>\nauto multiply(T a, T b) -> decltype(a * b) {\n    return a + b;\n}`, error: "Return type says multiply but returns addition", options: ["decltype says a*b but function returns a+b — logic error", "template is wrong", "auto is wrong", "decltype is wrong"], answer: 0, explanation: "The trailing return type decltype(a*b) is fine but the body returns a+b — the function name and implementation don't match." },
      { code: `struct S {\n    int x;\n    S(int x) : x(x) {}\n};\nS s = 5;`, error: "Implicit conversion may be unintended", options: ["S has implicit constructor allowing S s = 5 — should use explicit", "struct is wrong", "int is wrong", "= is wrong"], answer: 0, explanation: "Without explicit, S(int) allows implicit conversion. Use explicit S(int x) to prevent this." },
      { code: `class A {\npublic:\n    virtual void f() { cout << \"A\"; }\n    void g() { f(); }\n};\nclass B : public A {\n    void f() override { cout << \"B\"; }\n};\nA a; a.g();`, error: "Wrong expectation about virtual dispatch", options: ["g() calls f() virtually — B::f is not called since object is A", "virtual is wrong", "override is wrong", "g is wrong"], answer: 0, explanation: "Since a is type A (not B), virtual dispatch calls A::f. B::f is only called if the object is B." },
    ],
  },
  sql: {
    easy: [
      { code: `SELECT name age FROM users;`, error: "Missing comma between columns", options: ["Missing comma between name and age", "SELECT is wrong", "FROM is wrong", "users is wrong"], answer: 0, explanation: "Column names in SELECT must be separated by commas." },
      { code: `SELECT * FROM users WHERE name = Alice;`, error: "String value not quoted", options: ["Alice must be in quotes: WHERE name = 'Alice'", "SELECT is wrong", "WHERE is wrong", "* is wrong"], answer: 0, explanation: "String values in SQL must be wrapped in single quotes." },
      { code: `INSERT INTO users (name, age)\nVALUES ('Alice');`, error: "Column count mismatch", options: ["2 columns listed but only 1 value provided", "INSERT is wrong", "INTO is wrong", "VALUES is wrong"], answer: 0, explanation: "The number of values must match the number of columns listed." },
      { code: `SELECT * FROM users\nWHERE age > 18\nORDER name;`, error: "Missing BY in ORDER BY", options: ["Should be ORDER BY name not ORDER name", "SELECT is wrong", "WHERE is wrong", "FROM is wrong"], answer: 0, explanation: "The correct syntax is ORDER BY, not just ORDER." },
      { code: `UPDATE users\nWHERE name = 'Alice'\nSET age = 31;`, error: "SET must come before WHERE in UPDATE", options: ["SET clause must come before WHERE in UPDATE", "UPDATE is wrong", "WHERE is wrong", "age is wrong"], answer: 0, explanation: "Correct UPDATE syntax is: UPDATE table SET column=value WHERE condition." },
      { code: `SELECT COUNT(name) FROM users\nGROUP name;`, error: "Missing BY in GROUP BY", options: ["Should be GROUP BY name not GROUP name", "COUNT is wrong", "SELECT is wrong", "FROM is wrong"], answer: 0, explanation: "The correct syntax is GROUP BY, not just GROUP." },
      { code: `DELETE users WHERE id = 1;`, error: "Missing FROM in DELETE", options: ["Should be DELETE FROM users not DELETE users", "DELETE is wrong", "WHERE is wrong", "id is wrong"], answer: 0, explanation: "The correct syntax is DELETE FROM table WHERE condition." },
      { code: `SELECT * FROM users WHERE age BETWEEN 20 TO 30;`, error: "Wrong BETWEEN syntax", options: ["BETWEEN uses AND not TO: BETWEEN 20 AND 30", "SELECT is wrong", "WHERE is wrong", "age is wrong"], answer: 0, explanation: "BETWEEN syntax is: value BETWEEN low AND high." },
      { code: `SELECT name, COUNT(*)\nFROM users;`, error: "Missing GROUP BY for aggregate", options: ["COUNT(*) with non-aggregate column requires GROUP BY", "SELECT is wrong", "COUNT is wrong", "FROM is wrong"], answer: 0, explanation: "When mixing aggregate functions with non-aggregate columns, GROUP BY is required." },
      { code: `SELECT * FROM users\nWHERE name LIKE '%alice';`, error: "Case-sensitive LIKE may miss results", options: ["LIKE is case-sensitive in many DBs — 'Alice' won't match '%alice'", "LIKE is wrong", "WHERE is wrong", "SELECT is wrong"], answer: 0, explanation: "In most databases, LIKE is case-sensitive. Use ILIKE or LOWER(name) for case-insensitive search." },
    ],
    medium: [
      { code: `SELECT dept, COUNT(*)\nFROM employees\nWHERE COUNT(*) > 5\nGROUP BY dept;`, error: "Cannot use aggregate in WHERE", options: ["COUNT(*) in WHERE is invalid — use HAVING after GROUP BY", "SELECT is wrong", "GROUP BY is wrong", "FROM is wrong"], answer: 0, explanation: "Aggregate functions can't appear in WHERE. Use HAVING to filter aggregated results." },
      { code: `SELECT * FROM orders\nLEFT JOIN users ON orders.user_id = users.id\nWHERE users.name = 'Alice';`, error: "WHERE on LEFT JOIN nullifies the outer join", options: ["WHERE on right table column turns LEFT JOIN into INNER JOIN", "LEFT JOIN is wrong", "SELECT is wrong", "ON is wrong"], answer: 0, explanation: "Filtering on the right table in WHERE eliminates NULLs, effectively making it an INNER JOIN." },
      { code: `SELECT name, salary\nFROM employees\nORDER BY 3;`, error: "ORDER BY column index out of range", options: ["Only 2 columns selected — ORDER BY 3 is out of range", "SELECT is wrong", "FROM is wrong", "ORDER BY is wrong"], answer: 0, explanation: "ORDER BY 3 refers to the 3rd column, but only 2 columns are selected." },
      { code: `SELECT e.name, d.name\nFROM employees e\nJOIN departments d ON e.dept = d.id\nGROUP BY e.name;`, error: "d.name not in GROUP BY or aggregate", options: ["d.name must be in GROUP BY or wrapped in aggregate function", "JOIN is wrong", "SELECT is wrong", "FROM is wrong"], answer: 0, explanation: "In SQL, all non-aggregate columns in SELECT must appear in GROUP BY." },
      { code: `SELECT * FROM users\nUNION\nSELECT id, name, email FROM orders;`, error: "UNION column count mismatch", options: ["Both SELECT statements must have same number of columns", "UNION is wrong", "SELECT is wrong", "FROM is wrong"], answer: 0, explanation: "UNION requires both queries to have the same number of columns with compatible types." },
      { code: `UPDATE employees\nSET salary = salary * 1.1;`, error: "Missing WHERE — updates all rows", options: ["No WHERE clause — ALL employee salaries will be updated", "UPDATE is wrong", "SET is wrong", "salary is wrong"], answer: 0, explanation: "Without WHERE, UPDATE affects every row in the table. Always add WHERE for targeted updates." },
      { code: `SELECT * FROM orders\nLEFT JOIN users ON orders.user_id = users.id\nWHERE users.name = 'Alice';`, error: "WHERE filter turns LEFT JOIN into INNER JOIN", options: ["Filtering right-side column in WHERE negates LEFT JOIN behavior", "LEFT JOIN is wrong", "ON is wrong", "SELECT is wrong"], answer: 0, explanation: "Rows where users.name is NULL (no match) are excluded by WHERE, effectively making it INNER JOIN." },
      { code: `CREATE TABLE users (\n    id INT PRIMARY KEY,\n    email VARCHAR(100) UNIQUE NOT NULL,\n    id INT\n);`, error: "Duplicate column definition", options: ["id column defined twice in CREATE TABLE", "PRIMARY KEY is wrong", "UNIQUE is wrong", "VARCHAR is wrong"], answer: 0, explanation: "Each column name must be unique within a table definition. id appears twice." },
      { code: `SELECT * FROM users\nWHERE id IN (\n    SELECT user_id FROM orders\n    WHERE total > 1000\n    ORDER BY total\n);`, error: "ORDER BY inside subquery is meaningless", options: ["ORDER BY in subquery used with IN has no effect", "IN is wrong", "SELECT is wrong", "WHERE is wrong"], answer: 0, explanation: "ORDER BY inside a subquery used with IN doesn't affect results — the outer query determines order." },
      { code: `WITH cte AS (\n    SELECT * FROM orders WHERE total > 100\n)\nSELECT * FROM cte\nWHERE cte.total > 200;`, error: "Redundant filter — already filtered in CTE", options: ["CTE already filters total > 100 — outer WHERE repeats logic redundantly", "WITH is wrong", "SELECT is wrong", "WHERE is wrong"], answer: 0, explanation: "Not an error per se, but a logic issue — the CTE already guarantees total > 100, so the outer WHERE adds confusion." },
    ],
    hard: [
      { code: `SELECT *\nFROM employees\nWHERE salary > AVG(salary);`, error: "Aggregate in WHERE", options: ["Cannot use AVG() in WHERE — use a subquery instead", "SELECT is wrong", "WHERE is wrong", "salary is wrong"], answer: 0, explanation: "Aggregates can't be in WHERE. Use: WHERE salary > (SELECT AVG(salary) FROM employees)." },
      { code: `SELECT RANK() OVER (ORDER BY salary) as rnk\nFROM employees\nWHERE rnk > 5;`, error: "Cannot reference window function alias in WHERE", options: ["Window function alias can't be used in WHERE — use subquery or CTE", "RANK is wrong", "OVER is wrong", "ORDER BY is wrong"], answer: 0, explanation: "WHERE is processed before SELECT, so window function aliases aren't available. Wrap in a subquery." },
      { code: `BEGIN TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;`, error: "Missing COMMIT or ROLLBACK", options: ["Transaction never committed or rolled back — changes may be lost", "BEGIN is wrong", "UPDATE is wrong", "balance is wrong"], answer: 0, explanation: "A transaction without COMMIT or ROLLBACK leaves changes in a pending state." },
      { code: `SELECT *\nFROM users u\nJOIN orders o ON u.id = o.user_id\nJOIN products p ON o.id = p.order_id\nWHERE p.price > 100\nAND u.country = 'US';`, error: "Missing index — potential performance issue", options: ["No indexes on join/filter columns — query will do full table scans", "JOIN is wrong", "WHERE is wrong", "SELECT is wrong"], answer: 0, explanation: "Without indexes on user_id, order_id, price, country — all joins and filters require full scans." },
      { code: `SELECT DISTINCT dept, COUNT(*) as cnt\nFROM employees\nGROUP BY dept;`, error: "DISTINCT is redundant with GROUP BY", options: ["GROUP BY already ensures distinct dept values — DISTINCT is redundant", "SELECT is wrong", "COUNT is wrong", "FROM is wrong"], answer: 0, explanation: "GROUP BY already produces unique groups. Adding DISTINCT has no effect and misleads the reader." },
      { code: `ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT NOW();\nSELECT * FROM users WHERE created_at = NOW();`, error: "Exact timestamp comparison is unreliable", options: ["NOW() returns current moment — almost no rows will match exactly", "ALTER is wrong", "SELECT is wrong", "WHERE is wrong"], answer: 0, explanation: "Timestamps are precise to microseconds. Comparing with = NOW() almost never matches. Use a range instead." },
      { code: `CREATE INDEX idx ON users(email);\nSELECT * FROM users WHERE LOWER(email) = 'alice@example.com';`, error: "Index not used due to function on column", options: ["LOWER(email) prevents index idx from being used", "CREATE INDEX is wrong", "WHERE is wrong", "SELECT is wrong"], answer: 0, explanation: "Applying a function to an indexed column prevents index usage. Use a functional index on LOWER(email)." },
      { code: `SELECT u.name, SUM(o.total) as revenue\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id;`, error: "Selecting u.name not in GROUP BY (in strict SQL)", options: ["u.name not in GROUP BY — fails in strict SQL mode", "LEFT JOIN is wrong", "SUM is wrong", "FROM is wrong"], answer: 0, explanation: "In strict SQL (e.g., PostgreSQL), all non-aggregate SELECT columns must be in GROUP BY. Add u.name to GROUP BY." },
      { code: `SELECT name, salary,\n    LAG(salary) OVER (ORDER BY salary) as prev\nFROM employees\nORDER BY name;`, error: "LAG ordered by salary but results ordered by name — misleading", options: ["LAG uses salary order but final ORDER BY name changes display — confusing", "LAG is wrong", "OVER is wrong", "SELECT is wrong"], answer: 0, explanation: "LAG calculates based on salary order, but final output is sorted by name, making prev values misleading." },
      { code: `INSERT INTO logs (user_id, action)\nSELECT id, 'login'\nFROM users\nWHERE last_login < NOW() - INTERVAL '30 days';`, error: "Logic error — inserting for inactive users", options: ["Inserts login action for users who haven't logged in 30 days — likely wrong intent", "INSERT is wrong", "SELECT is wrong", "WHERE is wrong"], answer: 0, explanation: "The WHERE clause selects users who haven't logged in for 30 days, but we're logging a 'login' action — a logic error." },
    ],
  },
  webdev: {
    easy: [
      { code: `<img src="photo.jpg">`, error: "Missing alt attribute", options: ["Missing alt attribute for accessibility", "src is wrong", "img is wrong", "photo.jpg is wrong"], answer: 0, explanation: "All <img> elements should have an alt attribute for accessibility and SEO." },
      { code: `<a href=google.com>Visit Google</a>`, error: "href value not quoted", options: ["URL must be in quotes: href=\"google.com\"", "a tag is wrong", "Visit is wrong", "href is wrong"], answer: 0, explanation: "HTML attribute values must be wrapped in quotes." },
      { code: `.box {\n    colour: red;\n}`, error: "Wrong CSS property name", options: ["'colour' is wrong spelling — should be 'color'", ".box is wrong", "red is wrong", ": is wrong"], answer: 0, explanation: "CSS uses American English spelling. The property is 'color', not 'colour'." },
      { code: `document.getElementByID("btn")`, error: "Wrong method name casing", options: ["Should be getElementById (lowercase 'd' in Id)", "document is wrong", "btn is wrong", "getElement is wrong"], answer: 0, explanation: "The correct method name is getElementById — capital B and lowercase d in 'ById'." },
      { code: `<div>\n    <p>Hello</div>\n</p>`, error: "Improper tag nesting", options: ["Tags must be closed in the correct order — </p> before </div>", "div is wrong", "p is wrong", "Hello is wrong"], answer: 0, explanation: "HTML tags must be closed in reverse order of opening. </p> should come before </div>." },
      { code: `let x == 5;`, error: "== used for assignment", options: ["Should use = for assignment, not ==", "let is wrong", "x is wrong", "5 is wrong"], answer: 0, explanation: "= assigns a value. == is a comparison operator. let x = 5 is correct." },
      { code: `.container {\n    display: flexbox;\n}`, error: "Wrong flexbox value", options: ["Should be display: flex not display: flexbox", "container is wrong", "display is wrong", ": is wrong"], answer: 0, explanation: "The correct CSS value is 'flex', not 'flexbox'." },
      { code: `console.log(myVar);\nlet myVar = "hello";`, error: "Variable used before declaration (temporal dead zone)", options: ["let variables can't be accessed before their declaration", "console.log is wrong", "myVar is wrong", "let is wrong"], answer: 0, explanation: "let and const have a temporal dead zone — they can't be accessed before their declaration line." },
      { code: `<style>\n    p {\n        font-size: 16;\n    }\n</style>`, error: "Missing CSS unit", options: ["Font-size needs a unit: 16px, 16em, etc.", "style is wrong", "p is wrong", "font-size is wrong"], answer: 0, explanation: "CSS values need units. 16 alone is invalid — use 16px, 16rem, 16em, etc." },
      { code: `<input type="text" placeholder="Name" /\n<button>Submit</button>`, error: "Missing closing > on input tag", options: ["Input tag missing closing > before newline", "input is wrong", "placeholder is wrong", "button is wrong"], answer: 0, explanation: "The input self-closing tag needs /> not /\\n. The > is missing." },
    ],
    medium: [
      { code: `useEffect(() => {\n    fetchData();\n});`, error: "Missing dependency array causes infinite loop", options: ["No dependency array — effect runs after every render causing infinite loop", "useEffect is wrong", "fetchData is wrong", "() => is wrong"], answer: 0, explanation: "Without [], the effect runs after every render. fetchData likely updates state, causing infinite re-renders." },
      { code: `fetch('https://api.example.com/data')\n    .then(response => response.json)\n    .then(data => console.log(data));`, error: "Missing parentheses on .json()", options: ["response.json is a method — must call it as response.json()", "fetch is wrong", "then is wrong", "console.log is wrong"], answer: 0, explanation: ".json is a method reference, not a call. It must be .json() to actually parse the response." },
      { code: `const [count, setCount] = useState(0);\ncount = 5;`, error: "Directly mutating state", options: ["Cannot assign to const count — use setCount(5) instead", "useState is wrong", "const is wrong", "setCount is wrong"], answer: 0, explanation: "React state must be updated via the setter function. Direct assignment doesn't trigger re-render." },
      { code: `localStorage.setItem('user', {name: 'Alice'});`, error: "Object not serialized before storage", options: ["Objects must be JSON.stringify'd before localStorage.setItem", "localStorage is wrong", "setItem is wrong", "user is wrong"], answer: 0, explanation: "localStorage only stores strings. Pass JSON.stringify({name: 'Alice'}) as the value." },
      { code: `document.querySelector('#btn').addEventListener('click', handleClick())`, error: "Function called immediately instead of passed as reference", options: ["handleClick() calls the function immediately — should be handleClick without ()", "addEventListener is wrong", "querySelector is wrong", "click is wrong"], answer: 0, explanation: "handleClick() calls the function right away and passes its return value. Use handleClick (no parens) as the callback." },
      { code: `@media (max-width: 768) {\n    .nav { display: none; }\n}`, error: "Missing px unit in media query", options: ["Should be max-width: 768px not just 768", "@media is wrong", ".nav is wrong", "display is wrong"], answer: 0, explanation: "Media query values need units. Use max-width: 768px." },
      { code: `const obj = {name: 'Alice'};\nconst copy = obj;\ncopy.name = 'Bob';\nconsole.log(obj.name);`, error: "Object reference copied not cloned", options: ["copy = obj copies reference — both point to same object", "const is wrong", "copy is wrong", "console.log is wrong"], answer: 0, explanation: "Objects are reference types. copy = obj makes both variables point to the same object. Use {...obj} to clone." },
      { code: `async function getData() {\n    const data = fetch('https://api.example.com');\n    return data.json();\n}`, error: "Missing await before fetch", options: ["Missing await before fetch — data is a Promise not a Response", "async is wrong", "return is wrong", "json is wrong"], answer: 0, explanation: "Without await, data is a Promise object. You can't call .json() on a Promise." },
      { code: `for (var i = 0; i < 3; i++) {\n    setTimeout(() => console.log(i), 1000);\n}`, error: "var closure captures final value", options: ["var is function-scoped — all callbacks print 3 not 0,1,2", "for is wrong", "setTimeout is wrong", "console.log is wrong"], answer: 0, explanation: "var i is shared across all iterations. By the time callbacks run, i is 3. Use let instead." },
      { code: `div {\n    position: relative;\n    top: 50%;\n    left: 50%;\n}`, error: "Centering with % doesn't center the element", options: ["top/left 50% positions the corner, not the center — add transform: translate(-50%,-50%)", "position is wrong", "div is wrong", "% is wrong"], answer: 0, explanation: "top/left 50% moves the element's top-left corner to center. Add transform: translate(-50%, -50%) to truly center it." },
    ],
    hard: [
      { code: `const MyComponent = React.memo(({ data }) => {\n    return <div>{data.map(d => <span>{d}</span>)}</div>;\n});`, error: "Missing key prop in mapped elements", options: ["Each <span> in map needs a unique key prop", "React.memo is wrong", "data.map is wrong", "return is wrong"], answer: 0, explanation: "React requires a unique key prop for list items to efficiently reconcile the DOM." },
      { code: `useEffect(() => {\n    const id = setInterval(tick, 1000);\n}, []);`, error: "Missing cleanup for interval", options: ["setInterval not cleared — causes memory leak when component unmounts", "useEffect is wrong", "setInterval is wrong", "tick is wrong"], answer: 0, explanation: "Return a cleanup function: return () => clearInterval(id) to prevent memory leaks on unmount." },
      { code: `fetch('/api/data', {\n    method: 'POST',\n    body: {name: 'Alice'}\n});`, error: "Object body not stringified", options: ["body must be JSON.stringify'd — objects are sent as [object Object]", "fetch is wrong", "method is wrong", "body is wrong"], answer: 0, explanation: "fetch body needs to be a string. Use JSON.stringify({name: 'Alice'}) and add Content-Type header." },
      { code: `window.addEventListener('resize', () => {\n    updateLayout();\n});`, error: "Resize handler not debounced", options: ["resize fires hundreds of times per second — should be debounced", "addEventListener is wrong", "resize is wrong", "updateLayout is wrong"], answer: 0, explanation: "The resize event fires very frequently. Without debouncing, updateLayout runs too many times." },
      { code: `class MyComponent extends React.Component {\n    state = { count: 0 };\n    increment = () => {\n        this.setState({ count: this.state.count + 1 });\n        this.setState({ count: this.state.count + 1 });\n    }\n}`, error: "Stale state in multiple setState calls", options: ["this.state.count is stale in second setState — use functional update", "setState is wrong", "state is wrong", "increment is wrong"], answer: 0, explanation: "setState is async. Both calls read the same stale count. Use setState(prev => ({count: prev.count + 1}))." },
      { code: `const secret = process.env.API_KEY;\nfetch(\`https://api.com?key=\${secret}\`);`, error: "Exposing secret API key in client-side code", options: ["Client-side env vars are exposed in the browser — never put secrets in frontend", "fetch is wrong", "process.env is wrong", "const is wrong"], answer: 0, explanation: "Anything in client-side JavaScript is visible to users. API secrets must stay on the server." },
      { code: `element.innerHTML = userInput;`, error: "XSS vulnerability", options: ["Setting innerHTML with user input allows XSS attacks", "innerHTML is wrong", "element is wrong", "= is wrong"], answer: 0, explanation: "Using innerHTML with unsanitized user input allows attackers to inject malicious scripts (XSS)." },
      { code: `img {\n    width: 100%;\n    height: 100%;\n}`, error: "height 100% without defined parent height", options: ["height: 100% has no effect unless parent has a defined height", "img is wrong", "width is wrong", "% is wrong"], answer: 0, explanation: "Percentage heights require the parent to have an explicit height. Otherwise height: 100% is ignored." },
      { code: `const router = useRouter();\nrouter.push('/dashboard');\nwindow.location.href = '/dashboard';`, error: "Redundant double navigation", options: ["Both push and location.href navigate — causes double redirect", "useRouter is wrong", "push is wrong", "window is wrong"], answer: 0, explanation: "Using both router.push and window.location.href causes double navigation. Use only one." },
      { code: `const value = useMemo(() => expensiveCalc(), []);`, error: "Function called inside useMemo", options: ["expensiveCalc() is called immediately — should be just expensiveCalc or inline logic", "useMemo is wrong", "const is wrong", "[] is wrong"], answer: 0, explanation: "useMemo expects the computation inline: useMemo(() => expensiveCalc(), []). Calling it inside the arrow function is actually fine — the real anti-pattern is passing expensiveCalc() outside." },
    ],
  },
  c: {
    easy: [
      { code: `#include <stdio.h>\nint main() {\n    printf("Hello")\n    return 0;\n}`, error: "Missing semicolon", options: ["Missing semicolon after printf statement", "include is wrong", "return is wrong", "main is wrong"], answer: 0, explanation: "Every statement in C must end with a semicolon ';'." },
      { code: `int x;\nprintf("%d", x);`, error: "Uninitialized variable", options: ["x is declared but not initialized — undefined behavior", "printf is wrong", "%d is wrong", "int is wrong"], answer: 0, explanation: "Using an uninitialized variable gives undefined behavior. Initialize x before use." },
      { code: `char name[5] = "hello!";`, error: "String too long for array", options: ["'hello!' is 6 chars + null terminator = 7 bytes, array too small", "char is wrong", "= is wrong", "name is wrong"], answer: 0, explanation: "'hello!' has 6 characters plus a null terminator = 7 bytes. The array needs at least char[7]." },
      { code: `int arr[3] = {1, 2, 3};\nprintf("%d", arr[3]);`, error: "Array out of bounds", options: ["Index 3 is out of bounds for array of size 3", "printf is wrong", "%d is wrong", "arr is wrong"], answer: 0, explanation: "Valid indices are 0-2. arr[3] accesses memory beyond the array." },
      { code: `int* ptr = NULL;\n*ptr = 42;`, error: "Null pointer dereference", options: ["Dereferencing NULL pointer causes segfault", "int* is wrong", "42 is wrong", "NULL is wrong"], answer: 0, explanation: "Dereferencing a NULL pointer causes a segmentation fault." },
      { code: `printf("%s", 42);`, error: "Wrong format specifier for int", options: ["42 is an int but %s expects a string — undefined behavior", "printf is wrong", "42 is wrong", "%s is wrong"], answer: 0, explanation: "%s expects a char* string pointer. Use %d to print an integer." },
      { code: `for (int i = 0; i <= 10; i++) {\n    arr[i] = i;\n}`, error: "Off-by-one error — writes to index 10", options: ["i <= 10 writes 11 elements but array likely has only 10 slots", "for is wrong", "arr is wrong", "int is wrong"], answer: 0, explanation: "If arr has 10 elements, valid indices are 0-9. i <= 10 writes to index 10, which is out of bounds." },
      { code: `int x = 5;\nif (x = 0) {\n    printf("zero");\n}`, error: "Assignment instead of comparison in if", options: ["x = 0 assigns 0 to x — should use x == 0 for comparison", "if is wrong", "printf is wrong", "int is wrong"], answer: 0, explanation: "= assigns a value (always false for 0). Use == to compare. This sets x to 0 and the block never executes." },
      { code: `void greet() {\n    char msg[] = "Hello";\n}\nchar* p = greet();`, error: "Function returns void, not pointer", options: ["greet() returns void — cannot assign to char*", "void is wrong", "char is wrong", "p is wrong"], answer: 0, explanation: "greet() has void return type. It cannot return a value. The assignment is invalid." },
      { code: `int main() {\n    int x = 10;\n    int x = 20;\n    return 0;\n}`, error: "Duplicate variable declaration", options: ["x is declared twice in the same scope", "int is wrong", "return is wrong", "main is wrong"], answer: 0, explanation: "A variable can only be declared once in the same scope." },
    ],
    medium: [
      { code: `char* str = malloc(5);\nstrcpy(str, "hello!");\nfree(str);`, error: "Buffer overflow in strcpy", options: ["'hello!' is 7 bytes but only 5 allocated — buffer overflow", "malloc is wrong", "free is wrong", "char* is wrong"], answer: 0, explanation: "'hello!' plus null terminator is 7 bytes. malloc(5) only allocates 5. strcpy writes beyond the buffer." },
      { code: `int* p = malloc(sizeof(int));\n*p = 42;\nfree(p);\nfree(p);`, error: "Double free", options: ["Freeing the same pointer twice is undefined behavior", "malloc is wrong", "*p is wrong", "int* is wrong"], answer: 0, explanation: "Calling free() twice on the same pointer corrupts the heap. Set p = NULL after freeing." },
      { code: `void process(int arr[], int n) {\n    for (int i = 0; i <= n; i++)\n        printf("%d ", arr[i]);\n}`, error: "Off-by-one in loop", options: ["i <= n accesses arr[n] which is one past the end", "for is wrong", "printf is wrong", "arr is wrong"], answer: 0, explanation: "Loop should be i < n. i <= n accesses arr[n], which is out of bounds." },
      { code: `int* create() {\n    int arr[5] = {1,2,3,4,5};\n    return arr;\n}`, error: "Returning pointer to local array", options: ["arr is a local variable — destroyed when function returns", "int* is wrong", "return is wrong", "create is wrong"], answer: 0, explanation: "Local arrays are on the stack and destroyed on function exit. Use malloc() to allocate on heap." },
      { code: `char buf[10];\ngets(buf);`, error: "gets() is unsafe — no bounds checking", options: ["gets() has no length limit — vulnerable to buffer overflow", "char is wrong", "buf is wrong", "10 is wrong"], answer: 0, explanation: "gets() was removed from C11 due to buffer overflow vulnerability. Use fgets(buf, 10, stdin) instead." },
      { code: `int a = 5, b = 3;\nfloat result = a / b;`, error: "Integer division before float assignment", options: ["a/b is integer division (1) before being assigned to float", "float is wrong", "result is wrong", "= is wrong"], answer: 0, explanation: "a and b are ints, so a/b = 1 (truncated). Cast first: (float)a / b to get 1.666..." },
      { code: `char* p = "hello";\np[0] = 'H';`, error: "Modifying string literal", options: ["String literals are read-only — modification causes undefined behavior", "char* is wrong", "p is wrong", "= is wrong"], answer: 0, explanation: "String literals are stored in read-only memory. Use char p[] = \"hello\" to get a modifiable copy." },
      { code: `int arr[5];\nmemset(arr, 1, sizeof(arr));`, error: "memset sets bytes not int values", options: ["memset(arr,1,...) sets each byte to 1, not each int to 1", "memset is wrong", "sizeof is wrong", "arr is wrong"], answer: 0, explanation: "memset fills byte-by-byte. Setting bytes to 1 gives 0x01010101 (16843009) for each int, not 1." },
      { code: `int x = 10;\nvoid foo() {\n    int x = 20;\n    printf(\"%d\", x);\n}\nfoo();\nprintf(\"%d\", x);`, error: "Variable shadowing may cause confusion", options: ["Local x shadows global x inside foo — foo prints 20 not 10", "void is wrong", "printf is wrong", "int is wrong"], answer: 0, explanation: "Local x in foo shadows the global x. foo prints 20. The global x is unaffected." },
      { code: `typedef struct {\n    int x;\n    struct Node* next;\n} Node;`, error: "Struct not yet defined when referenced", options: ["struct Node* inside typedef references Node before it's defined", "typedef is wrong", "int is wrong", "next is wrong"], answer: 0, explanation: "Inside the typedef, 'struct Node' doesn't exist yet. Use 'struct Node { ... struct Node* next; };' separately." },
    ],
    hard: [
      { code: `int* a = malloc(10 * sizeof(int));\nint* b = a;\nfree(a);\nprintf(\"%d\", b[0]);`, error: "Use after free via aliased pointer", options: ["b aliases a — after free(a), b[0] is undefined behavior", "malloc is wrong", "free is wrong", "printf is wrong"], answer: 0, explanation: "b and a point to same memory. After free(a), accessing b[0] is use-after-free — undefined behavior." },
      { code: `int x = INT_MAX;\nx = x + 1;`, error: "Signed integer overflow", options: ["INT_MAX + 1 overflows signed int — undefined behavior", "int is wrong", "INT_MAX is wrong", "= is wrong"], answer: 0, explanation: "Signed integer overflow is undefined behavior in C. The result is unpredictable." },
      { code: `#define SQUARE(x) x * x\nint result = SQUARE(2 + 3);`, error: "Macro expansion without parentheses", options: ["Expands to 2+3*2+3 = 11 not 25 — macro args need parens", "#define is wrong", "result is wrong", "int is wrong"], answer: 0, explanation: "SQUARE(2+3) expands to 2+3*2+3 = 11 due to operator precedence. Use #define SQUARE(x) ((x)*(x))." },
      { code: `int flag = 0;\nvoid handler(int sig) { flag = 1; }\nwhile (!flag) { /* wait */ }`, error: "flag not declared volatile — compiler may optimize loop away", options: ["flag must be volatile sig_atomic_t for signal handlers", "int is wrong", "while is wrong", "handler is wrong"], answer: 0, explanation: "Without volatile, compiler may cache flag in register and loop forever. Use volatile sig_atomic_t flag." },
      { code: `int arr[3] = {0};\nfor (int i = 0; i < 3; i++)\n    arr[i] = arr[i+1] + 1;`, error: "Reads arr[3] which is out of bounds", options: ["arr[i+1] when i=2 accesses arr[3] — out of bounds", "for is wrong", "arr is wrong", "int is wrong"], answer: 0, explanation: "When i=2, arr[i+1] = arr[3] which is past the array end — undefined behavior." },
      { code: `char buf[8];\nsprintf(buf, \"%s\", longString);`, error: "sprintf with no length limit — buffer overflow risk", options: ["sprintf doesn't check buf size — use snprintf(buf, 8, ...)", "char is wrong", "buf is wrong", "sprintf is wrong"], answer: 0, explanation: "sprintf writes without length checking. If longString > 7 chars, buffer overflows. Use snprintf." },
      { code: `typedef void (*Callback)(int);\nCallback cb;\ncb(42);`, error: "Uninitialized function pointer called", options: ["cb is never assigned — calling uninitialized function pointer is UB", "typedef is wrong", "Callback is wrong", "42 is wrong"], answer: 0, explanation: "cb is declared but never assigned a function. Calling it dereferences a garbage address — undefined behavior." },
      { code: `int main() {\n    static int count = 0;\n    count++;\n    main();\n}`, error: "Infinite recursion — stack overflow", options: ["main() calls itself infinitely — stack overflows", "static is wrong", "count is wrong", "return is missing"], answer: 0, explanation: "Recursive calls to main without a base case exhaust the call stack, causing a stack overflow." },
      { code: `void copy(char* dst, char* src) {\n    while (*dst++ = *src++);\n}`, error: "No null check — undefined if src is NULL", options: ["If src is NULL, *src++ dereferences NULL — segfault", "while is wrong", "dst is wrong", "char* is wrong"], answer: 0, explanation: "The function doesn't validate src. If NULL is passed, dereferencing causes a segmentation fault." },
      { code: `void foo(int n) {\n    int arr[n];\n    // use arr\n}`, error: "VLA may cause stack overflow for large n", options: ["Variable-length arrays on stack can overflow for large n", "void is wrong", "int is wrong", "arr is wrong"], answer: 0, explanation: "VLAs are allocated on the stack. If n is large, this causes a stack overflow. Use malloc for large arrays." },
    ],
  },
  dsa: {
    easy: [
      { code: `# Stack push\nstack = []\nstack.append(1)\nstack.append(2)\nprint(stack.pop(0))  # expected: 2`, error: "pop(0) removes from front (queue), not top (stack)", options: ["pop(0) is queue behavior — use pop() for stack (LIFO)", "append is wrong", "stack is wrong", "print is wrong"], answer: 0, explanation: "Stack is LIFO. pop() removes the last element. pop(0) removes the first, which is queue (FIFO) behavior." },
      { code: `# Binary search\ndef bsearch(arr, target):\n    lo, hi = 0, len(arr)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: lo = mid + 1\n        else: hi = mid`, error: "hi = len(arr) causes index out of range", options: ["hi should be len(arr)-1 to avoid out-of-bounds access", "lo is wrong", "mid is wrong", "while is wrong"], answer: 0, explanation: "hi = len(arr) can cause arr[mid] to access index len(arr)-1+1 which is out of range. Use len(arr)-1." },
      { code: `# Reverse a linked list\ndef reverse(head):\n    prev = None\n    curr = head\n    while curr:\n        curr.next = prev\n        prev = curr\n        curr = curr.next\n    return prev`, error: "curr.next lost before advancing curr", options: ["curr.next overwritten before saving — curr.next is always None after", "prev is wrong", "return is wrong", "while is wrong"], answer: 0, explanation: "After curr.next = prev, curr.next is None. curr = curr.next sets curr to None. Save next first: nxt = curr.next." },
      { code: `# Count elements\ncount = {}\nfor item in arr:\n    count[item] += 1`, error: "KeyError on first occurrence", options: ["count[item] fails with KeyError if item not in dict yet", "for is wrong", "count is wrong", "arr is wrong"], answer: 0, explanation: "The first time an item appears, count[item] doesn't exist. Use count.get(item, 0) + 1 or defaultdict." },
      { code: `# Check palindrome\ndef is_palindrome(s):\n    return s == s.reverse()`, error: "list.reverse() returns None", options: ["str has no .reverse() method — use s[::-1] instead", "def is wrong", "return is wrong", "s is wrong"], answer: 0, explanation: "Strings don't have a .reverse() method. Use s[::-1] to get the reversed string." },
      { code: `# BFS\nfrom collections import deque\nvisited = []\nqueue = deque([start])\nwhile queue:\n    node = queue.popleft()\n    if node not in visited:\n        visited.append(node)`, error: "List for visited is O(n) lookup", options: ["Using list for visited is O(n) — use set for O(1) lookup", "deque is wrong", "popleft is wrong", "queue is wrong"], answer: 0, explanation: "'in' check on a list is O(n). Use a set for O(1) membership testing." },
      { code: `# Fibonacci\ndef fib(n):\n    if n == 1: return 1\n    return fib(n-1) + fib(n-2)`, error: "Missing base case for n=0", options: ["fib(0) has no base case — recurses to negative infinity", "return is wrong", "def is wrong", "n is wrong"], answer: 0, explanation: "fib(0) calls fib(-1) + fib(-2), infinitely. Add: if n <= 1: return n." },
      { code: `# Two sum\ndef two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [i, seen[complement]]\n        seen[num] = i`, error: "Returns [i, seen[complement]] — wrong order", options: ["Should return [seen[complement], i] — first index before second", "enumerate is wrong", "seen is wrong", "complement is wrong"], answer: 0, explanation: "seen[complement] is the earlier index. Return [seen[complement], i] to maintain order." },
      { code: `# Merge sort merge step\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] < right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    return result`, error: "Remaining elements not appended", options: ["After while loop, remaining left or right elements not added to result", "while is wrong", "append is wrong", "merge is wrong"], answer: 0, explanation: "After the while loop, one side may still have elements. Add: return result + left[i:] + right[j:]." },
      { code: `# Queue using two stacks\nclass Queue:\n    def __init__(self):\n        self.s1 = []\n        self.s2 = []\n    def enqueue(self, x):\n        self.s1.append(x)\n    def dequeue(self):\n        return self.s1.pop(0)`, error: "Using pop(0) defeats the purpose of two stacks", options: ["pop(0) is O(n) — should transfer s1 to s2 and pop from s2", "enqueue is wrong", "s1 is wrong", "append is wrong"], answer: 0, explanation: "The two-stack approach uses s2 as the dequeue stack. Transfer from s1 to s2 when s2 is empty, then s2.pop()." },
    ],
    medium: [
      { code: `# DFS iterative\ndef dfs(graph, start):\n    stack = [start]\n    visited = set()\n    while stack:\n        node = stack.pop()\n        visited.add(node)\n        for neighbor in graph[node]:\n            stack.append(neighbor)`, error: "Appending already-visited neighbors", options: ["Should check 'if neighbor not in visited' before appending", "stack is wrong", "pop is wrong", "visited is wrong"], answer: 0, explanation: "Without checking visited before appending, nodes get processed multiple times in cyclic graphs." },
      { code: `# Dijkstra\nimport heapq\ndef dijkstra(graph, start):\n    dist = {start: 0}\n    heap = [(0, start)]\n    while heap:\n        d, u = heapq.heappop(heap)\n        for v, w in graph[u]:\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n                heapq.heappush(heap, (dist[v], v))`, error: "KeyError if v not in dist", options: ["dist[v] raises KeyError if v hasn't been seen yet — use dist.get(v, inf)", "heappop is wrong", "heappush is wrong", "while is wrong"], answer: 0, explanation: "dist[v] throws KeyError if v is new. Initialize dist with float('inf') for all nodes or use dist.get(v, inf)." },
      { code: `# Detect cycle in linked list\ndef has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next\n        if slow == fast: return True\n    return False`, error: "Fast pointer advances only once", options: ["fast should advance twice (fast = fast.next.next) to detect cycle", "slow is wrong", "while is wrong", "return is wrong"], answer: 0, explanation: "Floyd's algorithm requires fast to move 2 steps: fast = fast.next.next. Moving once makes it same speed as slow." },
      { code: `# Quick sort\ndef quicksort(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[0]\n    left = [x for x in arr if x < pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + [pivot] + quicksort(right)`, error: "Duplicate elements lost", options: ["Elements equal to pivot are dropped — duplicates lost", "pivot is wrong", "return is wrong", "len is wrong"], answer: 0, explanation: "Elements equal to pivot are excluded from both left and right. Use x <= pivot for left or collect equals separately." },
      { code: `# Topological sort\nfrom collections import deque\ndef topo(graph):\n    in_deg = {v: 0 for v in graph}\n    for v in graph:\n        for u in graph[v]:\n            in_deg[u] += 1\n    q = deque([v for v in in_deg if in_deg[v] == 0])\n    order = []\n    while q:\n        v = q.popleft()\n        order.append(v)\n        for u in graph[v]:\n            in_deg[u] -= 1\n            if in_deg[u] == 0:\n                q.append(u)\n    return order`, error: "No cycle detection", options: ["If graph has cycle, order won't contain all nodes — should check len(order)", "deque is wrong", "popleft is wrong", "in_deg is wrong"], answer: 0, explanation: "For a graph with a cycle, some nodes won't be added. Check if len(order) == len(graph) to detect cycles." },
      { code: `# Sliding window\ndef max_sum(arr, k):\n    window_sum = sum(arr[:k])\n    max_sum = window_sum\n    for i in range(k, len(arr)):\n        window_sum += arr[i] - arr[i-k]\n        max_sum = max(max_sum, window_sum)\n    return max_sum`, error: "No check for k > len(arr)", options: ["If k > len(arr), sum(arr[:k]) and loop are invalid", "sum is wrong", "range is wrong", "max is wrong"], answer: 0, explanation: "If k > len(arr), the initial window is invalid. Add a guard: if k > len(arr): return 0 or raise an error." },
      { code: `# Memoized fibonacci\nmemo = {}\ndef fib(n):\n    if n in memo: return memo[n]\n    if n <= 1: return n\n    memo[n] = fib(n-1) + fib(n-2)\n    return memo[n]`, error: "Global memo shared across calls — may have stale values", options: ["Global memo persists between test calls — can cause wrong results", "def is wrong", "return is wrong", "memo is wrong"], answer: 0, explanation: "Using a global memo dict means previous test runs pollute the cache. Use functools.lru_cache or pass memo as param." },
      { code: `# Union Find\nparent = list(range(n))\ndef find(x):\n    while parent[x] != x:\n        x = parent[x]\n    return x\ndef union(a, b):\n    parent[find(a)] = find(b)`, error: "No path compression or union by rank", options: ["Without path compression, find is O(n) in worst case", "while is wrong", "parent is wrong", "union is wrong"], answer: 0, explanation: "This is correct but inefficient. Without path compression, find() degrades to O(n). Add parent[x] = parent[parent[x]] in find." },
      { code: `# LRU Cache\nfrom collections import OrderedDict\nclass LRU:\n    def __init__(self, cap):\n        self.cap = cap\n        self.cache = OrderedDict()\n    def get(self, key):\n        if key not in self.cache: return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n    def put(self, key, val):\n        self.cache[key] = val\n        if len(self.cache) > self.cap:\n            self.cache.popitem(last=False)`, error: "put doesn't move existing key to end", options: ["Existing key not moved to end on put — breaks LRU order", "OrderedDict is wrong", "popitem is wrong", "get is wrong"], answer: 0, explanation: "When putting an existing key, it should be moved to end (most recent). Add: self.cache.move_to_end(key) in put." },
      { code: `# Binary tree height\ndef height(root):\n    if root is None: return 0\n    return 1 + max(height(root.left), height(root.right))`, error: "Correct but returns height not depth", options: ["This computes height correctly but variable naming may be confused with depth", "max is wrong", "return is wrong", "root is wrong"], answer: 0, explanation: "Actually this is correct. Height = number of edges from root to deepest leaf. This returns nodes count. Conceptually fine but off-by-one vs edge-based definition." },
    ],
    hard: [
      { code: `# Dijkstra with negative weights\nimport heapq\ndef dijkstra(graph, start):\n    dist = {start: 0}\n    heap = [(0, start)]\n    while heap:\n        d, u = heapq.heappop(heap)\n        for v, w in graph[u]:\n            if d + w < dist.get(v, float('inf')):\n                dist[v] = d + w\n                heapq.heappush(heap, (dist[v], v))\n    return dist`, error: "Dijkstra doesn't work with negative weights", options: ["Dijkstra assumes non-negative weights — use Bellman-Ford for negatives", "heapq is wrong", "dist is wrong", "heappop is wrong"], answer: 0, explanation: "Dijkstra's greedy approach fails with negative weights. Use Bellman-Ford for graphs with negative edges." },
      { code: `# Trie insert\nclass Trie:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n    def insert(self, word):\n        node = self\n        for ch in word:\n            node = node.children[ch]\n        node.is_end = True`, error: "Missing setdefault or creation of new nodes", options: ["node.children[ch] raises KeyError if ch not in children", "insert is wrong", "is_end is wrong", "for is wrong"], answer: 0, explanation: "children[ch] fails if ch doesn't exist. Use node.children.setdefault(ch, Trie()) or check and create." },
      { code: `# Floyd-Warshall\nn = len(graph)\ndist = graph[:]\nfor k in range(n):\n    for i in range(n):\n        for j in range(n):\n            dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`, error: "Shallow copy of graph", options: ["graph[:] is shallow copy — modifying dist also modifies graph", "min is wrong", "range is wrong", "dist is wrong"], answer: 0, explanation: "graph[:] copies the outer list but not inner lists. Use copy.deepcopy(graph) for true independence." },
      { code: `# Heap sort\ndef heapify(arr, n, i):\n    largest = i\n    l, r = 2*i+1, 2*i+2\n    if l < n and arr[l] > arr[largest]: largest = l\n    if r < n and arr[r] > arr[largest]: largest = r\n    if largest != i:\n        arr[i], arr[largest] = arr[largest], arr[i]\ndef heap_sort(arr):\n    n = len(arr)\n    for i in range(n//2-1, -1, -1):\n        heapify(arr, n, i)\n    for i in range(n-1, 0, -1):\n        arr[0], arr[i] = arr[i], arr[0]`, error: "Missing heapify call after each swap in extraction phase", options: ["After swapping arr[0] and arr[i], heapify(arr, i, 0) is never called", "heapify is wrong", "range is wrong", "arr is wrong"], answer: 0, explanation: "After extracting the max to position i, the heap property must be restored by calling heapify(arr, i, 0)." },
      { code: `# Detect negative cycle (Bellman-Ford)\ndef has_negative_cycle(graph, n):\n    dist = [float('inf')] * n\n    dist[0] = 0\n    for _ in range(n-1):\n        for u, v, w in graph:\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n    return any(dist[u] + w < dist[v] for u, v, w in graph)`, error: "Only checks reachable nodes from node 0", options: ["Negative cycles unreachable from node 0 are not detected", "range is wrong", "dist is wrong", "any is wrong"], answer: 0, explanation: "Starting from node 0 misses isolated negative cycles. To detect all, initialize all dist[i] = 0 (virtual source)." },
      { code: `# A* search\ndef astar(start, goal, h):\n    open_set = [(h(start), start)]\n    g = {start: 0}\n    while open_set:\n        _, curr = heapq.heappop(open_set)\n        if curr == goal: return g[goal]\n        for nb, cost in neighbors(curr):\n            new_g = g[curr] + cost\n            if new_g < g.get(nb, inf):\n                g[nb] = new_g\n                heapq.heappush(open_set, (new_g + h(nb), nb))`, error: "No closed set — may re-expand nodes", options: ["Without a closed/visited set, nodes can be re-expanded multiple times", "heappop is wrong", "heappush is wrong", "g is wrong"], answer: 0, explanation: "A* needs a closed set to avoid re-processing already-settled nodes, which can cause incorrect results or slowness." },
      { code: `# Segment tree update\ndef update(tree, i, val, node=1, lo=0, hi=None):\n    if hi is None: hi = len(tree) - 1\n    if lo == hi:\n        tree[node] = val\n        return\n    mid = (lo + hi) // 2\n    if i <= mid: update(tree, i, val, 2*node, lo, mid)\n    else: update(tree, i, val, 2*node+1, mid+1, hi)\n    tree[node] = tree[2*node] + tree[2*node+1]`, error: "hi based on tree size not array size", options: ["hi should be based on original array size, not tree array size", "update is wrong", "mid is wrong", "tree is wrong"], answer: 0, explanation: "Segment tree array is ~4x the original. hi = len(tree)-1 is wrong. Pass the original array size separately." },
      { code: `# KMP search\ndef kmp(text, pattern):\n    lps = [0] * len(pattern)\n    i = j = 0\n    while i < len(text):\n        if text[i] == pattern[j]:\n            i += 1; j += 1\n        if j == len(pattern):\n            print(i - j)\n            j = lps[j-1]\n        elif i < len(text) and text[i] != pattern[j]:\n            if j != 0: j = lps[j-1]\n            else: i += 1`, error: "elif runs even after match found", options: ["After match, elif may incorrectly handle mismatch in same iteration", "while is wrong", "lps is wrong", "print is wrong"], answer: 0, explanation: "After j == len(pattern), the elif runs in the same iteration if i < len(text). Use else instead of elif." },
      { code: `# Manacher's algorithm\ndef manacher(s):\n    t = '#'.join('^{}$'.format(s))\n    n = len(t)\n    p = [0] * n\n    c = r = 0\n    for i in range(1, n-1):\n        mirror = 2*c - i\n        if i < r:\n            p[i] = min(r-i, p[mirror])\n        while t[i+p[i]+1] == t[i-p[i]-1]:\n            p[i] += 1\n        if i+p[i] > r:\n            c, r = i, i+p[i]\n    return max(p)`, error: "Sentinel characters may cause index issues", options: ["'^' and '$' sentinels prevent out-of-bounds but format string is tricky", "manacher is wrong", "mirror is wrong", "while is wrong"], answer: 0, explanation: "The format '^#{}$'.format('#'.join(s)) is slightly off. The correct transform is '^#' + '#'.join(s) + '#$'." },
      { code: `# Convex hull (Graham scan)\npoints.sort(key=lambda p: (p[0], p[1]))\n# cross product\ndef cross(O, A, B):\n    return (A[0]-O[0])*(B[1]-O[1]) - (A[1]-O[1])*(B[0]-O[0])\nhull = []\nfor p in points:\n    while len(hull) >= 2 and cross(hull[-2], hull[-1], p) >= 0:\n        hull.pop()\n    hull.append(p)`, error: "Builds only lower hull — upper hull missing", options: ["Graham scan needs both lower and upper hull passes to complete convex hull", "cross is wrong", "sort is wrong", "while is wrong"], answer: 0, explanation: "This code only builds the lower hull. A complete convex hull requires iterating points in both directions." },
    ],
  },
};

const languageLabels = { python:"Python", c:"C", cpp:"C++", java:"Java", sql:"SQL", webdev:"Web Dev", dsa:"DSA" };

// Timer per level (seconds per question)
const levelConfig = {
  easy:   { label:"EASY",   color:"#22c55e", lives:3, timePerQ:35 },
  medium: { label:"MEDIUM", color:"#f59e0b", lives:3, timePerQ:25 },
  hard:   { label:"HARD",   color:"#ef4444", lives:3, timePerQ:18 },
};

const TOTAL_Q    = 10;
const PASS_SCORE = 8;
const LETTERS    = ["A","B","C","D"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length-1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

async function fetchFromAPI(language, level) {
  const prompt = `Generate exactly 10 "trace the error" coding questions for ${language} at ${level} difficulty.
Each question shows buggy code and asks what the error is.
Return ONLY valid JSON array, no markdown:
[{"code":"...","error":"description","options":["correct error","wrong1","wrong2","wrong3"],"answer":0,"explanation":"..."}]`;
  const res  = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:2000, messages:[{role:"user",content:prompt}] }) });
  const data = await res.json();
  const text = data.content.map(i=>i.text||"").join("");
  return JSON.parse(text.replace(/```json|```/g,"").trim());
}

// ─────────────────────────────────────────────────────────────────────────────
const TraceTheError = () => {
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

  // ── Timer ──
  const [timeLeft, setTimeLeft] = useState(lvl.timePerQ);
  const timerRef  = useRef(null);

  const clearTimer = () => { if (timerRef.current) clearInterval(timerRef.current); };

  const startTimer = useCallback(() => {
    clearTimer();
    setTimeLeft(lvl.timePerQ);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(timerRef.current); return 0; } return t-1; });
    }, 1000);
  }, [lvl.timePerQ]);

  // When timer hits 0
  useEffect(() => {
    if (timeLeft === 0 && phase === "quiz" && selected === null) handleTimeout();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleTimeout = () => {
    clearTimer();
    const q = questions[current];
    if (!q) return;
    setSelected(-1); // -1 = timed out
    setShowExp(true);
    const nl = lives - 1;
    setWrong(w => w+1);
    setLives(nl);
    if (nl === 0) setTimeout(() => setPhase("gameover"), 1800);
  };

  const loadQuestions = useCallback(async () => {
    setPhase("loading");
    clearTimer();
    const bankKey = langId?.toLowerCase();
    const bank    = QUESTION_BANK[bankKey]?.[level];

    if (bank && bank.length >= TOTAL_Q) {
      setQuestions(shuffle(bank).slice(0,TOTAL_Q).map(q => ({ ...q, options: shuffle([...q.options]), answer: 0 })));
    } else {
      try {
        const qs = await fetchFromAPI(lang, level);
        setQuestions(qs.slice(0,TOTAL_Q));
      } catch {
        setQuestions(shuffle(bank??[]).slice(0,TOTAL_Q));
      }
    }

    setCurrent(0); setSelected(null); setShowExp(false);
    setLives(lvl.lives); setScore(0); setWrong(0);
    setAnimKey(k=>k+1);
    setPhase("quiz");
  }, [langId, level, lang, lvl.lives]);

  // Start timer when quiz begins
  useEffect(() => {
    if (phase === "quiz") startTimer();
    return () => clearTimer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => { loadQuestions(); }, [loadQuestions]);

  const q         = questions[current];
  const progress  = questions.length ? (current/TOTAL_Q)*100 : 0;
  const isTimeout = selected === -1;
  const isCorrect = !isTimeout && selected !== null && selected === q?.answer;
  const timerPct  = timeLeft / lvl.timePerQ;
  const timerColor = timerPct > 0.5 ? "#22c55e" : timerPct > 0.25 ? "#f59e0b" : "#ef4444";

  const handleAnswer = (idx) => {
    if (selected !== null || !q) return;
    clearTimer();
    setSelected(idx);
    setShowExp(true);
    if (idx === q.answer) {
      setScore(s=>s+1);
    } else {
      const nl = lives-1;
      setWrong(w=>w+1);
      setLives(nl);
      if (nl === 0) { setTimeout(()=>setPhase("gameover"),1600); return; }
    }
  };

  const handleNext = () => {
    const next = current+1;
    if (next >= TOTAL_Q) { setPhase("result"); return; }
    setCurrent(next); setSelected(null); setShowExp(false); setAnimKey(k=>k+1);
    startTimer();
  };

  const restart = () => loadQuestions();

  // ── Shared end page ──
  const EndPage = ({ children }) => (
    <div style={{ minHeight:"100vh", background:"#f5f0eb", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px 16px", fontFamily:"'Segoe UI',system-ui,sans-serif" }}>
      <div style={{ background:"#fff", border:"1px solid #e8e2da", borderRadius:20, padding:"40px 28px", textAlign:"center", width:"100%", maxWidth:420 }}>
        {children}
      </div>
    </div>
  );
  const ScoreCircle = ({ color }) => (
    <div style={{ width:96, height:96, borderRadius:"50%", border:`4px solid ${color}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", background:"#fafaf8" }}>
      <span style={{ fontSize:32, fontWeight:800, color, lineHeight:1 }}>{score}</span>
      <span style={{ fontSize:12, color:"#a09890", fontWeight:600 }}>/ {TOTAL_Q}</span>
    </div>
  );
  const BtnRow = ({ children }) => <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>{children}</div>;
  const PBtn   = ({ color, onClick, children }) => <button onClick={onClick} style={{ background:color, color:"#fff", border:"none", borderRadius:12, padding:"13px 24px", fontSize:15, fontWeight:700, cursor:"pointer", flex:"1 1 auto", minWidth:120 }}>{children}</button>;
  const SBtn   = ({ onClick, children }) => <button onClick={onClick} style={{ background:"#f5f0eb", color:"#4a4540", border:"1.5px solid #ddd7ce", borderRadius:12, padding:"13px 20px", fontSize:14, fontWeight:600, cursor:"pointer", flex:"1 1 auto", minWidth:120 }}>{children}</button>;

  if (phase === "loading") return (
    <div style={{ minHeight:"100vh", background:"#f5f0eb", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI',sans-serif" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width:44, height:44, borderRadius:"50%", border:"4px solid #ede8e1", borderTopColor:lvl.color, animation:"spin 0.85s linear infinite", marginBottom:16 }} />
      <p style={{ color:lvl.color, fontWeight:700, fontSize:15 }}>Loading {lvl.label} questions…</p>
    </div>
  );

  if (phase === "gameover") return (
    <EndPage>
      <div style={{ fontSize:52, marginBottom:16 }}>💔</div>
      <h2 style={{ fontSize:24, fontWeight:800, color:"#dc2626", marginBottom:8 }}>Out of Lives!</h2>
      <ScoreCircle color="#dc2626" />
      <p style={{ fontSize:14, color:"#7a7268", lineHeight:1.6, marginBottom:24 }}>You scored <strong>{score}/{TOTAL_Q}</strong>. Need at least {PASS_SCORE} to pass.</p>
      <BtnRow><PBtn color={lvl.color} onClick={restart}>↺ Restart</PBtn><SBtn onClick={()=>{clearTimer();navigate(`/games/${gameId}/level/${langId}`);}}>← Change Level</SBtn></BtnRow>
    </EndPage>
  );

  if (phase === "result") {
    const passed = score >= PASS_SCORE;
    const color  = passed ? lvl.color : "#dc2626";
    const next   = level==="easy" ? "medium" : level==="medium" ? "hard" : null;
    return (
      <EndPage>
        <div style={{ fontSize:52, marginBottom:16 }}>{passed?"🏆":"😔"}</div>
        <h2 style={{ fontSize:24, fontWeight:800, color, marginBottom:8 }}>{passed?"Level Complete!":"Not Quite!"}</h2>
        <ScoreCircle color={color} />
        <p style={{ fontSize:14, color:"#7a7268", lineHeight:1.6, marginBottom:8 }}>{passed?`Great job! ${score}/${TOTAL_Q} correct.`:`Need at least ${PASS_SCORE}/10 to pass.`}</p>
        <span style={{ fontSize:13, color:"#9c9489", display:"block", marginBottom:24 }}>Lives left: {"❤️".repeat(lives)}{"🖤".repeat(Math.max(0,lvl.lives-lives))}</span>
        <BtnRow>
          {!passed && <PBtn color={lvl.color} onClick={restart}>↺ Try Again</PBtn>}
          {passed && next && <PBtn color={lvl.color} onClick={()=>navigate(`/games/${gameId}/play/${langId}/${next}`)}>Next Level →</PBtn>}
          {passed && !next && <PBtn color="#7c3aed" onClick={()=>navigate("/games")}>🎯 All Games</PBtn>}
          <SBtn onClick={()=>{clearTimer();navigate(`/games/${gameId}/level/${langId}`);}}>← Change Level</SBtn>
        </BtnRow>
      </EndPage>
    );
  }

  // ── QUIZ ──
  return (
    <>
      <style>{`
        @keyframes spin    { to { transform:rotate(360deg); } }
        @keyframes slideQ  { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeExp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        .q-enter   { animation: slideQ  0.3s cubic-bezier(.22,.68,0,1.2) both; }
        .exp-enter { animation: fadeExp 0.22s ease both; }
        .timer-urgent { animation: pulse 0.6s ease infinite; }
        .opt-btn { transition:transform 0.12s,border-color 0.12s,background 0.12s; cursor:pointer; border:none; text-align:left; font-family:inherit; }
        .opt-btn:hover:not(:disabled) { transform:translateX(4px); }
        .opt-btn:disabled { cursor:default; }
        .exit-btn:hover { background:#ede8e1 !important; }
        .next-btn:hover { opacity:0.88; }
        .next-btn:active { transform:scale(0.97); }

        /* Responsive */
        .quiz-root { min-height:100vh; background:#f5f0eb; font-family:'Segoe UI',system-ui,sans-serif; display:flex; flex-direction:column; }
        .quiz-wrap { flex:1; width:100%; max-width:700px; margin:0 auto; padding:18px 16px 48px; box-sizing:border-box; }
        .topbar    { background:#fff; border-bottom:1px solid #e8e2da; padding:10px 16px; display:flex; align-items:center; gap:10px; position:sticky; top:0; z-index:10; }
        .code-pre  { font-size:13px; line-height:1.75; }

        @media (max-width:540px) {
          .quiz-wrap { padding:12px 10px 40px; }
          .code-pre  { font-size:11px; }
          .opt-text  { font-size:13px !important; }
        }
        @media (max-width:380px) {
          .code-pre { font-size:10px; }
        }
      `}</style>

      <div className="quiz-root">

        {/* TOP BAR */}
        <div className="topbar">
          <button className="exit-btn" onClick={()=>{clearTimer();navigate(`/games/${gameId}/level/${langId}`);}}
            style={{ width:32, height:32, borderRadius:"50%", border:"1.5px solid #e0d8cf", background:"#f5f0eb", cursor:"pointer", fontSize:14, color:"#6b6560", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>✕</button>

          {/* Progress */}
          <div style={{ flex:1, height:7, background:"#ede8e1", borderRadius:999, overflow:"hidden" }}>
            <div style={{ height:"100%", background:lvl.color, borderRadius:999, width:`${progress}%`, transition:"width 0.45s ease" }} />
          </div>

          {/* Timer */}
          <div className={timeLeft<=5?"timer-urgent":""} style={{ display:"flex", alignItems:"center", gap:5, background:timerColor+"18", border:`1.5px solid ${timerColor}44`, borderRadius:999, padding:"4px 10px", flexShrink:0 }}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <circle cx="9" cy="9" r="7" fill="none" stroke="#ede8e1" strokeWidth="2.5" />
              <circle cx="9" cy="9" r="7" fill="none" stroke={timerColor} strokeWidth="2.5"
                strokeDasharray={`${2*Math.PI*7}`}
                strokeDashoffset={`${2*Math.PI*7*(1-timerPct)}`}
                strokeLinecap="round"
                transform="rotate(-90 9 9)"
                style={{ transition:"stroke-dashoffset 1s linear, stroke 0.3s" }}
              />
            </svg>
            <span style={{ fontSize:13, fontWeight:800, color:timerColor, fontVariantNumeric:"tabular-nums", minWidth:18 }}>{timeLeft}s</span>
          </div>

          {/* Lives */}
          <div style={{ display:"flex", gap:2, flexShrink:0 }}>
            {Array.from({length:lvl.lives}).map((_,i) => (
              <span key={i} style={{ fontSize:16, opacity: i<lives ? 1 : 0.22 }}>❤️</span>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="quiz-wrap">

          {/* Meta */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <span style={{ fontSize:13, fontWeight:600, color:"#0891b2" }}>🐛 {lang} · {lvl.label}</span>
            <span style={{ fontSize:13, color:"#9c9489", fontWeight:600, background:"#ede8e1", padding:"3px 10px", borderRadius:999 }}>{current+1} / {TOTAL_Q}</span>
          </div>

          {/* Score band */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", background:"#fff", border:"1px solid #e8e2da", borderRadius:14, overflow:"hidden", marginBottom:16 }}>
            {[{num:score,lbl:"Correct",color:"#16a34a"},{num:wrong,lbl:"Wrong",color:"#dc2626"},{num:PASS_SCORE,lbl:"To Pass",color:"#d97706"}].map((s,i)=>(
              <div key={s.lbl} style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"10px 6px", gap:2, borderRight:i<2?"1px solid #ede8e1":"none" }}>
                <span style={{ fontSize:18, fontWeight:700, lineHeight:1, color:s.color }}>{s.num}</span>
                <span style={{ fontSize:10, color:"#a09890", fontWeight:600, letterSpacing:"0.5px", textTransform:"uppercase" }}>{s.lbl}</span>
              </div>
            ))}
          </div>

          {/* Question */}
          <div key={animKey} className="q-enter">

            <span style={{ fontSize:11, fontWeight:700, letterSpacing:1, color:"#a09890", textTransform:"uppercase", display:"block", marginBottom:10 }}>
              Find the error in this code:
            </span>

            {/* Timeout banner */}
            {isTimeout && (
              <div className="exp-enter" style={{ background:"#fef2f2", border:"1.5px solid #fecaca", borderRadius:10, padding:"10px 14px", fontSize:13, color:"#991b1b", marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:16 }}>⏰</span>
                <span><strong>Time's up!</strong> The error was: <code style={{ background:"#dcfce7", color:"#166534", padding:"1px 6px", borderRadius:4, fontFamily:"monospace" }}>{q?.error}</code></span>
              </div>
            )}

            {/* Code block */}
            <div style={{ background:"#1e1b2e", borderRadius:14, padding:16, marginBottom:12, overflow:"auto" }}>
              <div style={{ display:"flex", gap:6, marginBottom:12, alignItems:"center" }}>
                {["#ff5f57","#febc2e","#28c840"].map((c,i)=>(
                  <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c }} />
                ))}
                <span style={{ marginLeft:"auto", fontSize:11, color:"rgba(255,255,255,0.3)", fontFamily:"monospace" }}>{langId}</span>
              </div>
              <pre className="code-pre" style={{ margin:0, fontFamily:"'Fira Code','Cascadia Code','Consolas',monospace", color:"#e2e8f0", overflowX:"auto", whiteSpace:"pre-wrap", wordBreak:"break-word" }}>
                <code>{q?.code}</code>
              </pre>
            </div>

            <p style={{ fontSize:14, fontWeight:600, color:"#374151", marginBottom:12 }}>❓ What is the error?</p>

            {/* Options */}
            <div style={{ display:"flex", flexDirection:"column", gap:9, marginBottom:12 }}>
              {q?.options?.map((opt,i) => {
                const isAns = i===q.answer, isSel = i===selected;
                let bg="#fff", border="#e8e2da", txtClr="#1c1814", letBg="#f5f0eb", letClr="#6b6560";
                if (selected!==null) {
                  if (isAns)      { bg="#f0fdf4"; border="#86efac"; txtClr="#166534"; letBg="#dcfce7"; letClr="#15803d"; }
                  else if (isSel) { bg="#fef2f2"; border="#fecaca"; txtClr="#991b1b"; letBg="#fee2e2"; letClr="#b91c1c"; }
                  else            { bg="#fafaf8"; border="#ede8e1"; txtClr="#c0b8b0"; letClr="#c0b8b0"; }
                }
                return (
                  <button key={i} className="opt-btn" disabled={selected!==null} onClick={()=>handleAnswer(i)}
                    style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"12px 14px", background:bg, border:`1.5px solid ${border}`, borderRadius:12, width:"100%" }}>
                    <span style={{ width:28, height:28, borderRadius:"50%", border:`1.5px solid ${border}`, background:letBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:letClr, flexShrink:0, marginTop:1 }}>
                      {LETTERS[i]}
                    </span>
                    <span className="opt-text" style={{ flex:1, fontSize:14, fontWeight:500, color:txtClr, lineHeight:1.5 }}>{opt}</span>
                    {selected!==null && isAns && <span style={{ fontSize:16, flexShrink:0 }}>✅</span>}
                    {selected!==null && isSel && !isAns && <span style={{ fontSize:16, flexShrink:0 }}>❌</span>}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExp && q?.explanation && !isTimeout && (
              <div className="exp-enter" style={{ background:isCorrect?"#f0fdf4":"#fef2f2", border:`1.5px solid ${isCorrect?"#86efac":"#fecaca"}`, borderRadius:12, padding:"13px 15px", fontSize:14, color:isCorrect?"#166534":"#991b1b", lineHeight:1.6, marginBottom:12 }}>
                <span style={{ fontWeight:700, display:"block", marginBottom:4, fontSize:13, color:isCorrect?"#15803d":"#b91c1c" }}>
                  {isCorrect?"✅ Correct!":"❌ Incorrect!"}
                  {!isCorrect && <span style={{ color:"#15803d", marginLeft:8 }}>Error: <code style={{ background:"#dcfce7", padding:"1px 6px", borderRadius:4, fontFamily:"monospace" }}>{q.error}</code></span>}
                </span>
                {q.explanation}
              </div>
            )}

            {/* Next */}
            {selected!==null && (
              <div className="exp-enter" style={{ display:"flex", justifyContent:"flex-end" }}>
                <button className="next-btn" onClick={handleNext}
                  style={{ background:lvl.color, color:"#fff", border:"none", borderRadius:12, padding:"11px 22px", fontSize:14, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:6, boxShadow:`0 4px 14px ${lvl.color}55`, transition:"opacity 0.15s, transform 0.1s" }}>
                  {current+1>=TOTAL_Q?"See Result":"Next"} →
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