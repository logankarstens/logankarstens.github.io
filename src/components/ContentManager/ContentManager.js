import { useEffect, useContext, useCallback } from 'react';
import styles from './ContentManager.module.css'
import BottomText from '../Content/BottomText';
import Resume from '../Content/Resume';
import Contact from '../Content/Contact';
import PageContext from '../../Store/page-context';

const ContentManager = () => {
    // const [swipeData, setSwipeData] = useState();
    const ctx = useContext(PageContext);
    const scrollHandler = useCallback((e) => {
        const resume = document.getElementById("resume")
        if (!(resume && resume.contains(e.target)) && ctx.currentPage === ctx.delayedPage) {
            let index = ctx.pages.findIndex(maybePage => maybePage === ctx.currentPage)
            if((e.deltaY > 0 && index < ctx.pages.length - 1) || (e.deltaY < 0 && index > 0)) {
                index += e.deltaY > 0 ? 1 : -1;
                ctx.changePage(ctx.pages[index]);
            }
        }
    }, [ctx]);

    // const swipeHandler = (e) => (swipeFinished) => {
    //     if (swipeData !== null) {
    //         setSwipeData(e.changedTouches[0].screenY)
    //     } else {
    //         if (e.changedTouches[0].screenY > swipeData) {
    //             console.log("swipe down");
    //         } else {
    //             console.log("swipe up");
    //         }
    //         setSwipeData(null)
    //     }
    // }

    useEffect(() => {
        const scrollArea = document.getElementById("contentmanager");
        scrollArea.addEventListener('wheel', scrollHandler);
        // document.addEventListener('touchstart', swipeHandler)
        // document.addEventListener('touchend', swipeHandler)
        return () => {
            scrollArea.removeEventListener('wheel', scrollHandler)
        }
        
    }, [ctx, scrollHandler])

    const isVerticalLayout = (ctx.delayedPage === "projects" || ctx.delayedPage === "contact")

    
    return (
        <>
            <div id="contentmanager" className={`${styles.container} ${isVerticalLayout && styles.verticalLayout}`} onScroll={scrollHandler}>
                <div className={styles.filler}>
                <BottomText />
                </div>
                {(ctx.delayedPage === "resume") && <Resume />}
                {(ctx.delayedPage === "contact") && <Contact />}
                {/* {(ctx.delayedPage === "contact") && <Contact />} */}
            </div>
        </>
    )
}

export default ContentManager;