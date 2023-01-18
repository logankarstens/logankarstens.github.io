import { useContext, useEffect, useState } from 'react';
import styles from './BottomText.module.css';
import PageContext from '../../Store/page-context';
import PageTexts from './PageTexts';
const BottomText = () => {
    
    const ctx = useContext(PageContext);
    const [offset, setOffset] = useState(-36);
    useEffect(() => {
        setTimeout(() => {
            setOffset(0);
        }, 5);
    }, [])
    useEffect(() => {
        setOffset(-36);
        setTimeout(() => {
            setOffset(0);
        }, 600);
    }, [ctx.currentPage])
    return (
        <div className={styles.main}>
            <div className={styles.left} style={{marginLeft: offset + "rem"}} >
                <PageTexts page={ctx.delayedPage} type="title" />
            </div> 
            <div className={styles.right} style={{marginRight: 1.2*offset + "rem"}} >
                <PageTexts page={ctx.delayedPage} type="paragraph" />
            </div>
        </div>
    );
}
export default BottomText;