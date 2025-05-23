import { useQuery } from '@tanstack/react-query';
import { fetchAuth } from '../axios';
import { Coach } from '../trainer/getCoaches';

const SCHEDULE_URL = 'schedules';

export interface Schedule {
    id: number;
    coach_id: number;
    title: string;
    description: string;
    datetime: string;
    address: string;
    coach?: Coach;
}

export interface GetSchedulesResponse {
    schedules: Schedule[];
}

export const useGetSchedules = () => {
    return useQuery<GetSchedulesResponse>({
        queryKey: ['schedules'],
        queryFn: () => fetchAuth(SCHEDULE_URL, {
            method: 'GET',
        }),
    });
}; 