const container = document.querySelector('#directory');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');

async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error fetching members:", error);
  }
}

function displayMembers(members) {
  container.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><strong>Membership:</strong> ${member.membership}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;

    container.appendChild(card);
  });
}

// Toggle View Buttons
gridBtn.addEventListener('click', () => {
  container.classList.remove('list');
  container.classList.add('grid');
});

listBtn.addEventListener('click', () => {
  container.classList.remove('grid');
  container.classList.add('list');
});

getMembers();

