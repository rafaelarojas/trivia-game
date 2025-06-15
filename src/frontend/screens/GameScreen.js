import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { saveScore } from '../services/api';

export default function GameScreen({ route, navigation }) {
  const { name } = route.params;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [loading, setLoading] = useState(true);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const current = questions[currentIndex];
      const answers = [...current.incorrect_answers, current.correct_answer];
      setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
    }
  }, [questions, currentIndex]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple');
      setQuestions(res.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar perguntas', error);
    }
  };

  const handleAnswer = async (answer) => {
    const correct = questions[currentIndex].correct_answer;

    if (answer === correct) {
      setScore(score + 1);
    } else {
      const remainingHearts = hearts - 1;
      setHearts(remainingHearts);
      if (remainingHearts === 0) {
        await saveScore(name, score, 3);
        navigation.replace('Lose', { name, score });
        return;
      }
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      await saveScore(name, score, 3 - hearts);
      navigation.replace('Win', { name, score });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Carregando perguntas...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Jogador: {name}</Text>
      <Text style={styles.hearts}>❤️ Vidas: {hearts}</Text>
      <Text style={styles.score}>Pontuação: {score}</Text>

      <Text style={styles.question}>{decodeURIComponent(currentQuestion.question)}</Text>

      {shuffledAnswers.map((answer, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.button}
          onPress={() => handleAnswer(answer)}
        >
          <Text style={styles.buttonText}>{decodeURIComponent(answer)}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.progress}>Pergunta {currentIndex + 1} de 10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 20,
    justifyContent: 'center'
  },
  header: {
    fontSize: 18,
    marginBottom: 4,
    color: '#0D47A1',
    fontWeight: 'bold'
  },
  hearts: {
    fontSize: 16,
    marginBottom: 4,
    color: '#D32F2F'
  },
  score: {
    fontSize: 16,
    marginBottom: 20,
    color: '#388E3C'
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#0D47A1'
  },
  button: {
    backgroundColor: '#1976D2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  progress: {
    marginTop: 20,
    fontSize: 14,
    color: '#0D47A1',
    textAlign: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#0D47A1'
  }
});
