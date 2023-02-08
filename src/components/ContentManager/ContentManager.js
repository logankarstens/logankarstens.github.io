import { useState, useEffect, useContext, useCallback, useRef } from "react";
import styles from "./ContentManager.module.css";

import BottomText from "../Content/BottomText";
import Resume from "../Content/Resume";
import Contact from "../Content/Contact";
import Projects from "../Content/Projects"

import PageContext from "../../Store/page-context";

const ContentManager = () => {
    const ctx = useContext(PageContext);
    const [mouseInScrollableArea, setMouseInScrollableArea] = useState(false);
    const [swipeStartPosition, setSwipeStartPosition] = useState();

    // changes current page on scroll
    const scrollHandler = useCallback(
        (e) => {
            let delta = e.deltaY === undefined ? e : e.deltaY;
            if (!mouseInScrollableArea && ctx.currentPage === ctx.delayedPage) {
                let index = ctx.pages.findIndex((maybePage) => maybePage === ctx.currentPage);
                if ((delta > 0 && index < ctx.pages.length - 1) || (delta < 0 && index > 0)) {
                    const change = delta > 0 ? 1 : -1;

                    index += change;
                    ctx.changePage(ctx.pages[index]);
                }
            }
        },
        [ctx, mouseInScrollableArea]
    );

     // changes current page on swipe
    const swipeHandler = useCallback(
        (e) => {
            const touchPosition = e.changedTouches[0].screenY;
            if (e.type === "touchstart") {
                setSwipeStartPosition(touchPosition);
            } else if (e.type === "touchend") {
                scrollHandler(swipeStartPosition - touchPosition);
            }
        },
        [swipeStartPosition, setSwipeStartPosition, scrollHandler]
    );

    const wrapper = useRef();

    // adds scroll/swipe listeners for custom scrolling
    useEffect(() => {
        const cm = wrapper.current;
        window.addEventListener("wheel", scrollHandler);
        cm.addEventListener("touchstart", swipeHandler);
        cm.addEventListener("touchend", swipeHandler);
        return () => {
            window.removeEventListener("wheel", scrollHandler);
            cm.removeEventListener("touchstart", swipeHandler);
            cm.removeEventListener("touchend", swipeHandler);
        };
    }, [ctx, scrollHandler, swipeHandler]);

    // determines whether page layout should be vertical or horizontal based on viewport width
    const isVertical = ctx.isPortrait || ctx.delayedPage === "projects" || ctx.delayedPage === "contact";

    return (
        <>
            <div
                className={`${styles.container} ${isVertical ? styles.vertical : styles.horizontal}`}
                onScroll={scrollHandler}
                ref={wrapper}
            >
                {ctx.delayedPage === "projects" && <Projects setMouseInScrollableArea={setMouseInScrollableArea}/>}
                {ctx.delayedPage === "contact" && <Contact />}
                <BottomText />
                {ctx.delayedPage === "resume" && <Resume setMouseInScrollableArea={setMouseInScrollableArea} />}
                
            </div>
        </>
    );
};

export default ContentManager;
