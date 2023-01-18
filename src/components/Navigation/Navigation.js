import { useState, useEffect, useContext, useCallback } from "react";

import styles from "./Navigation.module.css";
import ButtonLink from "../UI/ButtonLink/ButtonLink";
import PageContext from '../../Store/page-context'

const Navigation = () => {
    const ctx = useContext(PageContext);
    const [expanded, setExpanded] = useState(false);
    const [title, setTitle] = useState("lk.");
    const [position, setPosition] = useState("1%");
    const [transitionLength, setTransitionLength] = useState(0);
    const toggleExpanded = () => {
        setExpanded((prevState) => !prevState);
    };

    useEffect(() => {
        let timer;
        if (!expanded) {
            setTitle("lk.");
        } else {
            timer = setTimeout(() => {
                setTitle("logan karstens.");
            }, 200);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [expanded]);

    const currentSectionHandler = index => e => {
        if (ctx.currentPage === ctx.delayedPage) {
            ctx.changePage(ctx.pages[index])
        }
    }
    const navDiamondHandler = useCallback((page) => {
        let pageIndex = ctx.pages.findIndex(page => page === ctx.currentPage)
        let delayedPageIndex = ctx.pages.findIndex(page => page === ctx.delayedPage) 
        setTransitionLength("top " + (0.2 + 0.08*Math.abs(pageIndex-delayedPageIndex)) + "s ease-in-out");
        setPosition((1 + 90/(ctx.pages.length-1)*pageIndex)+"%");
    }, [ctx]);

    useEffect(() => {
        navDiamondHandler(ctx.currentPage)
    }, [ctx.currentPage, navDiamondHandler])

    return (
        <div
            className={`${styles.nav} ${expanded ? styles.expanded : styles.contracted}`}
            onMouseEnter={toggleExpanded}
            onMouseLeave={toggleExpanded}
        >
            <h1>{title}</h1>
            <div className={styles.wrapper}>
                <div className={styles.currentSection} style={{ top: position, transition: transitionLength }}></div>
                <div className={styles["links-container"]}>
                    {ctx.pages.map((link, index) => {
                        return (
                            <div key={index}>
                                <ButtonLink onClick={currentSectionHandler(index)}>
                                    {link}
                                </ButtonLink>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Navigation;
