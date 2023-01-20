import { useContext } from 'react';

import Navigation from './components/Navigation/Navigation';
import NavMobile from './components/Navigation/NavMobile';
import ContentManager from './components/ContentManager/ContentManager';
import PageContext from './Store/page-context';
import { Helmet } from 'react-helmet';
import styles from './App.module.css'
function App() {
    const ctx = useContext(PageContext);
    console.log(ctx.isPortrait)
  return (
    
    <div className={`${styles.app} ${ctx.isPortrait ? styles['flex-vertical'] : styles['flex-horizontal']}`}>
        <Helmet>
            <title>logan karstens.</title>
            <meta name="description" content="A personal website detailing my past projects, my current knowledge, and my future potential." />
            <meta name="theme-color" content="#170E1B" />
        </Helmet>
      
            {ctx.isPortrait ? <NavMobile /> : <Navigation />}
            <ContentManager />
  
    </div>
  );
}

export default App;
