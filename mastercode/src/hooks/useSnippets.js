import { useState, useEffect } from 'react';
import snippetService from '../services/snippetService';

export const useSnippets = () => {
  const [snippets, setSnippets] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSnippets = async () => {
      setIsLoading(true)
      try {
        const response = await snippetService.getAllSnippets();
        setSnippets(response.data.data || []);
      } catch (error) {
        console.error('Error fetching snippets:', error);
        setSnippets([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSnippets()
  }, [])

  return { snippets, isLoading }
}