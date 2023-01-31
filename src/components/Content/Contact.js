import { useRef, useContext, useState } from 'react';

import styles from './Contact.module.css';
import ButtonLink from '../UI/ButtonLink/ButtonLink';
import PageContext from '../../Store/page-context';

import linkedin from '../../assets/vectors/linkedin.svg'
import github from '../../assets/vectors/github.svg'

import emailjs from 'emailjs-com';

const Contact = () => {
    const ctx = useContext(PageContext);
    
    const [emailStatus, setEmailStatus] = useState('');
    const form = useRef();


    const sendEmail = (e) => {
        e.preventDefault();

        // 60 second timer for email message sending
        const secondsAgo = Math.floor((Date.now() - ctx.lastEmailTime) / 1000)
        if (secondsAgo < 60) {
            setEmailStatus("Wait " + (60-secondsAgo) + " more seconds before sending another email.")
            return;
        }
        ctx.confirmEmail(Date.now())

        // uses emailjs as back-end email service
        emailjs.sendForm('contact', 'main', form.current, 'rwJePjVxBkuqzbwr1')
        .then((result) => {
            console.log("email result: " + result.text);
              setEmailStatus('Email sent succesfully!')
        }, (error) => {
            console.log("email error: " + error.text);
            setEmailStatus('There was a problem sending your email.')
        });
    };

    return (
        <div className={styles.main} style={{ opacity: ctx.opacity, transition: "opacity 0.4s ease-out" }}>
     
                <div className={styles['flex-container']}>
                    <div className={styles.header}><h2>Reach out</h2></div>
                    <div className={styles['img-container']}>
                        <a href="https://linkedin.com/in/logankarstens" target="_blank" rel="noreferrer"><img src={linkedin} alt='linkedin' /></a>
                    </div>
                    <div className={styles['img-container']}>
                        <a href="https://github.com/logankarstens" target="_blank" rel="noreferrer"><img src={github} alt='github' /></a>
                    </div>
                </div>
                <form onSubmit={sendEmail} ref={form}>
                    <div className={`${styles['flex-container']} ${styles.space}`}>
                        <div className={styles['input-container']}>
                        <p>name</p>
                        <input type="text" name="user_name" required />
                        </div>
                        <div className={styles['input-container']}>
                        <p>email</p>
                        <input type="email" name="user_email" required />
                        </div>
                    </div>
                    <p>message</p>
                    <textarea name="user_message" required />
                    <div className={`${styles['flex-container']} ${styles.space}`}>
                        <div className={styles.status}><span>{emailStatus}</span></div>
                        <div className={styles['contact-button']}><ButtonLink hover={true} fullButton={true}>Contact</ButtonLink></div>
                    </div>   
                </form>
        </div>
    );
}

export default Contact;