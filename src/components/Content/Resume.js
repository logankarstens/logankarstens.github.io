import React, { useState, useEffect, useContext, useCallback, useRef } from "react";

import styles from "./Resume.module.css";
import PageContext from "../../Store/page-context";
import tree from "../../assets/vectors/tree.svg";
const Resume = (props, ref) => {
    const ctx = useContext(PageContext);

    const [scrollAmount, setScrollAmount] = useState("0%");
    const [scrollRange, setScrollRange] = useState();

    const resume = useRef();
    const scrollHandler = useCallback((e) => {
        let scrollElement;
        scrollElement = e.target === undefined ? e.current : e.target;
        setScrollRange(scrollElement.offsetHeight);
        setScrollAmount(
            (scrollElement.scrollTop / (scrollElement.scrollHeight - scrollElement.clientHeight)) * 80 + "%"
        );
    }, []);
    
    const updateMouseScroll = props.setMouseInScrollableArea;

    // updates mouseInScrollableArea so ContentManager knows whether to switch pages on scroll
    const mouseEnterHandler = () => {
        updateMouseScroll(true)
    };
    const mouseLeaveHandler = () => {
        updateMouseScroll(false)
    };
    
    // mouseInScrollableArea compatability for swipes on mobile devices
    
    const swipeStartHandler = useCallback((e) => {
        updateMouseScroll(resume && resume.current.contains(e.target))
    }, [updateMouseScroll])
    
    // creates event listener for mobile-compatible mouseScroll handler,
    // ensures mouseSetInScrollableArea is set to false before unrendering
    useEffect(() => {

        window.addEventListener("touchstart", swipeStartHandler);
        
        return () => {
            window.removeEventListener("touchstart", swipeStartHandler);
            updateMouseScroll(false);
        }
    }, [swipeStartHandler, updateMouseScroll]);

    useEffect(() => {
        if (ctx.currentPage !== ctx.delayedPage) {
            updateMouseScroll(false)
        }
    }, [ctx, updateMouseScroll]);

    // custom scrollbar container updates on change between portrait and landscape
    useEffect(() => {
        scrollHandler(resume);
    }, [ctx.isPortrait, scrollHandler]);

    return (
        <div
            className={styles.container}
            style={{ opacity: ctx.opacity, transition: "opacity 0.4s ease-out" }}
            onScroll={scrollHandler}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            ref={resume}
        >
            <div className={styles["scroll-container"]} style={{ height: "calc(" + scrollRange + "px - 6rem)" }}>
                <div className={styles.scrollbar} style={{ top: scrollAmount }} />
            </div>
            <div className={styles.main}>
                <h2>Experiences</h2>
                <div className={styles.flex}>
                    <p>Computer Science Tutor</p>
                    <p style={{ textAlign: "right" }}>0/3/2022 - 12/2022</p>
                </div>
                <ul>
                    <li>Computer Science tutoring center geared towards adolescents</li>
                    <li>Specialized in instruction of game development</li>
                    <li>Communicated understanding of programming languages including JavaScript, C# and Lua</li>
                    <li>Utilized Unity as primary engine for development</li>
                </ul>
                <div className={styles.flex}>
                    <p>Private Tutor</p>
                    <p style={{ textAlign: "right" }}>2018-Present</p>
                </div>
                <ul>
                    <li>Explain mathematics and computer science concepts to college/high school students </li>
                    <li>Located weaknesses in conceptual understanding to maximize improvement</li>
                    <li>
                        Courses taught include Pre-calculus, Calculus I/II, Discrete Mathematics, and Programming in C
                    </li>
                </ul>
                <br></br>
                <h2>Education</h2>
                <div className={styles.flex}>
                    <p>Florida Atlantic University</p>
                    <p style={{ textAlign: "right" }}>08/2021 - 05/2024</p>
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
                    <p style={{ textAlign: "right" }}>Graduated 2021</p>
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
                <div className={styles.img}><img src={tree} alt="An ever-growing list of technologies I have experience with" /></div>
               
                <br></br>
                <br></br>
                <p>Always open to learning new technologies!</p>
            </div>
        </div>
    );
};
export default Resume;
