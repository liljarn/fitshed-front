import { Button, Modal, Text } from '@gravity-ui/uikit';
import { useDeleteSchedule } from '@/api/schedules/deleteSchedule';
import './DeleteScheduleModal.scss';

interface DeleteScheduleModalProps {
    open: boolean;
    onClose: () => void;
    scheduleId: number;
}

export const DeleteScheduleModal = ({ open, onClose, scheduleId }: DeleteScheduleModalProps) => {
    const deleteSchedule = useDeleteSchedule();

    const handleDelete = async () => {
        await deleteSchedule.mutateAsync(scheduleId);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} className="delete-schedule-modal">
            <div className="delete-schedule-modal">
                <Text variant='display-1'>Удалить тренировку?</Text>
                <Text variant='body-2'>
                    Вы уверены, что хотите удалить эту тренировку? Это действие нельзя отменить.
                </Text>
                <div className="delete-schedule-modal__footer">
                    <Button size='xl' view="outlined" onClick={onClose}>
                        Отмена
                    </Button>
                    <Button size='xl' view="outlined-danger" onClick={handleDelete} loading={deleteSchedule.isPending}>
                        Удалить
                    </Button>
                </div>
            </div>
        </Modal>
    );
};