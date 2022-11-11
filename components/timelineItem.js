/* Thanks to Borges53 for the Timeline code:
https://github.com/Borges53/Timeline/blob/main/components/Timeline/item.js
*/

import Link from 'next/link'
import React from "react";
import Styles from '../styles/timeline.module.css'


export default function item({data}){
  const {title, description, start_date } = data;
  return(
      <div className={Styles['container-item']}>
        <div className={Styles['container-content-item']}>
          <div className={Styles['container-content-header']}>
          <div className={Styles['container-content-header-background']}>
            {start_date}
          </div>
            <span className={`${Styles["container-content-header-time"]}`}>
              {title}
            </span>


             <span className={Styles["container-content-desc-item"]}>{description}</span>
          </div>
        </div>
      </div>
    );
}
