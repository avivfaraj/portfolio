import Layout from '/components/layout';
import Sidebar from '/components/sidebar';
import GithubCorner from 'react-github-corner';
import Styles from '/styles/layout.module.css';
import Gist from "react-gist";
import HoverLink from '/components/hoverLink';
import TOC from '/components/toc';

export default function Page() {
  return (

    <>

        <section>

            <section>
                <div className={Styles.gap} />

                <GithubCorner href="https://github.com/avivfaraj/Fake-News-Detection-PySpark" />

                <h1 id = "header"> Fake News Detection in PySpark </h1>
                <p>
                  Fake news is an article contains inaccurate and misleading information aiming to change one's opinion,
                  and in doing so gain power. In this work, I propose ML model to classify news into fake and reliable using PySpark
                </p>
            </section>

                <hr />

                <section>
                    <h2 id = "dataset"> Dataset </h2>
                    <p>
                      The news dataset was found at <HoverLink href={"https://www.kaggle.com/c/fake-news/data"} alt={"Kaggle"} /> contains
                      three attributes (author, title and text) and the target column (0 - reliable, 1 - fake).
                      There are 20,800 rows, each of which describes one article.
                      Also, there are 4,194 unique authors in this dataset.
                    </p>
                </section>

                <hr />

                <section>
                    <h2 id = "EDA"> Exploratory Data Analysis (EDA) </h2>
                    <h4 id="class-balance"> Class Balance </h4>
                    <p>
                      A data set that contains significantly more instances of one class than other classes is considered to be im- balanced.
                      In such case, a machine learning algorithm might tend toward the major class.
                      Therefore, our first step is examining class balance as shown below:
                    </p>
                    <figure>
                      <img className={Styles.graph} src="/images/fake_news_detection/dist.png" />
                      <figcaption> <b>Fig. 1</b> - Class Balance </figcaption>
                    </figure>

                    <p>
                      The figure above shows the distribution of the target column.
                       There are 10,387 (49.93%) reliable articles and 10,413 (50.07%) unreliable articles.
                      Therefore, our data set is balanced.
                    </p>

                    <h4 id = "missing"> Missing Values </h4>
                    <p>
                      Missing values could lead to several errors that might lead to either termination of the program, or unreliable results.
                      Therefore, it is required to identify rows that are missing attributes as well as determine a proper way to deal with them.
                      <br />
                      There are 1957 rows that are missing the author attribute, 1931 are also labeled as fake.
                      Title is missing in 558 rows, all of them have both author and text and are labeled as fake.
                      Finally, text is missing in 39 instances, each of which is also missing the author at- tribute, and is labeled as fake.
                      <br />
                      To sum up, more than 98% of the rows that are missing one or more attribute are labeled as fake.
                      This will be helpful in creating a good baseline for the machine learning model.
                      Additionally, all 39 rows that are missing both the text and the author will be deleted because there is no content to process in those instances.
                    </p>
                </section>

                <hr />

                <section>
                    <h2 id = "methods"> Methodology </h2>
                    <h4 id = "baseline"> Baseline </h4>
                    <p>
                      A baseline is a guess that could be done easily by anyone,
                      and which the machine learning model is trying to improve.
                      Based on the EDA, one can label all rows that have at least one missing attribute as fake.
                      Otherwise, it is labeled as reliable.
                      In this case, precision is great since reliable was guessed for the majority of rows in our dataset.
                      However, the recall is low (0.56), so the accuracy score is 0.61 and F1 score is 0.77 as shown below:

                    </p>
                    <p><Gist id="571ee510d21b70db0d43914605498fd4"/></p>

                    <figure>
                      <img src="/images/fake_news_detection/dummy.png" />
                      <figcaption> <b>Fig. 2</b> - Dummy Classifier </figcaption>
                    </figure>
                    <p>
                      Our goal is to design a pipeline and utilize a machine learning algorithm
                      to classify news into either reliable or unreliable,
                      and achieve results that are better than the baseline.
                    </p>


                    <h4 id = "pre-processing"> Data Pre-Processing  </h4>
                    <p>
                      Target class is balanced, but there are several rows that are missing at least one attribute.
                      Therefore, we must clean the data before developing pipeline.
                    </p>
                    <figure>
                      <img src="/images/fake_news_detection/pre-process.png" />
                      <figcaption> <b>Fig. 3</b> - Cleaning Dataset </figcaption>
                    </figure>
                    <p>
                      First stage is deleting all rows in which the text is shorter than 60 characters.
                      The goal is to classify news articles, so instances with little to none content are not part of this study. Next stage deal with rows that do not have a title.
                      In this case, ”NaN” string is replaced with white-space.
                      As long as there is some content, it is valuable for the analysis.
                      <br />
                      Third, symbols (e.g. $,%,#) were removed from every title and text in each row.
                      Later on, text will be converted to numerical values, so it is an important step.
                      It prevents those characters from expanding the dimension of the variables, thus affecting machine learning model.
                      <br />
                      Finally, a new column is created, and is composed of both the title and the text.
                      There are some rows in which the text already includes the title.
                      In such cases, the text was taken.
                    </p>

                    <h4 id = "pipeline"> Pipeline </h4>
                    <p>
                      Document classification requires converting sentences to words, and then to numerical values.
                      The process contains 4 stages as described below. They are being executed one after the other
                      in order to represent each word as a number (frequency).
                    </p>
                    <figure>
                      <img src="/images/fake_news_detection/pipeline.png" />
                      <figcaption> <b>Fig. 4</b> - Pipeline </figcaption>
                    </figure>
                    <p>
                      Tokenizer is the first stage in which the text is being split into a list of words.
                      It uses white-space as the splitter, and also convert upper case letters to lower case. Then, stop words were removed from each list of words.
                      Stop words are words that appear many times in a document, and have no significance for the analysis.
                      The list of stop words was obtained by using the <a href="https://www.nltk.org">NLTK</a> package in Python.
                      <br />
                      The following stage is the Stemmer that converts every word to its stem.
                      This is a <a href="https://csyhuang.github.io/2020/08/01/custom-transformer/">custom transformer</a> that utilizes PorterStemmer instance from NLTK package.
                      This step reduces the dimension of the features3 column.
                      For instance, the words ”Playing”, ”Plays”, ”Played”, and ”Play” are all converted to ”play”. Final stage is the Term Frequency (TF) in which the program count the frequency of every term in a document.
                      The result of this stage is our features column for the machine learning model.

                    </p>
                    <p><Gist id="61919f2c3569363eab2a9a19b39d88c8" /></p>
                </section>

                <hr />

                <section>
                    <h2 id = "ML"> ML Model </h2>
                    <p>
                      The dataset was split 70% training and 30% testing.
                      After splitting the data, the designed pipeline was fitted on the train data, and transformed both training and test sets in order to compute the features column. In this study, Naive Bayes Classifier was utilized in order to classify news.
                      There are three types of Naive Bayes: Multinomial, Bernoulli, and Gaussian. The first one can handle finite discrete data,
                      the second can only handle binary (0,1) vectors,
                      and the last one can handle continuous data 4.
                      The features column contains numbers corresponding to the frequency of every term in the dictionary,
                      and therefore Multinomial Naive Bayes will be utilized.
                    </p>
                </section>

                <hr />

                <section>
                    <h2 id = "results"> Results </h2>
                    <figure>
                      <img src="/images/fake_news_detection/results.png" />
                      <figcaption> <b>Fig 5.</b> - Final Results </figcaption>
                    </figure>
                    <p>
                      Precision was down by 0.2 compare to the baseline.
                      However, recall was significantly improved from 0.56 to 0.885, and therefore both accuracy and F1 score are much better than in the baseline.
                      To be more specific, Accuracy jumped from 0.618 to 0.921 and F1 score changed from 0.723 to 0.927.
                      F1 score can be viewed as the harmonic mean of precision and recall, thus proving this model’s reliability.
                    </p>
                </section>

                <hr />

                <section>
                    <h2 id = "conclusions"> Conclusions </h2>
                    <p>
                      Recently, fake news has become ubiquitous in the media, leading to increasing levels of distrust amongst consumers.
                      To help mitigate the spread of fake news, this paper presents a pipeline to classify news articles.
                      This program was developed in PySpark, the optimal platform for processing big data.
                      Implementation of this program will greatly decrease the prevalence of fake news, thus improving news quality and trust amongst consumers.
                    </p>
                </section>


                <div className={Styles.gap}/>
        </section>
    </>

  )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>

      <Sidebar />
      <TOC />
      {page}

    </Layout>
  )
}
