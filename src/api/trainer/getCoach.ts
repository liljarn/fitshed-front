import { useQuery } from '@tanstack/react-query';
import { fetchBase } from '../axios';

const COACH_URL = 'coaches';

export interface Schedule {
    id: number;
    coach_id: number;
    title: string;
    description: string;
    datetime: string;
    address: string;
}

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
    schedules: Schedule[];
}

export const useGetCoach = (coachId: number) => {
    return useQuery<Coach>({
        queryKey: ['coach', coachId],
        queryFn: () => fetchBase(`${COACH_URL}/${coachId}`, {
            method: 'GET',
        }),
        enabled: Boolean(coachId),
    });
}; 