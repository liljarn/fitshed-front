import { useState, useContext } from 'react';
import { Modal, Text, TabProvider, TabList, Tab, TabPanel, TextInput, Button } from '@gravity-ui/uikit';
import { SignupSteps } from './__internal/SignupSteps';
import { useLoginUser } from '@/api/login/login';
import { useNavigate } from 'react-router-dom';
import block from 'bem-cn-lite';
import './AuthModal.scss';
import { AuthContext } from '../../App';

const b = block('authModal');

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setIsAuthModalOpen, setIsAuthenticated } = useContext(AuthContext);
  const { mutate: login, isPending: isLoginPending } = useLoginUser();

  // Сброс при закрытии
  const handleClose = () => {
    setActiveTab('login');
    setLoginData({ email: '', password: '' });
    setLoginError(null);
    onClose();
  };

  const handleLogin = () => {
    setLoginError(null);
    login(
      loginData,
      {
        onError: () => setLoginError('Ошибка входа'),
        onSuccess: (data) => {
          localStorage.setItem('token', data.access_token);
          setIsAuthenticated(true);
          setIsAuthModalOpen(false);
          handleClose();
          navigate('/profile');
        },
      }
    );
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className={b()}>
        <Text variant="header-1" as="h1" className={b('title')}>
          {activeTab === 'login' ? 'Вход' : 'Регистрация'}
        </Text>
        <TabProvider value={activeTab} onUpdate={setActiveTab}>
          <TabList className={b('tabs')}>
            <Tab value="login">Вход</Tab>
            <Tab value="signup">Регистрация</Tab>
          </TabList>
          <TabPanel value="login">
            <div className={b('form')}>
              <TextInput
                label="Email"
                value={loginData.email}
                onUpdate={val => setLoginData(prev => ({ ...prev, email: val }))}
                placeholder="Введите ваш email"
                size="xl"
              />
              <TextInput
                label="Пароль"
                type="password"
                value={loginData.password}
                onUpdate={val => setLoginData(prev => ({ ...prev, password: val }))}
                placeholder="Введите пароль"
                size="xl"
              />
            </div>
            <Button 
                view="action"
                size="xl"
                className={b('submit')}
                loading={isLoginPending}
                onClick={handleLogin}
              >
                Войти
              </Button>
              <div className={b('error')}>
                {loginError && (
                  <Text variant='body-2' color='danger-heavy'>{loginError}</Text>
                )}
              </div>
          </TabPanel>
          <TabPanel value="signup">
            <SignupSteps onSuccess={() => {
              handleClose();
              navigate('/profile');
            }} />
          </TabPanel>
        </TabProvider>
      </div>
    </Modal>
  );
};
