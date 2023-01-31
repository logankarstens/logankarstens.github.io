import yamapos from '../../assets/Images/yamapos.png'
import assemblycpp from '../../assets/Images/assemblycpp.png'
import comingsoon from '../../assets/Images/comingsoon.png'
const ProjectData = [
    {
        name: "yamapos",
        title: "yamaPOS",
        color: "#ffffff",
        image: yamapos,
        text: 
        [
            "Yama is a full-stack point-of-sale system that combines both the business and customer experiences into a central order management platform.",
            "Technologies used to construct the webapp include React.js for the front-end, Node.js Express for the back-end, and MongoDB to manage the database system.",
            "The project is currently a work in progress."
        ],
        link: 'https://github.com/logankarstens/yama',
    },
    {
        title: "Assembly in C++",
        color: "#ffffff",
        image: assemblycpp,
        text: 
        [
            "Assembly in C++ is a project with an end goal of running and executing assembly code entirely though C++.",
            "The one-file interpreter lexes, parses and compiles assembly code into a custom bytecode, and this is then executed on a virtual data structure.", 
            "It also includes some supplementary features like register prints to make the coding process more efficient.",
            "The project is currently a work in progress, but it is currently compatible with the example programs included in the repository."
        ],
        link: 'https://github.com/logankarstens/assembly_in_cpp',
    },
    {
        title: "Coming Soon",
        color: "#ffffff",
        image: comingsoon,
        text: 
        [
            "To view the updated progress of these projects, try them yourself, or find other ones, visit my GitHub account and browse through my repos.",
            "Feel free to ask me any questions about projects by contacting me.", 
        ],
        link: 'https://github.com/logankarstens',
    },
]


export default ProjectData;
