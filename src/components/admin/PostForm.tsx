import { useState, useEffect } from 'react';
import { postsApi, type CreatePostPayload } from '@/api/posts';
import { teachersApi } from '@/api/teachers';
import type { NewsPost, Teacher } from '@/api/config';
import { POST_TAGS } from '@/api/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import RichTextEditor from './RichTextEditor';
import MultipleFileUpload from './MultipleFileUpload';

interface PostFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editPost?: NewsPost | null;
}

export default function PostForm({ open, onClose, onSuccess, editPost }: PostFormProps) {
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]); 
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState<CreatePostPayload>({
    title: '',
    content: '',
    author: '',
    type: 0,
    image_urls: [],
    date: new Date().toISOString(),
  });

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const teachersList = await teachersApi.getAll();
        setTeachers(teachersList);
      } catch (error) {
        console.error('Failed to load teachers:', error);
        toast({ title: 'Ошибка', description: 'Не удалось загрузить список авторов', variant: 'destructive' });
      }
    };
    loadTeachers();
  }, []);

  useEffect(() => {
    if (editPost) {
      const postDate = new Date(editPost.publish_date * 1000);

      setFormData({
        title: editPost.title,
        content: editPost.body,
        author: editPost.author,
        type: editPost.type,
        image_urls: editPost.image_urls || [],
        date: postDate.toISOString(),
      });
      setSelectedDate(postDate);
      setImageFiles([]);
    } else {
      setFormData({
        title: '',
        content: '',
        author: teachers.length > 0 ? teachers[0].name : '',
        type: 0,
        image_urls: [],
        date: new Date().toISOString(),
      });
      setSelectedDate(new Date());
      setImageFiles([]);
    }
  }, [editPost, open, teachers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!(formData.title || '').trim() || !(formData.content || '').trim() || !formData.author) {
      toast({ title: 'Ошибка', description: 'Пожалуйста, заполните все обязательные поля (*)', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const payload: Partial<CreatePostPayload> = {
        ...formData,
        date: selectedDate.toISOString(),
      };

      if (imageFiles.length > 0) {
        delete payload.image_urls;
      }

      if (editPost) {
        await postsApi.update(editPost.id, payload as CreatePostPayload, imageFiles.length > 0 ? imageFiles : undefined);
        toast({ title: 'Успешно', description: 'Пост обновлен' });
      } else {
        await postsApi.create(payload as CreatePostPayload, imageFiles.length > 0 ? imageFiles : undefined);
        toast({ title: 'Успешно', description: 'Пост создан' });
      }

      onSuccess();
    } catch (error) {
      toast({ title: 'Ошибка', description: error instanceof Error ? error.message : 'Не удалось сохранить пост', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editPost ? 'Редактировать пост' : 'Создать новый пост'}</DialogTitle>
          <DialogDescription>Заполните форму для {editPost ? 'обновления' : 'создания'} поста</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Заголовок *</Label>
            <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Введите заголовок поста" required />
          </div>

          <RichTextEditor value={formData.content} onChange={(value) => setFormData({ ...formData, content: value })} label="Основной текст *" placeholder="Полный текст поста" required rows={8} />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Автор *</Label>
              <Select value={formData.author} onValueChange={(value) => setFormData({ ...formData, author: value })}>
                <SelectTrigger><SelectValue placeholder="Выберите автора" /></SelectTrigger>
                <SelectContent>
                  {/* --- ИЗМЕНЕНИЕ №1: Добавлен уникальный key --- */}
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.name}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Тип поста *</Label>
              <Select value={formData.type.toString()} onValueChange={(value) => setFormData({ ...formData, type: parseInt(value) })}>
                <SelectTrigger><SelectValue placeholder="Выберите тип" /></SelectTrigger>
                <SelectContent>
                  {/* --- ИЗМЕНЕНИЕ №2: Добавлен уникальный key --- */}
                  {POST_TAGS.map((tag, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Дата публикации *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'PPP', { locale: ru }) : 'Выберите дату'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={selectedDate} onSelect={(date) => date && setSelectedDate(date)} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <MultipleFileUpload value={formData.image_urls} onChange={(files) => setImageFiles(files)} label="Изображения" maxFiles={20} />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Отмена</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Сохранение...' : editPost ? 'Обновить' : 'Создать'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}