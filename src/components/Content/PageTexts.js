const PageTexts = (props) => {

    const styleTitle = (title) => {
        return (
            <div>
                <h2><strong>&#60;&#62;</strong></h2>
                <h1>{title}</h1>
                <h2>&#60;/&#62;</h2>
            </div>
        );
    }
    const texts = {
        home: {
            title: styleTitle("welcome."),
            paragraph: (
                <div>
                    <p>I'm glad you made it here.</p>

                    <p>My goal is to design efficient and appealing 
                    software solutions using the most powerful 
                    programming technologies available.</p>

                    <p>See more about what I've done below.</p>
                    <br></br>
                </div>
            )

        },
        projects: {
            title: styleTitle("projects."),
            paragraph: (
                <div>
                    <p>Take a look at some of my past projects.</p>
                 
                    <p>Some of these projects are complete,
                    while others are a work-in-progress.</p>
             
                    <p>All of these projects and more are 
                    available on my GitHub profile.</p>
                    <br></br>
                </div>
            )
            
        },
        resume: {
            title: styleTitle("resume."),
            paragraph: <></>
        },
        contact: {
            title: styleTitle("contact."),
            paragraph: <></>
        }
    }

    return (
        <>
            {texts[props.page][props.type]}
        </>
    );
}

export default PageTexts;