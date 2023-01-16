import Script from 'next/script'
import TocStyles from '/styles/toc.module.css'

export default function TOC() {
  return (
      <>
    <nav id = "TOC" className={TocStyles['section-nav']}>
        <Script id="my-script">{
          `
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
                                temp_ls.appendChild(link)
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
  )
}
