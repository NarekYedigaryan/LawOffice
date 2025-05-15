import config from './config';


const parseJSON = async (response) => {
    const text = await response.text();
    return text ? JSON.parse(text) : [];
  };
  
  export const getNews = async () => {
    try {
      const response = await fetch("https://localhost:7235/api/news");
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      return await parseJSON(response);
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  };
  
  export const getActiveNews = async () => {
    try {
      const response = await fetch("https://localhost:7235/api/news/active");
      if (!response.ok) {
        throw new Error('Failed to fetch active news');
      }
      return await parseJSON(response);
    } catch (error) {
      console.error('Error fetching active news:', error);
      return [];
    }
  };
  
  export const getLatestNews = async () => {
    try {
      const response = await fetch("https://localhost:7235/api/news/latest");
      if (!response.ok) {
        throw new Error('Failed to fetch latest news');
      }
      return await parseJSON(response);
    } catch (error) {
      console.error('Error fetching latest news:', error);
      return [];
    }
  };
  