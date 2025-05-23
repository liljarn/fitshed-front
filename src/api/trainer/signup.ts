import { useMutation } from '@tanstack/react-query';
import { fetchBase } from '../axios';

const TRAINER_URL = 'coaches';

interface TrainerSignupParams {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  description: string;
  experience_years: number;
  profile_photo: File;
}

export const useSignupTrainer = () => {
  return useMutation({
    mutationFn: (params: TrainerSignupParams) => {
      const formData = new FormData();
      formData.append('email', params.email);
      formData.append('password', params.password);
      formData.append('first_name', params.first_name);
      formData.append('last_name', params.last_name);
      if (params.middle_name) formData.append('middle_name', params.middle_name);
      formData.append('description', params.description);
      formData.append('experience_years', String(params.experience_years));
      formData.append('profile_photo', params.profile_photo);
      return fetchBase(TRAINER_URL, {
        method: 'POST',
        body: formData,
      });
    }
  });
}; 