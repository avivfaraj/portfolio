/*Thanks for Borges53 for the Timeline code:
https://github.com/Borges53/Timeline/blob/main/components/Timeline/index.js
*/

import Layout from '/components/layout'
import Sidebar from '/components/sidebar'
import Items from '/vars/about_timeline'
import Item from '/components/timelineItem'
import Styles from '/styles/timeline.module.css'

export default function About() {
  return (

    <div className={Styles['main']}>
        <h2>About</h2>
      <div className={Styles['container-timeline']}>


        {Items.map((item) => (
          <Item data={item} key={item.title}/>
          ))}
      </div>
    </div>
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
