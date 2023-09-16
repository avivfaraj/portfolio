import { Fragment } from "react";
import Styles from "/components/layout/layout.module.css";
import Iframe from "react-iframe";
function Publication() {
  return (
    <Fragment>
      <div className={Styles.gap}></div>
      {/* <Iframe
        url="http://rdcu.be/b5Vhh"
        width="640px"
        height="320px"
        id=""
        className=""
        display="block"
        position="relative"
      /> */}
      <embed
        src="http://rdcu.be/b5Vhh"
        title="Automated, Convenient and Compact Auto-correlation Measurement for an Ultra-fast Laser Pulse"
      ></embed>
    </Fragment>
  );
}

export default Publication;
