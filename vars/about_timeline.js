import Styles from '../styles/timeline.module.css'
import HoverLink from '../components/hoverLink'

const steps =[
  {
    title: "Course Assistant",
    description: <p>CA for Data Acquisition and Pre-Processing at Drexel University</p>,
    start_date: "Sep 2022",
  },
  {
    title: "Data Analyst Intern at USAA",
    description: <p>Developed ML classification model during a 10-week internship at USAA, San Antonio.</p>,
    start_date: "Jun 2022",
  },
  {
    title: "Upsilon Pi Epsilon Induction",
    description: <p>Inducted as a member of Drexel Chapter of UPE, the international society for information and computing disciplines</p>,
    start_date: "May 2022",
  },
  {
    title: "Webmaster",
    description: <p>Webmaster of two Virginia Beach local clubs: <HoverLink href = {"https://pagardenclub.org"} alt = {"Princess Anne Garden Club"} /> and <HoverLink href = {"https://gallery1932.com"} alt = {"Gallery1932"} /> </p>,
    start_date: "Sep 2022",
  },
  {
    title: <HoverLink href = {"https://drexel.edu"} alt = {"Drexel University"} />,
    description: <p>Enrolled in Master of Science in Data Science</p>,
    start_date: "Mar 2021",
  },
  {
    title: "Graduated Electrical Engineering",
    description: <p>Bachelor of Science in Electrical and Electronics Engineering with Magna Cum Laude.</p>,
    start_date: "Aug 2020",
  },
  {
    title: "Published an article",
    description: <p>Farag, A., Nause, A. <i>Automated, Convenient and Compact Auto-correlation Measurement for an Ultra-fast Laser Pulse.</i> Instrum Exp Tech 63, 547–550 (2020). doi:  <HoverLink href = {"https://doi.org/10.1134/S0020441220040028"} alt = {"10.1134/S0020441220040028"} /></p>,
    start_date: "July 2020",
  },
  {
    title: "Graduated Physics",
    description: <p>Bachelor of Science in Physics with Summa Cum Laude</p>,
    start_date: "Aug 2019",
  },
  {
    title: "Dean's List - Physics",
    description: <p></p>,
    start_date: "Apr 2019",
  },
  {
    title: "Dean's List - Physics",
    description: <p></p>,
    start_date: "Apr 2018",
  },
  {
    title: "Enrolled in Dual Bachelor Degree",
    description: <p>Dual Bachelor in Physics & Electrical Engineering, <HoverLink href = {"https://www.ariel.ac.il/wp/en/"} alt = {"Ariel University"} /></p>,
    start_date: "Oct 2016",
  }

];

export default steps;
