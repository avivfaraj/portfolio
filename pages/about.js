/*Thanks for Borges53 for the Timeline code:
https://github.com/Borges53/Timeline/blob/main/components/Timeline/index.js
*/

import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import items from '../vars/about_timeline'
import Item from '../components/timelineItem'
import Styles from '../styles/timeline.module.css'

export default function About() {
  return (
    <section>
      <h2>About</h2>
      <div className={Styles['container-timeline']}>
        {items.map((item) => (
          <Item data={item} key={item.title}/>
          ))}
      </div>
    </section>
  );
}

About.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  )
}
