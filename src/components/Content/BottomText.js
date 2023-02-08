import { useContext, useEffect, useState } from "react";
import styles from "./BottomText.module.css";
import PageContext from "../../Store/page-context";
import PageTexts from "../../assets/Data/PageTexts";
import { delay } from "../../Store/page-context";
const BottomText = () => {
    const ctx = useContext(PageContext);
    const [expand, setExpand] = useState(false);

    // slide in bottomtext elements on page load
    useEffect(() => {
        setTimeout(() => {
            setExpand(true);
        }, 5);
    }, []);
    // slide out/in bottomtext elements on page change
    useEffect(() => {
        setExpand(false);
        setTimeout(() => {
            setExpand(true);
        }, delay);
    }, [ctx.currentPage]);

    return (
        <div className={styles.main} style={{flexDirection: ctx.isPortrait && ctx.delayedPage === "home" ? 'column' : 'row'}}>
            <div
                className={`${styles.left} ${!expand ? styles['left-expand'] : ''}`}
                style={{alignSelf: ctx.isPortrait ? '' : 'flex-end'}}
            >
                <div>
                    <h2><strong>&#60;&#62;</strong></h2>
                    <h1>{PageTexts.get(ctx.delayedPage).title}</h1>
                    <h2>&#60;/&#62;</h2>
                </div>
                
            </div>
            <div
                className={`${styles.right} ${!expand ? styles['right-expand'] : ''}`}
                style={{width: (ctx.delayedPage === "resume" || ctx.delayedPage === "contact") && "0"}}
            >
                <div>
                    {PageTexts.get(ctx.delayedPage).text.map((paragraph, index) => {
                        return (<p key={index}>{paragraph}</p>)
                    })}
                    <br />
                </div>
            </div>
        </div>
    );
};
export default BottomText;
