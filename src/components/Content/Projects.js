import { useState, useEffect, useContext, useCallback, useRef } from "react";

import styles from "./Projects.module.css";
import ProjectData from "../../assets/Data/ProjectData";
import ButtonLink from "../UI/ButtonLink/ButtonLink";

import PageContext from "../../Store/page-context";

const Projects = (props) => {
    const ctx = useContext(PageContext);
    const [projectIndex, setProjectIndex] = useState(0);
    const [hover, setHover] = useState(false);

    const projects = useRef();

    const updateMouseScroll = props.setMouseInScrollableArea;

    const hoverHandler = () => {
        updateMouseScroll((prev) => !prev);
        setHover((prev) => !prev);
    };

    // mouseInScrollableArea compatability for swipes on mobile devices
    
    const swipeStartHandler = useCallback((e) => {
        updateMouseScroll(projects && projects.current.contains(e.target))
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
   

    const currentProject = ProjectData[projectIndex];

    const changeProject = (direction) => (e) => {
        if (direction === "left") {
            if (projectIndex > 0) {
                setProjectIndex((prevIndex) => prevIndex-1);
            } else {
                setProjectIndex(ProjectData.length - 1);
            }
        } else {
            if (projectIndex < ProjectData.length - 1) {
                setProjectIndex((prevIndex) => prevIndex+1);
            } else {
                setProjectIndex(0);
            }
        }
    }

    return (
        <div className={styles.container} style={{ opacity: ctx.opacity, transition: "opacity 0.4s ease-out" }}>
            <div className={styles.main} ref={projects} onMouseEnter={hoverHandler} onMouseLeave={hoverHandler}>
                <div
                    className={styles["img-container"]}
                    style={{
                        backgroundImage: "url(" + currentProject.image + ")",
                        filter: hover === true ? "blur(10px) brightness(40%)" : "",
                    }}
                />
                <div className={styles["img-overlay"]} style={{ opacity: hover === false ? 1 : 0 }} />
                <div className={styles.text} style={{ opacity: hover === false ? 0 : 1 }}>
                    {currentProject.text.map((paragraph, index) => {
                        return (
                            <p key={index} style={{ color: currentProject.color }}>
                                {paragraph}
                            </p>
                        );
                    })}
                </div>
               
                <div className={styles.bottom}>
                <ButtonLink className={styles['left-button']}  onClick={changeProject("left")} fullButton={true} hover={true}>&lt;</ButtonLink>
                <ButtonLink className={styles['right-button']} onClick={changeProject("right")} fullButton={true} hover={true}>&gt;</ButtonLink>
                    <h2 style={{ color: currentProject.color }}>{currentProject.title}</h2>
                    <h2><a className={styles.underline} href={currentProject.link} style={{ color: currentProject.color }}>visit</a></h2>
                </div>
            </div>
        </div>
    );
};

export default Projects;
