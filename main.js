const getBirdSighting = () => {
  const location = document.getElementById('location').value;
  const species = document.getElementById('species').value;
  const date = document.getElementById('date').value;
  const story = document.getElementById('story').value;
  const newBirdCard = new BirdCard(location, species, date, story);
  clearInputs();
  return newBirdCard;
}

const deleteBirdSighting = () => {
  if (event.target.classList.contains('delete-button')) {
    event.target.parentNode.remove();
  }
}

const clearInputs = () => {
  document.getElementById('location').value = '';
  document.getElementById('species').value = '';
  document.getElementById('date').value = '';
  document.getElementById('story').value = '';
}

const addBirdSighting = () => {
  const birdCardInfo = getBirdSighting();
  const {location, species, date, story} = birdCardInfo;
  birdCardContainer.innerHTML += `
    <article class='bird-card-article'>
      <h2 class='bird-card-header'>${species}</h2>
      <section class='bird-card-section'>
        <p class='bird-card-p'>location: ${location}</p>
        <p class='bird-card-p'>date: ${date}</p>
        <p class='bird-card-p'>story: ${story}</p>
      </section>
      <button class='delete-button' id='delete-button'>Remove</button>
    </article>
  `
}

const birdCardContainer = document.getElementById('bird-card-container');
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', addBirdSighting);
birdCardContainer.addEventListener('click', deleteBirdSighting);
