---
title: "Fake News Detection (PySpark)"
date: "2022-10-16"
image: logo.jpeg
desc: Machine learning program that detect fake news.
keywords: PySpark, Fake news.
isFeatured: true
github: https://github.com/avivfaraj/Fake-News-Detection-PySpark
---


# Fake News Detection in PySpark

Fake news is an article contains inaccurate and misleading information aiming to change one's opinion,
and in doing so gain power. In this work, I propose ML model to classify news into fake and reliable using PySpark

## Dataset

The news dataset was found at [Kaggle](https://www.kaggle.com/c/fake-news/data) contains three attributes (author, title and text) and the target column (0 - reliable, 1 - fake).

There are 20,800 rows, each of which describes one article.
Also, there are 4,194 unique authors in this dataset.

## Exploratory Data Analysis (EDA)

#### Class Balance

A data set that contains significantly more instances of one class than other classes is considered to be im- balanced.
In such case, a machine learning algorithm might tend toward the major class.
Therefore, our first step is examining class balance as shown below:

![Class Balance {caption: test}](dist.png)


The figure above shows the distribution of the target column.
There are 10,387 (49.93%) reliable articles and 10,413 (50.07%) unreliable articles.
Therefore, our data set is balanced.


#### Missing Values

Missing values could lead to several errors that might lead to either termination of the program, or unreliable results.
Therefore, it is required to identify rows that are missing attributes as well as determine a proper way to deal with them.

There are 1957 rows that are missing the author attribute, 1931 are also labeled as fake.
Title is missing in 558 rows, all of them have both author and text and are labeled as fake.
Finally, text is missing in 39 instances, each of which is also missing the author at- tribute, and is labeled as fake.

To sum up, more than 98% of the rows that are missing one or more attribute are labeled as fake.
This will be helpful in creating a good baseline for the machine learning model.
Additionally, all 39 rows that are missing both the text and the author will be deleted because there is no content to process in those instances.

## Methodology

#### Baseline

A baseline is a guess that could be done easily by anyone,
and which the machine learning model is trying to improve.
Based on the EDA, one can label all rows that have at least one missing attribute as fake.
Otherwise, it is labeled as reliable.
In this case, precision is great since reliable was guessed for the majority of rows in our dataset.
However, the recall is low (0.56), so the accuracy score is 0.61 and F1 score is 0.77 as shown below:

[Gist](571ee510d21b70db0d43914605498fd4)


![Dummy Classifier {caption: Dummy Classifier}](dummy.png)

Our goal is to design a pipeline and utilize a machine learning algorithm
to classify news into either reliable or unreliable,
and achieve results that are better than the baseline.
