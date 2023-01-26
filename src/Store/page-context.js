import React, { useState, useEffect, useMemo, useCallback } from "react";

// base pagecontext layout: includes list of all pages, current page, viewport condition, etc
const PageContext = React.createContext({
    pages: [],
    currentPage: "",
    delayedPage: "",
    changePage: (page) => {},
    isPortrait: null,
    lastEmailTime: 0,
    confirmEmail: (time) => {},
    opacity: 1,
});

export const delay = 500;
export const PageContextProvider = (props) => {
    const pages = useMemo(() => ["home", "projects", "resume", "contact"], [])
    const [pageData, setPageData] = useState({pages: pages, currentPage: "home", delayedPage: "home", isPortrait: null});
    const [lastEmailTime, setLastEmailTime] = useState(0);
    const [opacity, setOpacity] = useState(1);

    // changes viewport condition in context on window resize
    const resizeHandler = useCallback(() => {
        setPageData((prevData) => {
            return {
                ...prevData, 
                isPortrait: !window.matchMedia("(min-width: 1100px)").matches
            }
        })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
    })

    // changes page
   
    const changePageHandler = (newPage) => {
        localStorage.setItem("currentPage", newPage)
        setPageData((prevPageData) => {
            return {
                ...prevPageData,
                currentPage: newPage
            }
        })
    }

    // updates delayedPage to match currentPage

    const updatePageHandler = () => {
        setPageData((prevPageData) => {
            return {
                ...prevPageData,
                delayedPage: prevPageData.currentPage
            }
        })
    }

    // stores last time email is sent in localstorage (vulnerable)
    const confirmEmailHandler = (time) => {
        setLastEmailTime(time);
        localStorage.setItem("lastEmailTime", time);
        
    }

    // localstorage conditions for remembering last email send and currentPage between refreshes
    useEffect(() => {
        if (pages.find(page => page === localStorage.getItem("currentPage")) !== undefined) {
            changePageHandler(localStorage.getItem("currentPage"))
            updatePageHandler();
        }
        if (localStorage.getItem("lastEmailTime") !== undefined) {
            setLastEmailTime(localStorage.getItem("lastEmailTime"));
        }
    }, [pages, lastEmailTime])

    useEffect(() => {
        resizeHandler();
    }, [resizeHandler])


    const toggleOpacity = useCallback(() => {
        setOpacity((prevOpacity) => {
            return (prevOpacity ? 0 : 1)
        });
    }, []);

    // pulses opacity of opacity-changing elements on page change
    useEffect(() => {
        toggleOpacity();
        setTimeout(() => {
            updatePageHandler();
            setTimeout(toggleOpacity, 5);
        }, delay)
    }, [pageData.currentPage, toggleOpacity]);

    return (
        <PageContext.Provider
            value={{
                pages: pageData.pages,
                currentPage: pageData.currentPage,
                delayedPage: pageData.delayedPage,
                changePage: changePageHandler,
                isPortrait: pageData.isPortrait,
                lastEmailTime: lastEmailTime,
                confirmEmail: confirmEmailHandler,
                opacity: opacity
            }}
        >
            {props.children}
        </PageContext.Provider>
    )
}
export default PageContext;
