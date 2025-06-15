import axios from 'axios';

const BACKEND = 'http://localhost:8000/';

export const fetchQuestions = async () => {
  const res = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=easy');
  return res.data.results;
};

export const saveScore = (player, score, heartsUsed) =>
  axios.post(`${BACKEND}/score`, { player, score, hearts_used: heartsUsed });
