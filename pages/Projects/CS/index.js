import Layout from "/components/layout";
import Sidebar from "/components/sidebar";
import Styles from "/styles/grid.module.css";
import Card from "/components/card";
import Projects from "/vars/projects";

export default function CSHome() {
  return (
    <section>
      <div className={Styles.gap} />

      <div className={Styles.container}>
        <h1> Computer Science Projects</h1>
        <div className={Styles.grid}>
          {Projects.hasOwnProperty("cs") &&
            Projects["cs"].map((cs) => <Card {...cs} />)}
        </div>
      </div>
      <div className={Styles.gap} />
    </section>
  );
}

CSHome.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};
