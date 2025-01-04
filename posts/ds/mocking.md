---
title: "Mocking (Unit Test)"
date: "2024-08-18"
image: logo.jpg
desc: Utilizing unittest.mock object to test a database client class.
keywords: Python3, Unit Testing, Mocking.
isFeatured: true
gitlab: https://gitlab.com/avivfaraj/pytest-mocking-examples/-/blob/main/mocking/test/test_sql.py?ref_type=heads
---

# Mocking Techniques (Unit Test)

Unit test is a great tool which allows the programmer to quickly run multiple tests on the code and ensure that pushing new code doesn't break it. Writing unit test can be challenging in some programs such as database clients due to accessbility issues. In those cases, one can utilize the built-in `unittest.mock` library which allows replacing parts of the system with a mock object to make assertions and ensure the logic is correct.

***

## setup {#setup}

[SQLiteClient](/Projects/CS/context-manager) is tested using Pytest and the built-in `unittest.mock` library, so it is required to install `pytest`. Also, a coverage report can be generated by installing the `pytest-cov`, which is recommended, but is optional. Coverage report shows the percentage of the code that is being tested, and if some lines are missing, it prints them as well, so it can be useful to ensure full coverage.

---

## Pytest Fixtures {#fixtures}

Test fixtures can be accessed by test functions, and they provide consistent and reuseable baseline objects which can significantly reduce test code. They can also be utilized within methods of a test class. Both options are shown below.

{gap: 30px}
### Usage in Functions

Test functions can easily access Pytest Fixtures by simply adding them as parameters in the function signature as shown below:

```python
import pytest
from mocking.src.sql import SQLiteClient
from unittest.mock import patch


# Define a pytest fixture which can be used by test functions
@pytest.fixture
def db_client():

    # Patching the connection - can be ignored for now
    with patch("mocking.src.sql.sqlite3.connect") as mocked_connection:

        # Establish connection to database.
        # Since it was mocked, the connection will not be established,
        # but tests can still be executed to ensure correct logic.
        with SQLiteClient("test.db", timeout=20) as conn:

            # That's the value that will be passed to functions
            # that utilize `db_client` (listed as a parameter).
            # In this case, its a tuple!
            yield mocked_connection, conn


# Test Function - Note that the parameter db_client
#                 has the same name as the fixture above.
def test_connection(db_client):

    # Unpacking the tuple
    mocked_connection, conn = db_client

    # Running the test to ensure correct arguments while calling method.
    assert mocked_connection.called_once_with("test.db", timeout=20)
```

The example above uses `unittest.mock.patch` to mock the connection and prevent a db file form being generated, but it will be explained later on. Note that the name of the fixture, `db_client`, was passed as a parameter to the test function, `test_connection`. Pytest will automatically assign that value, and will execute the assertion to ensure that the function was called with the correct arguments.

{gap: 30px}
### Usage in a Test Class

There are two ways to utilize pytest fixture within a Test Class, both are explained below.
1. External Fixture - One must register the variables (using `request` as a parameter to the fixture) and use a special decorator `@pytest.mark.usefixtures` before test class definition in order to allow class methods to recognize and access the fixture. Consider the following example:

    ```python
    import pytest
    from mocking.src.sql import SQLiteClient
    from unittest import TestCase
    from unittest.mock import patch


    # Creating a SQLiteClient fixture to be used in the methods
    # of the SQLiteClientTestCase class.
    @pytest.fixture
    def mocked_connection(request):
        """
        Mocking connection to database. Note that since tests are
        done using a testing class, then `request` must be included as
        a parameter. The usage of request is necessary in order to
        define attributes that will be used inside the class.

        For example, `request.cls.mock_conn = ...` as appears below
        enables calling this parameter as an attribute:
        `self.mock_conn.assert_called_once()`

        Note: `yield` is used instead of return because
            return would have ended the `with` clause
            which would delete the mocking instance.
        """
        with patch("mocking.src.sql.sqlite3.connect") as mocked_connection:
            with SQLiteClient("test.db", timeout=20) as conn:

                # Connection mock instance.
                # Is used to test calls and arguments
                request.cls.mock_conn = mocked_connection

                # Connection instance.
                # Is used to execute SQLiteClient methods
                # so testing can be done before and after calling.
                request.cls.conn = conn
                yield


    @pytest.mark.usefixtures("mocked_connection")
    class SQLiteClientTestCase(TestCase):

        # Testing Attributes
        def test_attributes_1(self):
            """
            Testing pytest fixture attributes
            """
            assert self.conn.name == "test.db"
            assert self.conn.timeout == 20
    ```

    Note the usage of `request` within the fixture. It appears as a parameter to the fixture named `mocked_connection` and is being used to register class attributes by assigning a value in the following format `request.cls.ATTRTIBUTE_NAME =...`. In our case, there are two attributes, `mock_conn` (`request.cls.mock_conn =...`) and `conn` (`request.cls.conn =...`).

    Then, the test class `SQLiteClintTestCase` is connected to the fixture using the decorator `@pytest.mark.usefixtures(FIXTURE_NAME)` which allows us to use the registered attributes: `assert self.conn.name == "test.db"`.

2. Internal Fixture - In this case, the fixture is defined as a method inside the scope of the test class as shown below:

    ```python
    class SQLiteClientTestCase(TestCase):

        @pytest.fixture(autouse=True)
        def setup(self):
            with patch("mocking.src.sql.sqlite3.connect") as mocked_connection:
                with SQLiteClient("test.db", timeout=20) as conn:

                    # Connection mock instance.
                    # Is used to test calls and arguments
                    self.mock_conn = mocked_connection

                    # Connection instance.
                    # Is used to execute SQLiteClient methods
                    # so testing can be done before and after calling.
                    self.conn = conn

                    yield

        # Testing Attributes
        def test_attributes_1(self):
            """
            Testing pytest fixture attributes
            """
            assert self.conn.name == "test.db"
            assert self.conn.timeout == 20
    ```
    Note the use of `autouse=True` which means that the fixture will automatically be executed before each test method, so `mock_conn` and `conn` will be defined as class attributes, and can be used for assertions.

In both cases, note that the `yield` was utilized. The reason is that `return` statement would have closed the SQLiteClient session, so `conn` would be defined as `None`. `yield`, however, continues to the end of the test method.

{gap: 30px}
## Mocking {#mocking}

### Find the path

Looking at the examples in the previous section (`with patch("mocking.src.sql.sqlite3.connect") as mocked_connection`) one can find the usage of the following path: `mocking.src.sql.sqlite3.connect`, however, looking at the package structure, and file's content, there is no such path. In other words, folder structure is: `mocking.src` and the file name is `sql.py`, so that explain the beginning of the string: `mocking.src.sql`. In the import statements there is only one relevant statment: `import sqlite3`, which expands the string: `mocking.src.sql.sqlite`.

The last component (`connect`), appears inside a method that we would like to test, but we can't without mocking. To put it simply, the method `__enter__` tries to connect to a `sqlite3` database when it is invoked (using `with` clause). However, if the job is ran in a server with no database access, e.g. gitlab/github pipeline, then the job will fail. To avoid such scenario, connection mocking is required, and is applied to the following line:[`self.__conn = sqlite3.connect(self.name, timeout=self.timeout)`](https://gitlab.com/avivfaraj/pytest-mocking-examples/-/blob/main/mocking/src/sql.py?ref_type=heads#L67).

That's one way to find out the correct path to mock an object. Another way is utilizing the function `dir`. In the case discuss above, one could print the methods of `sqlite3` with the following lines:
```python
from mocking.src import sql

print(dir(sql.sqlite3))
```
One of the printed options is `connect`, and that's what we were looking for.

{gap: 30px}
### Patch

Patch is utilized to mock the object:

```python
from mocking.src.sql import SQLiteClient
from unittest.mock import patch

with patch("PATH") as mocked_object:

    # Execute code
    ...
```
`mocked_object` is used to run assertions on the object under test. There are several assertion methods available, among them are: `assert_called_once`, `assert_called_once_with`, and `assert_called_with`.

One can print available assertion methods by using the `dir` function: `print(dir(mocked_object))`. If used in pytest, then run pytest with `-s` option which tells pytest to show print statements.

Also, one can mock a function of a mocked object. Here is an example taken from SQLiteClientTestCase class:

```python
def test__exec_commit(self):
    """Testing CIUD"""
    self.mock_conn.assert_called_with("test.db", timeout=20)
    mock_cursor = self.mock_conn.return_value.cursor()

    self.conn._SQLiteClient__exec("TEST QUERY", parameters=(), rows=0)

    mock_cursor.execute.assert_called_once_with("TEST QUERY", ())
    self.mock_conn.return_value.commit.assert_called_once()
```

Above, the `mock_conn` was setup by the pytest fixture, and an `assert_called_with` was executed to ensure arguments passed to the `connect` call are correct.
Then, `mock_cursor` is mocking the `conn.cursor()` object, with the help of `return_value`. In order to test `mock_cursor`, a method is executed by using the connection object (`self.conn`). Note that `__exec` is a private method, so to access it one must add (`_SQLliteClient`). Finally, `mock_cursor.execute` is tested using `assert_called_once_with`. Additionally, `conn.commit()` is tested by asserting that it was called once using the `mock_conn` object. Syntax is a bit tricky, and I find `dir` function to be very helpful in understanding the scope of variables within a function.

{gap: 30px}
#### Patching with return value

Sometimes testing return statements is required to ensure logic is correct. For that, one can utilize the `return_value` argument in patch:

```python
@patch("mocking.src.sql.SQLiteClient._SQLiteClient__exec", return_value=[1, 2])
def test_read_execution_3(self, mock_exec):
    """
    Testing execution of `__exec` method
    when calling `read` method with return value set
    for the mocking in order to test the return statement
    """
    test = self.conn.read("SELECT * FROM TABLE WHERE name = ?", ("test",), 2)
    mock_exec.assert_called_once_with(
        "SELECT * FROM TABLE WHERE name = ?", ("test",), 2
    )
    assert test == [1, 2]
```

The example above is also taken from the SQLiteClientTestClass, but the fixture was not used. Instead, a new patch is used to test the returned value. Also note that the path to patch is different the fixture defined previously. The return value is set to `[1, 2]` which means that the `__exec` method will return that list, which should be returned from `read` as well, and that's what the assertion is testing. Once again, the `__exec` method was defined as private (using double underscore `__`), so in order to patch it, one must add underscore and the name of the class (`_SQLiteClient`) before the name of the method.

{gap: 30px}
#### Patching with side effect

`side_effect` argument can be used to raise errors, and test error logic. Simply setß `side_effect` to the desired error, and it will raise it, so the logic in the scope of the `except ...` clause can be tested:

```python
@patch("mocking.src.sql.SQLiteClient._SQLiteClient__exec",
       side_effect = ConnectionError("Testing logic when ConnectionError is raised!"))
def test_a():
    ...

```

## Example

A test class was developed for the SQLiteClient, and can be viewed in the [gitlab repository](https://gitlab.com/avivfaraj/pytest-mocking-examples/-/blob/main/mocking/test/test_sql.py?ref_type=heads). Coverage report was printed as part of the pipeline, and it shows 100% coverage:

![Coverage Report {450x139} {caption: Coverage Report}](mocking/coverage-report.png)

To create & print coverage report simply run the following commands:

```bash
python3 -m pytest --cov-report=html --cov=PATH_TO_SOURCE_FOLDER
python3 -m coverage report -m
```
