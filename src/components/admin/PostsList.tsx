import { useEffect, useState } from 'react';
import { postsApi, Post, PostCategory } from '@/api/posts'; // ИСПРАВЛЕНИЕ 1: Импортируем Post и PostCategory
import { POST_TAGS } from '@/api/posts'; // ИСПРАВЛЕНИЕ 2: POST_TAGS из posts.ts
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PostsListProps {
  onEdit: (post: Post) => void; // ИСПРАВЛЕНИЕ 3: NewsPost заменен на Post
  onDelete: (post: Post) => void; // ИСПРАВЛЕНИЕ 3: NewsPost заменен на Post
  onCreate: () => void;
  refreshTrigger?: number;
}

export default function PostsList({ onEdit, onDelete, onCreate, refreshTrigger }: PostsListProps) {
  const [posts, setPosts] = useState<Post[]>([]); // ИСПРАВЛЕНИЕ 4: NewsPost заменен на Post
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadPosts = async () => {
    try {
      setLoading(true);
      // Используем postsApi.getAll. По умолчанию, он загрузит все категории, что подходит для общего списка.
      const data = await postsApi.getAll({ limit: 100, offset: 0 });

      if (Array.isArray(data)) {
        // Убираем нормализацию. data теперь должна быть массивом Post[] с полем body.
        // Оставим только проверку, что все пришедшие посты действительно имеют author и body.
        const normalizedPosts = data.map(post => ({
          ...post,
          // Убедимся, что author присутствует, так как Post расширяет IncompletePost
          author: post.author || 'Неизвестный автор', 
          // body теперь стандартное поле (Пункт 10)
          body: post.body || '', 
        })) as Post[];
        
        setPosts(normalizedPosts);
      } else {
        console.error("API did not return an array for posts:", data);
        setPosts([]);
      }

    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Не удалось загрузить посты',
        variant: 'destructive',
      });
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [refreshTrigger]);

  const formatDate = (dateInSeconds: number) => {
    if (!dateInSeconds) return '';
    const date = new Date(dateInSeconds * 1000); 
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  if (loading) {
    return <div className="text-center py-8">Загрузка...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Управление постами</h2>
        <Button onClick={onCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Создать новый пост
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Заголовок</TableHead>
              <TableHead>Автор</TableHead>
              <TableHead>Дата публикации</TableHead>
              <TableHead>Тип поста</TableHead>
              <TableHead>Просмотры</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Нет постов для отображения
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium max-w-md truncate">{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{formatDate(post.publish_date)}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {POST_TAGS[post.type] || 'Неизвестно'}
                    </span>
                  </TableCell>
                  <TableCell>{post.views}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(JSON.parse(JSON.stringify(post)))} className="gap-1">
                        <Pencil className="h-4 w-4" /> Редактировать
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onDelete(post)} className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" /> Удалить
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}