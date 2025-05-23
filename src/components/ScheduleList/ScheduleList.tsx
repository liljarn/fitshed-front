import { Text } from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import { ScheduleCard } from '@/components/ScheduleCard/ScheduleCard';
import './ScheduleList.scss';
import { Schedule } from '@/api/schedule/getSchedules';

const b = block('scheduleList');

interface ScheduleListProps {
    schedules: Schedule[];
    isCoach?: boolean;
    onDelete?: (id: number) => void;
}

export const ScheduleList = ({ schedules, isCoach = false }: ScheduleListProps) => {
    if (schedules.length === 0) {
        return (
            <div className={b('empty')}>
                <Text variant="body-1" color="secondary">
                    Нет доступных тренировок
                </Text>
            </div>
        );
    }

    return (
        <div className={b()}>
            {schedules.map((schedule) => (
                <ScheduleCard
                    key={schedule.id}
                    id={schedule.id}
                    title={schedule.title}
                    description={schedule.description}
                    datetime={schedule.datetime}
                    address={schedule.address}
                    isCoach={isCoach}
                    coach={schedule.coach}
                />
            ))}
        </div>
    );
}; 