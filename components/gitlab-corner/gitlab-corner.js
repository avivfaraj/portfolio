import Styles from "./gitlab-corner.module.css";


export default function GitlabCorner(props) {
  const { href, target="_blank"} = props;

  return (
    <a href={href} className={Styles['gitlab-corner']} aria-label="View source on GitLab" target={target}>
    	<svg id="logo_art" data-name="logo art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 586 559">
    	<g id="g44">
    		<path id="path46" className={Styles["cls-r-1"]} d="M461.17,301.83l-18.91-58.12L404.84,128.43a6.47,6.47,0,0,0-12.27,0L355.15,243.64H230.82L193.4,128.43a6.46,6.46,0,0,0-12.26,0L143.78,243.64l-18.91,58.19a12.88,12.88,0,0,0,4.66,14.39L293,435,456.44,316.22a12.9,12.9,0,0,0,4.73-14.39"/>
    	</g>
    	<g id="g48">
    		<path id="path50" className={Styles["cls-r-3"]} d="M293,434.91h0l62.16-191.28H230.87L293,434.91Z"/>
    	</g>
    	<g id="g56">
    		<path id="path58" className={Styles["cls-r-2"]} d="M293,434.91,230.82,243.63h-87L293,434.91Z"/>
    	</g>
    	<g id="g64">
    		<path id="path66" className={Styles["cls-r-1"]} d="M143.75,243.69h0l-18.91,58.12a12.88,12.88,0,0,0,4.66,14.39L293,435,143.75,243.69Z"/>
    	</g>
    	<g id="g72">
    		<path id="path74" className={Styles["cls-r-6"]} d="M143.78,243.69h87.11L193.4,128.49a6.47,6.47,0,0,0-12.27,0l-37.35,115.2Z"/>
    	</g>
    	<g id="g76">
    		<path id="path78" className={Styles["cls-r-4"]} d="M293,434.91l62.16-191.28H442.3L293,434.91Z"/>
    	</g>
    	<g id="g80">
    		<path id="path82" className={Styles["cls-r-5"]} d="M442.24,243.69h0l18.91,58.12a12.85,12.85,0,0,1-4.66,14.39L293,434.91l149.2-191.22Z"/>
    	</g>
    	<g id="g84">
    		<path id="path86" className={Styles["cls-r-6"]} d="M442.28,243.69h-87.1l37.42-115.2a6.46,6.46,0,0,1,12.26,0l37.42,115.2Z"/>
    	</g>
    </svg>
   </a>
  );
}
