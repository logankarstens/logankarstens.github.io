import React, { useState, useEffect } from "react";

const PageContext = React.createContext({
    page: "",
    delayedPage: "",
    changePage: (page) => {},
});

export const PageContextProvider = (props) => {
    const [pages, setPages] = useState({page: "home", delayedPage: "home"});

    const changePageHandler = (newPage) => {
        console.log("changing page to " + newPage)
        localStorage.setItem("page", newPage)
        setPages((prevPage) => {
            return {
                ...prevPage,
                page: newPage
            }
        })
    }

    useEffect(() => {
        changePageHandler(localStorage.getItem("page"))
        updatePageHandler();
    }, [])

    const updatePageHandler = () => {
        setPages((prevPage) => {
            return {
                ...prevPage,
                delayedPage: prevPage.page
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            updatePageHandler();
        }, 600)
    }, [pages.page]);
    
    return (
        <PageContext.Provider
            value={{
                page: pages.page,
                delayedPage: pages.delayedPage,
                changePage: changePageHandler,
            }}
        >
            {props.children}
        </PageContext.Provider>
    );
};
export default PageContext;
