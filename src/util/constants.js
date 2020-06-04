export const durationMap = new Map([
  ['Quick', 5], 
  ['Tourist', 10], 
  ['Explorer', 'Untimed']
]);

// [km, score]
export const scores = new Map([
  [1, 1000],
  [5, 750],
  [10, 650],
  [25, 500],
  [50, 400],
  [100, 250],
  [200, 150],
  [500, 100],
  [1000, 50],
  [2000, 25],
  [5000, 15],
  [15000, 10]
]);

export const calcScore = distance => {
  const scoreKey = Array.from(scores.keys()).find(d => distance <= d);
  return scores.get(scoreKey);
};
