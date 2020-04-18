const aboutPage = (
    function () {
        function render() {
            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = '';

            const aboutDiv = document.createElement('div');
            aboutDiv.setAttribute('id', 'about-div');
            aboutDiv.style.margin = '1rem 10vw';
            const header = document.createElement('h1');
            header.textContent = 'Food Tales';

            const aboutInfo = document.createElement('p');
            aboutInfo.textContent = 
            'Our first restaurant in what is now a global chain was set up with the idea of providing people a place to share their special moments and their stories while enjoying the best food so that the moment gets etched into their lives. We want to be a part of these historical moments in your lives. Special Food for that Special Occassion';
            
            const contactHeader = document.createElement('h3');
            contactHeader.textContent = 'Contact';
            const email = document.createElement('a');
            email.setAttribute('href', 'mailto:paulrishav65@gmail.com');
            email.textContent = 'Email';

            const github = document.createElement('a');
            github.setAttribute('href', 'https://www.github.com/Reshav-Paul');
            github.textContent = 'Github';

            aboutDiv.appendChild(header);
            aboutDiv.appendChild(document.createElement('hr'));
            aboutDiv.appendChild(aboutInfo);
            aboutDiv.appendChild(contactHeader);
            aboutDiv.appendChild(email);
            aboutDiv.appendChild(github);
            contentDiv.appendChild(aboutDiv);
        }
        return { render };
    }
)();

export { aboutPage };