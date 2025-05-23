import {useNavigate} from 'react-router-dom';
import {Button, Text} from '@gravity-ui/uikit';
import {useContext} from 'react';
import {AuthContext} from '../../App';

import block from 'bem-cn-lite';
import './PageHeader.scss';
const b = block('pageHeader');

export const PageHeader = () => {
    const navigate = useNavigate();
    const {setIsAuthModalOpen, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const onNavigationClick = (path: string) => {
        navigate(path);
    };

    const handleProfileClick = () => {
        if (isAuthenticated) {
            navigate('/profile');
        } else {
            setIsAuthModalOpen(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <header className={b()}>
            <div className={b('name')} onClick={() => onNavigationClick('/')}>
                <Text variant="display-2">FITSCHED</Text>
            </div>
            <div className={b('buttons')}>
                <Button
                    view="action"
                    size="xl"
                    onClick={() => onNavigationClick('/main')}
                    disabled={window.location.pathname === '/main'}
                >
                    Главная
                </Button>
                <Button
                    view="action"
                    size="xl"
                    onClick={() => onNavigationClick('/coaches')}
                    disabled={window.location.pathname === '/coaches'}
                >
                    Список тренеров
                </Button>
                <Button
                    view="action"
                    size="xl"
                    onClick={handleProfileClick}
                    disabled={window.location.pathname === '/profile'}
                >
                    Профиль
                </Button>
                {isAuthenticated ? (
                    <Button
                        view="outlined"
                        size="xl"
                        onClick={handleLogout}
                    >
                        Выйти
                    </Button>
                ) : (
                    <Button
                        view="outlined"
                        size="xl"
                        onClick={() => setIsAuthModalOpen(true)}
                    >
                        Войти
                    </Button>
                )}
            </div>
        </header>
    );
};

export default PageHeader;
