import { useState, useEffect } from 'react';
import { BASE_URL, POSTS_ENDPOINT, NewsPost } from '@/api/config';

export const useFetchNews = () => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMore = async (limit: number = 10, currentOffset: number) => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const url = `${BASE_URL}${POSTS_ENDPOINT}?limit=${limit}&offset=${currentOffset}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.statusText}`);
      }

      const newPosts: NewsPost[] = await response.json();

      setPosts(prev => [...prev, ...newPosts]);
      setOffset(currentOffset + newPosts.length);
      setHasMore(newPosts.length === limit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error loading news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore(9, 0);
  }, []);

  return { posts, loading, offset, hasMore, loadMore, error };
};
