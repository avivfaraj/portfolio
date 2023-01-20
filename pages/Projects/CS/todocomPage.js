import Layout from '/components/layout'
import Sidebar from '/components/sidebar'
import GithubCorner from 'react-github-corner'
import Styles from '/styles/layout.module.css'
import GIF from '/components/gifs'
import TOC from '/components/toc'
import HoverLink from '/components/hoverLink'

export default function Page() {
  return (
    <section>
        <GithubCorner href="https://github.com/avivfaraj/todocom" />
        <div className={Styles.gap} />

        <section>
            <h1> todocom (Todo Comments) </h1>
        </section>

        <section>
            <h2 id = "introduction"> Introduction </h2>
            <p>
                CLI program that retrieves all TODO comments from file(s) and prints them in terminal/shell.
                It was created in order to automatically update a list of TODO tasks by simply adding "TODO:" comments in the code (<HoverLink href={"#format"} alt={"Comments Format"} target={""} />).
                It also enables prioritization of tasks by using "TODO soon:" or "TODO urgent" and assign tasks to a specific teammate.
            </p>
        </section>

        <section>


            <h2 id = "usage"> Usage </h2>
            <p>
                Add TODO comments according to the format, open terminal and run the following command:
                <code>
                todo [folder/file]
                </code>

                Example:
                <GIF id = "gen-todo" src="https://user-images.githubusercontent.com/73610201/211216011-27e057b0-0420-4d90-8950-999f75583566.gif" title="General TODO command" />
            </p>
        </section>

        <section>
            <h2 id = "types"> Types </h2>
            <p>
                This command will print out all TODO comments that were found in the code, sorted by their prioritization: urgent, soon and regular.
                <i>Urgent</i> tasks will be printed in RED, <i>soon</i> in CYAN and <i>regular</i> comments in WHITE to make it easier to read. There is also an option to filter comments by their priotization:
                <code>
                # Prints urgent TODOs
                <br />
                todo -u [folder/file]
                </code>
                <GIF id = "urgent-todo" src="https://user-images.githubusercontent.com/73610201/211216002-c00860d3-7a61-425f-8cb2-939de85c01ec.gif" title="Urgent TODO command" />
                or:
                <code>
                # Prints soon TODOs
                <br />
                todo -s [folder/file]
                </code>
                <GIF id = "soon-todo" src="https://user-images.githubusercontent.com/73610201/211216007-f4eabb81-76d0-42c5-9334-0f13857e809b.gif" title="Soon TODO command" />

                Comments can also be assigned to a user by adding "Todo @username" comment:
                <code>
                # Prints Assigned TODOs <br />
                todo -a [USERNAME] [folder/file]
                </code>
                <GIF id = "assigned-todo" src="https://user-images.githubusercontent.com/73610201/211216263-ca453589-e490-49b3-a839-65315366f34f.gif" title="Assigned TODO command" />

                Finally, there is an option to save the list in a text file (stores as regular text without colors):
                <code>
                # Store results in a txt file
                <br />
                todo -o [path/to/sample.txt] [folder/file]
                </code>
            </p>
        </section>

        <section>
            <h2 id="install"> Setup </h2>

            <p><code>pip install todocom</code></p>
        </section>

        <section>
            <h2 id="format"> Comments Format </h2>
            <p>
            There are two types of comments: single line and multi-line. Currently, multi-line comments (docstrings) are only supported in Python, but single line should work for most programming languages.

            Format is flexible and can be lower-case, upper-case or a combination of both. Below are several examples:
            </p>

            <div className={Styles.tableImageContainer}>
                <div className={Styles.left}>
                    <ul className={Styles.list}>
                      <li> TODO: </li>
                      <li> TODo: </li>
                      <li> TOD0: </li>
                    </ul>
                </div>

                <div className={Styles.right}>
                    <ul className={Styles.list}>
                        <li> ToD0: </li>
                        <li> To-D0: </li>
                        <li> to-do: </li>
                    </ul>
                </div>
            </div>


            <p>
            In <i>Urgent</i> and <i>soon</i> comments the TODO part is flexible as shown above, but must be followed by either <i>urgent</i> or <i>soon</i> in lower-case:
            </p>

            <div className={Styles.tableImageContainer}>
                <div className={Styles.left}>
                    <ul className={Styles.list}>
                        <li> TO-DO soon:</li>
                        <li> tODo soon: </li>
                    </ul>
                </div>

                <div className={Styles.right}>
                    <ul className={Styles.list}>
                        <li> ToD0 urgent:</li>
                        <li> T0-D0 urgent:</li>
                    </ul>
                </div>
            </div>
        </section>

        <div className={Styles.gap}/>

    </section>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      <TOC width={"500px"}/>
      {page}

    </Layout>
  )
}
