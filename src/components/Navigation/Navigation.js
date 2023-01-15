import { useState, useEffect, useContext, useCallback } from "react";

import styles from "./Navigation.module.css";
import ButtonLink from "../UI/ButtonLink/ButtonLink";
import PageContext from '../../Store/page-context'

const Navigation = (props) => {
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
        if (ctx.page === ctx.delayedPage) {
            ctx.changePage(props.links[index])
        }
    }
    const navDiamondHandler = useCallback((page) => {
        //transition: top 0.3s ease-in-out;
        let pageIndex = props.links.findIndex(page => page === ctx.page)
        let delayedPageIndex = props.links.findIndex(page => page === ctx.delayedPage) 
        setTransitionLength("top " + (0.2 + 0.1*Math.abs(pageIndex-delayedPageIndex)) + "s ease-in-out");
        setPosition((1 + 90/(props.links.length-1)*pageIndex)+"%");
    }, [ctx, props.links]);

    useEffect(() => {
        navDiamondHandler(ctx.page)
    }, [ctx, navDiamondHandler])

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
                    {props.links.map((link, index) => {
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
