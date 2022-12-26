import Layout from '/components/layout'
import Sidebar from '/components/sidebar'
import Image from 'next/image';
import Styles from '/styles/certificates.module.css'
import Honors from '/vars/honors'
import LImage from '/components/linkedImage'
import HoverLink from '/components/hoverLink'

const name = 'Aviv Faraj';
export default function Contact() {
  return (
      <div className={Styles.main}>
        <h2>Honors & Awards</h2>
        <div className={Styles.horizontalCertificate}>
            <h3>Honor Society - Upsilon Pi Epsilon</h3>
            <LImage {...Honors[0]} />
        </div>

        <div className={Styles.verticalCertificate}>
            <h3>Magna Cum Laude - Electrical Engineering 2020</h3>
            <LImage {...Honors[1]} />
            <LImage {...Honors[2]} />
        </div>

        <div className={Styles.verticalCertificate}>
            <h3>Summa Cum Laude - Physics 2019</h3>
            <LImage {...Honors[3]} />
            <LImage {...Honors[4]} />
        </div>

        <div className={Styles.verticalCertificate}>
            <h3>Dean's List 2019</h3>
            <LImage {...Honors[5]} />
        </div>

        <div className={Styles.verticalCertificate}>
            <h3>Dean's List 2018</h3>
            <LImage {...Honors[6]} />
        </div>

        <div className={Styles.gap}/>
      </div>

  )
}

Contact.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  )
}
