import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAuth } from '../axios';

const SCHEDULES_URL = 'schedules';

interface CreateScheduleRequest {
    title: string;
    description: string;
    datetime: string;
    address: string;
}

interface CreateScheduleResponse {
    schedule: {
        id: number;
        title: string;
        description: string;
        datetime: string;
        address: string;
        coach_id: number;
    };
}

export const useCreateSchedule = () => {
    const queryClient = useQueryClient();

    return useMutation<CreateScheduleResponse, Error, CreateScheduleRequest>({
        mutationFn: (data) => fetchAuth(SCHEDULES_URL, {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['schedules'] });
        },
    });
}; 