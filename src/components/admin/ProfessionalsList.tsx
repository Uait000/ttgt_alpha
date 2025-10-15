import { useState, useEffect } from 'react';
import { professionalsApi } from '@/api/professionals-api';
import type { Professional } from '@/api/config';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import ProfessionalForm from './ProfessionalForm';
import { Badge } from '@/components/ui/badge';

const CATEGORY_LABELS: Record<string, string> = {
  achievement: 'Достижение',
  award: 'Награда',
  recognition: 'Признание',
  success: 'Успех',
};

export default function ProfessionalsList() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editProfessional, setEditProfessional] = useState<Professional | null>(null);
  const { toast } = useToast();

  const loadProfessionals = async () => {
    try {
      setLoading(true);
      const data = await professionalsApi.getAll();
      setProfessionals(data);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить профессионалов',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfessionals();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await professionalsApi.delete(deleteId);
      toast({
        title: 'Успешно',
        description: 'Профессионал удален',
      });
      loadProfessionals();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handleEdit = (professional: Professional) => {
    setEditProfessional(professional);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setEditProfessional(null);
    setFormOpen(true);
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setEditProfessional(null);
    loadProfessionals();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Управление профессионалами</h2>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Добавить профессионала
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">Загрузка...</div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Заголовок</TableHead>
                <TableHead>Автор</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Просмотры</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {professionals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Нет профессионалов
                  </TableCell>
                </TableRow>
              ) : (
                professionals.map((prof) => (
                  <TableRow key={prof.id}>
                    <TableCell className="font-medium">{prof.title}</TableCell>
                    <TableCell>{prof.author}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {CATEGORY_LABELS[prof.category] || prof.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(prof.date).toLocaleDateString('ru-RU')}
                    </TableCell>
                    <TableCell>{prof.views}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(prof)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(prof.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <ProfessionalForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditProfessional(null);
        }}
        onSuccess={handleFormSuccess}
        editProfessional={editProfessional}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить профессионала?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Профессионал будет удален навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Удалить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
