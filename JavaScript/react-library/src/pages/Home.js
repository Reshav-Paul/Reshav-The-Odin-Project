import React from 'react';
import FeatureCard from '../components/FeatureCard';
import ServiceCard from '../components/ServiceCard';

import { faTruck, faBook, faSnowflake } from '@fortawesome/free-solid-svg-icons';

const homeMessageStyle = {
    height: '65vh',
    maxHeight: '720px',
    width: '100%',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ddd',
    backgroundImage: 'linear-gradient(180deg, #005C97 30%, #363795)',
    marginBottom: '1rem'
};

const servicesStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundImage: 'linear-gradient(180deg, #005C97 30%, #363795)',
    padding: '1rem 0 5rem 0',
    marginTop: '1rem',
    color: '#ddd'
};


function Home() {
    return (
        <div id="home" className='page'>
            <div style={homeMessageStyle}>
                <h1>Odin's React Library</h1>
                <h3>Join our quest for knowledge</h3>
            </div>

            <FeatureCard
                title='All categories you need'
                description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe minus, nihil vitae commodi repellendus ullam ad similique numquam recusandae vero laborum.'
                imageUrl='https://images.pexels.com/photos/1926988/pexels-photo-1926988.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
            />

            <FeatureCard
                title='An enjoyable environment'
                description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe minus, nihil vitae commodi repellendus ullam ad similique numquam recusandae vero laborum.'
                imageUrl='https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?cs=srgb&dl=full-length-of-man-sitting-on-floor-256431.jpg&fm=jpg'
                reverse='reverse'
            />

            <FeatureCard
                title='Free registration'
                description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe minus, nihil vitae commodi repellendus ullam ad similique numquam recusandae vero laborum.'
                imageUrl='https://images.pexels.com/photos/926680/books-book-shopping-old-books-926680.jpeg?cs=srgb&dl=woman-in-black-long-sleeved-looking-for-books-in-library-926680.jpg&fm=jpg'
            />

            <FeatureCard
                title='Flexible Plans'
                description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe minus, nihil vitae commodi repellendus ullam ad similique numquam recusandae vero laborum.'
                imageUrl='https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?cs=srgb&dl=chair-beside-book-shelves-2041540.jpg&fm=jpg'
                reverse='reverse'
            />

            <div id='services' style={servicesStyle}>
                <ServiceCard
                    title='Free pickup and delivery'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit'
                    icon={faTruck}
                    iconColor='goldenrod'
                />
                <ServiceCard
                    title='Online Catalog'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit'
                    icon={faBook}
                    iconColor='#6d7'
                />
                <ServiceCard
                    title='3-day trial'
                    description='Lorem ipsum dolor sit amet, consectetur adipisicing elit'
                    icon={faSnowflake}
                    iconColor='9ad'
                />
            </div>
        </div>
    );
}

export default Home;