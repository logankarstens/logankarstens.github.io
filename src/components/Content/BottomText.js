import { useContext, useEffect, useState } from "react";
import styles from "./BottomText.module.css";
import PageContext from "../../Store/page-context";
import PageTexts from "./PageTexts";
import { delay } from "../../Store/page-context";
const BottomText = () => {
    const ctx = useContext(PageContext);
    const [offset, setOffset] = useState(-36);
    useEffect(() => {
        setTimeout(() => {
            setOffset(0);
        }, 5);
    }, []);
    useEffect(() => {
        setOffset(-36);
        setTimeout(() => {
            setOffset(0);
        }, delay);
    }, [ctx.currentPage]);
    return (
        <div className={styles.main} style={{flexDirection: ctx.isPortrait ? 'column' : 'row'}}>
            <div
                className={styles.left}
                style={{
                    marginLeft: offset + "rem",
                    alignSelf: ctx.isPortrait ? '' : 'flex-end',
                    transition: "margin-left " + delay / 1000 + "s " + (!offset ? "ease-out" : "ease-in"),
                }}
            >
                <PageTexts page={ctx.delayedPage} type="title" />
            </div>
            <div
                className={styles.right}
                style={{
                    marginRight: 1.2 * offset + "rem",
                    transition: "margin-right " + delay / 1000 + "s " + (!offset ? "ease-out" : "ease-in"),
                    width: (ctx.delayedPage === "resume" || ctx.delayedPage === "contact") && "0",
                }}
            >
                <PageTexts page={ctx.delayedPage} type="paragraph" />
            </div>
        </div>
    );
};
export default BottomText;
