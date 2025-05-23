import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAuth } from '../axios';

const SCHEDULES_URL = 'schedules';

export const useDeleteSchedule = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: async (scheduleId) => {
            const response = await fetchAuth(`${SCHEDULES_URL}/${scheduleId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete schedule');
            }
            return;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['schedules'] });
        },
    });
}; 