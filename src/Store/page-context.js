import React, { useState, useEffect, useMemo } from "react";

const PageContext = React.createContext({
    pages: [],
    currentPage: "",
    delayedPage: "",
    changePage: (page) => {},
});

export const PageContextProvider = (props) => {
    const pages = useMemo(() => ["home", "projects", "resume", "contact"], [])
    const [pageData, setPageData] = useState({pages: pages, currentPage: "home", delayedPage: "home"});

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
        }, 600)
    }, [pageData.currentPage]);
    return (
        <PageContext.Provider
            value={{
                pages: pageData.pages,
                currentPage: pageData.currentPage,
                delayedPage: pageData.delayedPage,
                changePage: changePageHandler,
            }}
        >
            {props.children}
        </PageContext.Provider>
    );
};
export default PageContext;
