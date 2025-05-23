import { useQuery } from '@tanstack/react-query';
import { fetchAuth } from '../axios';
import { Coach } from '../trainer/getCoach';

const SUBSCRIPTIONS_URL = 'subscriptions';

export interface Subscription {
    id: number;
    user_id: number;
    coach_id: number;
    coach: Coach;
}

export interface GetSubscriptionsResponse {
    subscriptions: Subscription[];
}

export const useGetSubscriptions = () => {
    return useQuery<GetSubscriptionsResponse>({
        queryKey: ['subscriptions'],
        queryFn: () => fetchAuth(SUBSCRIPTIONS_URL, {
            method: 'GET',
        }),
    });
}; 