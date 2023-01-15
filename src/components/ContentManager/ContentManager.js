import { useEffect, useContext, useCallback, } from 'react';
import styles from './ContentManager.module.css'
import BottomText from '../Content/BottomText';
import PageContext from '../../Store/page-context';
const ContentManager = (props) => {
    const ctx = useContext(PageContext);
    const scrollHandler = useCallback((e) => {
            if (ctx.page === ctx.delayedPage) {
                let index = props.links.findIndex(maybePage => maybePage === ctx.page)
                if((e.deltaY > 0 && index < props.links.length - 1) || (e.deltaY < 0 && index > 0)) {
                    index += e.deltaY > 0 ? 1 : -1;
                    ctx.changePage(props.links[index]);
                }
            }
    }, [ctx, props.links]);

    useEffect(() => {
        window.addEventListener('wheel', scrollHandler);
        return () => {
            window.removeEventListener('wheel', scrollHandler)
        }
    }, [ctx, scrollHandler])

//    const pages = {
//         home: <Home />, 
//         projects: <Projects />, 
//         resume: <Resume />, 
//         contact: <Contact />
//     }

//     let currentPage = pages[ctx.delayedPage]


    return (
        <div className={styles.test} onScroll={scrollHandler}>
            <BottomText />
        </div>
    )
}

export default ContentManager;