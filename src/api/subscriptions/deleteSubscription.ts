import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAuth } from '../axios';

const SUBSCRIPTIONS_URL = 'subscriptions';

export const useDeleteSubscription = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: (coachId) => fetchAuth(`${SUBSCRIPTIONS_URL}/${coachId}`, {
            method: 'DELETE',
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
        },
    });
}; 