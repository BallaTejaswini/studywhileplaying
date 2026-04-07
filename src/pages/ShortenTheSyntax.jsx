import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useCallback, useRef } from "react";

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
      { code: `with open('in.txt') as f:\n    data = f.read()\nwith open('out.txt', 'w') as f:\n    f.write(data)`, question: "Shorten by combining context managers:", answer: "with open('in.txt') as fin, open('out.txt','w') as fout:\n    fout.write(fin.read())", choices: ["with open('in.txt') as fin, open('out.txt','w') as fout:\n    fout.write(fin.read())", "with open('in.txt'), open('out.txt','w') as fin, fout:\n    fout.write(fin.read())", "with (open('in.txt'), open('out.txt','w')):\n    pass", "open('out.txt','w').write(open('in.txt').read())"], explanation: "Multiple context managers can be combined in one 'with' statement using commas." },
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
    ],
    hard: [
      { code: `template<typename T>\nstruct TypeName {\n    static std::string get() { return typeid(T).name(); }\n};`, question: "Shorten using if constexpr (C++17):", answer: "template<typename T>\nstd::string typeName() {\n    if constexpr(std::is_same_v<T,int>) return \"int\";\n    else return typeid(T).name();\n}", choices: ["template<typename T>\nstd::string typeName() {\n    if constexpr(std::is_same_v<T,int>) return \"int\";\n    else return typeid(T).name();\n}", "template<typename T> auto typeName() = typeid(T).name();", "using TypeName = decltype(typeid(T).name());", "constexpr auto TypeName = typeid(T).name();"], explanation: "if constexpr evaluates branches at compile time — cleaner than full template specialization." },
      { code: `std::vector<int> result;\nfor (int x : input) {\n    result.push_back(x * 2);\n}`, question: "Shorten using ranges (C++20):", answer: "auto result = input | std::views::transform([](int x){ return x*2; }) | std::ranges::to<std::vector>();", choices: ["auto result = input | std::views::transform([](int x){ return x*2; }) | std::ranges::to<std::vector>();", "auto result = std::ranges::map(input, [](int x){ return x*2; });", "std::ranges::transform(input, result, [](int x){ return x*2; });", "auto result = input.transform([](int x){ return x*2; });"], explanation: "C++20 ranges with pipe syntax compose transformations lazily without temporaries." },
      { code: `void log(const std::string& msg) {\n    std::cout << "[LOG] " << msg << "\\n";\n}\nvoid log(const char* msg) {\n    log(std::string(msg));\n}`, question: "Shorten with string_view:", answer: "void log(std::string_view msg) { std::cout << \"[LOG] \" << msg << \"\\n\"; }", choices: ["void log(std::string_view msg) { std::cout << \"[LOG] \" << msg << \"\\n\"; }", "template<typename T> void log(T msg) { std::cout << \"[LOG] \" << msg << \"\\n\"; }", "void log(auto msg) { std::cout << \"[LOG] \" << msg << \"\\n\"; }", "void log(const auto& msg) { std::cout << \"[LOG] \" << msg << \"\\n\"; }"], explanation: "std::string_view accepts both const char* and std::string without copying — one overload needed." },
      { code: `class Builder {\n    int x_ = 0, y_ = 0;\npublic:\n    Builder& setX(int x) { x_ = x; return *this; }\n    Builder& setY(int y) { y_ = y; return *this; }\n};`, question: "Shorten construction using designated initializers (C++20):", answer: "struct Config { int x = 0, y = 0; };\nConfig c{.x=1, .y=2};", choices: ["struct Config { int x = 0, y = 0; };\nConfig c{.x=1, .y=2};", "auto c = Builder().setX(1).setY(2).build();", "Config c = Config::make(x=1, y=2);", "Config c = {x:1, y:2};"], explanation: "C++20 designated initializers let you name fields in aggregate initialization — no builder needed." },
      { code: `std::mutex mtx;\nbool ready = false;\nstd::condition_variable cv;\n{\n    std::lock_guard<std::mutex> lk(mtx);\n    ready = true;\n}\ncv.notify_one();`, question: "Shorten using scoped_lock (C++17):", answer: "{ std::scoped_lock lk(mtx); ready = true; } cv.notify_one();", choices: ["{ std::scoped_lock lk(mtx); ready = true; } cv.notify_one();", "{ std::lock_guard lk(mtx); ready = true; } cv.notify_one();", "mtx.lock(); ready = true; mtx.unlock(); cv.notify_one();", "std::atomic<bool> ready = true; cv.notify_one();"], explanation: "std::scoped_lock (C++17) uses CTAD to deduce the mutex type — more concise than lock_guard<std::mutex>." },
    ],
  },
  sql: {
    easy: [
      { code: `SELECT * FROM users WHERE age >= 18 AND age <= 65;`, question: "Shorten the range condition:", answer: "SELECT * FROM users WHERE age BETWEEN 18 AND 65;", choices: ["SELECT * FROM users WHERE age BETWEEN 18 AND 65;", "SELECT * FROM users WHERE age IN (18..65);", "SELECT * FROM users WHERE age RANGE(18, 65);", "SELECT * FROM users WHERE 18 <= age <= 65;"], explanation: "BETWEEN low AND high replaces two comparison conditions." },
      { code: `SELECT * FROM users\nWHERE name = 'Alice'\nOR name = 'Bob'\nOR name = 'Charlie';`, question: "Shorten multiple OR conditions:", answer: "SELECT * FROM users WHERE name IN ('Alice', 'Bob', 'Charlie');", choices: ["SELECT * FROM users WHERE name IN ('Alice', 'Bob', 'Charlie');", "SELECT * FROM users WHERE name ANY ('Alice', 'Bob', 'Charlie');", "SELECT * FROM users WHERE name CONTAINS ('Alice', 'Bob', 'Charlie');", "SELECT * FROM users WHERE name AMONG ('Alice', 'Bob', 'Charlie');"], explanation: "IN (value_list) replaces multiple OR conditions on the same column." },
      { code: `SELECT name FROM users\nWHERE name LIKE 'A%'\nOR name LIKE 'B%'\nOR name LIKE 'C%';`, question: "Shorten LIKE alternatives:", answer: "SELECT name FROM users WHERE name SIMILAR TO '[ABC]%';", choices: ["SELECT name FROM users WHERE name SIMILAR TO '[ABC]%';", "SELECT name FROM users WHERE name REGEXP '^[ABC]';", "SELECT name FROM users WHERE LEFT(name,1) IN ('A','B','C');", "SELECT name FROM users WHERE name IN LIKE ('A%','B%','C%');"], explanation: "SIMILAR TO supports regex-like patterns to replace multiple LIKE conditions." },
      { code: `SELECT COUNT(*) FROM (\n    SELECT DISTINCT user_id FROM orders\n) subq;`, question: "Shorten the count distinct:", answer: "SELECT COUNT(DISTINCT user_id) FROM orders;", choices: ["SELECT COUNT(DISTINCT user_id) FROM orders;", "SELECT DISTINCT COUNT(user_id) FROM orders;", "SELECT COUNT(user_id) UNIQUE FROM orders;", "SELECT UNIQUE_COUNT(user_id) FROM orders;"], explanation: "COUNT(DISTINCT col) counts unique values directly without a subquery." },
      { code: `SELECT CASE\n    WHEN score IS NULL THEN 0\n    ELSE score\nEND FROM results;`, question: "Shorten the null replacement:", answer: "SELECT COALESCE(score, 0) FROM results;", choices: ["SELECT COALESCE(score, 0) FROM results;", "SELECT ISNULL(score, 0) FROM results;", "SELECT NVL(score, 0) FROM results;", "SELECT IFNULL(score, 0) FROM results;"], explanation: "COALESCE(col, default) returns the first non-NULL value — far shorter than CASE WHEN." },
      { code: `SELECT *\nFROM orders\nORDER BY created_at DESC\nLIMIT 1;`, question: "What is the standard SQL equivalent of LIMIT?", answer: "SELECT * FROM orders ORDER BY created_at DESC FETCH FIRST 1 ROW ONLY;", choices: ["SELECT * FROM orders ORDER BY created_at DESC FETCH FIRST 1 ROW ONLY;", "SELECT TOP 1 * FROM orders ORDER BY created_at DESC;", "SELECT FIRST * FROM orders ORDER BY created_at DESC;", "SELECT * FROM orders WHERE ROWNUM=1 ORDER BY created_at DESC;"], explanation: "FETCH FIRST n ROWS ONLY is standard SQL; TOP is SQL Server syntax; LIMIT is MySQL/PostgreSQL." },
      { code: `SELECT name,\n    CASE WHEN salary > 100000 THEN 'High'\n         WHEN salary > 50000 THEN 'Mid'\n         ELSE 'Low' END AS band\nFROM employees;`, question: "What shortens this in SQL Server/Access?", answer: "SELECT name, IIF(salary>100000,'High',IIF(salary>50000,'Mid','Low')) AS band FROM employees;", choices: ["SELECT name, IIF(salary>100000,'High',IIF(salary>50000,'Mid','Low')) AS band FROM employees;", "SELECT name, CASE salary WHEN salary > 100000 THEN 'High' ELSE 'Low' END AS band FROM employees;", "SELECT name, salary > 100000 ? 'High' : 'Low' AS band FROM employees;", "SELECT name, band(salary) FROM employees;"], explanation: "IIF() is shorter in databases that support it (SQL Server, Access)." },
      { code: `SELECT u.name, COUNT(o.id) as order_count\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id, u.name\nHAVING COUNT(o.id) > 0;`, question: "Shorten HAVING condition:", answer: "SELECT u.name, COUNT(o.id) FROM users u JOIN orders o ON u.id=o.user_id GROUP BY u.id, u.name;", choices: ["SELECT u.name, COUNT(o.id) FROM users u JOIN orders o ON u.id=o.user_id GROUP BY u.id, u.name;", "SELECT u.name, COUNT(o.id) FROM users u LEFT JOIN orders o ON u.id=o.user_id GROUP BY u.id;", "SELECT u.name, COUNT(o.id) FROM users u, orders o WHERE u.id=o.user_id GROUP BY u.name;", "SELECT u.name, order_count FROM users u HAVING order_count > 0;"], explanation: "LEFT JOIN + HAVING COUNT > 0 is equivalent to INNER JOIN — simpler and more performant." },
      { code: `SELECT * FROM products\nWHERE category_id = (\n    SELECT id FROM categories WHERE name = 'Electronics'\n);`, question: "Shorten with JOIN:", answer: "SELECT p.* FROM products p JOIN categories c ON p.category_id=c.id WHERE c.name='Electronics';", choices: ["SELECT p.* FROM products p JOIN categories c ON p.category_id=c.id WHERE c.name='Electronics';", "SELECT * FROM products WHERE category_id IN (SELECT id FROM categories WHERE name='Electronics');", "SELECT * FROM products p, categories c WHERE p.category_id=c.id AND c.name='Electronics';", "SELECT * FROM products NATURAL JOIN categories WHERE name='Electronics';"], explanation: "A JOIN is often cleaner and more extensible than a correlated subquery for simple lookups." },
      { code: `SELECT MAX(salary) FROM employees\nWHERE salary < (\n    SELECT MAX(salary) FROM employees\n);`, question: "What is this query finding and what's a shorter alternative?", answer: "SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;", choices: ["SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;", "SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);", "SELECT NTH_VALUE(salary,2) OVER(ORDER BY salary DESC) FROM employees LIMIT 1;", "SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1,1;"], explanation: "ORDER BY salary DESC LIMIT 1 OFFSET 1 is a cleaner way to get the second highest." },
    ],
    medium: [
      { code: `SELECT e.name,\n       (SELECT AVG(salary) FROM employees WHERE dept=e.dept) as dept_avg\nFROM employees e;`, question: "Shorten the correlated subquery:", answer: "SELECT e.name, AVG(e.salary) OVER (PARTITION BY e.dept) as dept_avg FROM employees e;", choices: ["SELECT e.name, AVG(e.salary) OVER (PARTITION BY e.dept) as dept_avg FROM employees e;", "SELECT e.name, e.dept_avg FROM employees e JOIN (SELECT dept, AVG(salary) as dept_avg FROM employees GROUP BY dept) d ON e.dept=d.dept;", "SELECT e.name, d.avg_salary FROM employees e, (SELECT dept, AVG(salary) avg_salary FROM employees GROUP BY dept) d WHERE e.dept=d.dept;", "SELECT e.name, AVG(salary) GROUPBY dept FROM employees e;"], explanation: "Window functions (OVER PARTITION BY) eliminate correlated subqueries for per-group aggregates." },
      { code: `SELECT * FROM (\n    SELECT *, ROW_NUMBER() OVER(PARTITION BY dept ORDER BY salary DESC) rn\n    FROM employees\n) t WHERE rn = 1;`, question: "Find the shorter PostgreSQL alternative:", answer: "SELECT DISTINCT ON (dept) * FROM employees ORDER BY dept, salary DESC;", choices: ["SELECT DISTINCT ON (dept) * FROM employees ORDER BY dept, salary DESC;", "SELECT FIRST(salary) OVER(PARTITION BY dept ORDER BY salary DESC) FROM employees;", "SELECT * FROM employees GROUP BY dept HAVING MAX(salary);", "SELECT TOP 1 * FROM employees GROUP BY dept ORDER BY salary DESC;"], explanation: "PostgreSQL's DISTINCT ON selects the first row per group — much shorter than ROW_NUMBER subquery." },
      { code: `UPDATE employees\nSET salary = CASE\n    WHEN dept = 'Eng' THEN salary * 1.1\n    WHEN dept = 'Sales' THEN salary * 1.05\n    ELSE salary\nEND;`, question: "What pattern does this single UPDATE replace?", answer: "-- Replaces multiple separate UPDATE statements per dept", choices: ["-- Replaces multiple separate UPDATE statements per dept", "UPDATE employees SET salary *= CASE dept WHEN 'Eng' THEN 1.1 WHEN 'Sales' THEN 1.05 ELSE 1 END;", "UPDATE employees SET salary = salary * dept_multiplier FROM dept_rates;", "MERGE employees USING dept_rates ON dept WHEN MATCHED THEN UPDATE SET salary=salary*rate;"], explanation: "A single CASE-based UPDATE is more efficient than multiple UPDATE statements scanning the table repeatedly." },
      { code: `SELECT u.name, o.total\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE o.total = (\n    SELECT MAX(total) FROM orders WHERE user_id = u.id\n);`, question: "Shorten with window function:", answer: "SELECT name, total FROM (\n    SELECT u.name, o.total, RANK() OVER(PARTITION BY u.id ORDER BY o.total DESC) rn\n    FROM users u JOIN orders o ON u.id=o.user_id\n) t WHERE rn=1;", choices: ["SELECT name, total FROM (\n    SELECT u.name, o.total, RANK() OVER(PARTITION BY u.id ORDER BY o.total DESC) rn\n    FROM users u JOIN orders o ON u.id=o.user_id\n) t WHERE rn=1;", "SELECT u.name, MAX(o.total) FROM users u JOIN orders o ON u.id=o.user_id GROUP BY u.id, u.name;", "SELECT u.name, o.total FROM users u JOIN orders o ON u.id=o.user_id ORDER BY o.total DESC LIMIT 1;", "SELECT u.name, FIRST(o.total ORDER BY o.total DESC) FROM users u JOIN orders o ON u.id=o.user_id GROUP BY u.id;"], explanation: "RANK() OVER(PARTITION BY) replaces the correlated subquery with MAX(), avoiding repeated scans." },
      { code: `SELECT * FROM t1\nWHERE id NOT IN (\n    SELECT id FROM t2\n);`, question: "Shorten using anti-join:", answer: "SELECT t1.* FROM t1 LEFT JOIN t2 ON t1.id=t2.id WHERE t2.id IS NULL;", choices: ["SELECT t1.* FROM t1 LEFT JOIN t2 ON t1.id=t2.id WHERE t2.id IS NULL;", "SELECT * FROM t1 EXCEPT SELECT * FROM t2;", "SELECT * FROM t1 WHERE id NOT EXISTS (SELECT 1 FROM t2 WHERE t2.id=t1.id);", "SELECT * FROM t1 MINUS SELECT * FROM t2;"], explanation: "LEFT JOIN ... WHERE right.id IS NULL (anti-join) is often more performant than NOT IN and handles NULLs safely." },
    ],
    hard: [
      { code: `WITH RECURSIVE cte AS (\n    SELECT id, parent_id, name, 0 as level\n    FROM categories WHERE parent_id IS NULL\n    UNION ALL\n    SELECT c.id, c.parent_id, c.name, cte.level+1\n    FROM categories c JOIN cte ON c.parent_id=cte.id\n)\nSELECT * FROM cte;`, question: "Shorten hierarchy traversal (Oracle):", answer: "SELECT * FROM categories START WITH parent_id IS NULL CONNECT BY PRIOR id = parent_id;", choices: ["SELECT * FROM categories START WITH parent_id IS NULL CONNECT BY PRIOR id = parent_id;", "SELECT * FROM categories WHERE parent_id IS NULL EXPAND CHILDREN ON id=parent_id;", "SELECT HIERARCHY(*) FROM categories GROUP BY parent_id;", "SELECT * FROM categories TREE JOIN ON id=parent_id;"], explanation: "Oracle's CONNECT BY or PostgreSQL's ltree extension handle hierarchy traversal without verbose recursive CTEs." },
      { code: `SELECT dept, SUM(salary) as total,\n    SUM(SUM(salary)) OVER() as grand_total,\n    SUM(salary) / SUM(SUM(salary)) OVER() * 100 as pct\nFROM employees GROUP BY dept;`, question: "Shorten the percentage expression:", answer: "SELECT dept, SUM(salary) as total,\n    ROUND(100.0 * SUM(salary) / SUM(SUM(salary)) OVER(), 2) as pct\nFROM employees GROUP BY dept;", choices: ["SELECT dept, SUM(salary) as total,\n    ROUND(100.0 * SUM(salary) / SUM(SUM(salary)) OVER(), 2) as pct\nFROM employees GROUP BY dept;", "SELECT dept, SUM(salary), PERCENT_RANK() OVER(ORDER BY SUM(salary)) FROM employees GROUP BY dept;", "SELECT dept, SUM(salary), RATIO_TO_REPORT(SUM(salary)) OVER() * 100 FROM employees GROUP BY dept;", "SELECT dept, SUM(salary) / (SELECT SUM(salary) FROM employees) * 100 FROM employees GROUP BY dept;"], explanation: "RATIO_TO_REPORT (Oracle) or reformulating SUM(SUM()) OVER() with ROUND cleans up the percentage expression." },
      { code: `INSERT INTO audit_log (user_id, action, ts)\nSELECT user_id, 'update', NOW() FROM updates_staging;\nDELETE FROM updates_staging;`, question: "Shorten with DELETE RETURNING (PostgreSQL):", answer: "WITH deleted AS (DELETE FROM updates_staging RETURNING user_id)\nINSERT INTO audit_log(user_id,action,ts) SELECT user_id,'update',NOW() FROM deleted;", choices: ["WITH deleted AS (DELETE FROM updates_staging RETURNING user_id)\nINSERT INTO audit_log(user_id,action,ts) SELECT user_id,'update',NOW() FROM deleted;", "MOVE FROM updates_staging INTO audit_log (user_id, 'update', NOW());", "TRANSFER updates_staging TO audit_log ON user_id;", "INSERT INTO audit_log SELECT user_id,'update',NOW() FROM updates_staging ON DELETE CASCADE;"], explanation: "DELETE RETURNING in a CTE lets you insert and delete in one atomic statement (PostgreSQL)." },
      { code: `SELECT *\nFROM events\nWHERE ts BETWEEN '2024-01-01' AND '2024-12-31'\nAND category_id IN (1, 2, 3)\nAND status = 'active'\nORDER BY ts DESC\nLIMIT 50;`, question: "What's the key performance optimization here?", answer: "CREATE INDEX idx_events ON events(status, category_id, ts DESC);", choices: ["CREATE INDEX idx_events ON events(status, category_id, ts DESC);", "SELECT * FROM events WHERE ts >= '2024-01-01' AND category_id <= 3 AND status='active' LIMIT 50;", "SELECT * FROM events_2024 WHERE category_id IN (1,2,3) AND status='active' LIMIT 50;", "CREATE MATERIALIZED VIEW mv_active_events AS SELECT * FROM events WHERE status='active';"], explanation: "A composite index on (status, category_id, ts DESC) lets the DB skip the full table scan — the real 'shortening' is in execution time." },
      { code: `SELECT u.id,\n    (SELECT COUNT(*) FROM orders WHERE user_id=u.id) as orders,\n    (SELECT SUM(total) FROM orders WHERE user_id=u.id) as revenue,\n    (SELECT MAX(created_at) FROM orders WHERE user_id=u.id) as last_order\nFROM users u;`, question: "Shorten three correlated subqueries:", answer: "SELECT u.id, COUNT(o.id) as orders, SUM(o.total) as revenue, MAX(o.created_at) as last_order\nFROM users u LEFT JOIN orders o ON u.id=o.user_id GROUP BY u.id;", choices: ["SELECT u.id, COUNT(o.id) as orders, SUM(o.total) as revenue, MAX(o.created_at) as last_order\nFROM users u LEFT JOIN orders o ON u.id=o.user_id GROUP BY u.id;", "SELECT u.id, o.orders, o.revenue, o.last_order FROM users u JOIN (SELECT user_id, COUNT(*) orders, SUM(total) revenue, MAX(created_at) last_order FROM orders GROUP BY user_id) o ON u.id=o.user_id;", "SELECT u.id, AGGREGATE(orders WHERE user_id=u.id) FROM users u;", "SELECT u.id, orders.count, orders.sum, orders.max FROM users u LATERAL JOIN orders ON user_id=u.id;"], explanation: "A single LEFT JOIN with GROUP BY replaces three correlated subqueries — scans orders once instead of three times." },
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
    ],
    hard: [
      { code: `const memoize = (fn) => {\n    const cache = new Map();\n    return function(...args) {\n        const key = JSON.stringify(args);\n        if (cache.has(key)) return cache.get(key);\n        const result = fn.apply(this, args);\n        cache.set(key, result);\n        return result;\n    };\n};`, question: "Shorten using nullish assignment:", answer: "const memoize = fn => {\n    const cache = {};\n    return (...args) => (cache[args] ??= fn(...args));\n};", choices: ["const memoize = fn => {\n    const cache = {};\n    return (...args) => (cache[args] ??= fn(...args));\n};", "const memoize = fn => (...args) => fn(...args);", "const memoize = (fn, cache=new Map()) => (...args) => cache.get(args) || cache.set(args, fn(...args)).get(args);", "const memoize = fn => _.memoize(fn);"], explanation: "??= (nullish assignment) assigns only if undefined/null — one-line cache check and fill." },
      { code: `const pipe = (...fns) => {\n    return function(x) {\n        let result = x;\n        for (const fn of fns) {\n            result = fn(result);\n        }\n        return result;\n    };\n};`, question: "Shorten pipe using reduce:", answer: "const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);", choices: ["const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);", "const pipe = (...fns) => fns.compose();", "const pipe = fns => x => fns.map(f => f(x)).pop();", "const pipe = (...fns) => x => fns.forEach(f => f(x));"], explanation: "reduce over a function array threads a value through each function — function composition in one line." },
      { code: `function deepClone(obj) {\n    if (obj === null || typeof obj !== 'object') return obj;\n    const clone = Array.isArray(obj) ? [] : {};\n    for (const key in obj) {\n        if (obj.hasOwnProperty(key)) {\n            clone[key] = deepClone(obj[key]);\n        }\n    }\n    return clone;\n}`, question: "Shorten using modern API:", answer: "const deepClone = obj => structuredClone(obj);", choices: ["const deepClone = obj => structuredClone(obj);", "const deepClone = obj => JSON.parse(JSON.stringify(obj));", "const deepClone = obj => { ...obj };", "const deepClone = obj => Object.assign({}, obj);"], explanation: "structuredClone() (Node 17+, modern browsers) performs a deep clone natively." },
      { code: `async function fetchAll(urls) {\n    const results = [];\n    for (const url of urls) {\n        const res = await fetch(url);\n        results.push(await res.json());\n    }\n    return results;\n}`, question: "Shorten for parallel fetching:", answer: "const fetchAll = urls => Promise.all(urls.map(u => fetch(u).then(r => r.json())));", choices: ["const fetchAll = urls => Promise.all(urls.map(u => fetch(u).then(r => r.json())));", "const fetchAll = async urls => await urls.map(u => fetch(u));", "const fetchAll = urls => urls.forEach(u => fetch(u).then(r=>r.json()));", "const fetchAll = urls => Promise.race(urls.map(u => fetch(u).then(r=>r.json())));"], explanation: "Promise.all() fetches all URLs in parallel instead of sequential await, and is far shorter." },
      { code: `class EventEmitter {\n    constructor() { this.listeners = {}; }\n    on(event, cb) {\n        if (!this.listeners[event]) this.listeners[event] = [];\n        this.listeners[event].push(cb);\n    }\n    emit(event, ...args) {\n        (this.listeners[event] || []).forEach(cb => cb(...args));\n    }\n}`, question: "Shorten on() using ||=:", answer: "on(event, cb) { (this.listeners[event] ||= []).push(cb); }", choices: ["on(event, cb) { (this.listeners[event] ||= []).push(cb); }", "on(event, cb) { this.listeners[event] = [...(this.listeners[event]||[]), cb]; }", "on(event, cb) { this.listeners[event]?.push(cb) ?? (this.listeners[event]=[cb]); }", "on(event, cb) { this.listeners[event] = this.listeners[event] || []; this.listeners[event].push(cb); }"], explanation: "||= (logical OR assignment) initializes only if falsy — replaces the if-not-exists pattern." },
    ],
  },
  dsa: {
    easy: [
      { code: `def is_palindrome(s):\n    rev = ''\n    for ch in s:\n        rev = ch + rev\n    return s == rev`, question: "Shorten using slicing:", answer: "def is_palindrome(s): return s == s[::-1]", choices: ["def is_palindrome(s): return s == s[::-1]", "def is_palindrome(s): return s == reversed(s)", "def is_palindrome(s): return s.reverse() == s", "def is_palindrome(s): return all(s[i]==s[~i] for i in range(len(s)//2))"], explanation: "s[::-1] reverses a string in one expression — no loop needed." },
      { code: `def find_max(arr):\n    m = arr[0]\n    for x in arr[1:]:\n        if x > m:\n            m = x\n    return m`, question: "Shorten using built-in:", answer: "def find_max(arr): return max(arr)", choices: ["def find_max(arr): return max(arr)", "def find_max(arr): return arr.max()", "def find_max(arr): return sorted(arr)[-1]", "def find_max(arr): return max(*arr)"], explanation: "Python's max() built-in finds the maximum in one call." },
      { code: `count = {}\nfor x in arr:\n    if x not in count:\n        count[x] = 0\n    count[x] += 1`, question: "Shorten using Counter:", answer: "from collections import Counter\ncount = Counter(arr)", choices: ["from collections import Counter\ncount = Counter(arr)", "count = dict.count(arr)", "count = {x: arr.count(x) for x in arr}", "from collections import defaultdict\ncount = defaultdict(int, arr)"], explanation: "Counter(iterable) builds a frequency map in one line." },
      { code: `def two_sum_exists(nums, target):\n    for i in range(len(nums)):\n        for j in range(i+1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return True\n    return False`, question: "Shorten to O(n) using set:", answer: "def two_sum_exists(nums, target):\n    seen = set()\n    return any((target-x) in seen or seen.add(x) for x in nums)", choices: ["def two_sum_exists(nums, target):\n    seen = set()\n    return any((target-x) in seen or seen.add(x) for x in nums)", "def two_sum_exists(nums, t): return any(t-x in nums for x in nums)", "def two_sum_exists(nums, t): return t in {a+b for a in nums for b in nums}", "def two_sum_exists(nums, t): return len(set(nums)) != len(nums)"], explanation: "Using a set for O(1) lookup converts O(n^2) to O(n)." },
      { code: `def flatten(nested):\n    result = []\n    for lst in nested:\n        for x in lst:\n            result.append(x)\n    return result`, question: "Shorten using list comprehension:", answer: "def flatten(nested): return [x for lst in nested for x in lst]", choices: ["def flatten(nested): return [x for lst in nested for x in lst]", "def flatten(nested): return sum(nested, [])", "def flatten(nested): return list(chain.from_iterable(nested))", "def flatten(nested): return nested.flatten()"], explanation: "A nested list comprehension flattens in one expression. sum(nested, []) also works." },
      { code: `def has_duplicate(arr):\n    seen = []\n    for x in arr:\n        if x in seen:\n            return True\n        seen.append(x)\n    return False`, question: "Shorten using set length comparison:", answer: "def has_duplicate(arr): return len(arr) != len(set(arr))", choices: ["def has_duplicate(arr): return len(arr) != len(set(arr))", "def has_duplicate(arr): return bool(any(x in seen or seen.add(x) for x in arr))", "def has_duplicate(arr): return arr != list(set(arr))", "def has_duplicate(arr): return sorted(arr) != arr"], explanation: "If a set (unique elements) is smaller than the list, there must be duplicates." },
      { code: `def binary_search(arr, target):\n    lo, hi = 0, len(arr)-1\n    while lo <= hi:\n        mid = (lo+hi)//2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: lo = mid+1\n        else: hi = mid-1\n    return -1`, question: "Shorten using bisect:", answer: "import bisect\ndef binary_search(arr, t):\n    i = bisect.bisect_left(arr, t)\n    return i if i < len(arr) and arr[i] == t else -1", choices: ["import bisect\ndef binary_search(arr, t):\n    i = bisect.bisect_left(arr, t)\n    return i if i < len(arr) and arr[i] == t else -1", "def binary_search(arr, t): return arr.index(t)", "def binary_search(arr, t): return t in arr and arr.index(t)", "import bisect\ndef binary_search(arr, t): return bisect.bisect(arr, t)"], explanation: "bisect.bisect_left() finds the insertion point in O(log n) — no manual lo/hi loop needed." },
      { code: `graph = {}\nfor u, v in edges:\n    if u not in graph: graph[u] = []\n    if v not in graph: graph[v] = []\n    graph[u].append(v)\n    graph[v].append(u)`, question: "Shorten using defaultdict:", answer: "from collections import defaultdict\ngraph = defaultdict(list)\nfor u, v in edges:\n    graph[u].append(v)\n    graph[v].append(u)", choices: ["from collections import defaultdict\ngraph = defaultdict(list)\nfor u, v in edges:\n    graph[u].append(v)\n    graph[v].append(u)", "graph = {u:[v] for u,v in edges}", "graph = dict.fromkeys(edges, [])", "graph = {u: list(v) for u, v in edges}"], explanation: "defaultdict(list) eliminates the if-not-in boilerplate." },
      { code: `arr.sort()\narr = arr[::-1]`, question: "Shorten the reverse sort:", answer: "arr.sort(reverse=True)", choices: ["arr.sort(reverse=True)", "arr = sorted(arr, reverse=True)", "arr.sort(); arr.reverse()", "arr = arr[::-1].sort()"], explanation: "sort(reverse=True) sorts descending in-place in one call." },
      { code: `n = len(arr)\nfor i in range(n):\n    for j in range(0, n-i-1):\n        if arr[j] > arr[j+1]:\n            arr[j], arr[j+1] = arr[j+1], arr[j]`, question: "Shorten bubble sort:", answer: "arr.sort()  # Built-in Timsort is O(n log n) vs O(n^2)", choices: ["arr.sort()  # Built-in Timsort is O(n log n) vs O(n^2)", "arr = sorted(arr)", "arr.bubble_sort()", "arr[:] = sorted(arr)"], explanation: "Python's built-in sort (Timsort) is faster and needs no implementation." },
    ],
    medium: [
      { code: `def dfs(graph, node, visited=None):\n    if visited is None:\n        visited = set()\n    visited.add(node)\n    for nb in graph[node]:\n        if nb not in visited:\n            dfs(graph, nb, visited)\n    return visited`, question: "Shorten using set union:", answer: "dfs = lambda g, n, v=set(): v.add(n) or [dfs(g, nb, v) for nb in g[n] if nb not in v] or v", choices: ["dfs = lambda g, n, v=set(): v.add(n) or [dfs(g, nb, v) for nb in g[n] if nb not in v] or v", "def dfs(g, n): return {n} | set.union(*[dfs(g,nb) for nb in g[n]])", "def dfs(g, n, v=set()): return v | {dfs(g,nb,v) for nb in g[n] if nb not in v.add(n) or v}", "def dfs(graph, node, v=frozenset()): return v | {node}"], explanation: "The mutable default set pattern is idiomatic; lambda form makes it concise." },
      { code: `def lru_cache_fn(fn, maxsize=128):\n    cache = {}\n    keys = []\n    def wrapper(*args):\n        if args in cache:\n            keys.remove(args)\n            keys.append(args)\n            return cache[args]\n        result = fn(*args)\n        cache[args] = result\n        keys.append(args)\n        if len(keys) > maxsize:\n            del cache[keys.pop(0)]\n        return result\n    return wrapper`, question: "Shorten using functools:", answer: "from functools import lru_cache\n@lru_cache(maxsize=128)\ndef fn(*args): ...", choices: ["from functools import lru_cache\n@lru_cache(maxsize=128)\ndef fn(*args): ...", "from functools import cache\n@cache\ndef fn(*args): ...", "def fn(*args): return fn.cache.get(args) or fn.cache.update({args: compute(args)})", "@memoize(128)\ndef fn(*args): ..."], explanation: "@functools.lru_cache replaces all manual LRU cache implementation." },
      { code: `def merge_sorted(l1, l2):\n    result = []\n    i = j = 0\n    while i < len(l1) and j < len(l2):\n        if l1[i] <= l2[j]: result.append(l1[i]); i+=1\n        else: result.append(l2[j]); j+=1\n    result.extend(l1[i:])\n    result.extend(l2[j:])\n    return result`, question: "Shorten using heapq.merge:", answer: "import heapq\ndef merge_sorted(l1, l2): return list(heapq.merge(l1, l2))", choices: ["import heapq\ndef merge_sorted(l1, l2): return list(heapq.merge(l1, l2))", "def merge_sorted(l1, l2): return sorted(l1 + l2)", "def merge_sorted(l1, l2): return list(merge(l1, l2))", "def merge_sorted(l1, l2): return (l1 + l2).sort()"], explanation: "heapq.merge() lazily merges sorted iterables — O(n log k) and no manual i/j needed." },
      { code: `def inorder(root):\n    result = []\n    if root:\n        result += inorder(root.left)\n        result.append(root.val)\n        result += inorder(root.right)\n    return result`, question: "Shorten using generator:", answer: "def inorder(root):\n    if root:\n        yield from inorder(root.left)\n        yield root.val\n        yield from inorder(root.right)", choices: ["def inorder(root):\n    if root:\n        yield from inorder(root.left)\n        yield root.val\n        yield from inorder(root.right)", "def inorder(root): return [*inorder(root.left), root.val, *inorder(root.right)] if root else []", "inorder = lambda r: inorder(r.left)+[r.val]+inorder(r.right) if r else []", "def inorder(root): return root and inorder(root.left)+[root.val]+inorder(root.right) or []"], explanation: "yield from delegates to sub-generators, eliminating list concatenation entirely." },
      { code: `class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n    def push(self, val):\n        self.stack.append(val)\n        if not self.min_stack or val <= self.min_stack[-1]:\n            self.min_stack.append(val)\n    def pop(self):\n        val = self.stack.pop()\n        if val == self.min_stack[-1]:\n            self.min_stack.pop()\n        return val\n    def getMin(self):\n        return self.min_stack[-1]`, question: "Shorten push condition:", answer: "def push(self, val):\n    self.stack.append(val)\n    self.min_stack.append(min(val, self.min_stack[-1] if self.min_stack else val))", choices: ["def push(self, val):\n    self.stack.append(val)\n    self.min_stack.append(min(val, self.min_stack[-1] if self.min_stack else val))", "def push(self, val):\n    self.stack.append(val)\n    self.min_stack.append(min(self.min_stack+[val]))", "def push(self, val):\n    self.stack.append(val)\n    self.min_stack.append(val if val <= (self.min_stack or [val])[-1] else self.min_stack[-1])", "def push(self, val):\n    self.stack.append(val)\n    heapq.heappush(self.min_stack, val)"], explanation: "min(val, current_min) is cleaner than the if/else guard — always push to min_stack." },
    ],
    hard: [
      { code: `def dijkstra(graph, start):\n    dist = {node: float('inf') for node in graph}\n    dist[start] = 0\n    visited = set()\n    while True:\n        u = min((d,n) for n,d in dist.items() if n not in visited)[1]\n        if dist[u] == float('inf'): break\n        visited.add(u)\n        for v, w in graph[u]:\n            if dist[u]+w < dist[v]:\n                dist[v] = dist[u]+w\n    return dist`, question: "Shorten with a heap:", answer: "import heapq\ndef dijkstra(graph, start):\n    dist = {n: float('inf') for n in graph}\n    dist[start] = 0\n    heap = [(0, start)]\n    while heap:\n        d, u = heapq.heappop(heap)\n        if d > dist[u]: continue\n        for v, w in graph[u]:\n            if d+w < dist[v]:\n                dist[v] = d+w\n                heapq.heappush(heap, (dist[v], v))\n    return dist", choices: ["import heapq\ndef dijkstra(graph, start):\n    dist = {n: float('inf') for n in graph}\n    dist[start] = 0\n    heap = [(0, start)]\n    while heap:\n        d, u = heapq.heappop(heap)\n        if d > dist[u]: continue\n        for v, w in graph[u]:\n            if d+w < dist[v]:\n                dist[v] = d+w\n                heapq.heappush(heap, (dist[v], v))\n    return dist", "def dijkstra(g, s): return nx.single_source_dijkstra(g, s)[0]", "def dijkstra(g, s): return {n: min(w for _,n,w in g.edges) for n in g}", "import heapq\ndef dijkstra(g, s): return dict(heapq.nsmallest(len(g), g.items()))"], explanation: "A heap reduces the inner min() from O(V) to O(log V) — O(V^2) to O((V+E) log V)." },
      { code: `def knapsack(weights, values, capacity):\n    n = len(weights)\n    dp = [[0]*(capacity+1) for _ in range(n+1)]\n    for i in range(1, n+1):\n        for w in range(capacity+1):\n            dp[i][w] = dp[i-1][w]\n            if weights[i-1] <= w:\n                dp[i][w] = max(dp[i][w], values[i-1]+dp[i-1][w-weights[i-1]])\n    return dp[n][capacity]`, question: "Shorten to O(W) space:", answer: "def knapsack(weights, values, capacity):\n    dp = [0]*(capacity+1)\n    for w, v in zip(weights, values):\n        for c in range(capacity, w-1, -1):\n            dp[c] = max(dp[c], v + dp[c-w])\n    return dp[capacity]", choices: ["def knapsack(weights, values, capacity):\n    dp = [0]*(capacity+1)\n    for w, v in zip(weights, values):\n        for c in range(capacity, w-1, -1):\n            dp[c] = max(dp[c], v + dp[c-w])\n    return dp[capacity]", "def knapsack(w, v, c): return max(sum(v[i] for i in S) for S in powerset(range(len(w))) if sum(w[i] for i in S)<=c)", "def knapsack(w, v, c): return np.max(np.dot(v, w<=c))", "def knapsack(w, v, c): return functools.reduce(lambda d,i: d, zip(w,v), [0]*(c+1))[-1]"], explanation: "Rolling 1D DP reduces space from O(n*W) to O(W) by updating in reverse order." },
      { code: `def build_lps(pattern):\n    m = len(pattern)\n    lps = [0]*m\n    length = 0\n    i = 1\n    while i < m:\n        if pattern[i] == pattern[length]:\n            length += 1\n            lps[i] = length\n            i += 1\n        else:\n            if length != 0:\n                length = lps[length-1]\n            else:\n                lps[i] = 0\n                i += 1\n    return lps`, question: "Shorten KMP to use re module:", answer: "import re\ndef kmp_search(text, pattern): return [m.start() for m in re.finditer(pattern, text)]", choices: ["import re\ndef kmp_search(text, pattern): return [m.start() for m in re.finditer(pattern, text)]", "def kmp_search(text, pattern): return text.find(pattern)", "def kmp_search(text, p): return [i for i in range(len(text)) if text[i:i+len(p)]==p]", "from fnmatch import fnmatch\ndef kmp_search(text, p): return fnmatch(text, p)"], explanation: "re.finditer() implements an efficient string search internally — no manual KMP needed." },
      { code: `class SegTree:\n    def __init__(self, n):\n        self.n = n\n        self.tree = [0]*(4*n)\n    def update(self, node, start, end, idx, val):\n        if start == end:\n            self.tree[node] = val\n        else:\n            mid = (start+end)//2\n            if idx<=mid: self.update(2*node,start,mid,idx,val)\n            else: self.update(2*node+1,mid+1,end,idx,val)\n            self.tree[node]=self.tree[2*node]+self.tree[2*node+1]`, question: "Shorten range sum queries using Fenwick tree:", answer: "class BIT:\n    def __init__(self, n): self.t = [0]*(n+1)\n    def update(self, i, v):\n        while i<len(self.t): self.t[i]+=v; i+=i&-i\n    def query(self, i):\n        s=0\n        while i>0: s+=self.t[i]; i-=i&-i\n        return s", choices: ["class BIT:\n    def __init__(self, n): self.t = [0]*(n+1)\n    def update(self, i, v):\n        while i<len(self.t): self.t[i]+=v; i+=i&-i\n    def query(self, i):\n        s=0\n        while i>0: s+=self.t[i]; i-=i&-i\n        return s", "from sortedcontainers import SortedList\nbit = SortedList()", "class SegTree: tree = [0]*4; update=query=lambda *a: sum(a)", "import numpy as np\ndef query(arr, l, r): return np.cumsum(arr)[r] - (np.cumsum(arr)[l-1] if l>0 else 0)"], explanation: "A Fenwick Tree (BIT) has simpler code than a Segment Tree for prefix sum queries." },
      { code: `def tarjan(graph):\n    n = len(graph)\n    disc = [-1]*n; low = [-1]*n\n    on_stack = [False]*n; stack = []\n    timer = [0]; sccs = []\n    def dfs(u):\n        disc[u] = low[u] = timer[0]; timer[0]+=1\n        stack.append(u); on_stack[u]=True\n        for v in graph[u]:\n            if disc[v]==-1: dfs(v); low[u]=min(low[u],low[v])\n            elif on_stack[v]: low[u]=min(low[u],disc[v])\n        if low[u]==disc[u]:\n            scc=[]\n            while True:\n                v=stack.pop(); on_stack[v]=False; scc.append(v)\n                if v==u: break\n            sccs.append(scc)\n    for i in range(n):\n        if disc[i]==-1: dfs(i)\n    return sccs`, question: "Shorten using networkx:", answer: "import networkx as nx\ndef tarjan(graph):\n    G = nx.DiGraph(graph)\n    return list(nx.strongly_connected_components(G))", choices: ["import networkx as nx\ndef tarjan(graph):\n    G = nx.DiGraph(graph)\n    return list(nx.strongly_connected_components(G))", "def tarjan(g): return [list(c) for c in __import__('networkx').kosaraju(g)]", "def tarjan(g): return [scc for scc in dfs_all(g)]", "from itertools import groupby\ndef tarjan(g): return list(groupby(sorted(g.keys())))"], explanation: "NetworkX's strongly_connected_components replaces 40 lines of Tarjan's algorithm." },
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
    ],
    hard: [
      { code: `typedef struct Node {\n    int data;\n    struct Node* next;\n} Node;\n\nNode* create(int data) {\n    Node* n = malloc(sizeof(Node));\n    n->data = data;\n    n->next = NULL;\n    return n;\n}`, question: "Shorten with compound literal:", answer: "Node* create(int data) {\n    Node* n = malloc(sizeof *n);\n    *n = (Node){data, NULL};\n    return n;\n}", choices: ["Node* create(int data) {\n    Node* n = malloc(sizeof *n);\n    *n = (Node){data, NULL};\n    return n;\n}", "Node* create(int d) { return &(Node){d, NULL}; }", "Node* create(int d) { Node n={d,NULL}; return memcpy(malloc(sizeof n),&n,sizeof n); }", "#define CREATE(d) &(Node){d, NULL}"], explanation: "Compound literal (Node){data, NULL} initializes the struct in one assignment after malloc." },
      { code: `unsigned int reverse_bits(unsigned int n) {\n    unsigned int result = 0;\n    for (int i=0; i<32; i++) {\n        result = (result<<1) | (n&1);\n        n>>=1;\n    }\n    return result;\n}`, question: "Shorten using parallel bit tricks:", answer: "uint32_t rev_bits(uint32_t n) {\n    n=((n>>1)&0x55555555)|((n&0x55555555)<<1);\n    n=((n>>2)&0x33333333)|((n&0x33333333)<<2);\n    n=((n>>4)&0x0F0F0F0F)|((n&0x0F0F0F0F)<<4);\n    n=((n>>8)&0x00FF00FF)|((n&0x00FF00FF)<<8);\n    return (n>>16)|(n<<16);\n}", choices: ["uint32_t rev_bits(uint32_t n) {\n    n=((n>>1)&0x55555555)|((n&0x55555555)<<1);\n    n=((n>>2)&0x33333333)|((n&0x33333333)<<2);\n    n=((n>>4)&0x0F0F0F0F)|((n&0x0F0F0F0F)<<4);\n    n=((n>>8)&0x00FF00FF)|((n&0x00FF00FF)<<8);\n    return (n>>16)|(n<<16);\n}", "return __builtin_bitreverse32(n);", "return (uint32_t)__builtin_bswap32(n);", "uint32_t r=0; for(int i=32;i--;r|=((n>>i)&1)<<(31-i)); return r;"], explanation: "Parallel bit reversal using bitmask pairs is O(log 32) = 5 operations instead of 32." },
      { code: `void* memdup(const void* src, size_t n) {\n    void* dst = malloc(n);\n    if (dst) memcpy(dst, src, n);\n    return dst;\n}`, question: "Shorten using return value of memcpy:", answer: "void* memdup(const void* src, size_t n) {\n    return memcpy(malloc(n), src, n);\n}", choices: ["void* memdup(const void* src, size_t n) {\n    return memcpy(malloc(n), src, n);\n}", "void* memdup(const void* src, size_t n) { void*p=malloc(n); return p?memcpy(p,src,n):NULL; }", "#define MEMDUP(s,n) memcpy(malloc(n), s, n)", "void* memdup(const void* src, size_t n) { char a[n]; return memcpy(a, src, n); }"], explanation: "memcpy returns dst, so the malloc result can be passed directly and returned in one line." },
      { code: `int gcd(int a, int b) {\n    while (b) {\n        int t = b;\n        b = a % b;\n        a = t;\n    }\n    return a;\n}`, question: "Shorten using recursion:", answer: "int gcd(int a, int b) { return b ? gcd(b, a%b) : a; }", choices: ["int gcd(int a, int b) { return b ? gcd(b, a%b) : a; }", "int gcd(int a, int b) { return __gcd(a, b); }", "int gcd(int a, int b) { while(b) a^=b^=a^=b; return a%b; }", "#define GCD(a,b) ((b)?GCD(b,(a)%(b)):(a))"], explanation: "Recursive GCD with ternary is a one-liner — the compiler tail-call optimizes it." },
      { code: `int power(int base, int exp) {\n    int result = 1;\n    while (exp > 0) {\n        if (exp & 1) result *= base;\n        base *= base;\n        exp >>= 1;\n    }\n    return result;\n}`, question: "Shorten fast exponentiation:", answer: "int power(int b, int e) {\n    return e ? (e&1 ? b : 1) * power(b*b, e>>1) : 1;\n}", choices: ["int power(int b, int e) {\n    return e ? (e&1 ? b : 1) * power(b*b, e>>1) : 1;\n}", "int power(int b, int e) { return (int)pow(b, e); }", "int power(int b, int e) { return e<2 ? e?b:1 : power(b,e/2)*power(b,(e+1)/2); }", "#define POW(b,e) ((e)?(POW((b)*(b),(e)>>1)*((e)&1?(b):1)):1)"], explanation: "Recursive binary exponentiation in a ternary expression — O(log n) in one return statement." },
    ],
  },
};

const languageLabels = { python:"Python", c:"C", cpp:"C++", java:"Java", sql:"SQL", webdev:"Web Dev", dsa:"DSA" };

const levelConfig = {
  easy:   { label:"EASY",   color:"#22c55e", lives:3, timePerQ:35 },
  medium: { label:"MEDIUM", color:"#f59e0b", lives:3, timePerQ:25 },
  hard:   { label:"HARD",   color:"#ef4444", lives:3, timePerQ:20 },
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
  const prompt = `Generate exactly 10 "shorten the syntax" coding questions for ${language} at ${level} difficulty.
Each question shows verbose code and asks for the shorter/idiomatic equivalent.
Return ONLY valid JSON array, no markdown:
[{"code":"verbose code here","question":"Shorten this...","answer":"short version","choices":["short version","wrong1","wrong2","wrong3"],"explanation":"why this is shorter/better"}]`;
  const res  = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:2000, messages:[{role:"user",content:prompt}] }) });
  const data = await res.json();
  const text = data.content.map(i=>i.text||"").join("");
  return JSON.parse(text.replace(/```json|```/g,"").trim());
}

const ShortenTheSyntax = () => {
  const navigate  = useNavigate();
  const { gameId, langId, level } = useParams();
  const { user }  = useAuth();

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
  const [showHint,  setShowHint]  = useState(false);

  const [timeLeft, setTimeLeft] = useState(lvl.timePerQ);
  const timerRef  = useRef(null);

  const clearTimer = () => { if (timerRef.current) clearInterval(timerRef.current); };

  const startTimer = useCallback(() => {
    clearTimer();
    setTimeLeft(lvl.timePerQ);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t<=1){ clearInterval(timerRef.current); return 0; } return t-1; });
    }, 1000);
  }, [lvl.timePerQ]);

  useEffect(() => {
    if (timeLeft===0 && phase==="quiz" && selected===null) handleTimeout();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleTimeout = useCallback(() => {
    clearTimer();
    setSelected("__TIMEOUT__");
    setShowExp(true);
    setWrong(w=>w+1);
    setLives(l => {
      const nl = l - 1;
      if (nl === 0) setTimeout(()=>setPhase("gameover"), 1800);
      return nl;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadQuestions = useCallback(async () => {
    setPhase("loading");
    clearTimer();
    const bankKey = langId?.toLowerCase();
    const bank    = QUESTION_BANK[bankKey]?.[level];

    if (bank && bank.length >= TOTAL_Q) {
      setQuestions(shuffle(bank).slice(0,TOTAL_Q).map(q => ({ ...q, choices: shuffle(q.choices) })));
    } else {
      try {
        const qs = await fetchFromAPI(lang, level);
        setQuestions(qs.slice(0,TOTAL_Q).map(q => ({ ...q, choices: shuffle(q.choices) })));
      } catch {
        setQuestions(shuffle(bank??[]).slice(0,TOTAL_Q).map(q => ({ ...q, choices: shuffle(q.choices) })));
      }
    }
    setCurrent(0); setSelected(null); setShowExp(false);
    setLives(lvl.lives); setScore(0); setWrong(0);
    setShowHint(false); setAnimKey(k=>k+1);
    setPhase("quiz");
  }, [langId, level, lang, lvl.lives]);

  useEffect(() => {
    if (phase==="quiz") startTimer();
    return () => clearTimer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => { loadQuestions(); }, [loadQuestions]);

  const q         = questions[current];
  const progress  = questions.length ? (current/TOTAL_Q)*100 : 0;
  const isCorrect = selected!==null && selected!=="__TIMEOUT__" && selected===q?.answer;
  const timerPct  = timeLeft/lvl.timePerQ;
  const timerColor = timerPct>0.5 ? "#22c55e" : timerPct>0.25 ? "#f59e0b" : "#ef4444";

  const handleAnswer = (choice) => {
    if (selected!==null || !q) return;
    clearTimer();
    setSelected(choice);
    setShowExp(true);
    setShowHint(false);
    if (choice===q.answer) {
      setScore(s=>s+1);
    } else {
      setWrong(w=>w+1);
      setLives(l => {
        const nl = l - 1;
        if (nl === 0) setTimeout(()=>setPhase("gameover"),1600);
        return nl;
      });
    }
  };

  const handleNext = () => {
    const next = current+1;
    if (next>=TOTAL_Q) { setPhase("result"); return; }
    setCurrent(next); setSelected(null); setShowExp(false); setShowHint(false); setAnimKey(k=>k+1);
    startTimer();
  };

  const restart = () => loadQuestions();

  // ── Shared end screens ──
  const EndPage = ({children}) => (
    <div style={{ minHeight:"100vh", background:"#f5f0eb", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px 16px", fontFamily:"'Segoe UI',system-ui,sans-serif" }}>
      <div style={{ background:"#fff", border:"1px solid #e8e2da", borderRadius:20, padding:"40px 28px", textAlign:"center", width:"100%", maxWidth:420 }}>{children}</div>
    </div>
  );
  const ScoreCircle = ({color}) => (
    <div style={{ width:96, height:96, borderRadius:"50%", border:`4px solid ${color}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", background:"#fafaf8" }}>
      <span style={{ fontSize:32, fontWeight:800, color, lineHeight:1 }}>{score}</span>
      <span style={{ fontSize:12, color:"#a09890", fontWeight:600 }}>/ {TOTAL_Q}</span>
    </div>
  );
  const BtnRow = ({children}) => <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>{children}</div>;
  const PBtn   = ({color,onClick,children}) => <button onClick={onClick} style={{ background:color, color:"#fff", border:"none", borderRadius:12, padding:"13px 24px", fontSize:15, fontWeight:700, cursor:"pointer", flex:"1 1 auto", minWidth:120 }}>{children}</button>;
  const SBtn   = ({onClick,children}) => <button onClick={onClick} style={{ background:"#f5f0eb", color:"#4a4540", border:"1.5px solid #ddd7ce", borderRadius:12, padding:"13px 20px", fontSize:14, fontWeight:600, cursor:"pointer", flex:"1 1 auto", minWidth:120 }}>{children}</button>;

  if (phase==="loading") return (
    <div style={{ minHeight:"100vh", background:"#f5f0eb", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI',sans-serif" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width:44, height:44, borderRadius:"50%", border:"4px solid #ede8e1", borderTopColor:lvl.color, animation:"spin 0.85s linear infinite", marginBottom:16 }} />
      <p style={{ color:lvl.color, fontWeight:700, fontSize:15 }}>Loading {lvl.label} questions…</p>
    </div>
  );

  if (phase==="gameover") return (
    <EndPage>
      <div style={{ fontSize:52, marginBottom:16 }}>💔</div>
      <h2 style={{ fontSize:24, fontWeight:800, color:"#dc2626", marginBottom:8 }}>Out of Lives!</h2>
      <ScoreCircle color="#dc2626" />
      <p style={{ fontSize:14, color:"#7a7268", lineHeight:1.6, marginBottom:24 }}>
        You scored <strong>{score}/{TOTAL_Q}</strong>. You need at least {PASS_SCORE} to pass.
      </p>
      <BtnRow>
        <PBtn color={lvl.color} onClick={restart}>↺ Restart</PBtn>
        <SBtn onClick={()=>{clearTimer();navigate(`/games/${gameId}/level/${langId}`);}}>← Change Level</SBtn>
      </BtnRow>
    </EndPage>
  );

  if (phase==="result") {
    const passed = score>=PASS_SCORE;
    const color  = passed ? lvl.color : "#dc2626";
    const next   = level==="easy"?"medium":level==="medium"?"hard":null;
    return (
      <EndPage>
        <div style={{ fontSize:52, marginBottom:16 }}>{passed?"🏆":"😔"}</div>
        <h2 style={{ fontSize:24, fontWeight:800, color, marginBottom:8 }}>{passed?"Level Complete!":"Not Quite!"}</h2>
        <ScoreCircle color={color} />
        <p style={{ fontSize:14, color:"#7a7268", lineHeight:1.6, marginBottom:8 }}>
          {passed?`Great job! You got ${score}/${TOTAL_Q} correct.`:`Need at least ${PASS_SCORE}/10 to pass.`}
        </p>
        <span style={{ fontSize:13, color:"#9c9489", display:"block", marginBottom:24 }}>
          Lives left: {"❤️".repeat(lives)}{"🖤".repeat(Math.max(0,lvl.lives-lives))}
        </span>
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
        .q-enter   { animation:slideQ  0.3s cubic-bezier(.22,.68,0,1.2) both; }
        .exp-enter { animation:fadeExp 0.22s ease both; }
        .timer-urgent { animation:pulse 0.6s ease infinite; }
        .opt-btn { transition:transform 0.12s,border-color 0.12s,background 0.12s; cursor:pointer; border:none; text-align:left; font-family:inherit; }
        .opt-btn:hover:not(:disabled) { transform:translateX(4px); }
        .opt-btn:disabled { cursor:default; }
        .exit-btn:hover { background:#ede8e1 !important; }
        .next-btn:hover { opacity:0.88; }
        .next-btn:active { transform:scale(0.97); }
        .hint-btn:hover { background:#ede8e1 !important; }
        .quiz-root { min-height:100vh; background:#f5f0eb; font-family:'Segoe UI',system-ui,sans-serif; display:flex; flex-direction:column; }
        .quiz-wrap { flex:1; width:100%; max-width:700px; margin:0 auto; padding:18px 16px 48px; box-sizing:border-box; }
        .code-pre  { font-size:13px; line-height:1.75; }
        @media(max-width:540px){ .quiz-wrap{padding:12px 10px 40px;} .code-pre{font-size:11px;} .opt-text{font-size:12px !important;} }
        @media(max-width:380px){ .code-pre{font-size:10px;} }
      `}</style>

      <div className="quiz-root">

        {/* TOP BAR */}
        <div style={{ background:"#fff", borderBottom:"1px solid #e8e2da", padding:"10px 16px", display:"flex", alignItems:"center", gap:10, position:"sticky", top:0, zIndex:10 }}>
          <button className="exit-btn" onClick={()=>{clearTimer();navigate(`/games/${gameId}/level/${langId}`);}}
            style={{ width:32, height:32, borderRadius:"50%", border:"1.5px solid #e0d8cf", background:"#f5f0eb", cursor:"pointer", fontSize:14, color:"#6b6560", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>✕</button>

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
                strokeLinecap="round" transform="rotate(-90 9 9)"
                style={{ transition:"stroke-dashoffset 1s linear, stroke 0.3s" }} />
            </svg>
            <span style={{ fontSize:13, fontWeight:800, color:timerColor, fontVariantNumeric:"tabular-nums", minWidth:18 }}>{timeLeft}s</span>
          </div>

          {/* Lives */}
          <div style={{ display:"flex", gap:2, flexShrink:0 }}>
            {Array.from({length:lvl.lives}).map((_,i)=>(
              <span key={i} style={{ fontSize:16, opacity:i<lives?1:0.22 }}>❤️</span>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="quiz-wrap">

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <span style={{ fontSize:13, fontWeight:600, color:"#7c3aed" }}>✂️ {lang} · {lvl.label}</span>
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

            {/* Header row */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:1, color:"#a09890", textTransform:"uppercase" }}>Verbose code:</span>
              {selected===null && (
                <button className="hint-btn" onClick={()=>setShowHint(h=>!h)}
                  style={{ background:showHint?"#ede8e1":"#f5f0eb", border:"1.5px solid #ddd7ce", borderRadius:8, padding:"4px 12px", fontSize:12, fontWeight:600, color:"#6b6560", cursor:"pointer" }}>
                  {showHint?"Hide Hint":"💡 Hint"}
                </button>
              )}
            </div>

            {/* Hint bubble */}
            {showHint && (
              <div className="exp-enter" style={{ background:"#fffbeb", border:"1.5px solid #fde68a", borderRadius:10, padding:"10px 14px", fontSize:13, color:"#92400e", marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:16 }}>💡</span>
                <span>Think about built-in functions or shorthand operators for this language.</span>
              </div>
            )}

            {/* Timeout banner */}
            {selected==="__TIMEOUT__" && (
              <div className="exp-enter" style={{ background:"#fef2f2", border:"1.5px solid #fecaca", borderRadius:10, padding:"10px 14px", fontSize:13, color:"#991b1b", marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:16 }}>⏰</span>
                <span><strong>Time&apos;s up!</strong> Shorter version: <code style={{ background:"#dcfce7", color:"#166534", padding:"1px 6px", borderRadius:4, fontFamily:"monospace" }}>{q?.answer}</code></span>
              </div>
            )}

            {/* Verbose code block */}
            <div style={{ background:"#1e1b2e", borderRadius:14, padding:16, marginBottom:12, overflow:"auto" }}>
              <div style={{ display:"flex", gap:6, marginBottom:12, alignItems:"center" }}>
                {["#ff5f57","#febc2e","#28c840"].map((c,i)=>(
                  <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c }} />
                ))}
                <span style={{ marginLeft:"auto", fontSize:11, color:"rgba(255,255,255,0.3)", fontFamily:"monospace" }}>
                  verbose · {langId==="sql"?"sql":langId==="webdev"?"js/html":langId}
                </span>
              </div>
              <pre className="code-pre" style={{ margin:0, fontFamily:"'Fira Code','Cascadia Code','Consolas',monospace", color:"#e2e8f0", overflowX:"auto", whiteSpace:"pre-wrap", wordBreak:"break-word" }}>
                <code>{q?.code}</code>
              </pre>
            </div>

            {/* Question prompt */}
            <p style={{ fontSize:14, fontWeight:600, color:"#374151", marginBottom:12 }}>
              ✂️ {q?.question || "Choose the shorter equivalent:"}
            </p>

            {/* Choices */}
            <div style={{ display:"flex", flexDirection:"column", gap:9, marginBottom:12 }}>
              {q?.choices?.map((choice,i)=>{
                const isAns = choice===q.answer, isSel = choice===selected;
                let bg="#fff", border="#e8e2da", txtClr="#1c1814", letBg="#f5f0eb", letClr="#6b6560";
                if (selected!==null) {
                  if (isAns)      { bg="#f0fdf4"; border="#86efac"; txtClr="#166534"; letBg="#dcfce7"; letClr="#15803d"; }
                  else if (isSel) { bg="#fef2f2"; border="#fecaca"; txtClr="#991b1b"; letBg="#fee2e2"; letClr="#b91c1c"; }
                  else            { bg="#fafaf8"; border="#ede8e1"; txtClr="#c0b8b0"; letClr="#c0b8b0"; }
                }
                return (
                  <button key={i} className="opt-btn" disabled={selected!==null} onClick={()=>handleAnswer(choice)}
                    style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"11px 14px", background:bg, border:`1.5px solid ${border}`, borderRadius:12, width:"100%" }}>
                    <span style={{ width:28, height:28, borderRadius:"50%", border:`1.5px solid ${border}`, background:letBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:letClr, flexShrink:0, marginTop:1 }}>
                      {LETTERS[i]}
                    </span>
                    <pre className="opt-text" style={{ flex:1, fontSize:13, fontWeight:600, color:txtClr, fontFamily:"'Fira Code','Cascadia Code',monospace", lineHeight:1.5, margin:0, whiteSpace:"pre-wrap", wordBreak:"break-all" }}>
                      {choice}
                    </pre>
                    {selected!==null && isAns && <span style={{ fontSize:16, flexShrink:0 }}>✅</span>}
                    {selected!==null && isSel && !isAns && <span style={{ fontSize:16, flexShrink:0 }}>❌</span>}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExp && q?.explanation && selected!=="__TIMEOUT__" && (
              <div className="exp-enter" style={{ background:isCorrect?"#f0fdf4":"#fef2f2", border:`1.5px solid ${isCorrect?"#86efac":"#fecaca"}`, borderRadius:12, padding:"13px 15px", fontSize:14, color:isCorrect?"#166534":"#991b1b", lineHeight:1.6, marginBottom:12 }}>
                <span style={{ fontWeight:700, display:"block", marginBottom:4, fontSize:13, color:isCorrect?"#15803d":"#b91c1c" }}>
                  {isCorrect?"✅ Correct!":"❌ Incorrect!"}
                  {!isCorrect && (
                    <span style={{ color:"#15803d", marginLeft:8 }}>
                      Answer: <code style={{ background:"#dcfce7", padding:"1px 6px", borderRadius:4, fontFamily:"monospace" }}>{q.answer}</code>
                    </span>
                  )}
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

export default ShortenTheSyntax;