import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAuth } from '../axios';

const SUBSCRIPTIONS_URL = 'subscriptions';

interface CreateSubscriptionRequest {
    coach_id: number;
}

interface CreateSubscriptionResponse {
    subscription: {
        id: number;
        user_id: number;
        coach_id: number;
    };
}

export const useCreateSubscription = () => {
    const queryClient = useQueryClient();

    return useMutation<CreateSubscriptionResponse, Error, CreateSubscriptionRequest>({
        mutationFn: (data) => fetchAuth(SUBSCRIPTIONS_URL, {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
        },
    });
}; 