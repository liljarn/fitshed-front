import { useMutation } from '@tanstack/react-query';
import { fetchBase } from '../axios';

const USER_URL = 'users';

interface UserSignupParams {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
}

export const useSignupUser = () => {
    return useMutation({
        mutationFn: (params: UserSignupParams) =>
            fetchBase(USER_URL, {
                method: 'POST',
                body: JSON.stringify(params),
            })
    });
};
