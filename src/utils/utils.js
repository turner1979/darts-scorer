const elementCount = (array, element) => {
  return array.reduce(
    (currentElement, arrElement) =>
      arrElement == element ? currentElement + 1 : currentElement,
    0
  );
};

const getScoreFrequency = (gameHistory) => {
  // loop through each round for each game and push total of round scores into array
  const scores = [];
  gameHistory.map((game) => {
    game.rounds.map((round) => {
      const total = round.reduce((a, b) => a + b, 0);
      scores.push(total);
    });
  });

  // get frequencies for scores 1 to 15
  const frequencies = [];
  for (let i = 0 ; i <= 15 ; i++) {
    frequencies.push(elementCount(scores, i));
  }

  // find the highest frequency and work out percentages relative to this value
  const highestFrequency = Math.max(...frequencies);
  const scoreFrequency = [];
  frequencies.map((frequency, index) => {
    const percentage = (100 / highestFrequency) * frequency;
    scoreFrequency.push({ score: index, frequency, percentage });
  });

  return scoreFrequency;
};

export { elementCount, getScoreFrequency };
