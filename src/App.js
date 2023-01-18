//import styles from './App.module.css';
import Navigation from './components/Navigation/Navigation';
import ContentManager from './components/ContentManager/ContentManager';
import { PageContextProvider } from './Store/page-context';
import { Helmet } from 'react-helmet';
import styles from './App.module.css'
function App() {
  return (
    <PageContextProvider>
        <Helmet>
            <title>logan karstens.</title>
            <meta name="description" content="A personal website detailing my past projects, my current knowledge, and my future potential." />
            <meta name="theme-color" content="#170E1B" />
        </Helmet>
        <div className={styles.flex}>
            <Navigation  />
            <ContentManager ></ContentManager>
        </div>
    </PageContextProvider>
  );
}

export default App;
