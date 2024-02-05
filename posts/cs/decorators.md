---
title: "Python Decorators"
date: "2022-10-16"
image: logo.jpeg
desc: SQLite class built as context manager to ensure connection to database is closed.
keywords: Python3.
isFeatured: false
github:
---

# Python Decorators

## Introduction {#introduction}

Decorator is a nested function that receives another function as an argument by using the @ symbol. Decorators can be utilized to print, debug, time and run checks on values as shown in this page.

---

## Background {#background}

In Python, functions can be nested:
```python
def welcome_msg():
	def inner():
		return "Welcome"
	return inner
```
It could also get a function (and its parameters) as arguments:
```python
def welcome_msg(func):
	def inner(*args, **kwargs):

		# Print function name
		print(f"Welcome from {func.__name__}")

		# Execute function
		return func(*args, **kwargs)
	return inner
```
It can be used as follows:
```python
@welcome_msg
def hello_world():
	print("Hello World")

hello_world()
```
In this case the output is:
```output
Welcome from hello_world
Hello World
```
The decorator (@welcome_msg) was executed first receiving `hello_world` as an argument. This decorator only prints a welcome message: `Welcome from {func.__name__}` where `func.__name__` is the name of the decorated function, so it is `hello_world`. Then, the function is executed and one can see that `Hello World` was printed. This functionality will be used in the next examples to show debugging, timing and running validation checks.

---

## Timing

One can utilize decorators to print the time before and after function execution as can be seen below:
```python
from datetime import datetime
DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S'

def timeit(func):
	def inner(*args, **kwargs):

		# Print 'DATE HOUR:MINUTE:SECOND' before execution
		print(f"Started Execution: {datetime.now().strftime(DATETIME_FORMAT)}")

		# Execute function
		var = func(*args, **kwargs)

		# Print `DATE HOUR:MINUTE:SECOND' after execution
		print(f"Finished Execution: {datetime.now().strftime(DATETIME_FORMAT)}")

		return var
	return inner
```

For example, a program that count to `num` (with 1 second delay between each count).
```python
import time

@timeit
def counter(num, delay = 1):
	for i in range(num):
		print(i+1)
		time.sleep(delay)

counter(5)
```
Output:
```output
Started Execution: 2024-02-04 11:12:17
1
2
3
4
5
Finished Execution: 2024-02-04 11:12:22
```

One can calculate execution time instead of printing time before and after execution. Consider the following `timeit2` decorator:
```python
def timeit2(func):
	def inner(*args, **kwargs):
		start = datetime.now()
		# Execute function
		var = func(*args, **kwargs)

		end = datetime.now()

		# Calculate execution time
		duration = end-start

		args_str = ','.join([str(i) for i in args])
		print(f"{func.__name__}({args_str}) Execution Time: {str(duration).split('.')[0]}")

		return var
	return inner

@timeit2
def counter(num, delay = 1):
	for i in range(num):
		print(i+1)
		time.sleep(delay)

counter(10)
```
Output:
```output
1
2
3
4
5
6
7
8
9
10
counter(10) Execution Time: 0:00:10
```

---

## Debugging

Decorators can be used to print the values of arguments passed to a function and the returned value:
```python
import inspect

def debug(func):
	def inner(*args, **kwargs):

		# Print function's signature for reference.
		# Parameters with default values are not accessible
		# via either *args or kwargs, so this line is meant for those
		# parameters to ensure they are taken into account in debugging.
		print(f'Signature: {func.__name__}{inspect.signature(func)}')

		# Convert *args and **kwargs into strings
		arguments = ",".join([str(i) for i in args])
		keyworded_args = ",".join([key + "=" + str(value) for key,value in kwargs.items()])

		# Print Execution signature.
		print(f'Execution: {func.__name__}({arguments}{"," + keyworded_args if keyworded_args else ""})')

		# Execute function
		var = func(*args, **kwargs)

		# Print results
		print(f'Returned Value: {str(var)}')
		
		return var

	return inner

@debug
def summation(upper, lower = 1):
	return sum([i for i in range(lower, upper + 1)])

summation(3)
```
Summation was implemented and was debugged using the `@debug` decorator which prints the function's signature, values of arguments at the time of execution, and the returned value:
```output
Signature: summation(upper, lower=1)
Execution: summation(3)
Returned Value: 6
```

---

## Validation Checks

Ensures that all arguments are valid (type, range, etc.) and prevents execution of the decorated function by raising an error. It can enhance debugging since the source of the error is known given error messages are clear. I have been using this technique for database client to ensure that the program is connected to database.
```python
def validate(func):
	def inner(*args):
		invalid_arg = None
		for arg in args:
			if not isinstance(arg, int):
				raise TypeError("Both Upper and Lower bounds of summation must be integers!")
	return inner

@validate
def summation(upper, lower = 1):
	return sum([i for i in range(lower, upper + 1)])

summation(3.5)
```
output:
```output
TypeError: Both Upper and Lower bounds of summation must be integers!
```

---

## Example - SQLiteClient

Validation checks were used in [Context Manager](/Projects/CS/context-manager) page where I created two decorators: `is_conn` (line 141 in Final Code section) to check connection, and `check_args` (line 152 in Final Code section) to validate arguments.
They can be merged into one decorator, but I wanted to keep the separate for convenience.

