import { useState, useEffect } from 'react';
import { professionalsApi, type CreateProfessionalPayload } from '@/api/professionals-api';
import type { Professional, Teacher } from '@/api/config';
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

interface ProfessionalFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editProfessional?: Professional | null;
}

const CATEGORIES = [
  { value: 'achievement', label: 'Достижение' },
  { value: 'award', label: 'Награда' },
  { value: 'recognition', label: 'Признание' },
  { value: 'success', label: 'Успех' },
];

// --- ИЗМЕНЕНИЕ №1: Добавляем функцию для форматирования ФИО ---
const formatTeacherName = (teacher: Teacher) => {
  if (!teacher || !teacher.second_name || !teacher.first_name) return '';
  return `${teacher.second_name} ${teacher.first_name[0]}. ${teacher.middle_name ? teacher.middle_name[0] + '.' : ''}`;
};


export default function ProfessionalForm({
  open,
  onClose,
  onSuccess,
  editProfessional
}: ProfessionalFormProps) {
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [authors, setAuthors] = useState<Teacher[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState<CreateProfessionalPayload>({
    title: '',
    body: '',
    author: '',
    category: 'achievement',
  });

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const { teachersApi } = await import('@/api/teachers');
        const teachersList = await teachersApi.getAll();
        setAuthors(teachersList);
      } catch (error) {
        // --- ИЗМЕНЕНИЕ №2: Исправляем заглушку под новый формат данных ---
        setAuthors([
          { id: 1, first_name: 'Администрация', second_name: '', middle_name: '' },
          { id: 2, first_name: 'Учебный', second_name: 'отдел', middle_name: '' }
        ]);
      }
    };
    loadAuthors();
  }, []);

  useEffect(() => {
    if (editProfessional) {
      const profDate = new Date(editProfessional.date * 1000);

      setFormData({
        title: editProfessional.title,
        body: editProfessional.body,
        author: editProfessional.author,
        category: editProfessional.category,
      });
      setSelectedDate(profDate);
      setImageFiles([]);
    } else {
      setFormData({
        title: '',
        body: '',
        // --- ИЗМЕНЕНИЕ №3: Используем функцию форматирования для автора по умолчанию ---
        author: authors.length > 0 ? formatTeacherName(authors[0]) : '',
        category: 'achievement',
      });
      setSelectedDate(new Date());
      setImageFiles([]);
    }
  }, [editProfessional, open, authors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!(formData.title || '').trim() || !(formData.body || '').trim() || !formData.author) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все обязательные поля (*)',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const payload: CreateProfessionalPayload & { date: number } = {
        ...formData,
        date: Math.floor(selectedDate.getTime() / 1000),
      };

      if (editProfessional) {
        await professionalsApi.update(
          editProfessional.id,
          payload,
          imageFiles.length > 0 ? imageFiles : undefined
        );
        toast({ title: 'Успешно', description: 'Запись обновлена' });
      } else {
        await professionalsApi.create(payload, imageFiles.length > 0 ? imageFiles : undefined);
        toast({ title: 'Успешно', description: 'Запись создана' });
      }
      onSuccess();
    } catch (error) {
      toast({ title: 'Ошибка', description: error instanceof Error ? error.message : 'Не удалось сохранить', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editProfessional ? 'Редактировать запись' : 'Создать запись'}</DialogTitle>
          <DialogDescription>Заполните форму для {editProfessional ? 'обновления' : 'создания'} записи о профессионале</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Заголовок *</Label>
            <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Введите заголовок" required />
          </div>

          <RichTextEditor value={formData.body} onChange={(value) => setFormData({ ...formData, body: value })} label="Описание *" placeholder="Полный текст о профессионале" required rows={8} />
          
          <div className="space-y-2">
            <Label>Дата</Label>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Автор *</Label>
              <Select value={formData.author} onValueChange={(value) => setFormData({ ...formData, author: value })}>
                <SelectTrigger><SelectValue placeholder="Выберите автора" /></SelectTrigger>
                <SelectContent>
                  {/* --- ИЗМЕНЕНИЕ №4: Форматируем ФИО в списке --- */}
                  {authors.map((author) => {
                    const formattedName = formatTeacherName(author);
                    return (
                      <SelectItem key={author.id} value={formattedName}>
                        {formattedName}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Категория *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as any })}>
                <SelectTrigger><SelectValue placeholder="Выберите категорию" /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <MultipleFileUpload value={[]} onChange={setImageFiles} label="Изображения (до 20 шт)" maxFiles={20} />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Отмена</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Сохранение...' : editProfessional ? 'Обновить' : 'Создать'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}