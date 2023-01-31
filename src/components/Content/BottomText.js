import { useContext, useEffect, useState } from "react";
import styles from "./BottomText.module.css";
import PageContext from "../../Store/page-context";
import PageTexts from "../../assets/Data/PageTexts";
import { delay } from "../../Store/page-context";
const BottomText = () => {
    const ctx = useContext(PageContext);
    const [offset, setOffset] = useState(-36);

    // slide in bottomtext elements on page change
    useEffect(() => {
        setTimeout(() => {
            setOffset(0);
        }, 5);
    }, []);
    // slide out bottomtext elements on page change
    useEffect(() => {
        setOffset(-36);
        setTimeout(() => {
            setOffset(0);
        }, delay);
    }, [ctx.currentPage]);
    
    return (
        <div className={styles.main} style={{flexDirection: ctx.isPortrait && ctx.delayedPage === "home" ? 'column' : 'row'}}>
            <div
                className={styles.left}
                style={{
                    marginLeft: offset + "rem",
                    alignSelf: ctx.isPortrait ? '' : 'flex-end',
                    transition: "margin-left " + delay / 1000 + "s " + (!offset ? "ease-out" : "ease-in"),
                }}
            >

                <div>
                    <h2><strong>&#60;&#62;</strong></h2>
                    <h1>{PageTexts.get(ctx.delayedPage).title}</h1>
                    <h2>&#60;/&#62;</h2>
                </div>
                
            </div>
            <div
                className={styles.right}
                style={{
                    marginRight: 1.2 * offset + "rem",
                    transition: "margin-right " + delay / 1000 + "s " + (!offset ? "ease-out" : "ease-in"),
                    width: (ctx.delayedPage === "resume" || ctx.delayedPage === "contact") && "0",
                }}
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
