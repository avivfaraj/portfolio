---
title: "TODO Comment (TODOCOM)"
date: "2022-10-16"
image: logo.jpg
desc: Python package to retreive TODO comments written in the code.
keywords: TODO, re, Python.
isFeatured: true
github: https://github.com/avivfaraj/todocom
---


# todocom (Todo Comments)


## Introduction {#introduction}

CLI program that retrieves all TODO comments from file(s) and prints them in terminal/shell.
It was created in order to automatically update a list of TODO tasks by simply adding "TODO:" comments in the code [Comments Format](#format)
It also enables prioritization of tasks by using "TODO soon:" or "TODO urgent" and assign tasks to a specific teammate.

---

## Usage {#usage}

Add TODO comments according to the format, open terminal and run the following command:
```shell
todo [folder/file]
```

[gif {title: "General TODO Command"}](https://user-images.githubusercontent.com/73610201/211216011-27e057b0-0420-4d90-8950-999f75583566.gif)

---

## Types {#types}

This command will print out all TODO comments that were found in the code, sorted by their prioritization: urgent, soon and regular.
__Urgent__ tasks will be printed in RED, __soon__ in CYAN and __regular__ comments in WHITE to make it easier to read. There is also an option to filter comments by their priotization:

```shell
# Prints urgent TODOs
todo -u [folder/file]
```

[gif {title: "Urgent TODO command"}](https://user-images.githubusercontent.com/73610201/211216002-c00860d3-7a61-425f-8cb2-939de85c01ec.gif)

or:
```shell
# Prints soon TODOs
todo -s [folder/file]
```
[gif {title: "Soon TODO command"}](https://user-images.githubusercontent.com/73610201/211216007-f4eabb81-76d0-42c5-9334-0f13857e809b.gif)


Comments can also be assigned to a user by adding "Todo @username" comment:
```shell
# Prints Assigned TODOs
todo -a [USERNAME] [folder/file]
```

[gif {title: "Assigned TODO command"}](https://user-images.githubusercontent.com/73610201/211216263-ca453589-e490-49b3-a839-65315366f34f.gif)

Finally, there is an option to save the list in a text file (stores as regular text without colors):
```shell
# Store results in a txt file
todo -o [path/to/sample.txt] [folder/file]
```

---

## Setup {#install}

```shell
pip install todocom
```

---

## Comments Format {#format}

There are two types of comments: single line and multi-line. Currently, multi-line comments (docstrings) are only supported in Python, but single line should work for most programming languages.

Format is flexible and can be lower-case, upper-case or a combination of both. Below are several examples:
```
                        - TODO:       - ToD0:
                        - To-D0:      - to-do:
                        - TODo:       - TOD0:
```

In __Urgent__ and __soon__ comments the TODO part is flexible as shown above, but must be followed by either __urgent__ or __soon__ in lower-case:
```
                    - TO-DO soon:       - tODo soon:
                    - ToD0 urgent:      - T0-D0 urgent:
```
