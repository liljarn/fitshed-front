import { useQuery } from '@tanstack/react-query';
import { fetchAuth } from '../axios';

const USER_URL = 'users';

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    is_coach: boolean;
}

export const useGetMe = () => {
    return useQuery<User>({
        queryKey: ['me'],
        queryFn: () => fetchAuth(`${USER_URL}/me`, {
            method: 'GET',
        }),
    });
}; 