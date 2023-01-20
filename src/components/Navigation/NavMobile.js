import { useContext } from "react";

import styles from "./Navigation.module.css";
import ButtonLink from "../UI/ButtonLink/ButtonLink";
import PageContext from "../../Store/page-context";
const NavMobile = () => {
    const ctx = useContext(PageContext);

    const currentSectionHandler = index => e => {
        if (ctx.currentPage === ctx.delayedPage) {
            ctx.changePage(ctx.pages[index])
        }
    }

    return (    
        <div className={styles["nav-mobile"]}>
            <div className={styles['flex-container']}>
                {ctx.pages.map((link, index) => {
                    return (
                        <div key={index} className={styles['align-vertical']}>
                            <ButtonLink onClick={currentSectionHandler(index)}>{link}</ButtonLink>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NavMobile;
