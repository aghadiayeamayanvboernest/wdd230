const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

let chaptersArray = getChapterList() || [];

// Load and display saved chapters on page load
chaptersArray.forEach(chapter => {
  displayList(chapter);
});

// Add chapter on button click
button.addEventListener('click', () => {
  const chapter = input.value.trim();

  if (chapter !== '') {
    displayList(chapter);
    chaptersArray.push(chapter);
    setChapterList();
    input.value = '';
    input.focus();
  } else {
    alert('Please enter a chapter title.');
    input.focus();
  }
});

// Support for pressing Enter key
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    button.click();
  }
});

// === Functions ===

// Show chapter in list
function displayList(item) {
  const li = document.createElement('li');
  li.textContent = item;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '❌';
  deleteButton.classList.add('delete');
  li.append(deleteButton);
  list.append(li);

  deleteButton.addEventListener('click', () => {
    deleteChapter(item);
  });
}

// Save array to localStorage
function setChapterList() {
  localStorage.setItem('bomChapters', JSON.stringify(chaptersArray));
}

// Get array from localStorage
function getChapterList() {
  return JSON.parse(localStorage.getItem('bomChapters'));
}

// Remove chapter and update storage
function deleteChapter(chapter) {
  chaptersArray = chaptersArray.filter(item => item !== chapter);
  setChapterList();
  list.innerHTML = ''; // Clear the list
  chaptersArray.forEach(ch => displayList(ch)); // Re-render
}
