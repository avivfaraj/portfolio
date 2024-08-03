import Styles from "/styles/certificates.module.css";
import HonorsArray from "/vars/honors";
import LinkedImage from "/components/linked-image/linked-image";

function Honors() {
    const name = "Aviv Faraj";
    return (
        <div className={Styles.main}>
            <h1 className={Styles.h1}>Honors & Awards</h1>
            <div className={Styles.horizontalCertificate}>
                <h3>Master of Science in Data Science</h3>
                <LinkedImage {...HonorsArray[0]} />
            </div>

            <div className={Styles.horizontalCertificate}>
                <h3>Honor Society - Upsilon Pi Epsilon</h3>
                <LinkedImage {...HonorsArray[1]} />
            </div>

            <div className={Styles.verticalCertificate}>
                <h3>Magna Cum Laude - Electrical Engineering 2020</h3>
                <LinkedImage {...HonorsArray[2]} />
                <LinkedImage {...HonorsArray[3]} />
            </div>

            <div className={Styles.verticalCertificate}>
                <h3>Summa Cum Laude - Physics 2019</h3>
                <LinkedImage {...HonorsArray[4]} />
                <LinkedImage {...HonorsArray[5]} />
            </div>

            <div className={Styles.verticalCertificate}>
                <h3>Dean's List 2019</h3>
                <LinkedImage {...HonorsArray[6]} />
            </div>

            <div className={Styles.verticalCertificate}>
                <h3>Dean's List 2018</h3>
                <LinkedImage {...HonorsArray[7]} />
            </div>

            <div className={Styles.gap} />
        </div>
    );
}

export default Honors;
