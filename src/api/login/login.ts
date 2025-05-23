import { useMutation } from '@tanstack/react-query';
import { fetchBase } from '../axios';

const TOKEN_URL = 'token';

interface LoginParams {
    email: string;
    password: string;
}

export const useLoginUser = () => {
    return useMutation({
        mutationFn: (params: LoginParams) =>
            fetchBase(TOKEN_URL, {
                method: 'POST',
                body: JSON.stringify(params),
            })
    });
}; 