import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useCallback, useRef } from "react";

const QUESTION_BANK = {
  python: {
    easy: [
      { code: `print(type(2/1))`, options: ["<class 'int'>", "<class 'float'>", "<class 'number'>", "Error"], answer: 1, explanation: "Division in Python always returns a float, even when result is whole." },
      { code: `x = [1,2,3]\nprint(x[-1])`, options: ["1", "3", "-1", "Error"], answer: 1, explanation: "Negative indexing: -1 refers to the last element." },
      { code: `print(bool(0), bool(''))`, options: ["True True", "False True", "False False", "True False"], answer: 2, explanation: "Both 0 and empty string are falsy in Python." },
      { code: `print('abc' * 2)`, options: ["Error", "abc abc", "abcabc", "abc2"], answer: 2, explanation: "String repetition: 'abc' * 2 = 'abcabc'." },
      { code: `print(10 % 3)`, options: ["3", "1", "3.33", "0"], answer: 1, explanation: "% is the modulo operator. 10 % 3 = 1 (remainder)." },
      { code: `a = [1,2,3]\nprint(len(a) - 1)`, options: ["2", "3", "1", "0"], answer: 0, explanation: "len([1,2,3]) = 3, so 3 - 1 = 2." },
      { code: `print(2 ** 4)`, options: ["8", "16", "6", "24"], answer: 1, explanation: "** is exponentiation. 2**4 = 16." },
      { code: `print('Hello'[1])`, options: ["H", "e", "He", "Error"], answer: 1, explanation: "Index 1 of 'Hello' is 'e' (0-indexed)." },
      { code: `print(not True or False)`, options: ["True", "False", "None", "Error"], answer: 1, explanation: "not True = False; False or False = False." },
      { code: `print(round(3.567, 1))`, options: ["3.5", "3.6", "4.0", "3.567"], answer: 1, explanation: "round(3.567, 1) rounds to 1 decimal → 3.6." },
    ],
    medium: [
      { code: `x = [1,2,3]\nprint(x[1:])`, options: ["[1,2]", "[2,3]", "[1,2,3]", "[3]"], answer: 1, explanation: "x[1:] slices from index 1 to end → [2,3]." },
      { code: `d = {'a':1}\nprint(d.get('b', 0))`, options: ["None", "Error", "0", "b"], answer: 2, explanation: ".get() returns default (0) if key is missing." },
      { code: `print(list(map(str, [1,2,3])))`, options: ["[1,2,3]", "['1','2','3']", "['123']", "Error"], answer: 1, explanation: "map(str, ...) converts each int to string." },
      { code: `x = lambda a,b: a if a>b else b\nprint(x(4,7))`, options: ["4", "7", "True", "False"], answer: 1, explanation: "Lambda returns a if a>b else b. 4>7 is False, so returns b=7." },
      { code: `nums = [1,2,3,4]\nprint([x**2 for x in nums if x%2==0])`, options: ["[1,4,9,16]", "[4,16]", "[2,4]", "[1,9]"], answer: 1, explanation: "Filters even numbers (2,4), then squares them → [4,16]." },
      { code: `a = (1,2,3)\nprint(a[1] + a[2])`, options: ["5", "23", "Error", "6"], answer: 0, explanation: "Tuple index 1=2, index 2=3. 2+3=5." },
      { code: `print(sorted([3,1,4,1,5], reverse=True))`, options: ["[1,1,3,4,5]", "[5,4,3,1,1]", "[3,1,4,1,5]", "Error"], answer: 1, explanation: "sorted(..., reverse=True) sorts descending." },
      { code: `print('py' in 'python')`, options: ["Error", "False", "True", "0"], answer: 2, explanation: "'in' operator checks substring membership." },
      { code: `x = {1,2,3,2,1}\nprint(len(x))`, options: ["5", "3", "2", "Error"], answer: 1, explanation: "Sets remove duplicates. {1,2,3,2,1} = {1,2,3}, len = 3." },
      { code: `def f(x=[]):\n    x.append(1)\n    return len(x)\nprint(f(), f())`, options: ["1 2", "1 1", "Error", "2 2"], answer: 0, explanation: "Mutable default arg persists. First call: [1] len=1. Second: [1,1] len=2." },
    ],
    hard: [
      { code: `x = [i*i for i in range(5)]\nprint(x[3])`, options: ["9", "16", "6", "4"], answer: 0, explanation: "List: [0,1,4,9,16]. Index 3 = 9." },
      { code: `def gen():\n    yield 1\n    yield 2\ng = gen()\nprint(next(g) + next(g))`, options: ["3", "12", "Error", "2"], answer: 0, explanation: "First next()=1, second next()=2. 1+2=3." },
      { code: `print({**{'a':1}, **{'a':2}})`, options: ["{'a':1}", "{'a':2}", "{'a':1,'a':2}", "Error"], answer: 1, explanation: "Dict unpacking: later key overwrites earlier → {'a':2}." },
      { code: `a = [1,2,3]\nb = a\nb.append(4)\nprint(a)`, options: ["[1,2,3]", "[1,2,3,4]", "[4]", "Error"], answer: 1, explanation: "b = a copies reference, not value. Both point to same list." },
      { code: `print(type(lambda: None).__name__)`, options: ["NoneType", "function", "lambda", "type"], answer: 1, explanation: "Lambda functions have type 'function'." },
      { code: `x = 5\ndef f():\n    x = 10\nf()\nprint(x)`, options: ["10", "5", "None", "Error"], answer: 1, explanation: "x inside f() is local. Global x remains 5." },
      { code: `print(list(zip([1,2], [3,4,5])))`, options: ["[(1,3),(2,4),(5,)]", "[(1,3),(2,4)]", "Error", "[(1,3,5),(2,4)]"], answer: 1, explanation: "zip stops at the shortest iterable." },
      { code: `d = {'x':1,'y':2}\nprint(list(d.keys()))`, options: ["dict_keys(['x','y'])", "['x','y']", "('x','y')", "Error"], answer: 1, explanation: "list() converts dict_keys to a regular list." },
      { code: `print(any([0, False, '', None, 1]))`, options: ["False", "True", "None", "Error"], answer: 1, explanation: "any() returns True if at least one element is truthy. 1 is truthy." },
      { code: `x = [1,2,3]\nprint(x.pop(0))`, options: ["3", "1", "[2,3]", "None"], answer: 1, explanation: "pop(0) removes and returns element at index 0, which is 1." },
    ],
  },
  java: {
    easy: [
      { code: `int x = 10;\nSystem.out.println(x++);`, options: ["11", "10", "9", "Error"], answer: 1, explanation: "x++ is post-increment. Prints current value (10) then increments." },
      { code: `System.out.println(10 / 3);`, options: ["3.33", "3", "4", "3.0"], answer: 1, explanation: "Integer division in Java truncates. 10/3 = 3." },
      { code: `String s = "hello";\nSystem.out.println(s.length());`, options: ["4", "5", "6", "Error"], answer: 1, explanation: "'hello' has 5 characters." },
      { code: `System.out.println(5 == 5.0);`, options: ["false", "true", "Error", "1"], answer: 1, explanation: "Java auto-promotes int to double for comparison. 5 == 5.0 is true." },
      { code: `System.out.println("A" + 1 + 2);`, options: ["A3", "A12", "3", "Error"], answer: 1, explanation: "String + 1 = 'A1', then 'A1' + 2 = 'A12' (left to right)." },
      { code: `int a=5, b=3;\nSystem.out.println(a%b);`, options: ["1", "2", "0", "1.67"], answer: 1, explanation: "5 % 3 = 2 (remainder of 5 divided by 3)." },
      { code: `System.out.println(Integer.MAX_VALUE + 1);`, options: ["2147483648", "Error", "-2147483648", "0"], answer: 2, explanation: "Integer overflow wraps around to MIN_VALUE = -2147483648." },
      { code: `System.out.println("ab".compareTo("ac"));`, options: ["0", "1", "-1", "-2"], answer: 2, explanation: "compareTo compares char by char. 'b' - 'c' = -1." },
      { code: `boolean x = true;\nSystem.out.println(!x);`, options: ["true", "false", "1", "Error"], answer: 1, explanation: "!true = false." },
      { code: `System.out.println(1 + 2 + "3");`, options: ["123", "33", "6", "Error"], answer: 1, explanation: "1+2=3 (ints), then 3+\"3\"=\"33\" (string concat)." },
    ],
    medium: [
      { code: `int[] arr = {1,2,3};\nSystem.out.println(arr[arr.length-1]);`, options: ["2", "3", "Error", "1"], answer: 1, explanation: "arr.length=3, arr[2] = 3." },
      { code: `String s = null;\nSystem.out.println(s + " world");`, options: ["Error", "null world", "world", " world"], answer: 1, explanation: "null + string = 'null world'. No NullPointerException here." },
      { code: `int x = 0;\nfor(int i=0;i<5;i++) x+=i;\nSystem.out.println(x);`, options: ["10", "15", "5", "4"], answer: 0, explanation: "0+1+2+3+4 = 10." },
      { code: `System.out.println(Math.max(3, Math.min(7, 5)));`, options: ["3", "5", "7", "Error"], answer: 1, explanation: "Math.min(7,5)=5, Math.max(3,5)=5." },
      { code: `String s = "hello";\nSystem.out.println(s.substring(1,3));`, options: ["hel", "el", "ell", "he"], answer: 1, explanation: "substring(1,3) extracts chars at index 1 and 2 → 'el'." },
      { code: `int x = 5;\nSystem.out.println(x > 3 ? "big" : "small");`, options: ["small", "big", "true", "Error"], answer: 1, explanation: "5 > 3 is true, so ternary returns 'big'." },
      { code: `System.out.println("hello".toUpperCase().charAt(0));`, options: ["h", "H", "HELLO", "Error"], answer: 1, explanation: "toUpperCase → 'HELLO', charAt(0) → 'H'." },
      { code: `int x = 7;\nSystem.out.println(x & 3);`, options: ["3", "7", "4", "1"], answer: 0, explanation: "7 in binary: 111, 3 in binary: 011. AND = 011 = 3." },
      { code: `double d = 9.0;\nSystem.out.println((int) Math.sqrt(d));`, options: ["3.0", "3", "2", "Error"], answer: 1, explanation: "Math.sqrt(9.0)=3.0, cast to int = 3." },
      { code: `System.out.println("abc".indexOf('c'));`, options: ["3", "2", "1", "-1"], answer: 1, explanation: "indexOf('c') returns index of 'c' = 2 (0-indexed)." },
    ],
    hard: [
      { code: `int x = 5;\nint y = x++;\nSystem.out.println(y + " " + x);`, options: ["5 5", "5 6", "6 6", "6 5"], answer: 1, explanation: "y = x (5), then x increments to 6. Output: '5 6'." },
      { code: `System.out.println(Integer.toBinaryString(10));`, options: ["1010", "10", "1001", "Error"], answer: 0, explanation: "10 in binary is 1010." },
      { code: `String a="hi";\nString b="hi";\nSystem.out.println(a==b);`, options: ["false", "true", "Error", "1"], answer: 1, explanation: "String literals are interned; a==b is true (same pool reference)." },
      { code: `int[] a = {5,3,8,1};\nArrays.sort(a);\nSystem.out.println(a[0]);`, options: ["5", "1", "8", "Error"], answer: 1, explanation: "After sort ascending, a[0] is the smallest = 1." },
      { code: `System.out.println(0.1 + 0.2 == 0.3);`, options: ["true", "false", "Error", "0.3"], answer: 1, explanation: "Floating-point precision: 0.1+0.2 ≠ exactly 0.3 in IEEE 754." },
      { code: `int x = 3;\nswitch(x) {\n  case 1: System.out.print("A");\n  case 3: System.out.print("B");\n  case 4: System.out.print("C");\n}`, options: ["B", "BC", "ABC", "C"], answer: 1, explanation: "Without break, fall-through continues from case 3 → prints B then C." },
      { code: `List<Integer> l = Arrays.asList(1,2,3);\nSystem.out.println(l.stream().reduce(0,Integer::sum));`, options: ["0", "6", "1", "Error"], answer: 1, explanation: "reduce with 0 as identity sums all elements: 0+1+2+3=6." },
      { code: `int x=10;\nif(x++>10) System.out.println("A");\nelse System.out.println("B");\nSystem.out.println(x);`, options: ["A 11", "B 11", "B 10", "A 10"], answer: 1, explanation: "x++ evaluates as 10 (not >10), so else runs. Then x=11." },
      { code: `System.out.println(Math.floor(-2.3));`, options: ["-2.0", "-3.0", "-2", "Error"], answer: 1, explanation: "floor rounds toward negative infinity. floor(-2.3) = -3.0." },
      { code: `System.out.println(String.valueOf(65).equals("65"));`, options: ["false", "true", "Error", "65"], answer: 1, explanation: "String.valueOf(65) = \"65\". \"65\".equals(\"65\") = true." },
    ],
  },
  cpp: {
    easy: [
      { code: `int x = 5;\ncout << x++;`, options: ["6", "5", "Error", "4"], answer: 1, explanation: "Post-increment prints current value (5), then increments." },
      { code: `cout << 7/2;`, options: ["3.5", "3", "4", "Error"], answer: 1, explanation: "Integer division in C++: 7/2 = 3." },
      { code: `int a=3, b=4;\ncout << (a>b ? a : b);`, options: ["3", "4", "true", "false"], answer: 1, explanation: "3>4 is false, so ternary returns b=4." },
      { code: `cout << sizeof(int);`, options: ["2", "4", "8", "Varies"], answer: 1, explanation: "On most modern platforms sizeof(int) = 4 bytes." },
      { code: `int x=10;\nx -= 3;\ncout << x;`, options: ["13", "7", "3", "-3"], answer: 1, explanation: "x -= 3 means x = x - 3 = 10 - 3 = 7." },
      { code: `string s = "hi";\ncout << s.size();`, options: ["1", "2", "3", "Error"], answer: 1, explanation: "'hi' has 2 characters, size() = 2." },
      { code: `cout << (3 != 3);`, options: ["1", "0", "false", "Error"], answer: 1, explanation: "3 != 3 is false, which prints as 0 in C++." },
      { code: `int arr[] = {10,20,30};\ncout << arr[2];`, options: ["10", "30", "20", "Error"], answer: 1, explanation: "arr[2] is the 3rd element = 30." },
      { code: `for(int i=0;i<3;i++) cout << i;`, options: ["123", "012", "0123", "Error"], answer: 1, explanation: "Loop prints 0, 1, 2 → '012'." },
      { code: `cout << 2 << 3;`, options: ["5", "23", "6", "Error"], answer: 1, explanation: "<< is the insertion operator. Prints 2 then 3 → '23'." },
    ],
    medium: [
      { code: `int x = 5;\nint *p = &x;\n*p = 10;\ncout << x;`, options: ["5", "10", "&x", "Error"], answer: 1, explanation: "*p = 10 modifies the value at x's address, so x = 10." },
      { code: `int a=1, b=2;\nswap(a,b);\ncout << a << b;`, options: ["12", "21", "11", "22"], answer: 1, explanation: "swap() exchanges values. a=2, b=1 → prints '21'." },
      { code: `string s = "hello";\ncout << s.substr(1,3);`, options: ["hel", "ell", "hell", "llo"], answer: 1, explanation: "substr(1,3): start at index 1, length 3 → 'ell'." },
      { code: `vector<int> v = {1,2,3};\nv.push_back(4);\ncout << v.size();`, options: ["3", "4", "5", "Error"], answer: 1, explanation: "After push_back, vector has 4 elements." },
      { code: `int x = 0b1010;\ncout << x;`, options: ["1010", "10", "8", "Error"], answer: 1, explanation: "0b1010 is binary for 10 in decimal." },
      { code: `int a=5;\nauto f = [&](){return a*2;};\ncout << f();`, options: ["5", "10", "Error", "a*2"], answer: 1, explanation: "Lambda captures a by reference. Returns 5*2=10." },
      { code: `cout << string(3,'*');`, options: ["3*", "***", "*3", "Error"], answer: 1, explanation: "string(3,'*') creates '***'." },
      { code: `int x=15;\ncout << (x>>1);`, options: ["30", "7", "8", "Error"], answer: 1, explanation: "Right shift by 1 = divide by 2. 15>>1 = 7." },
      { code: `map<string,int> m;\nm["a"]++;\ncout << m["a"];`, options: ["0", "1", "Error", "null"], answer: 1, explanation: "m['a'] default-initializes to 0, then ++ makes it 1." },
      { code: `int arr[]={1,2,3,4,5};\ncout << *(arr+2);`, options: ["1", "3", "2", "Error"], answer: 1, explanation: "arr+2 points to 3rd element. Dereference → 3." },
    ],
    hard: [
      { code: `int x = -1;\ncout << (unsigned int)x;`, options: ["-1", "4294967295", "0", "Error"], answer: 1, explanation: "-1 as unsigned 32-bit int wraps to 4294967295 (2^32 - 1)." },
      { code: `int a=5, b=3;\ncout << (a^b);`, options: ["6", "1", "7", "Error"], answer: 0, explanation: "XOR: 5=101, 3=011. 101 XOR 011 = 110 = 6." },
      { code: `struct A { int x=1; };\nA a, b=a;\nb.x = 99;\ncout << a.x;`, options: ["99", "1", "Error", "0"], answer: 1, explanation: "Struct copy is by value. Modifying b doesn't affect a." },
      { code: `int x = 5;\ncout << (x<<2);`, options: ["10", "20", "7", "25"], answer: 1, explanation: "Left shift by 2 = multiply by 4. 5<<2 = 20." },
      { code: `auto f = [](int x) -> int { return x*x; };\ncout << f(4);`, options: ["4", "16", "8", "Error"], answer: 1, explanation: "Lambda squares x. f(4) = 16." },
      { code: `int x;\ncout << (x=5, x*2);`, options: ["5", "10", "Error", "5 10"], answer: 1, explanation: "Comma operator evaluates both, returns last. x=5, then 5*2=10." },
      { code: `int a[]={1,2,3};\ncout << sizeof(a)/sizeof(a[0]);`, options: ["3", "12", "4", "Error"], answer: 0, explanation: "sizeof(a)=12 (3 ints * 4 bytes), sizeof(a[0])=4. 12/4=3." },
      { code: `int x=5;\ncout << [&](){return x+1;}();`, options: ["5", "6", "Error", "x+1"], answer: 1, explanation: "Immediately invoked lambda captures x=5, returns 6." },
      { code: `using ll = long long;\nll x = 1LL<<40;\ncout << (x > 0);`, options: ["0", "1", "Error", "-1"], answer: 1, explanation: "1<<40 is a large positive long long. Comparison returns 1 (true)." },
      { code: `int x=100;\nint *p=nullptr;\ncout << (p==nullptr);`, options: ["0", "1", "Error", "null"], answer: 1, explanation: "Comparing nullptr: p==nullptr is true → prints 1." },
    ],
  },
  c: {
    easy: [
      { code: `int x = 5;\nprintf("%d", x++);`, options: ["6", "5", "Error", "4"], answer: 1, explanation: "Post-increment prints current value (5) then increments." },
      { code: `printf("%d", 10 / 3);`, options: ["3.33", "3", "4", "Error"], answer: 1, explanation: "Integer division in C: 10/3 = 3." },
      { code: `printf("%d", sizeof(char));`, options: ["2", "4", "1", "8"], answer: 2, explanation: "sizeof(char) is always 1 byte in C." },
      { code: `printf("%d", 7 % 3);`, options: ["2", "1", "3", "0"], answer: 1, explanation: "7 % 3 = 1 (remainder)." },
      { code: `int a=5;\nprintf("%d", a > 3 ? 1 : 0);`, options: ["0", "1", "true", "Error"], answer: 1, explanation: "5 > 3 is true → ternary returns 1." },
      { code: `char s[] = "hello";\nprintf("%d", strlen(s));`, options: ["4", "5", "6", "Error"], answer: 1, explanation: "strlen counts chars without null terminator → 5." },
      { code: `printf("%d", !0);`, options: ["0", "1", "Error", "true"], answer: 1, explanation: "!0 = 1 (logical NOT of 0/false)." },
      { code: `int x=0;\nwhile(x<3) x++;\nprintf("%d",x);`, options: ["2", "3", "4", "0"], answer: 1, explanation: "Loop increments x until x=3, then exits. Prints 3." },
      { code: `int arr[]={1,2,3};\nprintf("%d", arr[1]);`, options: ["1", "2", "3", "Error"], answer: 1, explanation: "arr[1] is the 2nd element = 2." },
      { code: `printf("%d", 2<<3);`, options: ["6", "16", "8", "5"], answer: 1, explanation: "Left shift: 2<<3 = 2*2^3 = 16." },
    ],
    medium: [
      { code: `int x = 5;\nint *p = &x;\n(*p)++;\nprintf("%d", x);`, options: ["5", "6", "Error", "1"], answer: 1, explanation: "(*p)++ dereferences pointer and increments value at address → x=6." },
      { code: `int a[]={1,2,3,4};\nprintf("%d", *(a+2));`, options: ["1", "3", "2", "Error"], answer: 1, explanation: "a+2 points to 3rd element. Dereference → 3." },
      { code: `int x=5,y=10;\nprintf("%d", x>y ? x : y);`, options: ["5", "10", "true", "Error"], answer: 1, explanation: "5>10 is false → ternary returns y=10." },
      { code: `char s[]="abcde";\nprintf("%c",s[strlen(s)-1]);`, options: ["a", "e", "d", "\\0"], answer: 1, explanation: "strlen=5. s[4]='e' (last char before null)." },
      { code: `int sum=0;\nfor(int i=1;i<=5;i++) sum+=i;\nprintf("%d",sum);`, options: ["10", "15", "5", "20"], answer: 1, explanation: "Sum of 1+2+3+4+5 = 15." },
      { code: `struct P{int x,y;};\nstruct P p={3,4};\nprintf("%d",p.x+p.y);`, options: ["34", "7", "3", "Error"], answer: 1, explanation: "p.x=3, p.y=4. 3+4=7." },
      { code: `int x=0xFF;\nprintf("%d",x);`, options: ["FF", "255", "256", "Error"], answer: 1, explanation: "0xFF in hex = 255 in decimal." },
      { code: `int a=5,b=3;\na^=b;b^=a;a^=b;\nprintf("%d %d",a,b);`, options: ["5 3", "3 5", "0 0", "Error"], answer: 1, explanation: "XOR swap trick: swaps a and b. a=3, b=5." },
      { code: `int x=100;\nprintf("%d",(x&1)==0);`, options: ["0", "1", "Error", "100"], answer: 1, explanation: "100 is even. x&1=0. 0==0 is 1 (true)." },
      { code: `void f(int *x){*x=99;}\nint a=5;\nf(&a);\nprintf("%d",a);`, options: ["5", "99", "Error", "0"], answer: 1, explanation: "Passing pointer lets function modify original variable." },
    ],
    hard: [
      { code: `int x = -1;\nprintf("%u", x);`, options: ["-1", "4294967295", "0", "Error"], answer: 1, explanation: "-1 as unsigned int = 2^32 - 1 = 4294967295." },
      { code: `char *s = "hello";\nprintf("%c", *(s+1));`, options: ["h", "e", "l", "Error"], answer: 1, explanation: "s+1 points to 2nd char 'e'. Dereference → 'e'." },
      { code: `int a[3]={0};\nprintf("%d %d", a[0], a[2]);`, options: ["0 0", "garbage garbage", "0 garbage", "Error"], answer: 0, explanation: "{0} initializes all elements to 0." },
      { code: `typedef int(*fp)(int);\nint sq(int x){return x*x;}\nfp f=sq;\nprintf("%d",f(5));`, options: ["5", "25", "Error", "10"], answer: 1, explanation: "Function pointer calls sq(5) = 25." },
      { code: `int x=5;\nprintf("%d",x<<1 | 1);`, options: ["10", "11", "9", "Error"], answer: 1, explanation: "x<<1=10 (binary 1010), 1010|0001=1011=11." },
      { code: `union U{int i;char c;};\nunion U u;\nu.i=0x41424344;\nprintf("%c",u.c);`, options: ["A", "D", "B", "Error"], answer: 1, explanation: "On little-endian: lowest byte of 0x41424344 is 0x44='D'." },
      { code: `volatile int x=5;\nprintf("%d",x);`, options: ["Error", "5", "garbage", "undefined"], answer: 1, explanation: "volatile just prevents optimization. Still prints 5." },
      { code: `int *p=(int*)malloc(sizeof(int));\n*p=42;\nprintf("%d",*p);\nfree(p);`, options: ["Error", "42", "0", "garbage"], answer: 1, explanation: "malloc allocates memory, stores 42, prints it, then frees." },
      { code: `int a=3,b=5;\nprintf("%d",a&b);`, options: ["7", "1", "0", "3"], answer: 1, explanation: "3=011, 5=101. AND=001=1." },
      { code: `int x=10;\nswitch(x){\n  case 10: printf("A");\n  case 20: printf("B"); break;\n  default: printf("C");\n}`, options: ["A", "B", "AB", "ABC"], answer: 2, explanation: "No break after case 10 → falls through to case 20 → prints 'AB'." },
    ],
  },
  sql: {
    easy: [
      { code: `SELECT 5 + 3;`, options: ["53", "8", "Error", "5+3"], answer: 1, explanation: "SQL evaluates arithmetic. 5 + 3 = 8." },
      { code: `SELECT LENGTH('hello');`, options: ["4", "5", "6", "Error"], answer: 1, explanation: "LENGTH() counts characters. 'hello' = 5." },
      { code: `SELECT UPPER('sql');`, options: ["sql", "SQL", "Sql", "Error"], answer: 1, explanation: "UPPER() converts to uppercase → 'SQL'." },
      { code: `SELECT 10 % 3;`, options: ["3", "1", "3.33", "0"], answer: 1, explanation: "10 % 3 = 1 (remainder)." },
      { code: `SELECT ROUND(3.567, 1);`, options: ["3.5", "3.6", "4.0", "3.567"], answer: 1, explanation: "ROUND to 1 decimal: 3.567 → 3.6." },
      { code: `SELECT CONCAT('Hello', ' ', 'World');`, options: ["HelloWorld", "Hello World", "Error", "'Hello' 'World'"], answer: 1, explanation: "CONCAT joins strings with the separator." },
      { code: `SELECT ABS(-42);`, options: ["-42", "42", "0", "Error"], answer: 1, explanation: "ABS() returns absolute (positive) value." },
      { code: `SELECT FLOOR(4.9);`, options: ["5", "4", "4.9", "Error"], answer: 1, explanation: "FLOOR rounds down to nearest integer = 4." },
      { code: `SELECT NULL = NULL;`, options: ["1", "0", "NULL", "Error"], answer: 2, explanation: "Any comparison with NULL yields NULL (unknown), not true or false." },
      { code: `SELECT COALESCE(NULL, NULL, 'found');`, options: ["NULL", "found", "Error", "3"], answer: 1, explanation: "COALESCE returns the first non-NULL value → 'found'." },
    ],
    medium: [
      { code: `SELECT COUNT(*) FROM (\n  SELECT 1 UNION\n  SELECT 2 UNION\n  SELECT 2\n) t;`, options: ["3", "2", "1", "Error"], answer: 1, explanation: "UNION removes duplicates. 3 rows → 2 distinct rows." },
      { code: `SELECT 5 / 2;`, options: ["2.5", "2", "3", "Error"], answer: 1, explanation: "In most SQL dialects, integer / integer = integer. 5/2 = 2." },
      { code: `SELECT LENGTH('  hi  ');`, options: ["2", "6", "4", "Error"], answer: 1, explanation: "LENGTH counts all chars including spaces. '  hi  ' = 6 chars." },
      { code: `SELECT SUBSTRING('database', 1, 4);`, options: ["data", "ata", "base", "Error"], answer: 0, explanation: "SQL SUBSTRING starts at position 1 (not 0). 4 chars from pos 1 = 'data'." },
      { code: `SELECT MOD(17, 5);`, options: ["3", "2", "4", "1"], answer: 1, explanation: "17 MOD 5 = 2 (17 = 5*3 + 2)." },
      { code: `SELECT CEIL(4.1);`, options: ["4", "5", "4.1", "Error"], answer: 1, explanation: "CEIL rounds up to nearest integer = 5." },
      { code: `SELECT POWER(3, 4);`, options: ["12", "81", "7", "Error"], answer: 1, explanation: "POWER(3,4) = 3^4 = 81." },
      { code: `SELECT LTRIM('   hello');`, options: ["   hello", "hello", "hello   ", "Error"], answer: 1, explanation: "LTRIM removes leading spaces → 'hello'." },
      { code: `SELECT CHARINDEX('l', 'hello');`, options: ["3", "4", "2", "0"], answer: 0, explanation: "First 'l' is at position 3 (1-indexed in SQL Server)." },
      { code: `SELECT 1 = 1 AND 2 > 3;`, options: ["1", "0", "NULL", "Error"], answer: 1, explanation: "1=1 is TRUE, 2>3 is FALSE. TRUE AND FALSE = 0/FALSE." },
    ],
    hard: [
      { code: `SELECT ROW_NUMBER() OVER (\n  ORDER BY val\n) FROM (VALUES(3),(1),(2)) t(val);`, options: ["3,1,2", "1,2,3", "Error", "1,1,1"], answer: 1, explanation: "ROW_NUMBER() assigns sequential numbers after ORDER BY val (1,2,3)." },
      { code: `SELECT CASE WHEN 1=1 THEN 'A'\n  WHEN 2=2 THEN 'B'\n  ELSE 'C' END;`, options: ["B", "A", "AB", "C"], answer: 1, explanation: "CASE evaluates top-down. First match (1=1) wins → 'A'." },
      { code: `SELECT SUM(val)\nFROM (VALUES(1),(NULL),(3)) t(val);`, options: ["NULL", "4", "3", "Error"], answer: 1, explanation: "SUM ignores NULL values. 1+3=4." },
      { code: `SELECT COUNT(val)\nFROM (VALUES(1),(NULL),(3)) t(val);`, options: ["3", "2", "1", "Error"], answer: 1, explanation: "COUNT(col) excludes NULLs → counts 2 non-null rows." },
      { code: `WITH cte AS (SELECT 5 AS n)\nSELECT n * 2 FROM cte;`, options: ["5", "10", "Error", "n*2"], answer: 1, explanation: "CTE defines n=5. Query returns 5*2=10." },
      { code: `SELECT RANK() OVER (ORDER BY val)\nFROM (VALUES(1),(1),(3)) t(val);`, options: ["1,2,3", "1,1,3", "1,1,2", "Error"], answer: 1, explanation: "RANK() gives tied rows same rank and skips. 1,1 → rank 1,1 then 3 → rank 3." },
      { code: `SELECT NULLIF(5, 5);`, options: ["5", "NULL", "0", "Error"], answer: 1, explanation: "NULLIF returns NULL when both arguments are equal." },
      { code: `SELECT DATEDIFF(day,\n  '2024-01-01', '2024-01-08');`, options: ["8", "7", "6", "Error"], answer: 1, explanation: "DATEDIFF counts boundaries: Jan 1 to Jan 8 = 7 days." },
      { code: `SELECT DENSE_RANK() OVER (ORDER BY val)\nFROM (VALUES(1),(1),(3)) t(val);`, options: ["1,1,3", "1,1,2", "1,2,3", "Error"], answer: 1, explanation: "DENSE_RANK doesn't skip. Tied 1s get rank 1, then 3 gets rank 2." },
      { code: `SELECT IIF(1>2, 'yes', 'no');`, options: ["yes", "no", "NULL", "Error"], answer: 1, explanation: "IIF is inline IF. 1>2 is false → returns 'no'." },
    ],
  },
  webdev: {
    easy: [
      { code: `console.log(typeof 42);`, options: ["number", "int", "integer", "Number"], answer: 0, explanation: "typeof 42 returns 'number' (lowercase string)." },
      { code: `console.log(1 + '2');`, options: ["3", "12", "Error", "'12'"], answer: 1, explanation: "Number + String coerces to string concatenation → '12'." },
      { code: `console.log([1,2,3].length);`, options: ["2", "3", "4", "Error"], answer: 1, explanation: "Array has 3 elements, .length = 3." },
      { code: `console.log(Boolean(''));`, options: ["true", "false", "undefined", "Error"], answer: 1, explanation: "Empty string is falsy in JavaScript." },
      { code: `console.log(2 ** 10);`, options: ["20", "1024", "512", "Error"], answer: 1, explanation: "** is exponentiation. 2^10 = 1024." },
      { code: `console.log('hello'.toUpperCase()[0]);`, options: ["h", "H", "HELLO", "Error"], answer: 1, explanation: "toUpperCase → 'HELLO', index [0] → 'H'." },
      { code: `console.log(null == undefined);`, options: ["false", "true", "Error", "null"], answer: 1, explanation: "== (loose equality): null == undefined is true in JS." },
      { code: `let x = [1,2,3];\nconsole.log(x.includes(2));`, options: ["false", "true", "1", "Error"], answer: 1, explanation: "includes() checks for value 2 in array → true." },
      { code: `console.log(Math.floor(4.9));`, options: ["5", "4", "4.9", "Error"], answer: 1, explanation: "Math.floor rounds down → 4." },
      { code: `console.log(typeof null);`, options: ["null", "object", "undefined", "Error"], answer: 1, explanation: "Famous JS quirk: typeof null === 'object'." },
    ],
    medium: [
      { code: `console.log([1,2,3].map(x => x*2));`, options: ["6", "[2,4,6]", "[1,2,3]", "Error"], answer: 1, explanation: "map returns new array with each element doubled." },
      { code: `console.log([3,1,2].sort());`, options: ["[1,2,3]", "[3,2,1]", "[3,1,2]", "Error"], answer: 0, explanation: "Default sort is lexicographic. [1,2,3] happens to be correct here." },
      { code: `const f = x => x > 0;\nconsole.log([1,-2,3].filter(f));`, options: ["[1,3]", "[-2]", "[1,-2,3]", "Error"], answer: 0, explanation: "filter keeps elements where x > 0 → [1,3]." },
      { code: `console.log([1,2,3].reduce((a,b)=>a+b, 0));`, options: ["1", "6", "0", "Error"], answer: 1, explanation: "reduce sums all elements: 0+1+2+3=6." },
      { code: `let a = {x:1};\nlet b = a;\nb.x = 99;\nconsole.log(a.x);`, options: ["1", "99", "undefined", "Error"], answer: 1, explanation: "Objects are reference types. b.x changes a.x too." },
      { code: `console.log(!!0 || !!1);`, options: ["false", "true", "1", "Error"], answer: 1, explanation: "!!0=false, !!1=true. false || true = true." },
      { code: `const arr = [1,[2,[3]]];\nconsole.log(arr.flat().length);`, options: ["3", "4", "2", "Error"], answer: 0, explanation: "flat() flattens one level → [1,2,[3]], length = 3." },
      { code: `let x = 'hello';\nconsole.log(x.split('').reverse().join(''));`, options: ["hello", "olleh", "Error", "['h','e','l','l','o']"], answer: 1, explanation: "Split to array, reverse, join back → 'olleh'." },
      { code: `console.log({a:1, b:2, ...{b:3, c:4}});`, options: ["{a:1,b:2,c:4}", "{a:1,b:3,c:4}", "Error", "{b:3,c:4}"], answer: 1, explanation: "Spread: later property b:3 overwrites b:2 → {a:1,b:3,c:4}." },
      { code: `const p = Promise.resolve(42);\np.then(v => console.log(v));`, options: ["undefined", "42", "Promise", "Error"], answer: 1, explanation: "Promise.resolve(42) resolves with 42; .then logs it." },
    ],
    hard: [
      { code: `console.log(0.1 + 0.2 === 0.3);`, options: ["true", "false", "Error", "undefined"], answer: 1, explanation: "Floating-point imprecision: 0.1+0.2 ≠ 0.3 exactly in IEEE 754." },
      { code: `let x = 1;\nfunction f() { console.log(x); let x = 2; }\nf();`, options: ["1", "2", "undefined", "ReferenceError"], answer: 3, explanation: "let is hoisted but not initialized (temporal dead zone). ReferenceError." },
      { code: `console.log([]+[]);`, options: ["Error", "0", "''", "[][]"], answer: 2, explanation: "[]+[] → ''+'' = '' (empty string). Arrays coerce to strings." },
      { code: `console.log(typeof class {});`, options: ["class", "object", "function", "undefined"], answer: 2, explanation: "Classes are syntactic sugar over functions. typeof class {} = 'function'." },
      { code: `const a = [1,2];\nconst b = [1,2];\nconsole.log(a === b);`, options: ["true", "false", "Error", "undefined"], answer: 1, explanation: "Arrays are reference types. Two separate arrays are not === even with same content." },
      { code: `console.log(+'3' + +true);`, options: ["3true", "4", "31", "Error"], answer: 1, explanation: "Unary +: +'3'=3, +true=1. 3+1=4." },
      { code: `function* gen() {\n  yield 1; yield 2;\n}\nconst g = gen();\nconsole.log([...g]);`, options: ["[1]", "[1,2]", "Error", "{}"], answer: 1, explanation: "Spread on generator collects all yielded values → [1,2]." },
      { code: `console.log(Object.is(NaN, NaN));`, options: ["false", "true", "Error", "undefined"], answer: 1, explanation: "Object.is() considers NaN === NaN, unlike ===." },
      { code: `let x = 5;\nconsole.log(x > 3 > 1);`, options: ["true", "false", "Error", "2"], answer: 1, explanation: "x>3 = true (1). 1>1 = false." },
      { code: `const obj = {a:1};\nObject.freeze(obj);\nobj.a = 99;\nconsole.log(obj.a);`, options: ["99", "1", "Error", "undefined"], answer: 1, explanation: "Object.freeze prevents modification. obj.a stays 1 silently." },
    ],
  },
  dsa: {
    easy: [
      { code: `# Stack: push 1,2,3 then pop\nstack = []\nstack.append(1)\nstack.append(2)\nstack.append(3)\nprint(stack.pop())`, options: ["1", "3", "2", "Error"], answer: 1, explanation: "Stack is LIFO. Last pushed (3) is popped first." },
      { code: `# Queue: enqueue 1,2,3, dequeue\nfrom collections import deque\nq = deque([1,2,3])\nprint(q.popleft())`, options: ["3", "2", "1", "Error"], answer: 2, explanation: "Queue is FIFO. First enqueued (1) is dequeued first." },
      { code: `arr = [1,4,2,8,5]\nprint(min(arr))`, options: ["8", "1", "5", "Error"], answer: 1, explanation: "min() returns the smallest element = 1." },
      { code: `import math\nprint(math.ceil(math.log2(100)))`, options: ["7", "10", "100", "50"], answer: 0, explanation: "log2(100) ≈ 6.64, ceil = 7. Max iterations for binary search on 100 items." },
      { code: `d = {}\nd['a'] = 1\nd['b'] = 2\nprint('c' in d)`, options: ["True", "False", "Error", "None"], answer: 1, explanation: "'c' is not a key in the dict → False." },
      { code: `s = set([1,2,2,3,3,3])\nprint(len(s))`, options: ["6", "3", "2", "Error"], answer: 1, explanation: "Sets store unique values. {1,2,3} has length 3." },
      { code: `arr = [5,3,8,1,9]\narr.sort()\nprint(arr[0])`, options: ["5", "1", "9", "8"], answer: 1, explanation: "After sort ascending, smallest element (1) is at index 0." },
      { code: `def f(n):\n    if n==0: return 0\n    return 1 + f(n-1)\nprint(f(5))`, options: ["0", "5", "4", "Error"], answer: 1, explanation: "Recursion counts down from 5 to 0, adding 1 each time → 5." },
      { code: `n=4; c=0\nfor i in range(n):\n    for j in range(n):\n        c+=1\nprint(c)`, options: ["4", "8", "16", "32"], answer: 2, explanation: "Nested loop runs n*n = 4*4 = 16 times." },
      { code: `arr = [1,2,3,4,5]\nprint(arr[len(arr)//2])`, options: ["2", "3", "4", "Error"], answer: 1, explanation: "len=5, 5//2=2. arr[2]=3 (middle element)." },
    ],
    medium: [
      { code: `from collections import deque\ngraph={1:[2,3],2:[4],3:[4],4:[]}\nvis=[];q=deque([1])\nwhile q:\n    n=q.popleft()\n    if n not in vis:\n        vis.append(n)\n        q.extend(graph[n])\nprint(vis)`, options: ["[1,3,2,4]", "[1,2,3,4]", "[1,4,2,3]", "Error"], answer: 1, explanation: "BFS visits level by level: 1 → 2,3 → 4." },
      { code: `arr=[3,1,2]; swaps=0\nfor i in range(len(arr)-1):\n    if arr[i]>arr[i+1]:\n        arr[i],arr[i+1]=arr[i+1],arr[i]\n        swaps+=1\nprint(swaps)`, options: ["1", "2", "3", "0"], answer: 1, explanation: "First pass: 3>1 swap, 3>2 swap = 2 swaps." },
      { code: `def bs(a,t):\n    l,r=0,len(a)-1\n    while l<=r:\n        m=(l+r)//2\n        if a[m]==t:return m\n        elif a[m]<t:l=m+1\n        else:r=m-1\n    return -1\nprint(bs([1,3,5,7,9],7))`, options: ["4", "3", "2", "Error"], answer: 1, explanation: "7 is at index 3 in [1,3,5,7,9]." },
      { code: `print(list(reversed([1,2,3]))==[1,2,3])`, options: ["True", "False", "Error", "None"], answer: 1, explanation: "reversed gives [3,2,1], which != [1,2,3] → False." },
      { code: `dp=[0,1]\nfor i in range(2,8): dp.append(dp[-1]+dp[-2])\nprint(dp[7])`, options: ["8", "13", "21", "5"], answer: 1, explanation: "Fibonacci: 0,1,1,2,3,5,8,13. dp[7]=13." },
      { code: `words='a b a c b a'.split()\nfreq={}\nfor w in words: freq[w]=freq.get(w,0)+1\nprint(freq['a'])`, options: ["2", "3", "1", "Error"], answer: 1, explanation: "'a' appears 3 times in the list." },
      { code: `def ms(a):\n    if len(a)<=1:return a\n    m=len(a)//2\n    return sorted(ms(a[:m])+ms(a[m:]))\nprint(ms([4,2,7,1,3]))`, options: ["[4,2,7,1,3]", "[1,2,3,4,7]", "[7,4,3,2,1]", "Error"], answer: 1, explanation: "Merge sort produces sorted array [1,2,3,4,7]." },
      { code: `arr=[1,2,3,4,5]\nprint(sum(arr[1:4]))`, options: ["15", "9", "6", "10"], answer: 1, explanation: "arr[1:4] = [2,3,4]. Sum = 9." },
      { code: `def qs(a):\n    if len(a)<=1:return a\n    p=a[-1]\n    return qs([x for x in a[:-1] if x<=p])+[p]+qs([x for x in a[:-1] if x>p])\nprint(qs([3,6,8,10,1,2,1]))`, options: ["[1,1,2,3,6,8,10]", "[1,2,3,1,6,8,10]", "Error", "[10,8,6,3,2,1,1]"], answer: 0, explanation: "Quicksort produces sorted array [1,1,2,3,6,8,10]." },
      { code: `def lcs(a,b):\n    if not a or not b:return 0\n    if a[-1]==b[-1]:return 1+lcs(a[:-1],b[:-1])\n    return max(lcs(a[:-1],b),lcs(a,b[:-1]))\nprint(lcs('abc','ac'))`, options: ["1", "2", "3", "0"], answer: 1, explanation: "LCS of 'abc' and 'ac' is 'ac', length = 2." },
    ],
    hard: [
      { code: `# Dijkstra: shortest A→C\n# A→B=1, B→C=2, A→C=4\nprint(1+2)`, options: ["4", "3", "2", "Error"], answer: 1, explanation: "A→B→C costs 1+2=3, shorter than A→C=4." },
      { code: `order=[5,4,2,3,1,0]\nedges=[(5,2),(5,0),(4,0),(4,1),(2,3),(3,1)]\nvalid=all(order.index(u)<order.index(v) for u,v in edges)\nprint(valid)`, options: ["False", "True", "Error", "None"], answer: 1, explanation: "All edges go from earlier to later position in order → valid topological sort." },
      { code: `dp=[float('inf')]*12;dp[0]=0\nfor c in [1,5,6]:\n    for i in range(c,12):\n        dp[i]=min(dp[i],dp[i-c]+1)\nprint(dp[11])`, options: ["3", "2", "4", "11"], answer: 1, explanation: "11 = 5+6 = 2 coins (optimal)." },
      { code: `arr=[1,3,5,7,9,11]\nprint(sum(arr[1:4]))`, options: ["15", "8", "11", "9"], answer: 0, explanation: "arr[1:4] = [3,5,7]. Sum = 15." },
      { code: `w=[2,3,4];v=[3,4,5];W=5;n=3\ndp=[[0]*(W+1) for _ in range(n+1)]\nfor i in range(1,n+1):\n    for j in range(W+1):\n        dp[i][j]=dp[i-1][j]\n        if w[i-1]<=j:dp[i][j]=max(dp[i][j],dp[i-1][j-w[i-1]]+v[i-1])\nprint(dp[n][W])`, options: ["5", "7", "4", "9"], answer: 1, explanation: "Best: pick items 1+2 (weights 2+3=5, values 3+4=7)." },
      { code: `arr=[3,10,2,1,20];n=len(arr)\ndp=[1]*n\nfor i in range(1,n):\n    for j in range(i):\n        if arr[j]<arr[i]:dp[i]=max(dp[i],dp[j]+1)\nprint(max(dp))`, options: ["4", "3", "5", "2"], answer: 1, explanation: "LIS is [3,10,20] or [2,20] or [1,20]. Best = 3 elements." },
      { code: `def inv(a):\n    return sum(1 for i in range(len(a)) for j in range(i+1,len(a)) if a[i]>a[j])\nprint(inv([2,4,1,3,5]))`, options: ["4", "3", "2", "5"], answer: 1, explanation: "Inversions: (2,1),(4,1),(4,3) = 3 inversions." },
      { code: `words=['cat','car','card','care']\nprefixes=set()\nfor w in words:\n    for i in range(1,len(w)+1):prefixes.add(w[:i])\nprint(len(prefixes))`, options: ["10", "9", "12", "8"], answer: 0, explanation: "Unique prefixes: c,ca,cat,car,card,care,caro,card... exactly 10 unique strings." },
      { code: `bit=[0]*6\nfor i,v in enumerate([1,2,3,4,5],1):\n    j=i\n    while j<6:bit[j]+=v;j+=j&(-j)\ns=0;i=3\nwhile i>0:s+=bit[i];i-=i&(-i)\nprint(s)`, options: ["6", "3", "5", "10"], answer: 0, explanation: "Fenwick Tree prefix sum[1..3] = 1+2+3 = 6." },
      { code: `graph=[('A','B',1),('B','C',-1),('C','A',-1)]\ntotal=1+(-1)+(-1)\nprint(total < 0)`, options: ["False", "True", "Error", "None"], answer: 1, explanation: "A→B→C→A total = 1-1-1 = -1 < 0: negative cycle exists → True." },
    ],
  },
};

const languageLabels = {
  python: "Python", c: "C", cpp: "C++",
  java: "Java", sql: "SQL", webdev: "Web Dev", dsa: "DSA",
};

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

// ─────────────────────────────────────────────────────────────────────────────
// TIMER RING
// ─────────────────────────────────────────────────────────────────────────────
const TimerRing = ({ timeLeft, timeLimit, color }) => {
  const R             = 16;
  const circumference = 2 * Math.PI * R;
  const pct           = timeLeft / timeLimit;
  const dashOffset    = circumference * (1 - pct);
  const ringColor     = pct > 0.5 ? color : pct > 0.25 ? "#D97706" : "#DC2626";
  const isUrgent      = timeLeft <= 5 && timeLeft > 0;

  return (
    <div style={{ position: "relative", width: "44px", height: "44px", flexShrink: 0 }}>
      <svg
        width="44" height="44" viewBox="0 0 44 44"
        style={{ transform: "rotate(-90deg)", animation: isUrgent ? "urgentPulse 0.55s ease-in-out infinite" : "none" }}
      >
        <circle cx="22" cy="22" r={R} fill="none" stroke="#EDE8E1" strokeWidth="3.5" />
        <circle
          cx="22" cy="22" r={R}
          fill="none" stroke={ringColor} strokeWidth="3.5" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.92s linear, stroke 0.3s ease" }}
        />
      </svg>
      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "13px", fontWeight: "800", color: ringColor, lineHeight: 1,
        transition: "color 0.3s ease",
      }}>
        {timeLeft}
      </span>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const GuessOutputGame = () => {
  const navigate = useNavigate();
  const { gameId, langId, level } = useParams();
  const { user } = useAuth();

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

  const [timeLeft, setTimeLeft] = useState(lvl.timeLimit);
  const [timedOut, setTimedOut] = useState(false);
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
    if (phase !== "quiz" || selected !== null || timedOut) return;
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, selected, timedOut, current]);

  useEffect(() => { if (selected !== null) clearTimer(); }, [selected]);
  useEffect(() => () => clearTimer(), []);

  const loadQuestions = useCallback(() => {
    setPhase("loading");
    clearTimer();
    const bank = QUESTION_BANK[langId?.toLowerCase()]?.[level] ?? [];
    setQuestions(shuffle(bank).slice(0, TOTAL_Q));
    setCurrent(0); setSelected(null); setShowExp(false);
    setLives(lvl.lives); setScore(0); setWrong(0);
    setAnimKey(k => k + 1);
    resetTimer();
    setPhase("quiz");
  }, [langId, level, lvl.lives, resetTimer]);

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
    setCurrent(next);
    setSelected(null);
    setShowExp(false);
    setAnimKey(k => k + 1);
    resetTimer();
  };

  const restart = () => loadQuestions();

  // ── Shared styles ──────────────────────────────────────────────────────────
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
          You scored <strong>{score}/{TOTAL_Q}</strong>. You need at least {PASS_SCORE} correct to pass.
        </p>
        <div style={btnGroup}>
          <button style={btnPrimary(lvl.color)} onClick={restart}>↺ Restart Level</button>
          <button style={btnSecondary} onClick={() => navigate(`/games/${gameId}/level/${langId}`)}>← Change Level</button>
        </div>
      </div>
    </div>
  );

  // ── RESULT ─────────────────────────────────────────────────────────────────
  if (phase === "result") {
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
            {passed ? `Excellent work! You got ${score} out of ${TOTAL_Q} correct.` : `You need at least ${PASS_SCORE}/10 to pass. Keep practicing!`}
          </p>
          <span style={{ fontSize: "13px", color: "#9C9489", marginBottom: "28px", display: "block" }}>
            Lives remaining: {"❤️".repeat(lives)}{"🖤".repeat(Math.max(0, lvl.lives - lives))}
          </span>
          <div style={btnGroup}>
            {!passed && <button style={btnPrimary(lvl.color)} onClick={restart}>↺ Try Again</button>}
            {passed && nextLevel && (
              <button style={btnPrimary(lvl.color)} onClick={() => navigate(`/games/${gameId}/guess/${langId}/${nextLevel}`)}>
                Next Level →
              </button>
            )}
            {passed && !nextLevel && (
              <button style={btnPrimary("#7C3AED")} onClick={() => navigate("/games")}>🎯 All Games</button>
            )}
            <button style={btnSecondary} onClick={() => navigate(`/games/${gameId}/level/${langId}`)}>← Change Level</button>
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
          0%,100%{transform:translateX(0)} 20%{transform:translateX(-5px)}
          40%{transform:translateX(5px)}   60%{transform:translateX(-4px)}
          80%{transform:translateX(4px)}
        }
        .q-enter        { animation: slideQ       0.32s cubic-bezier(.22,.68,0,1.2) both; }
        .exp-enter      { animation: fadeExp      0.24s ease both; }
        .timed-out-shake{ animation: timedOutShake 0.45s ease both; }
        .opt-hover:hover:not(:disabled) { transform:translateX(4px); border-color:#C4BADF !important; }
        .next-hover:hover  { opacity:0.88; }
        .next-hover:active { transform:scale(0.97); }
        .exit-hover:hover  { background:#EDE8E1 !important; }
        @media(max-width:600px){
          .q-text-resp   { font-size:13px !important; }
          .opt-text-resp { font-size:12px !important; }
          .content-resp  { padding:14px 12px 40px !important; }
          .topbar-resp   { padding:8px 12px !important; gap:8px !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#F5F0EB", fontFamily: "'Segoe UI','Inter',system-ui,sans-serif", display: "flex", flexDirection: "column" }}>

        {/* TOP BAR */}
        <div className="topbar-resp" style={{ background: "#FFF", borderBottom: "1px solid #E8E2DA", padding: "10px 20px", display: "flex", alignItems: "center", gap: "12px", position: "sticky", top: 0, zIndex: 10 }}>
          <button className="exit-hover" onClick={() => navigate(`/games/${gameId}/level/${langId}`)}
            style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1.5px solid #E0D8CF", background: "#F5F0EB", cursor: "pointer", fontSize: "15px", color: "#6B6560", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            ✕
          </button>
          <div style={{ flex: 1, height: "8px", background: "#EDE8E1", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ height: "100%", background: lvl.color, borderRadius: "999px", width: `${progress}%`, transition: "width 0.45s ease" }} />
          </div>
          <TimerRing timeLeft={timeLeft} timeLimit={lvl.timeLimit} color={lvl.color} />
          <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
            {Array.from({ length: lvl.lives }).map((_, i) => (
              <span key={i} style={{ fontSize: "18px", opacity: i < lives ? 1 : 0.22, lineHeight: 1 }}>❤️</span>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="content-resp" style={{ flex: 1, width: "100%", maxWidth: "680px", margin: "0 auto", padding: "20px 16px 48px" }}>

          {/* Meta row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#8B7FB8" }}>
              💻 Guess the Output • {lang} • {lvl.label}
            </span>
            <span style={{ fontSize: "13px", color: "#9C9489", fontWeight: "600", background: "#EDE8E1", padding: "4px 10px", borderRadius: "999px" }}>
              {current + 1}/{TOTAL_Q}
            </span>
          </div>

          {/* Score band */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", background: "#FFF", border: "1px solid #E8E2DA", borderRadius: "14px", overflow: "hidden", marginBottom: "18px" }}>
            {[
              { num: score,               lbl: "Correct", color: "#16A34A" },
              { num: wrong,               lbl: "Wrong",   color: "#DC2626" },
              { num: PASS_SCORE,          lbl: "To Pass", color: "#D97706" },
              { num: `${lvl.timeLimit}s`, lbl: "Per Q",   color: "#6366F1" },
            ].map((s, i, arr) => (
              <div key={s.lbl} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 6px", gap: "2px", borderRight: i < arr.length - 1 ? "1px solid #EDE8E1" : "none" }}>
                <span style={{ fontSize: "18px", fontWeight: "700", lineHeight: 1, color: s.color }}>{s.num}</span>
                <span style={{ fontSize: "10px", color: "#A09890", fontWeight: "600", letterSpacing: "0.6px", textTransform: "uppercase" }}>{s.lbl}</span>
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
                <code style={{ background: "#FDE68A", padding: "2px 8px", borderRadius: "6px", fontWeight: "800", fontFamily: "'Courier New',monospace" }}>
                  {q?.options?.[q?.answer]}
                </code>
              </div>
            )}

            {/* Dark code block */}
            <div style={{ background: "#1C1814", borderRadius: "16px", padding: "20px", marginBottom: "14px", overflowX: "auto" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#6B9FD4", marginBottom: "10px", textTransform: "uppercase" }}>
                {lang} • What is the output?
              </div>
              <pre className="q-text-resp" style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: "14px", color: "#E8E8D0", lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {q?.code}
              </pre>
            </div>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "14px" }}>
              {q?.options.map((opt, i) => {
                const isAns = i === q.answer;
                const isSel = i === selected;
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
                    <code className="opt-text-resp" style={{ flex: 1, fontSize: "14px", fontWeight: "500", color: txtClr, fontFamily: "'Courier New',monospace", lineHeight: 1.45 }}>
                      {opt}
                    </code>
                    {answered && isAns && <span style={{ fontSize: "18px", flexShrink: 0 }}>✅</span>}
                    {answered && isSel && !isAns && <span style={{ fontSize: "18px", flexShrink: 0 }}>❌</span>}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExp && !timedOut && q?.explanation && (
              <div className="exp-enter" style={{ background: isCorrect ? "#F0FDF4" : "#FEF2F2", border: `1.5px solid ${isCorrect ? "#86EFAC" : "#FECACA"}`, borderRadius: "12px", padding: "14px 16px", fontSize: "14px", color: isCorrect ? "#166534" : "#991B1B", lineHeight: 1.6, marginBottom: "14px" }}>
                <span style={{ fontWeight: "700", display: "block", marginBottom: "4px", color: isCorrect ? "#15803D" : "#B91C1C", fontSize: "13px" }}>
                  {isCorrect ? "✅ Correct!" : "❌ Incorrect!"}
                </span>
                {q.explanation}
              </div>
            )}

            {/* Next button */}
            {answered && (
              <div className="exp-enter" style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="next-hover" onClick={handleNext}
                  style={{ background: lvl.color, color: "#FFF", border: "none", borderRadius: "12px", padding: "12px 24px", fontSize: "15px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: `0 4px 14px ${lvl.color}44` }}>
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

export default GuessOutputGame;