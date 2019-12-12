class BirdCard {
  constructor(location, species, date, story) {
    this.location = location;
    this.species = species;
    this.date = date;
    this.story = story;
    this.id = null;
  }

updateId = (birdCards) => {
  const id = birdCards.length;
  this.id = id;
}

}
