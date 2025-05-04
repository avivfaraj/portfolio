---
title: "Context Manager"
date: "2022-10-16"
image: logo.jpeg
desc: SQLite class built as context manager to ensure connection to database is closed.
keywords: Python3.
isFeatured: true
gitlab: https://gitlab.com/avivfaraj/pytest-mocking-examples/-/blob/main/mocking/src/sql.py?ref_type=heads
---

# Context Manager in Python

## Introduction {#introduction}

External resources are often used in programming, and in those cases the programmer must ensure that the descriptor to those resources was closed. If not closed properly, it could run in the background (waste CPU/memory) and cause the program and/or computer to be slow.
In this project a SQLite client was built as a context manager to ensure resource is closed when program terminates, even in the case of an error being raised.

## Background {#background}

One can open a file using `file = open(file_path, 'r')`, run some analysis and then close the file `file.close()`. This way works, but could be wasteful if an error is raised. If it is just a small file, it might not waste much memory/CPU, but for other tools, such as selenium driver, it could be bad.

Best practice is to utilize with clause:
```python
with open(file_path, 'r') as file:
	#run some code
```
This is the context manager functionality which ensures that the connection is closed when program is terminated, including cases when an error is raised. There are different ways to create a context manager that works in with clause, one of them is shown below.

## Class Methods {#methods}

There are two methods that transform a class into context manager: `__enter__` and `__exit__`. The return value from `__enter__` is assigned to the target in the `with` statement, and `__exit__` method is invoked in the end (that's where connection is closed).

First, lets define a new class called `SQLiteClient`:
```python
'''SQLite client'''
import sqlite3
from typing import Tuple, Any, List, Optional
import re


class SQLiteClient():
	def __new__(cls,
				db_name: str = "",
				timeout:int = 10):
		"""
		Ensure parameters are valid prior to memory allocation.

		Parameters
		----------
		db_name: str.
			Name of SQLite database. Can also be a path to database
			if it is in another directory.

		timeout: int.
			Number of seconds before raising OperationalError.
		"""
		if not db_name:
			raise ValueError("Database Name is Missing!")

		if not isinstance(db_name, str):
			raise TypeError("Database name must be a string!")

		if not isinstance(timeout, int):
			raise TypeError("Timeout must be an integer!")

		if  timeout < 0 :
			raise ValueError("Timeout must be greater than 0")

		return super().__new__(cls)

	def __init__(self, db_name: str = "",  timeout: int = 10):
		"""
		This method is executed after memory allocation
		(after execution of __new__ method, and given all
		parameters are valid), and initialize attributes.

		Parameters
		----------
		db_name: str.
			Name of SQLite database. Can also be a path to database
			if it is in another directory.

		timeout: int.
			Number of seconds before raising OperationalError.
		"""
		# Ensure .db file extension exists.
		self.name = db_name
		if db_name[-3:] != ".db":
			self.name += ".db"
		self.timeout = timeout
		self.__conn = None
```
Note that the `__new__` method was utilized in order to check wether arguments are valid. If invalid, then an error is raised and memory will not be allocated. Otherwise, memory is allocated for the new object and `__init__` method is invoked to initialize attributes.

At this point an object can be created by simply running `SQLiteClient(arguments)`. Adding the code below transform the client to a context manager:
```python
	def __enter__(self):
		"""
		Provides context manager functionality which
		is triggered by 'with' clause and creates connection to database.
		For example:
		`with SQLiteClient(name, 10) as client:
			#code.....
		`
		"""
		self.__conn = sqlite3.connect(self.name,
									timeout=self.timeout)

		return self

	def __exit__(self, exc_type, exc_val, exc_tb):
		"""
		Part of the context manager functionality.
		This method ensures that connection to
		database is always closed at the end of execution,
		even if an error is raised.
		"""
		self.__conn.close()
		self.__conn = None
```
Note that `__enter__` establish connection to sqlite database using `sqlite3.connect()` method and `__exit__` ensures connection is closed by executing `self.conn.close()` method.

Additional functionality can be added to allow executing CRUD (Create, Read, Update and Delete) operations:
```python
	def __exec(self,
		       query: str,
		       parameters: Tuple[Any,...],
		       rows: int = 0) -> List[Tuple[Any,...]]:
		"""
		Private method (starts with __) - Only accessible
		by methods defined withini the SQLiteClient class scope.

		Execute a sql query containing question marks `?`
		and replace them with parameters (based on their order).
		Rows variable is used to distinguish between CIUD (CREATE,
		INSERT, UPDATE, DELETE) operations and SELECT statements
		(fetchone, fetchall, fetchmany).

		Note: Method was set as private to prevent bad actors from
			  running dangerous sql statements (like sql injections)

		Parameters
		----------
		query: str.
			SQL script to execute. Note that values are represented wtih
			question mark (?). For example:
			`SELECT * FROM users WHERE name = ? and pass = ?`

		parameters: Tuple(Any).
			Values that are safely inserted into sql statement (replacing ?).
			For example: (username, pass)
			If there is only one variable, then tuple should look like that: (value,).
			If there are no variables, then tuple can be empty: ().

		rows: int.
			Set to CIUD (CREATE, INSERT, UPDATE and DELETE) when rows = 0,
			otherwise represent SELECT statement. rows = -1 returns all rows (fetchall),
			rows = 1 returns only one row (fetchone) and specific number limit
			the number of rows (fetchmany).
		"""
		cur = self.__conn.cursor()
		cur.execute(query, parameters)

		# CREATE, INSERT, UPDATE, DELETE operations
		if rows == 0:
			self.__conn.commit()
			return None

		# SELECT - fetchall
		if rows == -1:
			data_ls = cur.fetchall()

		# SELECT - fetchone
		if rows == 1:
			data_ls = [cur.fetchone()]

		# SELECT - get all rows
		if rows > 1:
			data_ls = cur.fetchmany(rows)

		return data_ls

	def is_conn(func):

		def check_connection(self, query, parameters, *args, **kwargs):

			if not self.__conn:
				raise ValueError("No connection to database")

			return func(self, query, parameters, *args, **kwargs)

		return check_connection

	def check_args(func):

		def wrapper(self, query, parameters, *args, **kwargs):

			# Type checks
			if not isinstance(query, str):
				raise TypeError("Query must be a string!")

			if not isinstance(parameters, tuple):
				raise TypeError("Parameters variable must be a tuple!")

			# Number of variables checks
			# Number of ? in query vs. length of parameters
			variables = re.findall('\?', query)
			if len(variables) > len(parameters):
				raise ValueError("Some variables are missing!")

			if len(variables) < len(parameters):
				raise ValueError("Too many values in parameters. This may raise sqlite3.ProgrammingError. Please check your parameters and try again.")

			# Value Errors unique cases for each function.
			if func.__name__ == "ciud":
				if query[:6].lower() not in ["create", "insert", "update", "delete"]:
					raise ValueError("Query must be CIUD (CREATE, INSERT UPDATE or DELETE)")

			if func.__name__ == "read":
				if query[:6].lower() not in ["select"]:
					raise ValueError("Query must start with `SELECT ....`")

				rows = None
				try:
					rows = args[0]
				except IndexError:
					if "rows" in kwargs.keys():
						rows = kwargs["rows"]
				finally:
					if rows == 0:
						raise ValueError("Cannot commit SELECT statement. Please set `rows` to a number other than 0")

			return func(self, query, parameters, *args, **kwargs)

		return wrapper

	@is_conn
	@check_args
	def ciud(self,
			 query: str,
			 parameters: Tuple[Any, ...]) -> None:
		"""
		Execute CREATE, INSERT, UPDATE or DELETE operation.

		Parameters
		----------
		query: str.
			String containing query that starts with CIUD operations, otherwise
			an error is raised. Values are marked with question mark (?)

		parameters: Tuple[Any].
			Tuple of values to replace question marks in the order they are presented.
			Note that the length of parameters must match the number of variables (?)
			within `query`, otherwise an error is raised.
		"""

		self.__exec(query, parameters)

	@is_conn
	@check_args
	def read(self,
		 	 query: str,
		 	 parameters: Tuple[Any, ...],
		 	 rows: int) -> Optional[List[str]]:
		"""
		Execute CREATE, INSERT, UPDATE or DELETE operation.

		Parameters
		----------
		query: str.
			String containing query that starts with CIUD operations, otherwise
			an error is raised. Values are marked with question mark (?)

		parameters: Tuple[Any].
			Tuple of values to replace question marks in the order they are presented.
			Note that the length of parameters must match the number of variables (?)
			within `query`, otherwise an error is raised.

		rows: int.
			Must be an integer number othan than 0. rows = -1 returns all rows (fetchall),
			rows = 1 returns only one row (fetchone) and specific number limit
			the number of rows (fetchmany).
		"""
		data_ls = self.__exec(query, parameters, rows)
		return data_ls
```
Final code appears in the bottom of this page.

## Tests

#### Test 1: Initialize an object
```python
test1 = SQLiteClient("test.db")
print(test1.name)
test1.ciud("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username text, hash text)",())
```

Output:
```output
test.db
Traceback (most recent call last):
	...
ValueError: No Connection to database
```
Object was initialied and name was set to `test.db`, but there is no connection.


#### Test 2: Using with clause
```python
with SQLiteClient("another_test") as client:
	# Create table 'users' with columns: username, hash
	client.ciud("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username text, hash text)",())

	# Insert values
	client.ciud("INSERT INTO users VALUES (NULL,?,?)",("Test 1", "a"))
	client.ciud("INSERT INTO users VALUES (NULL,?,?)",("Test 2", "b"))
	client.ciud("INSERT INTO users VALUES (NULL,?,?)",("Test 3", "c"))

	# Read all columns and all rows
	print(client.read("SELECT * FROM users", (), rows = -1))

	# Read all columns of the first 2 rows.
	print(client.read("SELECT * FROM users",(), rows= 2))
```
A database file (another_test.db) was created in the current working directory, and the output of the `SELECT` statements appears below

Output:
```output
[(1, 'Test 1', 'a'), (2, 'Test 2', 'b'), (3, 'Test 3', 'c')]
[(1, 'Test 1', 'a'), (2, 'Test 2', 'b')]
```



```python {"title": "Final Code"}
'''SQLite client'''
import sqlite3
from typing import Tuple, Any, List, Optional
import re


class SQLiteClient():
	def __new__(cls,
				db_name: str = "",
				timeout:int = 10):
		"""
		Ensure parameters are valid prior to memory allocation.

		Parameters
		----------
		db_name: str.
			Name of SQLite database. Can also be a path to database
			if it is in another directory.

		timeout: int.
			Number of seconds before raising OperationalError.
		"""
		if not db_name:
			raise ValueError("Database Name is Missing!")

		if not isinstance(db_name, str):
			raise TypeError("Database name must be a string!")

		if not isinstance(timeout, int):
			raise TypeError("Timeout must be an integer!")

		if  timeout < 0 :
			raise ValueError("Timeout must be greater than 0")

		return super().__new__(cls)

	def __init__(self, db_name: str = "",  timeout: int = 10):
		"""
		This method is executed after memory allocation
		(after execution of __new__ method, and given all
		parameters are valid), and initialize attributes.

		Parameters
		----------
		db_name: str.
			Name of SQLite database. Can also be a path to database
			if it is in another directory.

		timeout: int.
			Number of seconds before raising OperationalError.
		"""
		# Ensure .db file extension exists.
		self.name = db_name
		if db_name[-3:] != ".db":
			self.name += ".db"
		self.timeout = timeout
		self.__conn = None

	def __enter__(self):
		"""
		Provides context manager functionality which
		is triggered by 'with' clause and creates connection to database.
		For example:
		`with SQLiteClient(name, 10) as client:
			#code.....
		`
		"""
		self.__conn = sqlite3.connect(self.name,
									timeout=self.timeout)

		return self

	def __exit__(self, exc_type, exc_val, exc_tb):
		"""
		Part of the context manager functionality.
		This method ensures that connection to
		database is always closed at the end of execution,
		even if an error is raised.
		"""
		self.__conn.close()
		self.__conn = None

	def __exec(self,
		       query: str,
		       parameters: Tuple[Any,...],
		       rows: int = 0) -> List[Tuple[Any,...]]:
		"""
		Private method (starts with __) - Only accessible
		by methods defined withini the SQLiteClient class scope.

		Execute a sql query containing question marks `?`
		and replace them with parameters (based on their order).
		Rows variable is used to distinguish between CIUD (CREATE,
		INSERT, UPDATE, DELETE) operations and SELECT statements
		(fetchone, fetchall, fetchmany).

		Note: Method was set as private to prevent bad actors from
			  running dangerous sql statements (like sql injections)

		Parameters
		----------
		query: str.
			SQL script to execute. Note that values are represented wtih
			question mark (?). For example:
			`SELECT * FROM users WHERE name = ? and pass = ?`

		parameters: Tuple(Any).
			Values that are safely inserted into sql statement (replacing ?).
			For example: (username, pass)
			If there is only one variable, then tuple should look like that: (value,).
			If there are no variables, then tuple can be empty: ().

		rows: int.
			Set to CIUD (CREATE, INSERT, UPDATE and DELETE) when rows = 0,
			otherwise represent SELECT statement. rows = -1 returns all rows (fetchall),
			rows = 1 returns only one row (fetchone) and specific number limit
			the number of rows (fetchmany).
		"""
		cur = self.__conn.cursor()
		cur.execute(query, parameters)

		# CREATE, INSERT, UPDATE, DELETE operations
		if rows == 0:
			self.__conn.commit()
			return None

		# SELECT - fetchall
		if rows == -1:
			data_ls = cur.fetchall()

		# SELECT - fetchone
		if rows == 1:
			data_ls = [cur.fetchone()]

		# SELECT - get all rows
		if rows > 1:
			data_ls = cur.fetchmany(rows)

		return data_ls

	def is_conn(func):

		def check_connection(self, query, parameters, *args, **kwargs):

			if not self.__conn:
				raise ValueError("No connection to database")

			return func(self, query, parameters, *args, **kwargs)

		return check_connection

	def check_args(func):

		def wrapper(self, query, parameters, *args, **kwargs):

			# Type checks
			if not isinstance(query, str):
				raise TypeError("Query must be a string!")

			if not isinstance(parameters, tuple):
				raise TypeError("Parameters variable must be a tuple!")

			# Number of variables checks
			# Number of ? in query vs. length of parameters
			variables = re.findall('\?', query)
			if len(variables) > len(parameters):
				raise ValueError("Some variables are missing!")

			if len(variables) < len(parameters):
				raise ValueError("Too many values in parameters. This may raise sqlite3.ProgrammingError. Please check your parameters and try again.")

			# Value Errors unique cases for each function.
			if func.__name__ == "ciud":
				if query[:6].lower() not in ["create", "insert", "update", "delete"]:
					raise ValueError("Query must be CIUD (CREATE, INSERT UPDATE or DELETE)")

			if func.__name__ == "read":
				if query[:6].lower() not in ["select"]:
					raise ValueError("Query must start with `SELECT ....`")

				rows = None
				try:
					rows = args[0]
				except IndexError:
					if "rows" in kwargs.keys():
						rows = kwargs["rows"]
				finally:
					if rows == 0:
						raise ValueError("Cannot commit SELECT statement. Please set `rows` to a number other than 0")

			return func(self, query, parameters, *args, **kwargs)

		return wrapper

	@is_conn
	@check_args
	def ciud(self,
			 query: str,
			 parameters: Tuple[Any, ...]) -> None:
		"""
		Execute CREATE, INSERT, UPDATE or DELETE operation.

		Parameters
		----------
		query: str.
			String containing query that starts with CIUD operations, otherwise
			an error is raised. Values are marked with question mark (?)

		parameters: Tuple[Any].
			Tuple of values to replace question marks in the order they are presented.
			Note that the length of parameters must match the number of variables (?)
			within `query`, otherwise an error is raised.
		"""

		self.__exec(query, parameters)

	@is_conn
	@check_args
	def read(self,
		 	 query: str,
		 	 parameters: Tuple[Any, ...],
		 	 rows: int) -> Optional[List[str]]:
		"""
		Execute CREATE, INSERT, UPDATE or DELETE operation.

		Parameters
		----------
		query: str.
			String containing query that starts with CIUD operations, otherwise
			an error is raised. Values are marked with question mark (?)

		parameters: Tuple[Any].
			Tuple of values to replace question marks in the order they are presented.
			Note that the length of parameters must match the number of variables (?)
			within `query`, otherwise an error is raised.

		rows: int.
			Must be an integer number othan than 0. rows = -1 returns all rows (fetchall),
			rows = 1 returns only one row (fetchone) and specific number limit
			the number of rows (fetchmany).
		"""
		data_ls = self.__exec(query, parameters, rows)
		return data_ls
```
