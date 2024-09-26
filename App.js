import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import quotesData from './assets/quotes.json'; 


const images = {
  "Albert Einstein": require('./assets/einstein.png'),
  "Steve Jobs": require('./assets/steve_jobs.png'),
  "Franklin D. Roosevelt": require('./assets/roosevelt.png')
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home'); 
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    generateRandomQuote(); 
  }, []);

 
  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotesData.length);
    const selectedQuote = quotesData[randomIndex];

    setQuote(selectedQuote.quote);
    setAuthor(selectedQuote.author);
    setImage(images[selectedQuote.author]);
  };


  const HomeScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>QUOTES</Text>
      <Button
        title="Citações"
        onPress={() => setCurrentScreen('Quotes')} 
      />
    </View>
  );

  const QuotesScreen = () => (
    <View style={styles.container}>
      {quote && author && image && (
        <>
          <Text style={styles.quoteText}>"{quote}"</Text>
          <Text style={styles.authorText}>- {author}</Text>
          <Image source={image} style={styles.authorImage} />
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={generateRandomQuote}>
        <Text style={styles.buttonText}>Proximo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('Home')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );

 
  return currentScreen === 'Home' ? <HomeScreen /> : <QuotesScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200ee'
  },
  quoteText: {
    fontSize: 22,
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  authorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#555'
  },
  authorImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  backButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5
  }
});
