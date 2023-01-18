import { useState, useEffect, useContext, useCallback } from 'react';

import styles from './Resume.module.css';
import PageContext from '../../Store/page-context';
import tree from '../../assets/tree.svg';
const Resume = () => {
    const [scrollAmount, setScrollAmount] = useState("0%");
    const ctx = useContext(PageContext);
    const [opacity, setOpacity] = useState(0);

    const scrollHandler = (e) => {
        let proportion = null;
        if (window.matchMedia("(min-width: 1280px)").matches) {
            proportion = 80;
        } else {
            proportion = 95;
        }
        setScrollAmount(e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight)*proportion + "%");
    }

    const toggleOpacity = useCallback(() => {
        setOpacity((prevOpacity) => prevOpacity ? 0 : 1)
    }, [])

    useEffect(() => {
        setTimeout(toggleOpacity, 5);
    }, [toggleOpacity])

    useEffect(() => {
        
        if (ctx.currentPage !== ctx.delayedPage) {
            toggleOpacity()
        }
    }, [ctx, toggleOpacity])
   
    return (   
        <div id="resume" className={styles.container} style={{opacity: opacity}} onScroll={scrollHandler}>
                <div className={styles.main}>
                    <div className={styles['scroll-container']}>
                        <div className={styles.scrollbar} style={{top: scrollAmount}}/>
                    </div>
                    <h2>Experiences</h2>
                    <div className={styles.flex}>
                        <p>Computer Science Tutor</p>
                        <p style={{textAlign: "right"}}>0/3/2022 - 12/2022</p>
                    </div>
                    <ul>
                        <li>Computer Science tutoring center geared towards adolescents</li>
                        <li>Specialized in instruction of game development</li>
                        <li>Communicated understanding of programming languages including JavaScript, C# and Lua</li>
                        <li>Utilized Unity as primary engine for development</li>
                    </ul>
                    <div className={styles.flex}>
                        <p>Private Tutor</p>
                        <p style={{textAlign: "right"}}>2018-Present</p>
                    </div>
                    <ul>
                        <li>Explain mathematics and computer science concepts to college/high school students </li>
                        <li>Located weaknesses in conceptual understanding to maximize improvement</li>
                        <li>Courses taught include Pre-calculus, Calculus I/II, Discrete Mathematics, and Programming in C</li>
                    </ul>
                    <br></br>
                    <h2>Education</h2>
                    <div className={styles.flex}>
                        <p>Florida Atlantic University</p>
                        <p style={{textAlign: "right"}}>08/2021 - 05/2024</p>
                    </div>
                    <ul>
                        <li>Pursuing Bachelor's of Science in Computer Science, Minor in Mathematics</li>
                        <li>GPA 4.0 (Engineering Dean's List, President's Honor List)</li>
                        <li>Variety of courses geared towards software engineering & data science</li>
                        
                            <ul>
                                <li>Full-Stack Web Development (ongoing)</li>
                                <li>Design/Analysis of Algorithms (ongoing)</li>
                                <li>Data Structures & Algorithms</li>
                                <li>Database Systems</li>
                                <li>Internet Computing</li>
                                <li>Foundations of Computer Science</li>
                                <li>Stochastic Models</li>
                            </ul>
                        
                    </ul>
                    <div className={styles.flex}>
                        <p>Park Vista Community High School</p>
                        <p style={{textAlign: "right"}}>Graduated 2021</p>
                    </div>
                    <ul>
                        <li>GPA 3.98/4.00, HPA 5.15/6.00</li>
                        <li>SAT Verbal 700/800, Mathematics 730/800</li>
                        <li>Class Rank 8/733</li>
                        <ul>
                            <li>Full-Stack Web Development (ongoing)</li>
                            <li>Design/Analysis of Algorithms (ongoing)</li>
                            <li>Data Structures & Algorithms</li>
                            <li>Database Systems</li>
                            <li>Internet Computing</li>
                            <li>Foundations of Computer Science</li>
                            <li>Stochastic Models</li>
                        </ul>
                        
                    </ul>
                    <br></br>
                    <h2>Technologies</h2>
                    <br></br>
                    <img src={tree} alt="A ever-growing list of technologies I have experience with"></img>
                    <br></br><br></br>
                    <p>Always open to learning new technologies!</p>
                </div>
            </div>
    );
}
export default Resume;