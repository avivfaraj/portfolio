import Layout from '../../../components/layout'
import Sidebar from '../../../components/sidebar'
import React, { Component } from 'react'
import GithubCorner from 'react-github-corner'
import Styles from '../../../styles/layout.module.css'

export default function Page() {
  return (
    <section>
        <GithubCorner href="https://github.com/avivfaraj/todocom" />
        
        <h2> todocom (Todo Comments) </h2>
        <p>CLI program that retrieves all TODO comments from file(s) and prints them in terminal/shell. 
        It was created in order to automatically update a list of TODO tasks by simply adding "TODO:" comments in the code (<a href="#format">Comments Format</a>).
          It also enables prioritization of tasks by using "TODO soon:" or "TODO urgent". 
        To create the TODO list, simply open terminal and run the following command:
        </p>
        <code>
        todo [folder/file]
        </code>
        <p>
        This command will print out all TODO comments that were found in the code, sorted by their prioritization: urgent, soon and regular. 
        <i>Urgent</i> tasks will be printed in RED, <i>soon</i> in CYAN and <i>regular</i> comments in WHITE to make it easier to read. There is also an option to filter comments by their priotization:
        </p>
        <code>
        # Prints urgent TODOs 
        <br />
        todo -u [folder/file]
        </code>
        <p>
        Or:
        </p>

        <code>
        # Prints soon TODOs
        <br />
        todo -s [folder/file]
        </code>

        <p>
        Finally, there is an option to save the list in a text file (stores as regular text without colors):
        </p>

        <code>
        # Store results in a txt file
        <br />
        todo -o [path/to/sample.txt] [folder/file]
        </code>

        <br />
        <br />
        <h2> Setup </h2>

        <code>pip install todocom</code>
        
        <br />
        <br />
        <h2 id="format"> Comments Format </h2>
        <p>
        There are two types of comments: single line and multi-line. Currently, multi-line comments (docstrings) are only supported in Python, but single line should work for most programming languages.

        Format is flexible and can be lower-case, upper-case or a combination of both. Below are several examples:
        </p>

        <ul className={Styles.list}>
          <li> TODO: </li>
          <li> TODo: </li>
          <li> TOD0: </li>
          <li> ToD0: </li>
          <li> To-D0: </li>
          <li> to-do: </li>
        </ul>

        <p>
        In <i>Urgent</i> and <i>soon</i> comments the TODO part is flexible as shown above, but must be followed by either <i>urgent</i> or <i>soon</i> in lower-case:
        </p>

        <ul className={Styles.list}> 
          <li> TO-DO soon:</li>
          <li> tODo soon: </li>
          <li> ToD0 urgent:</li>
          <li> T0-D0 urgent:</li>
        </ul>
    </section>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  )
}
