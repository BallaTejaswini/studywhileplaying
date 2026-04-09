

// import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useState, useEffect, useCallback, useRef } from "react";
// import { updateGameStats } from "../utils/UpdateGameStats";

import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState,useEffect,useCallback,useRef } from "react";
import { updateGameStats } from "../utils/UpdateGameStats";

const QUESTION_BANK = {
  python: {
    easy: [
      { code: `if condition == True:\n    pass`, question: "Shorten this condition check:", answer: "if condition:", choices: ["if condition:", "if condition == 1:", "if condition is True:", "if bool(condition):"], explanation: "In Python, 'if condition:' is the idiomatic way — no need to compare with True." },
      { code: `x = x + 1`, question: "Shorten this increment:", answer: "x += 1", choices: ["x += 1", "x++", "++x", "x =+ 1"], explanation: "+= is the shorthand compound assignment operator." },
      { code: `result = []\nfor i in range(5):\n    result.append(i * 2)`, question: "Shorten using list comprehension:", answer: "result = [i*2 for i in range(5)]", choices: ["result = [i*2 for i in range(5)]", "result = list(i*2, range(5))", "result = map(i*2, range(5))", "result = (i*2 for i in range(5))"], explanation: "List comprehensions replace for+append patterns in a single line." },
      { code: `if x is not None:\n    print(x)\nelse:\n    print('N/A')`, question: "Shorten with ternary expression:", answer: "print(x if x is not None else 'N/A')", choices: ["print(x if x is not None else 'N/A')", "print(x or 'N/A')", "print(x ?? 'N/A')", "print(x unless None else 'N/A')"], explanation: "Python's ternary: value_if_true if condition else value_if_false." },
      { code: `name = 'Alice'\ngreeting = 'Hello, ' + name + '!'`, question: "Shorten using f-string:", answer: "greeting = f'Hello, {name}!'", choices: ["greeting = f'Hello, {name}!'", "greeting = 'Hello, %s!' % name", "greeting = 'Hello, {}!'.format(name)", "greeting = `Hello, ${name}!`"], explanation: "f-strings (f'...{var}...') are the modern, concise way to embed variables in strings." },
      { code: `a = 1\nb = 2\ntemp = a\na = b\nb = temp`, question: "Shorten this swap:", answer: "a, b = b, a", choices: ["a, b = b, a", "swap(a, b)", "a <-> b", "[a, b] = [b, a]"], explanation: "Python supports tuple unpacking for simultaneous assignment — no temp needed." },
      { code: `if 'key' in my_dict:\n    val = my_dict['key']\nelse:\n    val = 'default'`, question: "Shorten using dict method:", answer: "val = my_dict.get('key', 'default')", choices: ["val = my_dict.get('key', 'default')", "val = my_dict['key'] or 'default'", "val = my_dict.fetch('key', 'default')", "val = my_dict['key'] if 'key' else 'default'"], explanation: "dict.get(key, default) returns the default if the key is not found." },
      { code: `words = ['hello', 'world']\nresult = ''\nfor w in words:\n    result += w + ' '\nresult = result.strip()`, question: "Shorten using join:", answer: "result = ' '.join(words)", choices: ["result = ' '.join(words)", "result = words.join(' ')", "result = concat(words, ' ')", "result = str(words)"], explanation: "str.join(iterable) is the idiomatic way to concatenate with a separator." },
      { code: `numbers = [3, 1, 4, 1, 5]\nhas_five = False\nfor n in numbers:\n    if n == 5:\n        has_five = True`, question: "Shorten the membership check:", answer: "has_five = 5 in numbers", choices: ["has_five = 5 in numbers", "has_five = numbers.contains(5)", "has_five = numbers.find(5) != -1", "has_five = any(numbers, 5)"], explanation: "The 'in' operator checks membership in a single expression." },
      { code: `def square(x):\n    return x * x`, question: "Shorten as a lambda:", answer: "square = lambda x: x * x", choices: ["square = lambda x: x * x", "square = fn(x) => x * x", "square = (x) -> x * x", "square = def(x): x*x"], explanation: "lambda creates an anonymous function — great for simple one-liners." },
    ],
    medium: [
      { code: `result = {}\nfor k, v in pairs:\n    result[k] = v`, question: "Shorten using dict comprehension:", answer: "result = {k: v for k, v in pairs}", choices: ["result = {k: v for k, v in pairs}", "result = dict(k: v for k, v in pairs)", "result = map(dict, pairs)", "result = {pairs}"], explanation: "Dict comprehensions build dictionaries inline: {key: val for ...}." },
      { code: `evens = []\nfor n in numbers:\n    if n % 2 == 0:\n        evens.append(n)`, question: "Shorten with list comprehension filter:", answer: "evens = [n for n in numbers if n % 2 == 0]", choices: ["evens = [n for n in numbers if n % 2 == 0]", "evens = filter(lambda n: n%2==0, numbers)", "evens = numbers.filter(lambda n: n%2==0)", "evens = [n%2==0 for n in numbers]"], explanation: "List comprehensions can include an if clause to filter elements." },
      { code: `def greet(name=None):\n    if name is None:\n        name = 'World'\n    return 'Hello, ' + name`, question: "Shorten the default assignment:", answer: "def greet(name='World'):", choices: ["def greet(name='World'):", "def greet(name or 'World'):", "def greet(name='World') ->:", "def greet(name:='World'):"], explanation: "Default parameter values are set directly in the function signature." },
      { code: `total = 0\nfor n in numbers:\n    total += n`, question: "Shorten using built-in:", answer: "total = sum(numbers)", choices: ["total = sum(numbers)", "total = add(numbers)", "total = numbers.sum()", "total = reduce(numbers)"], explanation: "sum() is a built-in that adds all elements of an iterable." },
      { code: `import os\nif os.path.exists(path):\n    with open(path) as f:\n        data = f.read()\nelse:\n    data = ''`, question: "Shorten with try/except:", answer: "try:\n    data = open(path).read()\nexcept FileNotFoundError:\n    data = ''", choices: ["try:\n    data = open(path).read()\nexcept FileNotFoundError:\n    data = ''", "data = open(path).read() or ''", "data = read_or_default(path, '')", "data = path.read() if path else ''"], explanation: "EAFP (Easier to Ask Forgiveness than Permission) is idiomatic Python — try/except instead of pre-checking." },
      { code: `pairs = [('a', 1), ('b', 2)]\nkeys = []\nvals = []\nfor k, v in pairs:\n    keys.append(k)\n    vals.append(v)`, question: "Shorten using zip and unpack:", answer: "keys, vals = zip(*pairs)", choices: ["keys, vals = zip(*pairs)", "keys, vals = unzip(pairs)", "keys, vals = pairs.split()", "keys, vals = map(list, pairs)"], explanation: "zip(*pairs) transposes a list of tuples — unzipping into separate iterables." },
      { code: `for i in range(len(items)):\n    print(i, items[i])`, question: "Shorten using enumerate:", answer: "for i, item in enumerate(items):\n    print(i, item)", choices: ["for i, item in enumerate(items):\n    print(i, item)", "for i, item in indexed(items):\n    print(i, item)", "for i, item in items.enumerate():\n    print(i, item)", "for i in count(items):\n    print(i, items[i])"], explanation: "enumerate() gives both index and value without indexing manually." },
      { code: `x = None\nif y is not None:\n    x = y\nelse:\n    x = z`, question: "Shorten with or operator:", answer: "x = y or z", choices: ["x = y or z", "x = y ?? z", "x = y if y else z", "x = y | z"], explanation: "'or' returns the first truthy value — a concise way to express fallback assignment." },
      { code: `with open('in.txt') as f:\n    data = f.read()\nwith open('out.txt', 'w') as f:\n    f.write(data)`, question: "Shorten by combining context managers:", answer: "with open('in.txt') as fin, open('out.txt','w') as fout:\n    fout.write(fin.read())", choices: ["with open('in.txt') as fin, open('out.txt','w') as fout:\n    fout.write(fin.read())", "with (open('in.txt'), open('out.txt','w')) as fin, fout:\n    fout.write(fin.read())", "with (open('in.txt'), open('out.txt','w')):\n    pass", "open('out.txt','w').write(open('in.txt').read())"], explanation: "Multiple context managers can be combined in one 'with' statement using commas." },
      { code: `if a:\n    return a\nreturn b`, question: "Shorten this return:", answer: "return a or b", choices: ["return a or b", "return a if a else b", "return a ?? b", "return a || b"], explanation: "'return a or b' returns a if it's truthy, otherwise returns b." },
    ],
    hard: [
      { code: `result = list(filter(lambda x: x > 0,\n         map(lambda x: x * 2, numbers)))`, question: "Shorten with list comprehension:", answer: "result = [x*2 for x in numbers if x*2 > 0]", choices: ["result = [x*2 for x in numbers if x*2 > 0]", "result = [x*2 if x>0 for x in numbers]", "result = filter(x*2 for x in numbers)", "result = [x for x in map(numbers)]"], explanation: "A list comprehension can combine map and filter in a single readable expression." },
      { code: `from functools import reduce\ntotal = reduce(lambda acc, x: acc + x, numbers, 0)`, question: "Shorten with built-in:", answer: "total = sum(numbers)", choices: ["total = sum(numbers)", "total = numbers.reduce(0)", "total = accumulate(numbers)", "total = fold(numbers, 0)"], explanation: "sum() is simpler and faster than reduce for addition." },
      { code: `d = {}\nfor key, val in data:\n    if key not in d:\n        d[key] = []\n    d[key].append(val)`, question: "Shorten using defaultdict:", answer: "from collections import defaultdict\nd = defaultdict(list)\nfor key, val in data:\n    d[key].append(val)", choices: ["from collections import defaultdict\nd = defaultdict(list)\nfor key, val in data:\n    d[key].append(val)", "d = dict(default=list)\nfor k,v in data: d[k]+=v", "d = {k: [] for k,v in data}", "d = groupby(data)"], explanation: "defaultdict(list) auto-creates a list for new keys, eliminating the if-not-in pattern." },
      { code: `lines = []\nwith open('file.txt') as f:\n    for line in f:\n        lines.append(line.strip())`, question: "Shorten to one line:", answer: "lines = [l.strip() for l in open('file.txt')]", choices: ["lines = [l.strip() for l in open('file.txt')]", "lines = open('file.txt').readlines().strip()", "lines = read_lines('file.txt')", "lines = list(strip(open('file.txt')))"], explanation: "Files are iterable — a list comprehension can read and strip all lines in one expression." },
      { code: `n = len(numbers)\nmean = sum(numbers) / n\nvariance = sum((x - mean)**2 for x in numbers) / n`, question: "Identify the one-liner import shortcut:", answer: "import statistics\nvariance = statistics.variance(numbers)", choices: ["import statistics\nvariance = statistics.variance(numbers)", "variance = var(numbers)", "from math import variance\nvariance(numbers)", "variance = numbers.std()**2"], explanation: "The statistics module has built-ins for mean, variance, stdev etc." },
      { code: `result = {}\nfor item in items:\n    key = item['id']\n    result[key] = item`, question: "Shorten with dict comprehension:", answer: "result = {item['id']: item for item in items}", choices: ["result = {item['id']: item for item in items}", "result = dict(item['id'] for item in items)", "result = items.to_dict('id')", "result = index_by(items, 'id')"], explanation: "Dict comprehensions can key objects by a field in a single expression." },
      { code: `seen = set()\nunique = []\nfor x in items:\n    if x not in seen:\n        seen.add(x)\n        unique.append(x)`, question: "Shorten while preserving order:", answer: "unique = list(dict.fromkeys(items))", choices: ["unique = list(dict.fromkeys(items))", "unique = list(set(items))", "unique = sorted(set(items))", "unique = dedupe(items)"], explanation: "dict.fromkeys() preserves insertion order (Python 3.7+) while removing duplicates." },
      { code: `try:\n    val = int(s)\nexcept ValueError:\n    val = 0`, question: "Shorten using a helper pattern:", answer: "val = int(s) if s.isdigit() else 0", choices: ["val = int(s) if s.isdigit() else 0", "val = int(s) or 0", "val = s.to_int(default=0)", "val = safe_int(s, 0)"], explanation: "str.isdigit() guards against ValueError, enabling a ternary one-liner." },
      { code: `class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y`, question: "Shorten using dataclass:", answer: "from dataclasses import dataclass\n@dataclass\nclass Point:\n    x: float\n    y: float", choices: ["from dataclasses import dataclass\n@dataclass\nclass Point:\n    x: float\n    y: float", "class Point(NamedTuple):\n    x: float\n    y: float", "Point = namedtuple('Point', ['x','y'])", "@dataclass\nclass Point(x, y): pass"], explanation: "@dataclass auto-generates __init__, __repr__ and __eq__ from annotated fields." },
      { code: `merged = {}\nfor d in [dict1, dict2, dict3]:\n    merged.update(d)`, question: "Shorten using unpacking (Python 3.9+):", answer: "merged = dict1 | dict2 | dict3", choices: ["merged = dict1 | dict2 | dict3", "merged = {**dict1, **dict2, **dict3}", "merged = merge(dict1, dict2, dict3)", "merged = sum([dict1, dict2, dict3])"], explanation: "The | operator merges dicts in Python 3.9+. {**d1, **d2} works in 3.5+." },
    ],
  },
  java: {
    easy: [
      { code: `if (flag == true) {\n    doSomething();\n}`, question: "Shorten the boolean check:", answer: "if (flag) { doSomething(); }", choices: ["if (flag) { doSomething(); }", "if (flag.isTrue()) { doSomething(); }", "if (flag != false) { doSomething(); }", "if (Boolean.TRUE.equals(flag)) { doSomething(); }"], explanation: "Boolean variables are already true/false — no need to compare with == true." },
      { code: `int max;\nif (a > b) {\n    max = a;\n} else {\n    max = b;\n}`, question: "Shorten using ternary:", answer: "int max = a > b ? a : b;", choices: ["int max = a > b ? a : b;", "int max = Math.max(a, b);", "int max = (a > b) ? a : b;", "int max = a > b;"], explanation: "The ternary operator condition ? valueIfTrue : valueIfFalse compresses if-else assignment." },
      { code: `List<String> list = new ArrayList<String>();`, question: "Shorten using diamond operator:", answer: "List<String> list = new ArrayList<>();", choices: ["List<String> list = new ArrayList<>();", "List list = new ArrayList();", "var list = new ArrayList<String>();", "List<String> list = ArrayList.of();"], explanation: "The diamond operator <> lets Java infer the generic type from context (Java 7+)." },
      { code: `for (int i = 0; i < items.size(); i++) {\n    System.out.println(items.get(i));\n}`, question: "Shorten with enhanced for-loop:", answer: "for (String item : items) { System.out.println(item); }", choices: ["for (String item : items) { System.out.println(item); }", "items.forEach(i -> print(i));", "for (var item : items) { print(item); }", "items.each(System.out::println);"], explanation: "The enhanced for-loop (for-each) iterates without index management." },
      { code: `String result;\nif (value != null) {\n    result = value;\n} else {\n    result = \"default\";\n}`, question: "Shorten using Objects utility:", answer: "String result = Objects.requireNonNullElse(value, \"default\");", choices: ["String result = Objects.requireNonNullElse(value, \"default\");", "String result = value != null ? value : \"default\";", "String result = value ?? \"default\";", "String result = Optional.of(value).orElse(\"default\");"], explanation: "Objects.requireNonNullElse() is the Java 9+ null-coalescing utility." },
      { code: `int sum = 0;\nfor (int n : numbers) {\n    sum += n;\n}`, question: "Shorten using streams:", answer: "int sum = numbers.stream().mapToInt(Integer::intValue).sum();", choices: ["int sum = numbers.stream().mapToInt(Integer::intValue).sum();", "int sum = numbers.stream().sum();", "int sum = Collections.sum(numbers);", "int sum = IntStream.of(numbers).sum();"], explanation: "Stream.mapToInt().sum() collapses a sum loop into a fluent pipeline." },
      { code: `Runnable r = new Runnable() {\n    public void run() {\n        System.out.println(\"Hello\");\n    }\n};`, question: "Shorten using lambda:", answer: "Runnable r = () -> System.out.println(\"Hello\");", choices: ["Runnable r = () -> System.out.println(\"Hello\");", "Runnable r = -> System.out.println(\"Hello\");", "Runnable r = () { System.out.println(\"Hello\"); };", "Runnable r = run(() -> print(\"Hello\"));"], explanation: "Functional interfaces with one method can be expressed as lambda expressions." },
      { code: `String s = obj.toString();\nif (s == null) s = \"\";`, question: "Shorten using Objects utility:", answer: "String s = Objects.toString(obj, \"\");", choices: ["String s = Objects.toString(obj, \"\");", "String s = String.valueOf(obj);", "String s = obj != null ? obj.toString() : \"\";", "String s = Optional.ofNullable(obj).map(Object::toString).orElse(\"\");"], explanation: "Objects.toString(obj, default) handles null and provides a fallback in one call." },
      { code: `if (name.equals(\"Alice\") || name.equals(\"Bob\") || name.equals(\"Charlie\")) {}`, question: "Shorten using Set:", answer: "if (Set.of(\"Alice\",\"Bob\",\"Charlie\").contains(name)) {}", choices: ["if (Set.of(\"Alice\",\"Bob\",\"Charlie\").contains(name)) {}", "if (Arrays.asList(\"Alice\",\"Bob\",\"Charlie\").contains(name)) {}", "if (List.of(\"Alice\",\"Bob\",\"Charlie\").has(name)) {}", "if (name in {\"Alice\",\"Bob\",\"Charlie\"}) {}"], explanation: "Set.of() with .contains() replaces a chain of || equals() checks cleanly." },
      { code: `Map<String,Integer> map = new HashMap<>();\nmap.put(\"a\", 1);\nmap.put(\"b\", 2);\nmap.put(\"c\", 3);`, question: "Shorten using Map.of():", answer: "Map<String,Integer> map = Map.of(\"a\",1,\"b\",2,\"c\",3);", choices: ["Map<String,Integer> map = Map.of(\"a\",1,\"b\",2,\"c\",3);", "Map<String,Integer> map = Map.from(\"a\",1,\"b\",2,\"c\",3);", "Map<String,Integer> map = HashMap.of(\"a\",1,\"b\",2,\"c\",3);", "Map<String,Integer> map = {\"a\":1,\"b\":2,\"c\":3};"], explanation: "Map.of() creates an immutable map inline without multiple put() calls (Java 9+)." },
    ],
    medium: [
      { code: `Optional<String> opt = Optional.ofNullable(value);\nif (opt.isPresent()) {\n    return opt.get();\n}\nreturn \"default\";`, question: "Shorten the Optional chain:", answer: "return Optional.ofNullable(value).orElse(\"default\");", choices: ["return Optional.ofNullable(value).orElse(\"default\");", "return value != null ? value : \"default\";", "return Optional.of(value).orElse(\"default\");", "return value.orElse(\"default\");"], explanation: "Optional.orElse() provides the fallback directly without isPresent/get." },
      { code: `List<String> upper = new ArrayList<>();\nfor (String s : names) {\n    upper.add(s.toUpperCase());\n}`, question: "Shorten using stream map:", answer: "List<String> upper = names.stream().map(String::toUpperCase).collect(Collectors.toList());", choices: ["List<String> upper = names.stream().map(String::toUpperCase).collect(Collectors.toList());", "List<String> upper = names.map(s -> s.toUpperCase());", "List<String> upper = Collections.transform(names, String::toUpperCase);", "List<String> upper = names.stream().toUpperCase().toList();"], explanation: "stream().map().collect() is the functional equivalent of a transform loop." },
      { code: `for (Map.Entry<String,Integer> e : map.entrySet()) {\n    System.out.println(e.getKey() + \"=\" + e.getValue());\n}`, question: "Shorten using forEach:", answer: "map.forEach((k, v) -> System.out.println(k + \"=\" + v));", choices: ["map.forEach((k, v) -> System.out.println(k + \"=\" + v));", "map.entrySet().forEach(e -> print(e));", "map.each((k,v) -> System.out.println(k+\"=\"+v));", "for (var e : map) println(e.key+\"=\"+e.value);"], explanation: "Map.forEach() passes key and value directly to a BiConsumer lambda." },
      { code: `numbers.sort(new Comparator<Integer>() {\n    public int compare(Integer a, Integer b) {\n        return a.compareTo(b);\n    }\n});`, question: "Shorten using method reference:", answer: "numbers.sort(Integer::compareTo);", choices: ["numbers.sort(Integer::compareTo);", "numbers.sort((a,b) -> a-b);", "Collections.sort(numbers);", "numbers.sort(Comparator.naturalOrder());"], explanation: "Method references (ClassName::method) replace single-method lambdas cleanly." },
      { code: `String joined = \"\";\nfor (int i = 0; i < words.size(); i++) {\n    joined += words.get(i);\n    if (i < words.size()-1) joined += \", \";\n}`, question: "Shorten using String.join:", answer: "String joined = String.join(\", \", words);", choices: ["String joined = String.join(\", \", words);", "String joined = words.stream().collect(Collectors.joining(\", \"));", "String joined = words.toString().replace(\"[\",\"\").replace(\"]\",\"\");", "String joined = StringUtils.join(words, \", \");"], explanation: "String.join(delimiter, iterable) handles the separator logic automatically." },
      { code: `int[] arr = new int[5];\nfor (int i = 0; i < arr.length; i++) {\n    arr[i] = 0;\n}`, question: "Shorten using Arrays.fill:", answer: "int[] arr = new int[5]; // auto-initialized to 0", choices: ["int[] arr = new int[5]; // auto-initialized to 0", "Arrays.fill(arr, 0);", "int[] arr = Arrays.fill(5, 0);", "int[] arr = Collections.nCopies(5, 0);"], explanation: "Java arrays of primitives are auto-initialized to 0 — explicit filling is redundant." },
      { code: `List<Integer> evens = numbers.stream()\n    .filter(n -> n % 2 == 0)\n    .collect(Collectors.toList());`, question: "Shorten using toList() (Java 16+):", answer: "List<Integer> evens = numbers.stream().filter(n -> n%2==0).toList();", choices: ["List<Integer> evens = numbers.stream().filter(n -> n%2==0).toList();", "List<Integer> evens = numbers.stream().filter(n -> n%2==0).asList();", "List<Integer> evens = numbers.filterToList(n -> n%2==0);", "List<Integer> evens = numbers.stream().filter(n -> n%2==0).collect();"], explanation: ".toList() is the Java 16+ shorthand for .collect(Collectors.toList())." },
      { code: `if (obj instanceof String) {\n    String s = (String) obj;\n    System.out.println(s.length());\n}`, question: "Shorten with pattern matching (Java 16+):", answer: "if (obj instanceof String s) { System.out.println(s.length()); }", choices: ["if (obj instanceof String s) { System.out.println(s.length()); }", "if (obj is String s) { System.out.println(s.length()); }", "String s = (String) obj; if (s != null) println(s.length());", "obj.ifString(s -> System.out.println(s.length()));"], explanation: "Pattern matching for instanceof (Java 16+) binds the cast variable in one step." },
      { code: `switch (day) {\n    case \"MON\": return 1;\n    case \"TUE\": return 2;\n    case \"WED\": return 3;\n    default: return -1;\n}`, question: "Shorten using switch expression (Java 14+):", answer: "return switch(day) { case \"MON\" -> 1; case \"TUE\" -> 2; case \"WED\" -> 3; default -> -1; };", choices: ["return switch(day) { case \"MON\" -> 1; case \"TUE\" -> 2; case \"WED\" -> 3; default -> -1; };", "return day.switchMap(Map.of(\"MON\",1,\"TUE\",2));", "return Map.of(\"MON\",1,\"TUE\",2,\"WED\",3).getOrDefault(day,-1);", "return switch(day) { \"MON\": 1, \"TUE\": 2, default: -1 };"], explanation: "Switch expressions with -> arrows return values and eliminate break/return in each case." },
      { code: `// record Person exists\nList<Person> sorted = new ArrayList<>(people);\nsorted.sort(Comparator.comparing(p -> p.name()));`, question: "Shorten using method reference in Comparator:", answer: "List<Person> sorted = people.stream().sorted(Comparator.comparing(Person::name)).toList();", choices: ["List<Person> sorted = people.stream().sorted(Comparator.comparing(Person::name)).toList();", "List<Person> sorted = people.sortedBy(Person::name);", "List<Person> sorted = Collections.sortedCopy(people, Person::name);", "List<Person> sorted = people.stream().sort(Person::name).toList();"], explanation: "Stream.sorted() with a Comparator.comparing method reference is concise and readable." },
    ],
    hard: [
      { code: `ExecutorService exec = Executors.newFixedThreadPool(4);\nList<Future<Integer>> futures = new ArrayList<>();\nfor (Callable<Integer> task : tasks) {\n    futures.add(exec.submit(task));\n}`, question: "Shorten using invokeAll:", answer: "List<Future<Integer>> futures = exec.invokeAll(tasks);", choices: ["List<Future<Integer>> futures = exec.invokeAll(tasks);", "List<Future<Integer>> futures = exec.submitAll(tasks);", "List<Future<Integer>> futures = tasks.stream().map(exec::submit).toList();", "List<Future<Integer>> futures = CompletableFuture.allOf(tasks);"], explanation: "ExecutorService.invokeAll() submits all tasks and returns their futures in one call." },
      { code: `Map<String, List<Person>> byDept = new HashMap<>();\nfor (Person p : people) {\n    byDept.computeIfAbsent(p.dept(), k -> new ArrayList<>()).add(p);\n}`, question: "Shorten using Collectors.groupingBy:", answer: "Map<String,List<Person>> byDept = people.stream().collect(Collectors.groupingBy(Person::dept));", choices: ["Map<String,List<Person>> byDept = people.stream().collect(Collectors.groupingBy(Person::dept));", "Map<String,List<Person>> byDept = people.groupBy(Person::dept);", "Map<String,List<Person>> byDept = Collectors.partitioningBy(people, Person::dept);", "Map<String,List<Person>> byDept = people.stream().toMap(Person::dept, List::of);"], explanation: "Collectors.groupingBy() replaces the computeIfAbsent grouping pattern in one expression." },
      { code: `CompletableFuture<String> f1 = fetchName();\nCompletableFuture<Integer> f2 = fetchAge();\nf1.thenAccept(name -> f2.thenAccept(age -> process(name, age)));`, question: "Shorten combining futures:", answer: "f1.thenCombine(f2, (name, age) -> process(name, age));", choices: ["f1.thenCombine(f2, (name, age) -> process(name, age));", "CompletableFuture.allOf(f1, f2).thenRun(() -> process(f1.get(), f2.get()));", "f1.and(f2).then((name,age) -> process(name,age));", "CompletableFuture.both(f1, f2, BiFunction::process);"], explanation: "thenCombine() waits for both futures and passes both results to a BiFunction." },
      { code: `interface Transformer<T, R> {\n    R transform(T input);\n}\nTransformer<String, Integer> len = new Transformer<String, Integer>() {\n    public Integer transform(String s) { return s.length(); }\n};`, question: "Shorten using Function<T,R>:", answer: "Function<String, Integer> len = String::length;", choices: ["Function<String, Integer> len = String::length;", "Transformer<String,Integer> len = s -> s.length();", "Function<String,Integer> len = (String s) -> s.length();", "BiFunction<String,Integer> len = String::length;"], explanation: "java.util.function.Function<T,R> is the standard functional interface for T->R mapping, and String::length is a method reference." },
      { code: `List<String> result = new ArrayList<>();\nfor (List<String> sub : nested) {\n    result.addAll(sub);\n}`, question: "Shorten using flatMap:", answer: "List<String> result = nested.stream().flatMap(Collection::stream).toList();", choices: ["List<String> result = nested.stream().flatMap(Collection::stream).toList();", "List<String> result = nested.stream().flatten().toList();", "List<String> result = Stream.flat(nested).toList();", "List<String> result = nested.stream().map(List::stream).toList();"], explanation: "flatMap(Collection::stream) flattens a stream of lists into a single stream." },
      { code: `Map<String,Integer> freq = new HashMap<>();\nfor (String w : words) {\n    freq.put(w, freq.getOrDefault(w, 0) + 1);\n}`, question: "Shorten using merge:", answer: "words.forEach(w -> freq.merge(w, 1, Integer::sum));", choices: ["words.forEach(w -> freq.merge(w, 1, Integer::sum));", "freq = words.stream().count();", "freq = Collectors.counting(words);", "freq.putAll(words.stream().toMap(w->w, w->1));"], explanation: "Map.merge(key, value, remapping) handles insert-or-update in one call." },
      { code: `List<Integer> nums = Arrays.asList(3,1,4,1,5,9);\nOptional<Integer> max = Optional.empty();\nfor (int n : nums) {\n    if (!max.isPresent() || n > max.get()) max = Optional.of(n);\n}`, question: "Shorten using stream:", answer: "Optional<Integer> max = nums.stream().max(Integer::compareTo);", choices: ["Optional<Integer> max = nums.stream().max(Integer::compareTo);", "Optional<Integer> max = Collections.max(nums);", "Optional<Integer> max = nums.stream().sorted().findLast();", "int max = nums.stream().max();"], explanation: "Stream.max(comparator) returns an Optional of the maximum element." },
      { code: `boolean allPositive = true;\nfor (int n : numbers) {\n    if (n <= 0) { allPositive = false; break; }\n}`, question: "Shorten using stream allMatch:", answer: "boolean allPositive = numbers.stream().allMatch(n -> n > 0);", choices: ["boolean allPositive = numbers.stream().allMatch(n -> n > 0);", "boolean allPositive = numbers.stream().filter(n->n>0).count()==numbers.size();", "boolean allPositive = !numbers.stream().anyMatch(n->n<=0);", "boolean allPositive = numbers.stream().noneMatch(n->n<=0);"], explanation: "allMatch() short-circuits on the first non-matching element, just like the loop with break." },
      { code: `String[] arr = list.toArray(new String[list.size()]);`, question: "Shorten the toArray call:", answer: "String[] arr = list.toArray(new String[0]);", choices: ["String[] arr = list.toArray(new String[0]);", "String[] arr = list.toArray();", "String[] arr = (String[]) list.toArray();", "String[] arr = list.stream().toArray(String[]::new);"], explanation: "Passing new String[0] is idiomatic and lets the JVM allocate the right size." },
      { code: `Map<String,String> result = new HashMap<>();\nfor (String key : map1.keySet()) {\n    if (map2.containsKey(key)) result.put(key, map2.get(key));\n}`, question: "Shorten using streams:", answer: "Map<String,String> result = map1.keySet().stream().filter(map2::containsKey).collect(Collectors.toMap(k->k, map2::get));", choices: ["Map<String,String> result = map1.keySet().stream().filter(map2::containsKey).collect(Collectors.toMap(k->k, map2::get));", "Map<String,String> result = Maps.intersection(map1, map2);", "map1.retainAll(map2); Map<String,String> result = map1;", "Map<String,String> result = map1.entrySet().stream().filter(e->map2.has(e)).toMap();"], explanation: "Stream filter + collect(toMap) replaces the containsKey loop in a fluent pipeline." },
    ],
  },
  cpp: {
    easy: [
      { code: `int temp = a;\na = b;\nb = temp;`, question: "Shorten this swap:", answer: "std::swap(a, b);", choices: ["std::swap(a, b);", "swap(a, b);", "a <=> b;", "std::exchange(a, b);"], explanation: "std::swap() from <utility> swaps two values in one readable call." },
      { code: `if (ptr != nullptr) {\n    ptr->doSomething();\n}`, question: "Shorten the null check (C++17):", answer: "if (ptr) { ptr->doSomething(); }", choices: ["if (ptr) { ptr->doSomething(); }", "if (ptr != null) { ptr->doSomething(); }", "ptr?.doSomething();", "if (ptr.valid()) { ptr->doSomething(); }"], explanation: "Pointers are implicitly convertible to bool — 'if (ptr)' checks for non-null." },
      { code: `std::vector<int>::iterator it = vec.begin();`, question: "Shorten using auto:", answer: "auto it = vec.begin();", choices: ["auto it = vec.begin();", "var it = vec.begin();", "let it = vec.begin();", "decltype(vec) it = vec.begin();"], explanation: "auto deduces the type from the initializer — essential for verbose iterator types." },
      { code: `std::cout << "Hello" << std::endl;\nstd::cout << "World" << std::endl;`, question: "Shorten output using newline literal:", answer: `std::cout << "Hello\\n" << "World\\n";`, choices: [`std::cout << "Hello\\n" << "World\\n";`, `print("Hello", "World");`, `std::cout << "Hello" + "World" << std::endl;`, `puts("Hello"); puts("World");`], explanation: "'\\n' is faster than std::endl which flushes the buffer each time." },
      { code: `int* p = new int;\n*p = 42;\n// later\ndelete p;`, question: "Shorten using smart pointer:", answer: "auto p = std::make_unique<int>(42);", choices: ["auto p = std::make_unique<int>(42);", "auto p = std::shared_ptr<int>(new int(42));", "auto p = std::unique_ptr<int>(42);", "int* p = std::make_unique<int>(42).get();"], explanation: "make_unique creates a unique_ptr and initializes it — no delete needed." },
      { code: `for (int i = 0; i < vec.size(); i++) {\n    std::cout << vec[i];\n}`, question: "Shorten with range-based for:", answer: "for (const auto& x : vec) { std::cout << x; }", choices: ["for (const auto& x : vec) { std::cout << x; }", "for (auto x in vec) { std::cout << x; }", "for (vec : x) { std::cout << x; }", "vec.forEach([](int x){ std::cout << x; });"], explanation: "Range-based for loops iterate over containers without index management." },
      { code: `std::vector<int> v;\nv.push_back(1);\nv.push_back(2);\nv.push_back(3);`, question: "Shorten using initializer list:", answer: "std::vector<int> v = {1, 2, 3};", choices: ["std::vector<int> v = {1, 2, 3};", "std::vector<int> v(1, 2, 3);", "std::vector<int> v[3] = {1, 2, 3};", "auto v = std::vector{1, 2, 3};"], explanation: "Initializer lists allow direct construction of containers with values." },
      { code: `bool found = false;\nfor (int x : vec) {\n    if (x == target) { found = true; break; }\n}`, question: "Shorten using algorithm:", answer: "bool found = std::find(vec.begin(), vec.end(), target) != vec.end();", choices: ["bool found = std::find(vec.begin(), vec.end(), target) != vec.end();", "bool found = vec.contains(target);", "bool found = std::search(vec, target);", "bool found = std::count(vec.begin(), vec.end(), target) > 0;"], explanation: "std::find returns an iterator — comparing to end() checks for presence." },
      { code: `std::string s = std::string("hello");`, question: "Shorten this construction:", answer: `std::string s = "hello";`, choices: [`std::string s = "hello";`, `auto s = 'hello';`, `std::string s{"hello"};`, `string s = "hello";`], explanation: "std::string can be directly assigned from a string literal without explicit construction." },
      { code: `int result;\nif (a > b) result = a;\nelse result = b;`, question: "Shorten using std::max:", answer: "int result = std::max(a, b);", choices: ["int result = std::max(a, b);", "int result = a > b ? a : b;", "int result = max(a, b);", "int result = (a > b) * a + (b >= a) * b;"], explanation: "std::max() from <algorithm> is the standard, readable way to get the maximum." },
    ],
    medium: [
      { code: `std::sort(vec.begin(), vec.end(), [](int a, int b) {\n    return a < b;\n});`, question: "Shorten using default sort:", answer: "std::sort(vec.begin(), vec.end());", choices: ["std::sort(vec.begin(), vec.end());", "std::sort(vec);", "vec.sort();", "std::sort(vec.begin(), vec.end(), std::less<int>());"], explanation: "std::sort without a comparator uses operator< by default — no lambda needed for ascending sort." },
      { code: `std::vector<int> result;\nfor (int x : vec) {\n    if (x > 0) result.push_back(x);\n}`, question: "Shorten using copy_if:", answer: "std::vector<int> result;\nstd::copy_if(vec.begin(),vec.end(),std::back_inserter(result),[](int x){return x>0;});", choices: ["std::vector<int> result;\nstd::copy_if(vec.begin(),vec.end(),std::back_inserter(result),[](int x){return x>0;});", "result = std::filter(vec, [](int x){return x>0;});", "result = vec | std::views::filter([](int x){return x>0;});", "std::find_if(vec.begin(),vec.end(),result);"], explanation: "std::copy_if with back_inserter is the algorithm-based way to filter into a vector." },
      { code: `int total = 0;\nfor (int x : vec) total += x;`, question: "Shorten using accumulate:", answer: "int total = std::accumulate(vec.begin(), vec.end(), 0);", choices: ["int total = std::accumulate(vec.begin(), vec.end(), 0);", "int total = std::sum(vec.begin(), vec.end());", "int total = std::reduce(vec);", "int total = vec.sum();"], explanation: "std::accumulate from <numeric> sums a range with an initial value." },
      { code: `std::map<std::string, int> m;\nif (m.find("key") == m.end()) {\n    m["key"] = 0;\n}\nm["key"]++;`, question: "Shorten using operator[] default:", answer: `m["key"]++;`, choices: [`m["key"]++;`, `m.insert_or_assign("key", m["key"]+1);`, `m.emplace("key", 0); m["key"]++;`, `m.try_emplace("key"); m["key"]++;`], explanation: "std::map's operator[] default-constructs the value (0 for int) if key is missing — insert check is redundant." },
      { code: `for (size_t i = 0; i < v1.size(); i++) {\n    process(v1[i], v2[i]);\n}`, question: "Shorten using transform:", answer: "std::transform(v1.begin(),v1.end(),v2.begin(),out.begin(),process);", choices: ["std::transform(v1.begin(),v1.end(),v2.begin(),out.begin(),process);", "std::zip(v1,v2).forEach(process);", "for (auto [a,b] : std::views::zip(v1,v2)) process(a,b);", "std::for_each(v1,v2,process);"], explanation: "std::transform with two input ranges processes pairs of elements without manual indexing." },
      { code: `std::vector<int> v = {5,3,1,4,2};\nint mn = v[0];\nfor (int x : v) if (x < mn) mn = x;`, question: "Shorten using algorithm:", answer: "int mn = *std::min_element(v.begin(), v.end());", choices: ["int mn = *std::min_element(v.begin(), v.end());", "int mn = std::min(v);", "int mn = v.min();", "int mn = std::minval(v.begin(), v.end());"], explanation: "std::min_element returns an iterator to the smallest element — dereference to get value." },
      { code: `std::string result = \"\";\nfor (const auto& s : strings) {\n    result += s;\n}`, question: "Shorten using accumulate:", answer: "auto result = std::accumulate(strings.begin(), strings.end(), std::string{});", choices: ["auto result = std::accumulate(strings.begin(), strings.end(), std::string{});", "auto result = std::concat(strings);", "auto result = strings.join(\"\");", "auto result = std::reduce(strings.begin(), strings.end());"], explanation: "std::accumulate with an empty string seed concatenates all strings." },
      { code: `std::vector<int> v(10);\nfor (int i = 0; i < 10; i++) v[i] = i;`, question: "Shorten using iota:", answer: "std::vector<int> v(10);\nstd::iota(v.begin(), v.end(), 0);", choices: ["std::vector<int> v(10);\nstd::iota(v.begin(), v.end(), 0);", "std::vector<int> v = std::range(10);", "std::vector<int> v = std::linspace(0,9);", "std::vector<int> v(10, 0); v.fill();"], explanation: "std::iota fills a range with sequentially increasing values." },
      { code: `bool any_neg = false;\nfor (int x : vec)\n    if (x < 0) { any_neg = true; break; }`, question: "Shorten using any_of:", answer: "bool any_neg = std::any_of(vec.begin(), vec.end(), [](int x){ return x < 0; });", choices: ["bool any_neg = std::any_of(vec.begin(), vec.end(), [](int x){ return x < 0; });", "bool any_neg = std::find_if(vec.begin(), vec.end(), [](int x){return x<0;}) != vec.end();", "bool any_neg = std::count_if(vec.begin(), vec.end(), [](int x){return x<0;}) > 0;", "bool any_neg = vec.contains_if([](int x){return x<0;});"], explanation: "std::any_of short-circuits when the predicate is first satisfied." },
      { code: `std::vector<int> v = {1,2,3,4,5};\nstd::vector<int> doubled;\nfor (int x : v) doubled.push_back(x * 2);`, question: "Shorten using transform:", answer: "std::vector<int> doubled;\nstd::transform(v.begin(),v.end(),std::back_inserter(doubled),[](int x){return x*2;});", choices: ["std::vector<int> doubled;\nstd::transform(v.begin(),v.end(),std::back_inserter(doubled),[](int x){return x*2;});", "auto doubled = v | std::views::transform([](int x){return x*2;});", "auto doubled = std::map(v, [](int x){return x*2;});", "v.transform([](int x){return x*2;}, doubled);"], explanation: "std::transform with back_inserter applies a function to each element and stores results." },
    ],
    hard: [
      { code: `template<typename T>\nstruct TypeName {\n    static std::string get() { return typeid(T).name(); }\n};`, question: "Shorten using if constexpr (C++17):", answer: "template<typename T>\nstd::string typeName() {\n    if constexpr(std::is_same_v<T,int>) return \"int\";\n    else return typeid(T).name();\n}", choices: ["template<typename T>\nstd::string typeName() {\n    if constexpr(std::is_same_v<T,int>) return \"int\";\n    else return typeid(T).name();\n}", "template<typename T> auto typeName() = typeid(T).name();", "using TypeName = decltype(typeid(T).name());", "constexpr auto TypeName = typeid(T).name();"], explanation: "if constexpr evaluates branches at compile time — cleaner than full template specialization." },
      { code: `std::vector<int> result;\nfor (int x : input) {\n    result.push_back(x * 2);\n}`, question: "Shorten using ranges (C++20):", answer: "auto result = input | std::views::transform([](int x){ return x*2; }) | std::ranges::to<std::vector>();", choices: ["auto result = input | std::views::transform([](int x){ return x*2; }) | std::ranges::to<std::vector>();", "auto result = std::ranges::map(input, [](int x){ return x*2; });", "std::ranges::transform(input, result, [](int x){ return x*2; });", "auto result = input.transform([](int x){ return x*2; });"], explanation: "C++20 ranges with pipe syntax compose transformations lazily without temporaries." },
      { code: `void log(const std::string& msg) {\n    std::cout << \"[LOG] \" << msg << \"\\n\";\n}\nvoid log(const char* msg) {\n    log(std::string(msg));\n}`, question: "Shorten with string_view:", answer: "void log(std::string_view msg) { std::cout << \"[LOG] \" << msg << \"\\n\"; }", choices: ["void log(std::string_view msg) { std::cout << \"[LOG] \" << msg << \"\\n\"; }", "template<typename T> void log(T msg) { std::cout << \"[LOG] \" << msg << \"\\n\"; }", "void log(auto msg) { std::cout << \"[LOG] \" << msg << \"\\n\"; }", "void log(const auto& msg) { std::cout << \"[LOG] \" << msg << \"\\n\"; }"], explanation: "std::string_view accepts both const char* and std::string without copying — one overload needed." },
      { code: `class Builder {\n    int x_ = 0, y_ = 0;\npublic:\n    Builder& setX(int x) { x_ = x; return *this; }\n    Builder& setY(int y) { y_ = y; return *this; }\n};`, question: "Shorten construction using designated initializers (C++20):", answer: "struct Config { int x = 0, y = 0; };\nConfig c{.x=1, .y=2};", choices: ["struct Config { int x = 0, y = 0; };\nConfig c{.x=1, .y=2};", "auto c = Builder().setX(1).setY(2).build();", "Config c = Config::make(x=1, y=2);", "Config c = {x:1, y:2};"], explanation: "C++20 designated initializers let you name fields in aggregate initialization — no builder needed." },
      { code: `std::mutex mtx;\nbool ready = false;\nstd::condition_variable cv;\n{\n    std::lock_guard<std::mutex> lk(mtx);\n    ready = true;\n}\ncv.notify_one();`, question: "Shorten using scoped_lock (C++17):", answer: "{ std::scoped_lock lk(mtx); ready = true; } cv.notify_one();", choices: ["{ std::scoped_lock lk(mtx); ready = true; } cv.notify_one();", "{ std::lock_guard lk(mtx); ready = true; } cv.notify_one();", "mtx.lock(); ready = true; mtx.unlock(); cv.notify_one();", "std::atomic<bool> ready = true; cv.notify_one();"], explanation: "std::scoped_lock (C++17) uses CTAD to deduce the mutex type — more concise than lock_guard<std::mutex>." },
    ],
  },
  sql: {
    easy: [
      { code: `SELECT * FROM users WHERE age >= 18 AND age <= 65;`, question: "Shorten the range condition:", answer: "SELECT * FROM users WHERE age BETWEEN 18 AND 65;", choices: ["SELECT * FROM users WHERE age BETWEEN 18 AND 65;", "SELECT * FROM users WHERE age IN (18..65);", "SELECT * FROM users WHERE age RANGE(18, 65);", "SELECT * FROM users WHERE 18 <= age <= 65;"], explanation: "BETWEEN low AND high replaces two comparison conditions." },
      { code: `SELECT * FROM users\nWHERE name = 'Alice'\nOR name = 'Bob'\nOR name = 'Charlie';`, question: "Shorten multiple OR conditions:", answer: "SELECT * FROM users WHERE name IN ('Alice', 'Bob', 'Charlie');", choices: ["SELECT * FROM users WHERE name IN ('Alice', 'Bob', 'Charlie');", "SELECT * FROM users WHERE name ANY ('Alice', 'Bob', 'Charlie');", "SELECT * FROM users WHERE name CONTAINS ('Alice', 'Bob', 'Charlie');", "SELECT * FROM users WHERE name AMONG ('Alice', 'Bob', 'Charlie');"], explanation: "IN (value_list) replaces multiple OR conditions on the same column." },
      { code: `SELECT COUNT(*) FROM (\n    SELECT DISTINCT user_id FROM orders\n) subq;`, question: "Shorten the count distinct:", answer: "SELECT COUNT(DISTINCT user_id) FROM orders;", choices: ["SELECT COUNT(DISTINCT user_id) FROM orders;", "SELECT DISTINCT COUNT(user_id) FROM orders;", "SELECT COUNT(user_id) UNIQUE FROM orders;", "SELECT UNIQUE_COUNT(user_id) FROM orders;"], explanation: "COUNT(DISTINCT col) counts unique values directly without a subquery." },
      { code: `SELECT CASE\n    WHEN score IS NULL THEN 0\n    ELSE score\nEND FROM results;`, question: "Shorten the null replacement:", answer: "SELECT COALESCE(score, 0) FROM results;", choices: ["SELECT COALESCE(score, 0) FROM results;", "SELECT ISNULL(score, 0) FROM results;", "SELECT NVL(score, 0) FROM results;", "SELECT IFNULL(score, 0) FROM results;"], explanation: "COALESCE(col, default) returns the first non-NULL value — far shorter than CASE WHEN." },
      { code: `SELECT *\nFROM orders\nORDER BY created_at DESC\nLIMIT 1;`, question: "What is the standard SQL equivalent of LIMIT?", answer: "SELECT * FROM orders ORDER BY created_at DESC FETCH FIRST 1 ROW ONLY;", choices: ["SELECT * FROM orders ORDER BY created_at DESC FETCH FIRST 1 ROW ONLY;", "SELECT TOP 1 * FROM orders ORDER BY created_at DESC;", "SELECT FIRST * FROM orders ORDER BY created_at DESC;", "SELECT * FROM orders WHERE ROWNUM=1 ORDER BY created_at DESC;"], explanation: "FETCH FIRST n ROWS ONLY is standard SQL; TOP is SQL Server syntax; LIMIT is MySQL/PostgreSQL." },
      { code: `SELECT u.name, COUNT(o.id) as order_count\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id, u.name\nHAVING COUNT(o.id) > 0;`, question: "Shorten HAVING condition:", answer: "SELECT u.name, COUNT(o.id) FROM users u JOIN orders o ON u.id=o.user_id GROUP BY u.id, u.name;", choices: ["SELECT u.name, COUNT(o.id) FROM users u JOIN orders o ON u.id=o.user_id GROUP BY u.id, u.name;", "SELECT u.name, COUNT(o.id) FROM users u LEFT JOIN orders o ON u.id=o.user_id GROUP BY u.id;", "SELECT u.name, COUNT(o.id) FROM users u, orders o WHERE u.id=o.user_id GROUP BY u.name;", "SELECT u.name, order_count FROM users u HAVING order_count > 0;"], explanation: "LEFT JOIN + HAVING COUNT > 0 is equivalent to INNER JOIN — simpler and more performant." },
      { code: `SELECT * FROM products\nWHERE category_id = (\n    SELECT id FROM categories WHERE name = 'Electronics'\n);`, question: "Shorten with JOIN:", answer: "SELECT p.* FROM products p JOIN categories c ON p.category_id=c.id WHERE c.name='Electronics';", choices: ["SELECT p.* FROM products p JOIN categories c ON p.category_id=c.id WHERE c.name='Electronics';", "SELECT * FROM products WHERE category_id IN (SELECT id FROM categories WHERE name='Electronics');", "SELECT * FROM products p, categories c WHERE p.category_id=c.id AND c.name='Electronics';", "SELECT * FROM products NATURAL JOIN categories WHERE name='Electronics';"], explanation: "A JOIN is often cleaner and more extensible than a correlated subquery for simple lookups." },
      { code: `SELECT e.name,\n       (SELECT AVG(salary) FROM employees WHERE dept=e.dept) as dept_avg\nFROM employees e;`, question: "Shorten the correlated subquery:", answer: "SELECT e.name, AVG(e.salary) OVER (PARTITION BY e.dept) as dept_avg FROM employees e;", choices: ["SELECT e.name, AVG(e.salary) OVER (PARTITION BY e.dept) as dept_avg FROM employees e;", "SELECT e.name, e.dept_avg FROM employees e JOIN (SELECT dept, AVG(salary) as dept_avg FROM employees GROUP BY dept) d ON e.dept=d.dept;", "SELECT e.name, d.avg_salary FROM employees e, (SELECT dept, AVG(salary) avg_salary FROM employees GROUP BY dept) d WHERE e.dept=d.dept;", "SELECT e.name, AVG(salary) GROUPBY dept FROM employees e;"], explanation: "Window functions (OVER PARTITION BY) eliminate correlated subqueries for per-group aggregates." },
      { code: `SELECT * FROM t1\nWHERE id NOT IN (\n    SELECT id FROM t2\n);`, question: "Shorten using anti-join:", answer: "SELECT t1.* FROM t1 LEFT JOIN t2 ON t1.id=t2.id WHERE t2.id IS NULL;", choices: ["SELECT t1.* FROM t1 LEFT JOIN t2 ON t1.id=t2.id WHERE t2.id IS NULL;", "SELECT * FROM t1 EXCEPT SELECT * FROM t2;", "SELECT * FROM t1 WHERE id NOT EXISTS (SELECT 1 FROM t2 WHERE t2.id=t1.id);", "SELECT * FROM t1 MINUS SELECT * FROM t2;"], explanation: "LEFT JOIN ... WHERE right.id IS NULL (anti-join) is often more performant than NOT IN and handles NULLs safely." },
      { code: `SELECT MAX(salary) FROM employees\nWHERE salary < (\n    SELECT MAX(salary) FROM employees\n);`, question: "What is this query finding and what's a shorter alternative?", answer: "SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;", choices: ["SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;", "SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);", "SELECT NTH_VALUE(salary,2) OVER(ORDER BY salary DESC) FROM employees LIMIT 1;", "SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1,1;"], explanation: "ORDER BY salary DESC LIMIT 1 OFFSET 1 is a cleaner way to get the second highest." },
    ],
    medium: [
      { code: `SELECT * FROM (\n    SELECT *, ROW_NUMBER() OVER(PARTITION BY dept ORDER BY salary DESC) rn\n    FROM employees\n) t WHERE rn = 1;`, question: "Find the shorter PostgreSQL alternative:", answer: "SELECT DISTINCT ON (dept) * FROM employees ORDER BY dept, salary DESC;", choices: ["SELECT DISTINCT ON (dept) * FROM employees ORDER BY dept, salary DESC;", "SELECT FIRST(salary) OVER(PARTITION BY dept ORDER BY salary DESC) FROM employees;", "SELECT * FROM employees GROUP BY dept HAVING MAX(salary);", "SELECT TOP 1 * FROM employees GROUP BY dept ORDER BY salary DESC;"], explanation: "PostgreSQL's DISTINCT ON selects the first row per group — much shorter than ROW_NUMBER subquery." },
      { code: `UPDATE employees\nSET salary = CASE\n    WHEN dept = 'Eng' THEN salary * 1.1\n    WHEN dept = 'Sales' THEN salary * 1.05\n    ELSE salary\nEND;`, question: "What pattern does this single UPDATE replace?", answer: "-- Replaces multiple separate UPDATE statements per dept", choices: ["-- Replaces multiple separate UPDATE statements per dept", "UPDATE employees SET salary *= CASE dept WHEN 'Eng' THEN 1.1 WHEN 'Sales' THEN 1.05 ELSE 1 END;", "UPDATE employees SET salary = salary * dept_multiplier FROM dept_rates;", "MERGE employees USING dept_rates ON dept WHEN MATCHED THEN UPDATE SET salary=salary*rate;"], explanation: "A single CASE-based UPDATE is more efficient than multiple UPDATE statements scanning the table repeatedly." },
      { code: `SELECT u.name, o.total\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE o.total = (\n    SELECT MAX(total) FROM orders WHERE user_id = u.id\n);`, question: "Shorten with window function:", answer: "SELECT name, total FROM (\n    SELECT u.name, o.total, RANK() OVER(PARTITION BY u.id ORDER BY o.total DESC) rn\n    FROM users u JOIN orders o ON u.id=o.user_id\n) t WHERE rn=1;", choices: ["SELECT name, total FROM (\n    SELECT u.name, o.total, RANK() OVER(PARTITION BY u.id ORDER BY o.total DESC) rn\n    FROM users u JOIN orders o ON u.id=o.user_id\n) t WHERE rn=1;", "SELECT u.name, MAX(o.total) FROM users u JOIN orders o ON u.id=o.user_id GROUP BY u.id, u.name;", "SELECT u.name, o.total FROM users u JOIN orders o ON u.id=o.user_id ORDER BY o.total DESC LIMIT 1;", "SELECT u.name, FIRST(o.total ORDER BY o.total DESC) FROM users u JOIN orders o ON u.id=o.user_id GROUP BY u.id;"], explanation: "RANK() OVER(PARTITION BY) replaces the correlated subquery with MAX(), avoiding repeated scans." },
      { code: `SELECT u.id,\n    (SELECT COUNT(*) FROM orders WHERE user_id=u.id) as orders,\n    (SELECT SUM(total) FROM orders WHERE user_id=u.id) as revenue,\n    (SELECT MAX(created_at) FROM orders WHERE user_id=u.id) as last_order\nFROM users u;`, question: "Shorten three correlated subqueries:", answer: "SELECT u.id, COUNT(o.id) as orders, SUM(o.total) as revenue, MAX(o.created_at) as last_order\nFROM users u LEFT JOIN orders o ON u.id=o.user_id GROUP BY u.id;", choices: ["SELECT u.id, COUNT(o.id) as orders, SUM(o.total) as revenue, MAX(o.created_at) as last_order\nFROM users u LEFT JOIN orders o ON u.id=o.user_id GROUP BY u.id;", "SELECT u.id, o.orders, o.revenue, o.last_order FROM users u JOIN (SELECT user_id, COUNT(*) orders, SUM(total) revenue, MAX(created_at) last_order FROM orders GROUP BY user_id) o ON u.id=o.user_id;", "SELECT u.id, AGGREGATE(orders WHERE user_id=u.id) FROM users u;", "SELECT u.id, orders.count, orders.sum, orders.max FROM users u LATERAL JOIN orders ON user_id=u.id;"], explanation: "A single LEFT JOIN with GROUP BY replaces three correlated subqueries — scans orders once instead of three times." },
      { code: `SELECT name, salary * 12 annual\nFROM employees\nWHERE annual > 600000;`, question: "Fix the alias usage in WHERE:", answer: "SELECT name, salary * 12 annual FROM employees WHERE salary * 12 > 600000;", choices: ["SELECT name, salary * 12 annual FROM employees WHERE salary * 12 > 600000;", "SELECT name, salary * 12 AS annual FROM employees HAVING annual > 600000;", "SELECT * FROM (SELECT name, salary*12 annual FROM employees) t WHERE annual > 600000;", "SELECT name, annual FROM employees WHERE annual > 600000;"], explanation: "Column aliases in SELECT are not available in WHERE — repeat the expression or use a subquery." },
      { code: `SELECT dept, SUM(salary) as total,\n    SUM(SUM(salary)) OVER() as grand_total,\n    SUM(salary) / SUM(SUM(salary)) OVER() * 100 as pct\nFROM employees GROUP BY dept;`, question: "Shorten the percentage expression:", answer: "SELECT dept, SUM(salary) as total,\n    ROUND(100.0 * SUM(salary) / SUM(SUM(salary)) OVER(), 2) as pct\nFROM employees GROUP BY dept;", choices: ["SELECT dept, SUM(salary) as total,\n    ROUND(100.0 * SUM(salary) / SUM(SUM(salary)) OVER(), 2) as pct\nFROM employees GROUP BY dept;", "SELECT dept, SUM(salary), PERCENT_RANK() OVER(ORDER BY SUM(salary)) FROM employees GROUP BY dept;", "SELECT dept, SUM(salary), RATIO_TO_REPORT(SUM(salary)) OVER() * 100 FROM employees GROUP BY dept;", "SELECT dept, SUM(salary) / (SELECT SUM(salary) FROM employees) * 100 FROM employees GROUP BY dept;"], explanation: "RATIO_TO_REPORT (Oracle) or reformulating SUM(SUM()) OVER() with ROUND cleans up the percentage expression." },
      { code: `INSERT INTO audit_log (user_id, action, ts)\nSELECT user_id, 'update', NOW() FROM updates_staging;\nDELETE FROM updates_staging;`, question: "Shorten with DELETE RETURNING (PostgreSQL):", answer: "WITH deleted AS (DELETE FROM updates_staging RETURNING user_id)\nINSERT INTO audit_log(user_id,action,ts) SELECT user_id,'update',NOW() FROM deleted;", choices: ["WITH deleted AS (DELETE FROM updates_staging RETURNING user_id)\nINSERT INTO audit_log(user_id,action,ts) SELECT user_id,'update',NOW() FROM deleted;", "MOVE FROM updates_staging INTO audit_log (user_id, 'update', NOW());", "TRANSFER updates_staging TO audit_log ON user_id;", "INSERT INTO audit_log SELECT user_id,'update',NOW() FROM updates_staging ON DELETE CASCADE;"], explanation: "DELETE RETURNING in a CTE lets you insert and delete in one atomic statement (PostgreSQL)." },
      { code: `SELECT *\nFROM events\nWHERE ts BETWEEN '2024-01-01' AND '2024-12-31'\nAND category_id IN (1, 2, 3)\nAND status = 'active'\nORDER BY ts DESC\nLIMIT 50;`, question: "What's the key performance optimization here?", answer: "CREATE INDEX idx_events ON events(status, category_id, ts DESC);", choices: ["CREATE INDEX idx_events ON events(status, category_id, ts DESC);", "SELECT * FROM events WHERE ts >= '2024-01-01' AND category_id <= 3 AND status='active' LIMIT 50;", "SELECT * FROM events_2024 WHERE category_id IN (1,2,3) AND status='active' LIMIT 50;", "CREATE MATERIALIZED VIEW mv_active_events AS SELECT * FROM events WHERE status='active';"], explanation: "A composite index on (status, category_id, ts DESC) lets the DB skip the full table scan — the real 'shortening' is in execution time." },
      { code: `WITH RECURSIVE cte AS (\n    SELECT id, parent_id, name, 0 as level\n    FROM categories WHERE parent_id IS NULL\n    UNION ALL\n    SELECT c.id, c.parent_id, c.name, cte.level+1\n    FROM categories c JOIN cte ON c.parent_id=cte.id\n)\nSELECT * FROM cte;`, question: "Shorten hierarchy traversal (Oracle):", answer: "SELECT * FROM categories START WITH parent_id IS NULL CONNECT BY PRIOR id = parent_id;", choices: ["SELECT * FROM categories START WITH parent_id IS NULL CONNECT BY PRIOR id = parent_id;", "SELECT * FROM categories WHERE parent_id IS NULL EXPAND CHILDREN ON id=parent_id;", "SELECT HIERARCHY(*) FROM categories GROUP BY parent_id;", "SELECT * FROM categories TREE JOIN ON id=parent_id;"], explanation: "Oracle's CONNECT BY or PostgreSQL's ltree extension handle hierarchy traversal without verbose recursive CTEs." },
      { code: `SELECT name FROM users\nWHERE id IN (\n    SELECT manager_id FROM departments\n    WHERE manager_id IS NULL\n);`, question: "Fix IN with NULL subquery:", answer: "SELECT name FROM users WHERE id IN (SELECT manager_id FROM departments WHERE manager_id IS NOT NULL);", choices: ["SELECT name FROM users WHERE id IN (SELECT manager_id FROM departments WHERE manager_id IS NOT NULL);", "SELECT name FROM users WHERE id = ANY(SELECT manager_id FROM departments);", "SELECT name FROM users WHERE EXISTS(SELECT 1 FROM departments WHERE manager_id=users.id);", "SELECT name FROM users JOIN departments ON users.id = departments.manager_id;"], explanation: "IN (NULL) never matches any row due to three-valued logic — filter NULLs out in the subquery." },
    ],
    hard: [
      { code: `SELECT id, name,\n    ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary)\nFROM employees\nWHERE ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary) = 1;`, question: "Fix window function in WHERE:", answer: "SELECT id, name FROM (SELECT id, name, ROW_NUMBER() OVER(PARTITION BY dept ORDER BY salary) rn FROM employees) t WHERE rn=1;", choices: ["SELECT id, name FROM (SELECT id, name, ROW_NUMBER() OVER(PARTITION BY dept ORDER BY salary) rn FROM employees) t WHERE rn=1;", "SELECT id, name FROM employees WHERE ROW_NUMBER() OVER(PARTITION BY dept ORDER BY salary)=1;", "SELECT FIRST(id), FIRST(name) FROM employees GROUP BY dept ORDER BY salary;", "SELECT id, name FROM employees QUALIFY ROW_NUMBER() OVER(PARTITION BY dept ORDER BY salary)=1;"], explanation: "Window functions can't be used in WHERE — wrap in a subquery or CTE and filter on the alias." },
    ],
  },
  webdev: {
    easy: [
      { code: `document.querySelector('#btn').addEventListener('click', function() {\n    doSomething();\n});`, question: "Shorten the handler using arrow function:", answer: "document.querySelector('#btn').addEventListener('click', () => doSomething());", choices: ["document.querySelector('#btn').addEventListener('click', () => doSomething());", "document.querySelector('#btn').onclick = doSomething;", "document.getElementById('btn').onClick = doSomething;", "#btn.addEventListener('click', doSomething);"], explanation: "Arrow functions with single expressions don't need curly braces or return." },
      { code: `const arr = [1, 2, 3];\nconst doubled = [];\nfor (let i = 0; i < arr.length; i++) {\n    doubled.push(arr[i] * 2);\n}`, question: "Shorten using .map():", answer: "const doubled = arr.map(x => x * 2);", choices: ["const doubled = arr.map(x => x * 2);", "const doubled = arr.forEach(x => x * 2);", "const doubled = arr.transform(x => x * 2);", "const doubled = [...arr].map(x => x * 2);"], explanation: ".map() creates a new array with each element transformed." },
      { code: `const obj = { a: 1, b: 2, c: 3 };\nconst a = obj.a;\nconst b = obj.b;\nconst c = obj.c;`, question: "Shorten using destructuring:", answer: "const { a, b, c } = obj;", choices: ["const { a, b, c } = obj;", "const [a, b, c] = obj;", "const a, b, c = obj;", "extract(obj, 'a', 'b', 'c');"], explanation: "Object destructuring extracts multiple properties in one statement." },
      { code: `function greet(name) {\n    return 'Hello, ' + name + '!';\n}`, question: "Shorten using arrow function + template literal:", answer: "const greet = name => `Hello, ${name}!`;", choices: ["const greet = name => `Hello, ${name}!`;", "const greet = (name) => { return `Hello ${name}`; };", "const greet = name => 'Hello, ' + name + '!';", "greet = name => `Hello, ${name}!`;"], explanation: "Arrow functions with single expressions implicitly return. Template literals replace concatenation." },
      { code: `const arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst combined = arr1.concat(arr2);`, question: "Shorten using spread:", answer: "const combined = [...arr1, ...arr2];", choices: ["const combined = [...arr1, ...arr2];", "const combined = arr1 + arr2;", "const combined = Array.merge(arr1, arr2);", "const combined = arr1.push(...arr2);"], explanation: "Spread syntax (...) expands arrays inline — more readable than .concat()." },
      { code: `if (user !== null && user !== undefined) {\n    return user.name;\n}`, question: "Shorten with optional chaining:", answer: "return user?.name;", choices: ["return user?.name;", "return user && user.name;", "return user != null ? user.name : undefined;", "return user?.name ?? '';"], explanation: "Optional chaining (?.) short-circuits to undefined if the object is null/undefined." },
      { code: `let value;\nif (input !== null && input !== undefined) {\n    value = input;\n} else {\n    value = 'default';\n}`, question: "Shorten using nullish coalescing:", answer: "const value = input ?? 'default';", choices: ["const value = input ?? 'default';", "const value = input || 'default';", "const value = input != null ? input : 'default';", "const value = input === undefined ? 'default' : input;"], explanation: "?? returns the right side only when the left is null or undefined (unlike || which also catches 0 and '')." },
      { code: `Promise.resolve()\n    .then(() => fetch('/api/data'))\n    .then(res => res.json())\n    .then(data => console.log(data))\n    .catch(err => console.error(err));`, question: "Shorten using async/await:", answer: "try {\n    const data = await (await fetch('/api/data')).json();\n    console.log(data);\n} catch(err) { console.error(err); }", choices: ["try {\n    const data = await (await fetch('/api/data')).json();\n    console.log(data);\n} catch(err) { console.error(err); }", "async () => console.log(await fetch('/api/data').json());", "const data = await fetch('/api/data').then(r=>r.json());", "fetch('/api/data').json().then(console.log).catch(console.error);"], explanation: "async/await flattens promise chains into sequential, readable code." },
      { code: `const styles = {\n    backgroundColor: 'red',\n    color: 'white',\n    fontSize: '16px'\n};\nObject.assign(element.style, styles);`, question: "Shorten using CSS class toggle instead:", answer: "element.classList.add('highlight');  // .highlight defined in CSS", choices: ["element.classList.add('highlight');  // .highlight defined in CSS", "element.style = styles;", "Object.keys(styles).forEach(k => element.style[k] = styles[k]);", "element.setAttribute('style', JSON.stringify(styles));"], explanation: "Adding a CSS class is the idiomatic way — keeps styles in CSS, not JavaScript." },
      { code: `const items = ['apple', 'banana', 'cherry'];\nlet html = '<ul>';\nfor (const item of items) {\n    html += '<li>' + item + '</li>';\n}\nhtml += '</ul>';\ndocument.body.innerHTML = html;`, question: "Shorten using template literal + join:", answer: "document.body.innerHTML = `<ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul>`;", choices: ["document.body.innerHTML = `<ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul>`;", "document.body.innerHTML = `<ul>${items}</ul>`;", "document.body.innerHTML = '<ul>' + items.toString() + '</ul>';", "document.body.insertAdjacentHTML('afterbegin', items.map(i=>'<li>'+i+'</li>').join(''));"], explanation: "Template literals with .map().join('') generate HTML lists in one expression." },
    ],
    medium: [
      { code: `const [state, setState] = useState({\n    name: '',\n    age: 0,\n    email: ''\n});\n\nconst updateName = (n) => setState({ ...state, name: n });\nconst updateAge  = (a) => setState({ ...state, age: a });`, question: "Shorten with a single generic updater:", answer: "const update = (key, val) => setState(s => ({ ...s, [key]: val }));", choices: ["const update = (key, val) => setState(s => ({ ...s, [key]: val }));", "const update = (key, val) => setState({ [key]: val });", "const [state, setState, update] = useState({});", "const update = setState.bind(null, state);"], explanation: "A generic updater using computed property names [key] replaces one setter per field." },
      { code: `useEffect(() => {\n    async function load() {\n        const res = await fetch(url);\n        const data = await res.json();\n        setData(data);\n    }\n    load();\n}, [url]);`, question: "Shorten the async pattern inside useEffect:", answer: "useEffect(() => {\n    fetch(url).then(r=>r.json()).then(setData);\n}, [url]);", choices: ["useEffect(() => {\n    fetch(url).then(r=>r.json()).then(setData);\n}, [url]);", "useAsyncEffect(async () => { setData(await fetch(url).json()); }, [url]);", "useEffect(async () => { setData(await (await fetch(url)).json()); }, [url]);", "useFetch(url, setData);"], explanation: "Promise chaining with direct function reference (then(setData)) removes the inner async wrapper." },
      { code: `const isEven = (n) => {\n    if (n % 2 === 0) {\n        return true;\n    } else {\n        return false;\n    }\n}`, question: "Shorten the boolean return:", answer: "const isEven = n => n % 2 === 0;", choices: ["const isEven = n => n % 2 === 0;", "const isEven = n => Boolean(n % 2 === 0);", "const isEven = n => !!(n % 2 === 0);", "const isEven = (n) => { return n % 2 === 0; };"], explanation: "Comparison expressions already return boolean — no if/else needed." },
      { code: `function sum(...args) {\n    let total = 0;\n    for (const n of args) {\n        total += n;\n    }\n    return total;\n}`, question: "Shorten using reduce:", answer: "const sum = (...args) => args.reduce((a, b) => a + b, 0);", choices: ["const sum = (...args) => args.reduce((a, b) => a + b, 0);", "const sum = (...args) => args.sum();", "const sum = args => args.reduce(+, 0);", "const sum = (...args) => Math.sum(args);"], explanation: ".reduce() folds an array into a single value — perfect for sum, product, etc." },
      { code: `class MyComponent extends React.Component {\n    constructor(props) {\n        super(props);\n        this.state = { count: 0 };\n        this.handleClick = this.handleClick.bind(this);\n    }\n    handleClick() { this.setState({ count: this.state.count + 1 }); }\n    render() { return <button onClick={this.handleClick}>{this.state.count}</button>; }\n}`, question: "Shorten with React Hooks:", answer: "const MyComponent = () => {\n    const [count, setCount] = useState(0);\n    return <button onClick={() => setCount(c=>c+1)}>{count}</button>;\n};", choices: ["const MyComponent = () => {\n    const [count, setCount] = useState(0);\n    return <button onClick={() => setCount(c=>c+1)}>{count}</button>;\n};", "const MyComponent = () => <button count={useState(0)}>{count}</button>;", "class MyComponent extends PureComponent { state={count:0}; render() { return <button>{this.state.count}</button>; } }", "const MyComponent = withState('count', 'setCount', 0)(({count, setCount}) => <button onClick={()=>setCount(count+1)}>{count}</button>);"], explanation: "Hooks replace class components, eliminating constructor, bind(), and this entirely." },
      { code: `const memoize = (fn) => {\n    const cache = new Map();\n    return function(...args) {\n        const key = JSON.stringify(args);\n        if (cache.has(key)) return cache.get(key);\n        const result = fn.apply(this, args);\n        cache.set(key, result);\n        return result;\n    };\n};`, question: "Shorten using nullish assignment:", answer: "const memoize = fn => {\n    const cache = {};\n    return (...args) => (cache[args] ??= fn(...args));\n};", choices: ["const memoize = fn => {\n    const cache = {};\n    return (...args) => (cache[args] ??= fn(...args));\n};", "const memoize = fn => (...args) => fn(...args);", "const memoize = (fn, cache=new Map()) => (...args) => cache.get(args) || cache.set(args, fn(...args)).get(args);", "const memoize = fn => _.memoize(fn);"], explanation: "??= (nullish assignment) assigns only if undefined/null — one-line cache check and fill." },
      { code: `const pipe = (...fns) => {\n    return function(x) {\n        let result = x;\n        for (const fn of fns) {\n            result = fn(result);\n        }\n        return result;\n    };\n};`, question: "Shorten pipe using reduce:", answer: "const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);", choices: ["const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);", "const pipe = (...fns) => fns.compose();", "const pipe = fns => x => fns.map(f => f(x)).pop();", "const pipe = (...fns) => x => fns.forEach(f => f(x));"], explanation: "reduce over a function array threads a value through each function — function composition in one line." },
      { code: `function deepClone(obj) {\n    if (obj === null || typeof obj !== 'object') return obj;\n    const clone = Array.isArray(obj) ? [] : {};\n    for (const key in obj) {\n        if (obj.hasOwnProperty(key)) {\n            clone[key] = deepClone(obj[key]);\n        }\n    }\n    return clone;\n}`, question: "Shorten using modern API:", answer: "const deepClone = obj => structuredClone(obj);", choices: ["const deepClone = obj => structuredClone(obj);", "const deepClone = obj => JSON.parse(JSON.stringify(obj));", "const deepClone = obj => { ...obj };", "const deepClone = obj => Object.assign({}, obj);"], explanation: "structuredClone() (Node 17+, modern browsers) performs a deep clone natively." },
      { code: `async function fetchAll(urls) {\n    const results = [];\n    for (const url of urls) {\n        const res = await fetch(url);\n        results.push(await res.json());\n    }\n    return results;\n}`, question: "Shorten for parallel fetching:", answer: "const fetchAll = urls => Promise.all(urls.map(u => fetch(u).then(r => r.json())));", choices: ["const fetchAll = urls => Promise.all(urls.map(u => fetch(u).then(r => r.json())));", "const fetchAll = async urls => await urls.map(u => fetch(u));", "const fetchAll = urls => urls.forEach(u => fetch(u).then(r=>r.json()));", "const fetchAll = urls => Promise.race(urls.map(u => fetch(u).then(r=>r.json())));"], explanation: "Promise.all() fetches all URLs in parallel instead of sequential await, and is far shorter." },
      { code: `class EventEmitter {\n    constructor() { this.listeners = {}; }\n    on(event, cb) {\n        if (!this.listeners[event]) this.listeners[event] = [];\n        this.listeners[event].push(cb);\n    }\n    emit(event, ...args) {\n        (this.listeners[event] || []).forEach(cb => cb(...args));\n    }\n}`, question: "Shorten on() using ||=:", answer: "on(event, cb) { (this.listeners[event] ||= []).push(cb); }", choices: ["on(event, cb) { (this.listeners[event] ||= []).push(cb); }", "on(event, cb) { this.listeners[event] = [...(this.listeners[event]||[]), cb]; }", "on(event, cb) { this.listeners[event]?.push(cb) ?? (this.listeners[event]=[cb]); }", "on(event, cb) { this.listeners[event] = this.listeners[event] || []; this.listeners[event].push(cb); }"], explanation: "||= (logical OR assignment) initializes only if falsy — replaces the if-not-exists pattern." },
    ],
    hard: [
      { code: `function* gen() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\nconst g = gen();\nconsole.log([...g]);\nconsole.log([...g]);`, question: "Shorten generator reset pattern:", answer: "const makeGen = () => (function*(){ yield 1; yield 2; yield 3; })();\nconsole.log([...makeGen()]);\nconsole.log([...makeGen()]);", choices: ["const makeGen = () => (function*(){ yield 1; yield 2; yield 3; })();\nconsole.log([...makeGen()]);\nconsole.log([...makeGen()]);", "const g = gen(); g.reset(); console.log([...g]);", "gen.rewind(); console.log([...g]);", "const g = gen(); g[Symbol.iterator] = gen; console.log([...g]);"], explanation: "Generators are exhausted after iteration. Call the generator function again to get a fresh iterator." },
      { code: `const nums = [1, 2, 3, 4, 5];\nconst result = nums\n  .filter(n => n % 2 === 0)\n  .map(n => n * 2)\n  .reduce((acc, n) => acc + n);`, question: "Shorten reduce with initial value:", answer: "const result = nums.filter(n=>n%2===0).map(n=>n*2).reduce((a,n)=>a+n, 0);", choices: ["const result = nums.filter(n=>n%2===0).map(n=>n*2).reduce((a,n)=>a+n, 0);", "const result = nums.reduce((a,n)=>n%2===0?a+n*2:a, 0);", "const result = nums.filter(n=>n%2===0).flatMap(n=>[n*2]).sum();", "const result = [...nums].filter(n=>n%2).map(n=>n*2).reduce((a,n)=>a+n);"], explanation: "Always provide an initial value to reduce() to avoid errors on empty arrays after filter." },
      { code: `const obj = { x: 1 };\nconst frozen = Object.freeze(obj);\nfrozen.x = 99;\nconsole.log(frozen.x);`, question: "Shorten immutable update pattern:", answer: "const updated = Object.freeze({ ...obj, x: 99 });", choices: ["const updated = Object.freeze({ ...obj, x: 99 });", "const updated = Object.assign(obj, {x: 99});", "const updated = structuredClone(obj); updated.x = 99;", "obj.x = 99; const updated = Object.freeze(obj);"], explanation: "Create a new frozen object with spread + override rather than mutating a frozen one." },
      { code: `async function retry(fn, times) {\n  for (let i = 0; i < times; i++) {\n    try { return await fn(); }\n    catch(e) { if (i === times-1) throw e; }\n  }\n}`, question: "Shorten using recursion:", answer: "const retry = (fn, n) => fn().catch(e => n > 1 ? retry(fn, n-1) : Promise.reject(e));", choices: ["const retry = (fn, n) => fn().catch(e => n > 1 ? retry(fn, n-1) : Promise.reject(e));", "const retry = async (fn, n) => n > 0 && await fn() || retry(fn, n-1);", "const retry = (fn, n) => [...Array(n)].reduce(p => p.catch(fn), Promise.reject());", "const retry = (fn, n) => Promise.any(Array.from({length:n}, fn));"], explanation: "Recursive Promise chain: on failure, retry if attempts remain, otherwise propagate the error." },
      { code: `const handler = {\n  get(target, key) {\n    return key in target ? target[key] : 42;\n  }\n};\nconst p = new Proxy({a: 1}, handler);\nconsole.log(p.b);`, question: "Shorten default-value proxy:", answer: "const withDefault = (obj, def) => new Proxy(obj, { get: (t,k) => k in t ? t[k] : def });", choices: ["const withDefault = (obj, def) => new Proxy(obj, { get: (t,k) => k in t ? t[k] : def });", "const withDefault = (obj, def) => ({ ...obj, default: def });", "const withDefault = (obj, def) => Object.assign(Object.create({valueOf:()=>def}), obj);", "const withDefault = (obj, def) => new Map([[...Object.entries(obj)]], def);"], explanation: "Wrapping in a factory function makes the default-value Proxy reusable for any object and default." },
    ],
  },
  dsa: {
    easy: [
      { code: `def is_palindrome(s):\n    rev = ''\n    for ch in s:\n        rev = ch + rev\n    return s == rev`, question: "Shorten using slicing:", answer: "def is_palindrome(s): return s == s[::-1]", choices: ["def is_palindrome(s): return s == s[::-1]", "def is_palindrome(s): return s == reversed(s)", "def is_palindrome(s): return s.reverse() == s", "def is_palindrome(s): return all(s[i]==s[~i] for i in range(len(s)//2))"], explanation: "s[::-1] reverses a string in one expression — no loop needed." },
      { code: `def find_max(arr):\n    m = arr[0]\n    for x in arr[1:]:\n        if x > m:\n            m = x\n    return m`, question: "Shorten using built-in:", answer: "def find_max(arr): return max(arr)", choices: ["def find_max(arr): return max(arr)", "def find_max(arr): return arr.max()", "def find_max(arr): return sorted(arr)[-1]", "def find_max(arr): return max(*arr)"], explanation: "Python's max() built-in finds the maximum in one call." },
      { code: `count = {}\nfor x in arr:\n    if x not in count:\n        count[x] = 0\n    count[x] += 1`, question: "Shorten using Counter:", answer: "from collections import Counter\ncount = Counter(arr)", choices: ["from collections import Counter\ncount = Counter(arr)", "count = dict.count(arr)", "count = {x: arr.count(x) for x in arr}", "from collections import defaultdict\ncount = defaultdict(int, arr)"], explanation: "Counter(iterable) builds a frequency map in one line." },
      { code: `def flatten(nested):\n    result = []\n    for lst in nested:\n        for x in lst:\n            result.append(x)\n    return result`, question: "Shorten using list comprehension:", answer: "def flatten(nested): return [x for lst in nested for x in lst]", choices: ["def flatten(nested): return [x for lst in nested for x in lst]", "def flatten(nested): return sum(nested, [])", "def flatten(nested): return list(chain.from_iterable(nested))", "def flatten(nested): return nested.flatten()"], explanation: "A nested list comprehension flattens in one expression. sum(nested, []) also works." },
      { code: `def has_duplicate(arr):\n    seen = []\n    for x in arr:\n        if x in seen:\n            return True\n        seen.append(x)\n    return False`, question: "Shorten using set length comparison:", answer: "def has_duplicate(arr): return len(arr) != len(set(arr))", choices: ["def has_duplicate(arr): return len(arr) != len(set(arr))", "def has_duplicate(arr): return bool(any(x in seen or seen.add(x) for x in arr))", "def has_duplicate(arr): return arr != list(set(arr))", "def has_duplicate(arr): return sorted(arr) != arr"], explanation: "If a set (unique elements) is smaller than the list, there must be duplicates." },
      { code: `def binary_search(arr, target):\n    lo, hi = 0, len(arr)-1\n    while lo <= hi:\n        mid = (lo+hi)//2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: lo = mid+1\n        else: hi = mid-1\n    return -1`, question: "Shorten using bisect:", answer: "import bisect\ndef binary_search(arr, t):\n    i = bisect.bisect_left(arr, t)\n    return i if i < len(arr) and arr[i] == t else -1", choices: ["import bisect\ndef binary_search(arr, t):\n    i = bisect.bisect_left(arr, t)\n    return i if i < len(arr) and arr[i] == t else -1", "def binary_search(arr, t): return arr.index(t)", "def binary_search(arr, t): return t in arr and arr.index(t)", "import bisect\ndef binary_search(arr, t): return bisect.bisect(arr, t)"], explanation: "bisect.bisect_left() finds the insertion point in O(log n) — no manual lo/hi loop needed." },
      { code: `graph = {}\nfor u, v in edges:\n    if u not in graph: graph[u] = []\n    if v not in graph: graph[v] = []\n    graph[u].append(v)\n    graph[v].append(u)`, question: "Shorten using defaultdict:", answer: "from collections import defaultdict\ngraph = defaultdict(list)\nfor u, v in edges:\n    graph[u].append(v)\n    graph[v].append(u)", choices: ["from collections import defaultdict\ngraph = defaultdict(list)\nfor u, v in edges:\n    graph[u].append(v)\n    graph[v].append(u)", "graph = {u:[v] for u,v in edges}", "graph = dict.fromkeys(edges, [])", "graph = {u: list(v) for u, v in edges}"], explanation: "defaultdict(list) eliminates the if-not-in boilerplate." },
      { code: `arr.sort()\narr = arr[::-1]`, question: "Shorten the reverse sort:", answer: "arr.sort(reverse=True)", choices: ["arr.sort(reverse=True)", "arr = sorted(arr, reverse=True)", "arr.sort(); arr.reverse()", "arr = arr[::-1].sort()"], explanation: "sort(reverse=True) sorts descending in-place in one call." },
      { code: `n = len(arr)\nfor i in range(n):\n    for j in range(0, n-i-1):\n        if arr[j] > arr[j+1]:\n            arr[j], arr[j+1] = arr[j+1], arr[j]`, question: "Shorten bubble sort:", answer: "arr.sort()  # Built-in Timsort is O(n log n) vs O(n^2)", choices: ["arr.sort()  # Built-in Timsort is O(n log n) vs O(n^2)", "arr = sorted(arr)", "arr.bubble_sort()", "arr[:] = sorted(arr)"], explanation: "Python's built-in sort (Timsort) is faster and needs no implementation." },
      { code: `def two_sum_exists(nums, target):\n    for i in range(len(nums)):\n        for j in range(i+1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return True\n    return False`, question: "Shorten to O(n) using set:", answer: "def two_sum_exists(nums, target):\n    seen = set()\n    return any((target-x) in seen or seen.add(x) for x in nums)", choices: ["def two_sum_exists(nums, target):\n    seen = set()\n    return any((target-x) in seen or seen.add(x) for x in nums)", "def two_sum_exists(nums, t): return any(t-x in nums for x in nums)", "def two_sum_exists(nums, t): return t in {a+b for a in nums for b in nums}", "def two_sum_exists(nums, t): return len(set(nums)) != len(nums)"], explanation: "Using a set for O(1) lookup converts O(n^2) to O(n)." },
    ],
    medium: [
      { code: `def dfs(graph, node, visited=None):\n    if visited is None:\n        visited = set()\n    visited.add(node)\n    for nb in graph[node]:\n        if nb not in visited:\n            dfs(graph, nb, visited)\n    return visited`, question: "Shorten using set union:", answer: "dfs = lambda g, n, v=set(): v.add(n) or [dfs(g, nb, v) for nb in g[n] if nb not in v] or v", choices: ["dfs = lambda g, n, v=set(): v.add(n) or [dfs(g, nb, v) for nb in g[n] if nb not in v] or v", "def dfs(g, n): return {n} | set.union(*[dfs(g,nb) for nb in g[n]])", "def dfs(g, n, v=set()): return v | {dfs(g,nb,v) for nb in g[n] if nb not in v.add(n) or v}", "def dfs(graph, node, v=frozenset()): return v | {node}"], explanation: "The mutable default set pattern is idiomatic; lambda form makes it concise." },
      { code: `def lru_cache_fn(fn, maxsize=128):\n    cache = {}\n    keys = []\n    def wrapper(*args):\n        if args in cache:\n            keys.remove(args)\n            keys.append(args)\n            return cache[args]\n        result = fn(*args)\n        cache[args] = result\n        keys.append(args)\n        if len(keys) > maxsize:\n            del cache[keys.pop(0)]\n        return result\n    return wrapper`, question: "Shorten using functools:", answer: "from functools import lru_cache\n@lru_cache(maxsize=128)\ndef fn(*args): ...", choices: ["from functools import lru_cache\n@lru_cache(maxsize=128)\ndef fn(*args): ...", "from functools import cache\n@cache\ndef fn(*args): ...", "def fn(*args): return fn.cache.get(args) or fn.cache.update({args: compute(args)})", "@memoize(128)\ndef fn(*args): ..."], explanation: "@functools.lru_cache replaces all manual LRU cache implementation." },
      { code: `def merge_sorted(l1, l2):\n    result = []\n    i = j = 0\n    while i < len(l1) and j < len(l2):\n        if l1[i] <= l2[j]: result.append(l1[i]); i+=1\n        else: result.append(l2[j]); j+=1\n    result.extend(l1[i:])\n    result.extend(l2[j:])\n    return result`, question: "Shorten using heapq.merge:", answer: "import heapq\ndef merge_sorted(l1, l2): return list(heapq.merge(l1, l2))", choices: ["import heapq\ndef merge_sorted(l1, l2): return list(heapq.merge(l1, l2))", "def merge_sorted(l1, l2): return sorted(l1 + l2)", "def merge_sorted(l1, l2): return list(merge(l1, l2))", "def merge_sorted(l1, l2): return (l1 + l2).sort()"], explanation: "heapq.merge() lazily merges sorted iterables — O(n log k) and no manual i/j needed." },
      { code: `def inorder(root):\n    result = []\n    if root:\n        result += inorder(root.left)\n        result.append(root.val)\n        result += inorder(root.right)\n    return result`, question: "Shorten using generator:", answer: "def inorder(root):\n    if root:\n        yield from inorder(root.left)\n        yield root.val\n        yield from inorder(root.right)", choices: ["def inorder(root):\n    if root:\n        yield from inorder(root.left)\n        yield root.val\n        yield from inorder(root.right)", "def inorder(root): return [*inorder(root.left), root.val, *inorder(root.right)] if root else []", "inorder = lambda r: inorder(r.left)+[r.val]+inorder(r.right) if r else []", "def inorder(root): return root and inorder(root.left)+[root.val]+inorder(root.right) or []"], explanation: "yield from delegates to sub-generators, eliminating list concatenation entirely." },
      { code: `class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n    def push(self, val):\n        self.stack.append(val)\n        if not self.min_stack or val <= self.min_stack[-1]:\n            self.min_stack.append(val)\n    def pop(self):\n        val = self.stack.pop()\n        if val == self.min_stack[-1]:\n            self.min_stack.pop()\n        return val\n    def getMin(self):\n        return self.min_stack[-1]`, question: "Shorten push condition:", answer: "def push(self, val):\n    self.stack.append(val)\n    self.min_stack.append(min(val, self.min_stack[-1] if self.min_stack else val))", choices: ["def push(self, val):\n    self.stack.append(val)\n    self.min_stack.append(min(val, self.min_stack[-1] if self.min_stack else val))", "def push(self, val):\n    self.stack.append(val)\n    self.min_stack.append(min(self.min_stack+[val]))", "def push(self, val):\n    self.stack.append(val)\n    self.min_stack.append(val if val <= (self.min_stack or [val])[-1] else self.min_stack[-1])", "def push(self, val):\n    self.stack.append(val)\n    heapq.heappush(self.min_stack, val)"], explanation: "min(val, current_min) is cleaner than the if/else guard — always push to min_stack." },
      { code: `def dijkstra(graph, start):\n    dist = {node: float('inf') for node in graph}\n    dist[start] = 0\n    visited = set()\n    while True:\n        u = min((d,n) for n,d in dist.items() if n not in visited)[1]\n        if dist[u] == float('inf'): break\n        visited.add(u)\n        for v, w in graph[u]:\n            if dist[u]+w < dist[v]:\n                dist[v] = dist[u]+w\n    return dist`, question: "Shorten with a heap:", answer: "import heapq\ndef dijkstra(graph, start):\n    dist = {n: float('inf') for n in graph}\n    dist[start] = 0\n    heap = [(0, start)]\n    while heap:\n        d, u = heapq.heappop(heap)\n        if d > dist[u]: continue\n        for v, w in graph[u]:\n            if d+w < dist[v]:\n                dist[v] = d+w\n                heapq.heappush(heap, (dist[v], v))\n    return dist", choices: ["import heapq\ndef dijkstra(graph, start):\n    dist = {n: float('inf') for n in graph}\n    dist[start] = 0\n    heap = [(0, start)]\n    while heap:\n        d, u = heapq.heappop(heap)\n        if d > dist[u]: continue\n        for v, w in graph[u]:\n            if d+w < dist[v]:\n                dist[v] = d+w\n                heapq.heappush(heap, (dist[v], v))\n    return dist", "def dijkstra(g, s): return nx.single_source_dijkstra(g, s)[0]", "def dijkstra(g, s): return {n: min(w for _,n,w in g.edges) for n in g}", "import heapq\ndef dijkstra(g, s): return dict(heapq.nsmallest(len(g), g.items()))"], explanation: "A heap reduces the inner min() from O(V) to O(log V) — O(V^2) to O((V+E) log V)." },
      { code: `def knapsack(weights, values, capacity):\n    n = len(weights)\n    dp = [[0]*(capacity+1) for _ in range(n+1)]\n    for i in range(1, n+1):\n        for w in range(capacity+1):\n            dp[i][w] = dp[i-1][w]\n            if weights[i-1] <= w:\n                dp[i][w] = max(dp[i][w], values[i-1]+dp[i-1][w-weights[i-1]])\n    return dp[n][capacity]`, question: "Shorten to O(W) space:", answer: "def knapsack(weights, values, capacity):\n    dp = [0]*(capacity+1)\n    for w, v in zip(weights, values):\n        for c in range(capacity, w-1, -1):\n            dp[c] = max(dp[c], v + dp[c-w])\n    return dp[capacity]", choices: ["def knapsack(weights, values, capacity):\n    dp = [0]*(capacity+1)\n    for w, v in zip(weights, values):\n        for c in range(capacity, w-1, -1):\n            dp[c] = max(dp[c], v + dp[c-w])\n    return dp[capacity]", "def knapsack(w, v, c): return max(sum(v[i] for i in S) for S in powerset(range(len(w))) if sum(w[i] for i in S)<=c)", "def knapsack(w, v, c): return np.max(np.dot(v, w<=c))", "def knapsack(w, v, c): return functools.reduce(lambda d,i: d, zip(w,v), [0]*(c+1))[-1]"], explanation: "Rolling 1D DP reduces space from O(n*W) to O(W) by updating in reverse order." },
      { code: `seen = set()\nunique = []\nfor x in items:\n    if x not in seen:\n        seen.add(x)\n        unique.append(x)`, question: "Shorten while preserving order:", answer: "unique = list(dict.fromkeys(items))", choices: ["unique = list(dict.fromkeys(items))", "unique = list(set(items))", "unique = sorted(set(items))", "unique = dedupe(items)"], explanation: "dict.fromkeys() preserves insertion order (Python 3.7+) while removing duplicates." },
      { code: `def build_lps(pattern):\n    m = len(pattern)\n    lps = [0]*m\n    length = 0\n    i = 1\n    while i < m:\n        if pattern[i] == pattern[length]:\n            length += 1\n            lps[i] = length\n            i += 1\n        else:\n            if length != 0:\n                length = lps[length-1]\n            else:\n                lps[i] = 0\n                i += 1\n    return lps`, question: "Shorten KMP to use re module:", answer: "import re\ndef kmp_search(text, pattern): return [m.start() for m in re.finditer(pattern, text)]", choices: ["import re\ndef kmp_search(text, pattern): return [m.start() for m in re.finditer(pattern, text)]", "def kmp_search(text, pattern): return text.find(pattern)", "def kmp_search(text, p): return [i for i in range(len(text)) if text[i:i+len(p)]==p]", "from fnmatch import fnmatch\ndef kmp_search(text, p): return fnmatch(text, p)"], explanation: "re.finditer() implements an efficient string search internally — no manual KMP needed." },
      { code: `def tarjan(graph):\n    n = len(graph)\n    disc = [-1]*n; low = [-1]*n\n    on_stack = [False]*n; stack = []\n    timer = [0]; sccs = []\n    def dfs(u):\n        disc[u] = low[u] = timer[0]; timer[0]+=1\n        stack.append(u); on_stack[u]=True\n        for v in graph[u]:\n            if disc[v]==-1: dfs(v); low[u]=min(low[u],low[v])\n            elif on_stack[v]: low[u]=min(low[u],disc[v])\n        if low[u]==disc[u]:\n            scc=[]\n            while True:\n                v=stack.pop(); on_stack[v]=False; scc.append(v)\n                if v==u: break\n            sccs.append(scc)\n    for i in range(n):\n        if disc[i]==-1: dfs(i)\n    return sccs`, question: "Shorten using networkx:", answer: "import networkx as nx\ndef tarjan(graph):\n    G = nx.DiGraph(graph)\n    return list(nx.strongly_connected_components(G))", choices: ["import networkx as nx\ndef tarjan(graph):\n    G = nx.DiGraph(graph)\n    return list(nx.strongly_connected_components(G))", "def tarjan(g): return [list(c) for c in __import__('networkx').kosaraju(g)]", "def tarjan(g): return [scc for scc in dfs_all(g)]", "from itertools import groupby\ndef tarjan(g): return list(groupby(sorted(g.keys())))"], explanation: "NetworkX's strongly_connected_components replaces 40 lines of Tarjan's algorithm." },
    ],
    hard: [
      { code: `class SegTree:\n    def __init__(self, n):\n        self.n = n\n        self.tree = [0]*(4*n)\n    def update(self, node, start, end, idx, val):\n        if start == end:\n            self.tree[node] = val\n        else:\n            mid = (start+end)//2\n            if idx<=mid: self.update(2*node,start,mid,idx,val)\n            else: self.update(2*node+1,mid+1,end,idx,val)\n            self.tree[node]=self.tree[2*node]+self.tree[2*node+1]`, question: "Shorten range sum queries using Fenwick tree:", answer: "class BIT:\n    def __init__(self, n): self.t = [0]*(n+1)\n    def update(self, i, v):\n        while i<len(self.t): self.t[i]+=v; i+=i&-i\n    def query(self, i):\n        s=0\n        while i>0: s+=self.t[i]; i-=i&-i\n        return s", choices: ["class BIT:\n    def __init__(self, n): self.t = [0]*(n+1)\n    def update(self, i, v):\n        while i<len(self.t): self.t[i]+=v; i+=i&-i\n    def query(self, i):\n        s=0\n        while i>0: s+=self.t[i]; i-=i&-i\n        return s", "from sortedcontainers import SortedList\nbit = SortedList()", "class SegTree: tree = [0]*4; update=query=lambda *a: sum(a)", "import numpy as np\ndef query(arr, l, r): return np.cumsum(arr)[r] - (np.cumsum(arr)[l-1] if l>0 else 0)"], explanation: "A Fenwick Tree (BIT) has simpler code than a Segment Tree for prefix sum queries." },
    ],
  },
  c: {
    easy: [
      { code: `int temp = a;\na = b;\nb = temp;`, question: "Shorten this swap in C:", answer: "a ^= b; b ^= a; a ^= b;", choices: ["a ^= b; b ^= a; a ^= b;", "swap(&a, &b);", "a = a + b; b = a - b; a = a - b;", "memswap(&a, &b, sizeof(int));"], explanation: "XOR swap exchanges two integers without a temp variable using bitwise XOR." },
      { code: `int i;\nfor (i = 0; i < n; i++) {\n    arr[i] = 0;\n}`, question: "Shorten array zeroing:", answer: "memset(arr, 0, n * sizeof(int));", choices: ["memset(arr, 0, n * sizeof(int));", "bzero(arr, n * sizeof(int));", "calloc(n, sizeof(int));", "ZeroMemory(arr, n * sizeof(int));"], explanation: "memset(arr, 0, size) fills memory with zero bytes — much faster than a loop." },
      { code: `if (x > 0) {\n    return 1;\n} else if (x < 0) {\n    return -1;\n} else {\n    return 0;\n}`, question: "Shorten the signum logic:", answer: "return (x > 0) - (x < 0);", choices: ["return (x > 0) - (x < 0);", "return x / abs(x);", "return sign(x);", "return x == 0 ? 0 : x / abs(x);"], explanation: "(x>0)-(x<0) evaluates to 1, -1, or 0 using boolean subtraction." },
      { code: `printf("%d\\n", x);\nprintf("%d\\n", y);\nprintf("%d\\n", z);`, question: "Shorten multiple printfs:", answer: `printf("%d\\n%d\\n%d\\n", x, y, z);`, choices: [`printf("%d\\n%d\\n%d\\n", x, y, z);`, `print(x, y, z);`, `fprintf(stdout, "%d %d %d", x, y, z);`, `printf("%d %d %d", x, y, z);`], explanation: "printf handles multiple format specifiers in one call." },
      { code: `int len = 0;\nwhile (str[len] != '\\0') {\n    len++;\n}`, question: "Shorten string length:", answer: "int len = strlen(str);", choices: ["int len = strlen(str);", "int len = sizeof(str);", "int len = strnlen(str, 256);", "int len = str_length(str);"], explanation: "strlen() from <string.h> returns the length of a null-terminated string." },
      { code: `int result;\nif (a > b) result = a;\nelse result = b;`, question: "Shorten using ternary:", answer: "int result = a > b ? a : b;", choices: ["int result = a > b ? a : b;", "int result = max(a, b);", "int result = a * (a>b) + b * (b>=a);", "int result = (a+b+abs(a-b))/2;"], explanation: "C's ternary operator condition ? val_if_true : val_if_false assigns in one expression." },
      { code: `int arr[5];\narr[0]=1; arr[1]=2; arr[2]=3; arr[3]=4; arr[4]=5;`, question: "Shorten array initialization:", answer: "int arr[] = {1, 2, 3, 4, 5};", choices: ["int arr[] = {1, 2, 3, 4, 5};", "int arr[5] = {1, 2, 3, 4, 5};", "int *arr = (int[]){1, 2, 3, 4, 5};", "memcpy(arr, (int[]){1,2,3,4,5}, 5*sizeof(int));"], explanation: "Initializer lists set all elements at declaration without separate assignments." },
      { code: `char dest[100];\nstrcpy(dest, "");\nstrcat(dest, s1);\nstrcat(dest, s2);`, question: "Shorten the string build:", answer: `char dest[100];\nsnprintf(dest, sizeof(dest), "%s%s", s1, s2);`, choices: [`char dest[100];\nsnprintf(dest, sizeof(dest), "%s%s", s1, s2);`, `char dest[100] = s1 + s2;`, `char dest[100];\nsprintf(dest, "%s%s", s1, s2);`, `strcat(strcat(dest, s1), s2);`], explanation: "snprintf builds the string in one formatted call — safer than multiple strcpy/strcat." },
      { code: `int isPrime = 1;\nif (n < 2) isPrime = 0;\nfor (int i = 2; i < n; i++) {\n    if (n % i == 0) { isPrime = 0; break; }\n}`, question: "Shorten the loop bound:", answer: "int isPrime = n >= 2;\nfor (int i = 2; i*i <= n && isPrime; i++)\n    if (n%i==0) isPrime=0;", choices: ["int isPrime = n >= 2;\nfor (int i = 2; i*i <= n && isPrime; i++)\n    if (n%i==0) isPrime=0;", "int isPrime = n > 1 && n % 2 != 0;", "int isPrime = !(n % 2) && n > 2;", "int isPrime = is_prime_table[n];"], explanation: "Checking up to sqrt(n) (i*i<=n) reduces O(n) to O(sqrt(n))." },
      { code: `int abs_val;\nif (x < 0) abs_val = -x;\nelse abs_val = x;`, question: "Shorten absolute value:", answer: "int abs_val = abs(x);", choices: ["int abs_val = abs(x);", "int abs_val = x < 0 ? -x : x;", "int abs_val = (x^(x>>31))-(x>>31);", "int abs_val = x * (x>0?1:-1);"], explanation: "abs() from <stdlib.h> or <math.h> gives the absolute value directly." },
    ],
    medium: [
      { code: `char *copy = malloc(strlen(src) + 1);\nif (copy) {\n    strcpy(copy, src);\n}`, question: "Shorten string duplication:", answer: "char *copy = strdup(src);", choices: ["char *copy = strdup(src);", "char *copy = strndup(src, strlen(src));", "char *copy = memdup(src, strlen(src)+1);", "char copy[256]; strcpy(copy, src);"], explanation: "strdup() allocates and copies a string in one call (POSIX standard)." },
      { code: `for (int i=0; i<n; i++)\n    for (int j=0; j<n; j++)\n        matrix[i][j] = (i==j) ? 1 : 0;`, question: "Shorten identity matrix init:", answer: "memset(matrix, 0, n*n*sizeof(int));\nfor (int i=0; i<n; i++) matrix[i][i]=1;", choices: ["memset(matrix, 0, n*n*sizeof(int));\nfor (int i=0; i<n; i++) matrix[i][i]=1;", "memset(matrix, 0, sizeof(matrix)); identity(matrix, n);", "calloc(n*n, sizeof(int)); diag_ones(matrix, n);", "for (int i=0; i<n*n; i++) matrix[0][i]=(i%(n+1)==0);"], explanation: "memset zeros all, then a single loop sets the diagonal — avoids the branch inside the nested loop." },
      { code: `int count = 0;\nfor (int i = 0; i < 32; i++) {\n    if (n & (1 << i)) count++;\n}`, question: "Shorten bit count:", answer: "int count = __builtin_popcount(n);", choices: ["int count = __builtin_popcount(n);", "int count = popcount(n);", "int count = bitcount(n);", "int count = n & 0xFFFF;"], explanation: "__builtin_popcount() (GCC) counts set bits using a hardware instruction." },
      { code: `int min_val = arr[0];\nfor (int i=1; i<n; i++)\n    if (arr[i] < min_val) min_val = arr[i];`, question: "Shorten using pointer arithmetic:", answer: "int *p = arr, min_val = *p;\nwhile (++p < arr+n) if (*p < min_val) min_val = *p;", choices: ["int *p = arr, min_val = *p;\nwhile (++p < arr+n) if (*p < min_val) min_val = *p;", "int min_val = *min_element(arr, arr+n);", "int min_val = arr[0]; for(int*p=arr;p<arr+n;p++) min_val=*p<min_val?*p:min_val;", "int min_val = qsort(arr,n,sizeof(int),cmp), arr[0];"], explanation: "Pointer arithmetic iterates without index — slightly shorter and idiomatic in C." },
      { code: `void reverse_array(int arr[], int n) {\n    int i=0, j=n-1;\n    while (i < j) {\n        int tmp=arr[i]; arr[i]=arr[j]; arr[j]=tmp;\n        i++; j--;\n    }\n}`, question: "Shorten using XOR swap:", answer: "void reverse_array(int arr[], int n) {\n    for (int i=0,j=n-1; i<j; i++,j--)\n        arr[i]^=arr[j], arr[j]^=arr[i], arr[i]^=arr[j];\n}", choices: ["void reverse_array(int arr[], int n) {\n    for (int i=0,j=n-1; i<j; i++,j--)\n        arr[i]^=arr[j], arr[j]^=arr[i], arr[i]^=arr[j];\n}", "void reverse_array(int* a, int n) { while(n>1) { *a^=a[--n]; a[n]^=*a; *a++^=a[n]; } }", "std::reverse(arr, arr+n);", "for (int h=n/2,i=0;i<h;i++) { int t=arr[i];arr[i]=arr[n-1-i];arr[n-1-i]=t; }"], explanation: "XOR swap with comma operator fits the entire swap into one for-loop body." },
      { code: `unsigned int reverse_bits(unsigned int n) {\n    unsigned int result = 0;\n    for (int i=0; i<32; i++) {\n        result = (result<<1) | (n&1);\n        n>>=1;\n    }\n    return result;\n}`, question: "Shorten using parallel bit tricks:", answer: "uint32_t rev_bits(uint32_t n) {\n    n=((n>>1)&0x55555555)|((n&0x55555555)<<1);\n    n=((n>>2)&0x33333333)|((n&0x33333333)<<2);\n    n=((n>>4)&0x0F0F0F0F)|((n&0x0F0F0F0F)<<4);\n    n=((n>>8)&0x00FF00FF)|((n&0x00FF00FF)<<8);\n    return (n>>16)|(n<<16);\n}", choices: ["uint32_t rev_bits(uint32_t n) {\n    n=((n>>1)&0x55555555)|((n&0x55555555)<<1);\n    n=((n>>2)&0x33333333)|((n&0x33333333)<<2);\n    n=((n>>4)&0x0F0F0F0F)|((n&0x0F0F0F0F)<<4);\n    n=((n>>8)&0x00FF00FF)|((n&0x00FF00FF)<<8);\n    return (n>>16)|(n<<16);\n}", "return __builtin_bitreverse32(n);", "return (uint32_t)__builtin_bswap32(n);", "uint32_t r=0; for(int i=32;i--;r|=((n>>i)&1)<<(31-i)); return r;"], explanation: "Parallel bit reversal using bitmask pairs is O(log 32) = 5 operations instead of 32." },
      { code: `void* memdup(const void* src, size_t n) {\n    void* dst = malloc(n);\n    if (dst) memcpy(dst, src, n);\n    return dst;\n}`, question: "Shorten using return value of memcpy:", answer: "void* memdup(const void* src, size_t n) {\n    return memcpy(malloc(n), src, n);\n}", choices: ["void* memdup(const void* src, size_t n) {\n    return memcpy(malloc(n), src, n);\n}", "void* memdup(const void* src, size_t n) { void*p=malloc(n); return p?memcpy(p,src,n):NULL; }", "#define MEMDUP(s,n) memcpy(malloc(n), s, n)", "void* memdup(const void* src, size_t n) { char a[n]; return memcpy(a, src, n); }"], explanation: "memcpy returns dst, so the malloc result can be passed directly and returned in one line." },
      { code: `int gcd(int a, int b) {\n    while (b) {\n        int t = b;\n        b = a % b;\n        a = t;\n    }\n    return a;\n}`, question: "Shorten using recursion:", answer: "int gcd(int a, int b) { return b ? gcd(b, a%b) : a; }", choices: ["int gcd(int a, int b) { return b ? gcd(b, a%b) : a; }", "int gcd(int a, int b) { return __gcd(a, b); }", "int gcd(int a, int b) { while(b) a^=b^=a^=b; return a%b; }", "#define GCD(a,b) ((b)?GCD(b,(a)%(b)):(a))"], explanation: "Recursive GCD with ternary is a one-liner — the compiler tail-call optimizes it." },
      { code: `int power(int base, int exp) {\n    int result = 1;\n    while (exp > 0) {\n        if (exp & 1) result *= base;\n        base *= base;\n        exp >>= 1;\n    }\n    return result;\n}`, question: "Shorten fast exponentiation:", answer: "int power(int b, int e) {\n    return e ? (e&1 ? b : 1) * power(b*b, e>>1) : 1;\n}", choices: ["int power(int b, int e) {\n    return e ? (e&1 ? b : 1) * power(b*b, e>>1) : 1;\n}", "int power(int b, int e) { return (int)pow(b, e); }", "int power(int b, int e) { return e<2 ? e?b:1 : power(b,e/2)*power(b,(e+1)/2); }", "#define POW(b,e) ((e)?(POW((b)*(b),(e)>>1)*((e)&1?(b):1)):1)"], explanation: "Recursive binary exponentiation in a ternary expression — O(log n) in one return statement." },
      { code: `typedef struct Node {\n    int data;\n    struct Node* next;\n} Node;\n\nNode* create(int data) {\n    Node* n = malloc(sizeof(Node));\n    n->data = data;\n    n->next = NULL;\n    return n;\n}`, question: "Shorten with compound literal:", answer: "Node* create(int data) {\n    Node* n = malloc(sizeof *n);\n    *n = (Node){data, NULL};\n    return n;\n}", choices: ["Node* create(int data) {\n    Node* n = malloc(sizeof *n);\n    *n = (Node){data, NULL};\n    return n;\n}", "Node* create(int d) { return &(Node){d, NULL}; }", "Node* create(int d) { Node n={d,NULL}; return memcpy(malloc(sizeof n),&n,sizeof n); }", "#define CREATE(d) &(Node){d, NULL}"], explanation: "Compound literal (Node){data, NULL} initializes the struct in one assignment after malloc." },
    ],
    hard: [
      { code: `int gcd(int a, int b) {\n    while (b) {\n        int t = b; b = a % b; a = t;\n    }\n    return a;\n}\nint lcm(int a, int b) {\n    return a / gcd(a, b) * b;\n}`, question: "Shorten to one expression:", answer: "#define LCM(a,b) ((a)/__gcd((a),(b))*(b))", choices: ["#define LCM(a,b) ((a)/__gcd((a),(b))*(b))", "int lcm(int a,int b){return a*b/gcd(a,b);}", "int lcm(int a,int b){return a*b/__gcd(a,b);}", "int lcm=a/gcd(a,b)*b;"], explanation: "__gcd from <algorithm> (C++) or manual gcd eliminates the helper; macro makes it a one-liner." },
    ],
  },
};

const languageLabels = { python:"Python", c:"C", cpp:"C++", java:"Java", sql:"SQL", webdev:"Web Dev", dsa:"DSA" };

const levelConfig = {
  easy:   { label: "Easy",   color: "#7C3AED", lives: 3, timeLimit: 35 },
  medium: { label: "Medium", color: "#D97706", lives: 3, timeLimit: 25 },
  hard:   { label: "Hard",   color: "#DC2626", lives: 3, timeLimit: 20 },
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
  const prompt = `Generate exactly 10 "shorten the syntax" coding questions for ${language} at ${level} difficulty.
Each question shows verbose code and asks for the shorter/idiomatic equivalent.
Return ONLY valid JSON array, no markdown, no extra text:
[{"code":"verbose code here","question":"Shorten this...","answer":"short version","choices":["short version","wrong1","wrong2","wrong3"],"explanation":"why this is shorter/better"}]
Rules: answer must always be first in choices array. Make distractors realistic. Code should be 2-8 lines.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  const text = data.content.map(i => i.text || "").join("");
  return JSON.parse(text.replace(/```json\s*/gi, "").replace(/```/g, "").trim());
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

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const ShortenTheSyntax = () => {
  const navigate = useNavigate();
  const { gameId, langId, level } = useParams();
  const { user } = useAuth();

  const lang = languageLabels[langId] ?? langId;
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
  const timerRef   = useRef(null);
  // Track whether updateGameStats has been called to avoid double-calling
  const statsCalledRef = useRef(false);

  const clearTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  // ── Timer tick ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "quiz" || selected !== null || timedOut) return;
    clearTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer();
          setTimedOut(true);
          setShowExp(true);
          setShowHint(false);
          setWrong(w => {
            const newWrong = w + 1;
            setLives(l => {
              const next = l - 1;
              if (next === 0) setTimeout(() => setPhase("gameover"), 1600);
              return next;
            });
            return newWrong;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return clearTimer;
  }, [phase, selected, timedOut, current]);

  useEffect(() => { if (selected !== null) clearTimer(); }, [selected]);
  useEffect(() => () => clearTimer(), []);

  // ── Call updateGameStats when phase changes to result or gameover ─────────
  useEffect(() => {
    if ((phase === "result" || phase === "gameover") && !statsCalledRef.current && user) {
      statsCalledRef.current = true;
      const passed = score >= PASS_SCORE;
      updateGameStats({
        userId:   user.uid,
        gameId,
        language: langId,
        level,
        score,
        total:    TOTAL_Q,
        passed,
      });
    }
  }, [phase, score, user, gameId, langId, level]);

  // ── Load questions ────────────────────────────────────────────────────────
  const loadQuestions = useCallback(async () => {
    setPhase("loading");
    clearTimer();
    statsCalledRef.current = false;

    const bankKey = langId?.toLowerCase();
    const bank    = QUESTION_BANK[bankKey]?.[level];

    const makeSet = (raw) =>
      shuffle(raw && raw.length ? raw : []).slice(0, TOTAL_Q)
        .map(q => ({ ...q, choices: shuffle([...q.choices]) }));

    let raw = bank && bank.length >= TOTAL_Q ? bank : null;
    if (!raw) {
      try { raw = await fetchFromAPI(lang, level); }
      catch { raw = bank ?? []; }
    }

    setQuestions(makeSet(raw));
    setCurrent(0);
    setSelected(null);
    setShowExp(false);
    setTimedOut(false);
    setLives(lvl.lives);
    setScore(0);
    setWrong(0);
    setShowHint(false);
    setAnimKey(k => k + 1);
    setTimeLeft(lvl.timeLimit);
    setPhase("quiz");
  }, [langId, level, lang, lvl.lives, lvl.timeLimit]);

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
    if (choice === q.answer) {
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
    if (next >= TOTAL_Q) {
      setPhase("result");
      return;
    }
    setCurrent(next);
    setSelected(null);
    setShowExp(false);
    setShowHint(false);
    setTimedOut(false);
    setAnimKey(k => k + 1);
    setTimeLeft(lvl.timeLimit);
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
          <button style={btnSecondary} onClick={() => { clearTimer(); navigate(`/games/${gameId}/level/${langId}`); }}>← Back</button>
        </div>
      </div>
    </div>
  );

  // ── RESULT ────────────────────────────────────────────────────────────────
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
            {passed ? `Excellent! You got ${score} out of ${TOTAL_Q} correct.` : `You need ${PASS_SCORE}/10 to pass. Keep practicing!`}
          </p>
          <span style={{ fontSize: "13px", color: "#9C9489", marginBottom: "28px", display: "block" }}>
            Lives remaining: {"❤️".repeat(lives)}{"🖤".repeat(Math.max(0, lvl.lives - lives))}
          </span>
          <div style={btnGroup}>
            {!passed && <button style={btnPrimary(lvl.color)} onClick={restart}>↺ Try Again</button>}
            {passed && nextLevel && <button style={btnPrimary(lvl.color)} onClick={() => navigate(`/games/${gameId}/play/${langId}/${nextLevel}`)}>Next Level →</button>}
            {passed && !nextLevel && <button style={btnPrimary("#7C3AED")} onClick={() => navigate("/games")}>🎯 All Games</button>}
            <button style={btnSecondary} onClick={() => { clearTimer(); navigate(`/games/${gameId}/level/${langId}`); }}>← Change Level</button>
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

        .sts-container {
          flex: 1;
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
          padding: 20px 16px 48px;
          box-sizing: border-box;
        }
        .sts-topbar {
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
        .sts-score-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          background: #FFF;
          border: 1px solid #E8E2DA;
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 18px;
        }
        .sts-score-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 6px;
          gap: 2px;
        }
        .sts-code-pre {
          margin: 0;
          font-size: 13px;
          font-family: 'Fira Code','Cascadia Code','Consolas',monospace;
          color: #E2E8F0;
          overflow-x: auto;
          line-height: 1.75;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .sts-opt-btn {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 12px;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: transform 0.15s, border-color 0.15s, background 0.15s;
          font-family: inherit;
        }
        .sts-opt-btn:hover:not(:disabled) { transform: translateX(4px); }
        .sts-opt-btn:disabled { cursor: default; }
        .sts-opt-text { font-size: 13px; font-weight: 600; line-height: 1.5; flex: 1; font-family: 'Fira Code','Cascadia Code',monospace; }
        .sts-next-btn { transition: opacity 0.15s, transform 0.1s; }
        .sts-next-btn:hover { opacity: 0.88; }
        .sts-next-btn:active { transform: scale(0.97); }
        .sts-exit-btn:hover { background: #EDE8E1 !important; }
        .sts-hint-btn:hover { background: #EDE8E1 !important; }

        @media (max-width: 480px) {
          .sts-topbar { padding: 8px 12px; gap: 8px; }
          .sts-container { padding: 12px 10px 40px; }
          .sts-score-grid { grid-template-columns: 1fr 1fr; }
          .sts-score-cell { padding: 8px 4px; }
          .sts-score-num { font-size: 16px !important; }
          .sts-score-lbl { font-size: 9px !important; }
          .sts-code-pre { font-size: 11px !important; }
          .sts-opt-text { font-size: 11px !important; }
          .sts-meta-row { flex-direction: column; gap: 4px; }
        }
        @media (max-width: 360px) {
          .sts-code-pre { font-size: 10px !important; }
          .sts-opt-text { font-size: 10px !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#F5F0EB", fontFamily: "'Segoe UI','Inter',system-ui,sans-serif", display: "flex", flexDirection: "column" }}>

        {/* TOP BAR */}
        <div className="sts-topbar">
          <button
            className="sts-exit-btn"
            onClick={() => { clearTimer(); navigate(`/games/${gameId}/level/${langId}`); }}
            style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1.5px solid #E0D8CF", background: "#F5F0EB", cursor: "pointer", fontSize: "15px", color: "#6B6560", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
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
        <div className="sts-container">

          {/* Meta row */}
          <div className="sts-meta-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#7c3aed" }}>
              ✂️ Shorten the Syntax • {lang} • {lvl.label}
            </span>
            <span style={{ fontSize: "13px", color: "#9C9489", fontWeight: "600", background: "#EDE8E1", padding: "4px 10px", borderRadius: "999px" }}>
              {current + 1}/{TOTAL_Q}
            </span>
          </div>

          {/* Score band */}
          <div className="sts-score-grid">
            {[
              { num: score,               lbl: "Correct",  color: "#16A34A" },
              { num: wrong,               lbl: "Wrong",    color: "#DC2626" },
              { num: PASS_SCORE,          lbl: "To Pass",  color: "#D97706" },
              { num: `${lvl.timeLimit}s`, lbl: "Per Q",    color: "#6366F1" },
            ].map((s, i, arr) => (
              <div key={s.lbl} className="sts-score-cell" style={{ borderRight: i < arr.length - 1 ? "1px solid #EDE8E1" : "none" }}>
                <span className="sts-score-num" style={{ fontSize: "18px", fontWeight: "700", lineHeight: 1, color: s.color }}>{s.num}</span>
                <span className="sts-score-lbl" style={{ fontSize: "10px", color: "#A09890", fontWeight: "600", letterSpacing: "0.6px", textTransform: "uppercase" }}>{s.lbl}</span>
              </div>
            ))}
          </div>

          {/* Question area */}
          <div key={animKey} className="q-enter">

            {/* Timed-out banner */}
            {timedOut && (
              <div className="exp-enter timed-out-shake" style={{ background: "#FEF3C7", border: "1.5px solid #FCD34D", borderRadius: "12px", padding: "11px 16px", fontSize: "14px", color: "#92400E", marginBottom: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "20px" }}>⏰</span>
                <span>Time's up! Shorter version:&nbsp;
                  <code style={{ background: "#FDE68A", padding: "2px 8px", borderRadius: "6px", fontFamily: "monospace", fontWeight: "800" }}>
                    {q?.answer}
                  </code>
                </span>
              </div>
            )}

            {/* Header row with hint */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#A09890", textTransform: "uppercase" }}>
                Verbose code:
              </span>
              {!answered && (
                <button
                  className="sts-hint-btn"
                  onClick={() => setShowHint(h => !h)}
                  style={{ background: showHint ? "#EDE8E1" : "#F5F0EB", border: "1.5px solid #DDD7CE", borderRadius: "8px", padding: "4px 12px", fontSize: "12px", fontWeight: "600", color: "#6B6560", cursor: "pointer" }}
                >
                  {showHint ? "Hide Hint" : "💡 Hint"}
                </button>
              )}
            </div>

            {/* Hint bubble */}
            {showHint && (
              <div className="exp-enter" style={{ background: "#FFFBEB", border: "1.5px solid #FDE68A", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#92400E", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "16px" }}>💡</span>
                <span>Think about built-in functions or shorthand operators for this language.</span>
              </div>
            )}

            {/* Code block */}
            <div style={{ background: "#1E1B2E", borderRadius: "14px", padding: "16px", marginBottom: "14px", overflow: "auto" }}>
              <div style={{ display: "flex", gap: "6px", marginBottom: "12px", alignItems: "center" }}>
                {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
                  <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                ))}
                <span style={{ marginLeft: "auto", fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
                  {langId === "sql" ? "sql" : langId === "webdev" ? "js/html" : langId}
                </span>
              </div>
              <pre className="sts-code-pre">
                <code>{q?.code}</code>
              </pre>
            </div>

            {/* Question prompt */}
            <p style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "12px" }}>
              ✂️ {q?.question || "Choose the shorter equivalent:"}
            </p>

            {/* Choices */}
            <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "14px" }}>
              {q?.choices?.map((choice, i) => {
                const isAns = choice === q.answer, isSel = choice === selected;
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
                    className="sts-opt-btn"
                    disabled={answered}
                    onClick={() => handleAnswer(choice)}
                    style={{ background: bg, border: `1.5px solid ${border}` }}
                  >
                    <span style={{ width: "28px", height: "28px", borderRadius: "50%", border: `1.5px solid ${letBorder}`, background: letBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: letClr, flexShrink: 0, fontFamily: "monospace", marginTop: "1px" }}>
                      {LETTERS[i]}
                    </span>
                    <pre className="sts-opt-text" style={{ color: txtClr, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                      {choice}
                    </pre>
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
                <button
                  className="sts-next-btn"
                  onClick={handleNext}
                  style={{ background: lvl.color, color: "#FFF", border: "none", borderRadius: "12px", padding: "12px 24px", fontSize: "15px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 14px rgba(0,0,0,0.2)" }}
                >
                  {current + 1 >= TOTAL_Q ? "See Result" : "Next →"}
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default ShortenTheSyntax;



