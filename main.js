let birdSightings = []
let counter = 0;

const onPageLoad = () => {
  var birdCards = localStorage.getItem('birdCalls');
  var parsedBirdCalls = JSON.parse(birdCards);
  if (parsedBirdCalls !== null) {
    bringItBack(parsedBirdCalls);
  }
}

const onSubmitButton = () => {
  const newBirdCard = getBirdSighting();
  addBirdSighting(newBirdCard);
  clearInputs();
}

const bringItBack = (birdCards) => {
  let instantiatedBirdCards = birdCards.map(birdCard => {
    const { location, species, date, story } = birdCard;
    return new BirdCard(location, species, date, story);
  });
  instantiatedBirdCards.forEach(instantiatedBirdCard => {
    instantiatedBirdCard.updateId(birdSightings);
    birdSightings.push(instantiatedBirdCard);
    addBirdSighting(instantiatedBirdCard);
  });
}

const getBirdSighting = () => {
  const location = document.getElementById('location').value;
  const species = document.getElementById('species').value;
  const date = document.getElementById('date').value;
  const story = document.getElementById('story').value;
  const newBirdCard = new BirdCard(location, species, date, story);
  newBirdCard.updateId(birdSightings);
  birdSightings.push(newBirdCard);
  setLocalStorage(birdSightings);
  return newBirdCard;
}

const deleteBirdSighting = () => {
  if (event.target.classList.contains('delete-button')) {
    event.target.parentNode.remove();
    const id = event.target.dataset.cardid;
    birdSightings = birdSightings.filter(birdSighting => {
      return birdSighting.id !== parseInt(id);
    });
    setLocalStorage(birdSightings);
  }
}

const setLocalStorage = (allCards) => {
  const stringBirds = JSON.stringify(allCards);
  localStorage.setItem('birdCalls', stringBirds);
}

const clearInputs = () => {
  document.getElementById('location').value = '';
  document.getElementById('species').value = '';
  document.getElementById('date').value = '';
  document.getElementById('story').value = null;
}

const addBirdSighting = (birdCard) => {
  const {location, species, date, story, id} = birdCard;
  birdCardContainer.innerHTML += `
    <article class='bird-card-article'>
      <h2 class='bird-card-header'>${species}</h2>
      <section class='bird-card-section'>
        <p class='bird-card-p'>location: ${location}</p>
        <p class='bird-card-p'>date: ${date}</p>
      </section>
      <p class='bird-card-story'>${story}</p>
      <button class='delete-button' id='delete-button' data-cardid='${id}'>Remove</button>
    </article>
  `
}

const birdCardContainer = document.getElementById('bird-card-container');
const submitButton = document.getElementById('submit-button');
window.addEventListener("load", onPageLoad);
submitButton.addEventListener('click', onSubmitButton);
birdCardContainer.addEventListener('click', deleteBirdSighting);
