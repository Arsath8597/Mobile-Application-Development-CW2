import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

export default function App() {
  const [news, setAllNews] = useState([]); 
  const [filteredNews, setFilteredNews] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://newsapi.org/v2/everything?q=tesla&from=2023-12-26&sortBy=publishedAt&apiKey=9fb555548975477882c9a70c1f099ce9");
        console.log(response.data);
        setAllNews(response.data.articles);
        setFilteredNews(response.data.articles); 
      } catch (error) {
        console.error("Error fetching jokes:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    
    const filteredData = news.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || article.category === selectedCategory)
    );
    setFilteredNews(filteredData);
  }, [searchTerm, selectedCategory, news]);

  const categories = [
    { label: 'All Categories', value: '' },
    { label: 'Business', value: 'business' },
    { label: 'Entertainment', value: 'entertainment' },
    { label: 'General', value: 'general' },
    { label: 'Health', value: 'health' },
    { label: 'Science', value: 'science' },
    { label: 'Sports', value: 'sports' },
    { label: 'Technology', value: 'technology' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
     <View style={{marginTop:40,fontSize:20,backgroundColor:"#2E8B57", padding:20, borderColor: 'white',
    borderWidth: 1,
   
    borderRadius: 10,
    shadowColor: 'red ',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }} >
      <Text style={{fontSize:24,fontWeight:"bold"}}>Instant News Companion</Text>
     </View>
      <TextInput
      style={[styles.input, { marginTop: 20,borderRadius:20 }]} 
        placeholder="Search by title"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />

      <RNPickerSelect
        onValueChange={(value) => setSelectedCategory(value)}
        items={categories}
        style={pickerSelectStyles}
        value={selectedCategory}
      />

      {filteredNews.map((article, index) => (
        <View key={index} style={styles.articleContainer}>
          <Image source={{ uri: article.urlToImage }} style={styles.image} />
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.description}>{article.description}</Text>
        </View>
      ))}


      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderColor:"red",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:"10px"
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%',
  },
  articleContainer: {
    margin: 20,
 paddingLeft:20,
    backgroundColor: 'white',
    borderRadius:20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderWidth: 1,
   
    borderRadius: 8,
    shadowColor: 'red ',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    
  },
  image: {
    width: 200,
    height: 100,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 50,
    
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
});
