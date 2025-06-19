import axios from 'axios';

const BACKEND = 'http://10.150.1.61:8000'; 

export const fetchQuestions = async () => {
  try {
    const res = await axios.get('https://opentdb.com/api.php?amount=10&category=31&difficulty=easy');
    return res.data.results;
  } catch (error) {
    console.error('Erro ao buscar perguntas:', error.message);
    return [];
  }
};

export const saveScore = async (player, score, heartsUsed) => {
  try {
    await axios.post(`${BACKEND}/score`, {
      player,
      score,
      hearts_used: heartsUsed,
    });
  } catch (error) {
    console.error('Erro ao salvar score:', error.message);
  }
};
