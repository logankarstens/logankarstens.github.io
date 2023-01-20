import React, { useState, useEffect, useMemo, useCallback } from "react";

const PageContext = React.createContext({
    pages: [],
    currentPage: "",
    delayedPage: "",
    changePage: (page) => {},
    isPortrait: null,
});

export const delay = 500;
export const PageContextProvider = (props) => {
    const pages = useMemo(() => ["home", "projects", "resume", "contact"], [])
    const [pageData, setPageData] = useState({pages: pages, currentPage: "home", delayedPage: "home", isPortrait: null});


    const resizeHandler = useCallback(() => {
        console.log("resize");
        setPageData((prevData) => {
            return {
                ...prevData, 
                isPortrait: !window.matchMedia("(min-width: 1280px)").matches
            }
        })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
    })
   
    const changePageHandler = (newPage) => {
        //console.log("changing page to " + newPage)
        localStorage.setItem("currentPage", newPage)
        setPageData((prevPageData) => {
            return {
                ...prevPageData,
                currentPage: newPage
            }
        })
    }


    useEffect(() => {
        if (pages.find(page => page === localStorage.getItem("currentPage")) !== undefined) {
            //console.log("found page");
            changePageHandler(localStorage.getItem("currentPage"))
            updatePageHandler();
        }
    }, [pages])

    useEffect(() => {
        resizeHandler();
    }, [resizeHandler])

    const updatePageHandler = () => {
        setPageData((prevPageData) => {
            return {
                ...prevPageData,
                delayedPage: prevPageData.currentPage
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            updatePageHandler();
        }, delay)
    }, [pageData.currentPage]);
    return (
        <PageContext.Provider
            value={{
                pages: pageData.pages,
                currentPage: pageData.currentPage,
                delayedPage: pageData.delayedPage,
                changePage: changePageHandler,
                isPortrait: pageData.isPortrait
            }}
        >
            {props.children}
        </PageContext.Provider>
    )
}
export default PageContext;
