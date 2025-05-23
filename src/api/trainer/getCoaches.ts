import { useQuery } from '@tanstack/react-query';
import { fetchBase } from '../axios';

const COACHES_URL = 'coaches';

export interface Coach {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    is_coach: boolean;
    description: string;
    experience_years: number;
    profile_photo_url?: string;
}

interface GetCoachesResponse {
    coaches: Coach[];
}

export const useGetCoaches = () => {
    return useQuery<GetCoachesResponse>({
        queryKey: ['coaches'],
        queryFn: () => fetchBase(COACHES_URL, {
            method: 'GET',
        }),
    });
}; 