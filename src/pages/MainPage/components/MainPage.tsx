import { Button, Text } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';
import block from 'bem-cn-lite';
import trainersImage from '../../../assets/photo/trainers.jpeg';
import promoImage from '../../../assets/photo/promo.jpeg';

import './MainPage.scss';

const b = block('mainPage');

export const MainPage = () => {
    const navigate = useNavigate();

    return (
        <div className={b()}>
            <section className={b('hero')}>
                    <div className={b('heroImage')} />
                    <Text variant="display-4" className={b('title')}>
                        Достигай своих целей вместе с FITSCHED
                    </Text>
                    <Text variant="header-1" className={b('subtitle')}>
                        Персональные тренировки с лучшими тренерами
                    </Text>
                    <div className={b('forPromoImage')}>
                        <img src={promoImage} alt="Тренировка" />
                    </div>
                    <Button 
                        view='normal-contrast'
                        size="xl" 
                        onClick={() => navigate('/coaches')}
                        className={b('ctaButton')}
                    >
                        Найти тренера
                    </Button>
            </section>

            <section className={b('features')}>
                <div className={b('feature')}>
                    <div className={b('featureIcon')}>🎯</div>
                    <Text variant="header-2" className={b('featureTitle')}>
                        Персональный подход
                    </Text>
                    <Text variant="body-1" className={b('featureText')}>
                        Выбирай тренера, который поможет достичь именно твоих целей
                    </Text>
                </div>

                <div className={b('feature')}>
                    <div className={b('featureIcon')}>💪</div>
                    <Text variant="header-2" className={b('featureTitle')}>
                        Профессиональные тренеры
                    </Text>
                    <Text variant="body-1" className={b('featureText')}>
                        Опытные специалисты с индивидуальным подходом к каждому клиенту
                    </Text>
                </div>

                <div className={b('feature')}>
                    <div className={b('featureIcon')}>⭐️</div>
                    <Text variant="header-2" className={b('featureTitle')}>
                        Качество тренировок
                    </Text>
                    <Text variant="body-1" className={b('featureText')}>
                        Тренируйся с лучшими тренерами и достигай максимальных результатов
                    </Text>
                </div>
            </section>

            <section className={b('howItWorks')}>
                <Text variant="display-3" className={b('sectionTitle')}>
                    Как это работает
                </Text>
                <div className={b('steps')}>
                    <div className={b('step')}>
                        <div className={b('stepNumber')}>1</div>
                        <Text variant="header-2" className={b('stepTitle')}>
                            Выбери тренера
                        </Text>
                        <Text variant="body-1" className={b('stepText')}>
                            Изучи профили тренеров, их опыт и специализацию
                        </Text>
                    </div>

                    <div className={b('step')}>
                        <div className={b('stepNumber')}>2</div>
                        <Text variant="header-2" className={b('stepTitle')}>
                            Подпишись
                        </Text>
                        <Text variant="body-1" className={b('stepText')}>
                            Подпишись на тренера, чтобы получать информацию о тренировках
                        </Text>
                    </div>

                    <div className={b('step')}>
                        <div className={b('stepNumber')}>3</div>
                        <Text variant="header-2" className={b('stepTitle')}>
                            Начни тренироваться
                        </Text>
                        <Text variant="body-1" className={b('stepText')}>
                            Приходи на тренировки и следи за своим прогрессом
                        </Text>
                    </div>
                </div>
            </section>

            <section className={b('forTrainers')}>
                <div className={b('forTrainersContent')}>
                    <div className={b('forTrainersImage')}>
                        <img src={trainersImage} alt="Наши тренера" />
                    </div>
                    <div className={b('forTrainersText')}>
                        <Text variant="display-3" className={b('sectionTitle')}>
                            Для тренеров
                        </Text>
                        <Text variant="body-1" className={b('forTrainersDescription')}>
                            Присоединяйтесь к сообществу профессиональных тренеров FITSCHED
                        </Text>
                        <ul className={b('forTrainersList')}>
                            <li>
                                <Text variant="body-1">
                                    Создайте свой профиль и расскажите о своем опыте
                                </Text>
                            </li>
                            <li>
                                <Text variant="body-1">
                                    Управляйте расписанием тренировок
                                </Text>
                            </li>
                            <li>
                                <Text variant="body-1">
                                    Привлекайте новых клиентов
                                </Text>
                            </li>
                        </ul>
                        <Button 
                            view="action" 
                            size="xl" 
                            onClick={() => navigate('/coaches')}
                            className={b('ctaButton')}
                        >
                            Стать тренером
                        </Button>
                    </div>
                </div>
            </section>

            <section className={b('motivation')}>
                <div className={b('motivationImage')} />
                <Text variant="display-3" className={b('sectionTitle')}>
                    Начни свой путь к здоровому образу жизни
                </Text>
                <div className={b('motivationText')}>
                    <Text variant="body-1">
                        Каждый день - это новая возможность стать лучше. 
                        Не откладывай на завтра то, что можно начать сегодня.
                    </Text>
                </div>
                <Button 
                    view="action" 
                    size="xl" 
                    onClick={() => navigate('/coaches')}
                    className={b('ctaButton')}
                >
                    Начать сейчас
                </Button>
            </section>
        </div>
    );
}; 