import { useState, useEffect } from 'react';
import { contestsApi, type CreateContestPayload } from '@/api/contests-api';
import type { Contest } from '@/api/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import FileUpload from './FileUpload';

interface ContestFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editContest?: Contest | null;
}

export default function ContestForm({
  open,
  onClose,
  onSuccess,
  editContest
}: ContestFormProps) {
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<CreateContestPayload>({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (editContest) {
      setFormData({
        title: editContest.title,
        description: editContest.description || '',
      });
      setPdfFile(null);
    } else {
      setFormData({
        title: '',
        description: '',
      });
      setPdfFile(null);
    }
  }, [editContest, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните название конкурса',
        variant: 'destructive',
      });
      return;
    }

    if (!editContest && !pdfFile) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, загрузите PDF файл',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      if (editContest) {
        await contestsApi.update(editContest.id, formData, pdfFile || undefined);
        toast({
          title: 'Успешно',
          description: 'Конкурс обновлен',
        });
      } else {
        await contestsApi.create(formData, pdfFile!);
        toast({
          title: 'Успешно',
          description: 'Конкурс создан',
        });
      }

      onSuccess();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Не удалось сохранить',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editContest ? 'Редактировать конкурс' : 'Создать конкурс'}
          </DialogTitle>
          <DialogDescription>
            Заполните форму для {editContest ? 'обновления' : 'создания'} конкурса
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название конкурса *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Введите название конкурса"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Краткое описание конкурса (необязательно)"
              rows={4}
            />
          </div>

          <FileUpload
            value={pdfFile || (editContest?.file_url || '')}
            onChange={(file) => setPdfFile(file)}
            label={`PDF документ ${editContest ? '(оставьте пустым, чтобы не менять)' : '*'}`}
            accept="application/pdf"
          />

          {editContest && editContest.file_name && (
            <div className="text-sm text-muted-foreground">
              Текущий файл: {editContest.file_name}
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Отмена
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Сохранение...' : editContest ? 'Обновить' : 'Создать'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
