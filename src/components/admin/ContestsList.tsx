import { useState, useEffect } from 'react';
import { contestsApi } from '@/api/contests-api';
import type { Contest } from '@/api/config';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2, Plus, FileText, Download } from 'lucide-react';
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
import ContestForm from './ContestForm';
import { Badge } from '@/components/ui/badge';

export default function ContestsList() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editContest, setEditContest] = useState<Contest | null>(null);
  const { toast } = useToast();

  const loadContests = async () => {
    try {
      setLoading(true);
      const data = await contestsApi.getAll();
      setContests(data);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить конкурсы',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContests();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await contestsApi.delete(deleteId);
      toast({
        title: 'Успешно',
        description: 'Конкурс удален',
      });
      loadContests();
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

  const handleEdit = (contest: Contest) => {
    setEditContest(contest);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setEditContest(null);
    setFormOpen(true);
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setEditContest(null);
    loadContests();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Управление конкурсами</h2>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Добавить конкурс
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">Загрузка...</div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Описание</TableHead>
                <TableHead>Файл</TableHead>
                <TableHead>Поддокументы</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Нет конкурсов
                  </TableCell>
                </TableRow>
              ) : (
                contests.map((contest) => (
                  <TableRow key={contest.id}>
                    <TableCell className="font-medium">{contest.title}</TableCell>
                    <TableCell className="max-w-md truncate">
                      {contest.description || '-'}
                    </TableCell>
                    <TableCell>
                      <a
                        href={contest.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <FileText className="h-4 w-4" />
                        {contest.file_name}
                      </a>
                    </TableCell>
                    <TableCell>
                      {contest.subdocuments && contest.subdocuments.length > 0 ? (
                        <Badge variant="secondary">
                          {contest.subdocuments.length} документ(ов)
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">Нет</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(contest)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(contest.id)}
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

      <ContestForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditContest(null);
        }}
        onSuccess={handleFormSuccess}
        editContest={editContest}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить конкурс?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Конкурс и все его поддокументы будут удалены навсегда.
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
