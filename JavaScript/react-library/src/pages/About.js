import React from 'react';

function About() {
    const aboutStyle = {
        height: '100%',
        padding: '1rem',
        textAlign: 'center',
        color: 'white'
    };
    return (
        <div id='about' className='page' style={{height: 'calc(100% - 70px)', backgroundColor: '#222'}}>
            <div style={aboutStyle}>
                <h2>About</h2>
                <p>
                    This app was built by Reshav Paul as a part of the full stack Javascript curriculum
                    of <a href="https://www.theodinproject.com" target='_blank'>The Odin Project.</a>
                    This was built using the <strong>React</strong> framework.
                </p>
                <p>
                    The code can be found in a subdirectory of this
                    <a href="https://github.com/Reshav-Paul/Reshav-The-Odin-Project" target='_blank'> Github</a> repository
                </p>
            </div>
        </div>
    );
}

export default About;