const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  // console.table(data.prophets);
  displayProphets(data.prophets);
}

getProphetData();


const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
      let card = document.createElement('section');
      let fullName = document.createElement('h2');
      let portrait = document.createElement('img');
      let birthdate = document.createElement('p');
      let birthplace = document.createElement('p');
      let death = document.createElement('p');
  
      fullName.textContent = `${prophet.name} ${prophet.lastname}`;
      
      portrait.setAttribute('src', prophet.imageurl);
      portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
      portrait.setAttribute('loading', 'lazy');
      portrait.setAttribute('width', '340');
      portrait.setAttribute('height', '440');
  
      birthdate.textContent = `Born: ${prophet.birthdate}`;
      birthplace.textContent = `Birth Place: ${prophet.birthplace}`;
      death.textContent = `Died: ${prophet.death || "N/A"}`;
  
      card.appendChild(fullName);
      card.appendChild(birthdate);
      card.appendChild(birthplace);
      card.appendChild(death);
      card.appendChild(portrait);

  
      cards.appendChild(card);
    });
  }
  