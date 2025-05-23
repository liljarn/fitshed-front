import { Text } from '@gravity-ui/uikit';
import { TrainerCard } from '../TrainerCard';
import block from 'bem-cn-lite';
import './TrainersList.scss';

const b = block('trainersList');

interface Trainer {
    id: number;
    firstName: string;
    lastName: string;
    middleName?: string;
    experienceYears: number;
    description: string;
    photoUrl?: string;
}

interface TrainersListProps {
    trainers: Trainer[];
}

export const TrainersList = ({ trainers }: TrainersListProps) => {
    if (trainers.length === 0) {
        return (
            <div className={b()}>
                <Text variant="body-1" className={b('empty')}>
                    Тренеры не найдены
                </Text>
            </div>
        );
    }

    return (
        <div className={b()}>
            <div className={b('grid')}>
                {trainers.map((trainer) => (
                    <div key={trainer.id} className={b('item')}>
                        <TrainerCard
                            id={trainer.id}
                            firstName={trainer.firstName}
                            lastName={trainer.lastName}
                            experienceYears={trainer.experienceYears}
                            description={trainer.description}
                            photoUrl={trainer.photoUrl || ''}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}; 