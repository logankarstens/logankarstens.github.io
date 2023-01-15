const PageTexts = (props) => {
    const texts = {
        home: {
            title: <h1>welcome.</h1>,
            paragraph: (
                <div>
                    <p>I'm glad you made it here.</p>

                    <p>My goal is to design efficient and appealing 
                    software solutions using the most powerful 
                    programming technologies available.</p>

                    <p>See more about what I've done below.</p>
                </div>
            )

        },
        projects: {
            title: <h1>projects.</h1>,
            paragraph: (
                <div>
                    <p>Take a look at some of my past projects.</p>
                 
                    <p>Some of these projects are complete,
                    while others are a work-in-progress.</p>
             
                    <p>All of these projects and more are 
                    available on my GitHub profile.</p>
                </div>
            )
            
        },
        resume: {
            title: <h1>resume.</h1>,
            paragraph: <></>
        },
        contact: {
            title: <h1>contact.</h1>,
            paragraph: <></>
        }
    }

    return texts[props.page][props.type];
    

        

}

export default PageTexts;