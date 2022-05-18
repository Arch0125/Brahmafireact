import React from 'react';
import './styles.css'
import illus from '../images/illus.png'

function HomePage() {
    return ( 
        <div className='cont'>
            <div>
            <p className='header' >Welcome <br/>To <br/><span className='purple'>ReKarma</span> </p>
            <button className='purpbtn'>Get Started</button>
            </div>
            <div>
                <img src={illus} className='image' />
            </div> 
        </div>

     );
}

export default HomePage;