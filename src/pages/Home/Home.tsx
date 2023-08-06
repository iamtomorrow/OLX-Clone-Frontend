
/* components imports */
import { AdsContainer } from '../../components/AdsContainer/AdsContainer';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';

import './Home.css';

export const Home = ( ) => {
    return (
        <div className='Home page'>
            <Header />
            <AdsContainer id={1} label='Recent ads' category='' />
            <AdsContainer id={2} label='Electronics' category='electronics' />
            <AdsContainer id={3} label='Appliances' category='appliances' />
            <Footer />
        </div>
    )
};
