import Script from "next/script";
import TocStyles from "./toc.module.css";
import { useEffect } from "react";

export default function TOC({ width = "15%" }) {
    /* Thanks to Chris Coyier for the IntersectionObserver and css (toc.module.css) code:
    "Sticky Table of Contents with Scrolling Active States" published on Jan 30, 2020.
    https://css-tricks.com/sticky-table-of-contents-with-scrolling-active-states/

    *** Several changes were made to work with NextJS. ***
    */
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute("id");

                // Temporary fix to prevent this code from running on every single page and raising an error
                if (document.querySelector(`a[href="#${id}"]`) != null) {
                    if (entry.isIntersecting) {
                        document
                            .querySelector(`a[href="#${id}"]`)
                            .parentElement.classList.add(`${TocStyles.active}`);
                    } else {
                        document
                            .querySelector(`a[href="#${id}"]`)
                            .parentElement.classList.remove(
                                `${TocStyles.active}`
                            );
                    }
                }
            });
        });
        document.querySelectorAll("h2[id], h4[id]").forEach((header) => {
            observer.observe(header);
        });
    }, []);

    return (
        <>
            <nav
                id="TOC"
                className={TocStyles["section-nav"]}
                style={{ "--toc-width": width }}
            >
                <Script id="my-script">{`
            var toc = document.getElementById('TOC');
            var header = document.createElement('span');
            header.innerHTML="Table of Contents";
            toc.appendChild(header);
            var unorder_ls = document.createElement('ul');
            unorder_ls.className = "toc-list";
            var temp_ls;
            var h = ["h2", "h4"];
            var headings = [];
            const sections = document.getElementsByTagName("section");

            Array.from(sections).forEach((section, index) => {
                if (index != 0)
                {
                    for (var j=0; j < h.length; j++){
                        var sub_list = 0;
                        headings = section.querySelectorAll(h[j]);
                        headings.forEach(item => {

                            var temp_section = document.createElement('li');
                            var link = document.createElement('a');
                            link.href = "#"+item.id;
                            link.innerHTML = item.innerText;
                            link.scroll = false;

                            if (item.tagName == "H4"){
                                if(sub_list == 0){
                                    sub_list = 1;
                                    temp_ls = document.createElement('ul');
                                }
                                var temp_ul = document.createElement('ul');
                                temp_ul.appendChild(link);
                                temp_ls.appendChild(temp_ul);
                                if (j == h.length -1 ){
                                    temp_section.appendChild(temp_ls);
                                }

                            }
                            else{
                                sub_list = 0
                                temp_section.appendChild(link);
                            }


                            unorder_ls.appendChild(temp_section);
                          });
                    }
                }
            });

            toc.appendChild(unorder_ls);
          `}</Script>
            </nav>
        </>
    );
}
