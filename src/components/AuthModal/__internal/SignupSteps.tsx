import { Stepper, Button, TextInput, RadioGroup, TextArea, Text } from '@gravity-ui/uikit';
import { PhotoUpload } from './PhotoUpload';
import { ROLE_OPTIONS, useSignupSteps } from './useSignupSteps';
import block from 'bem-cn-lite';

const b = block('authModal');

export const SignupSteps = ({ onSuccess }: { onSuccess: () => void }) => {
  const {
    activeStep,
    steps,
    role,
    setRole,
    formData,
    errors,
    isSignupPending,
    isTrainerPending,
    handleNext,
    handlePrev,
    handleChange,
    handlePhotoChange,
    errorMessage,
  } = useSignupSteps();

  // При успешной регистрации сбрасываем форму и закрываем модалку
  const handleFinish = async () => {
    await handleNext(onSuccess);
  };

  return (
    <>
      <Stepper className={b('stepper')}>
        {steps.map((step, index) => (
          <Stepper.Item 
            key={index}
            view={index < activeStep ? "success" : "idle"}
            disabled={index > activeStep}
          >
            {step.title}
          </Stepper.Item>
        ))}
      </Stepper>

      {/* Шаг 0: выбор роли */}
      {activeStep === 0 && (
        <div className={b('form')}>
          <RadioGroup
            name="role"
            size='l'
            value={role}
            options={ROLE_OPTIONS}
            onUpdate={val => setRole(val as any)}
          />
        </div>
      )}

      {/* Шаг 1: email и пароль */}
      {activeStep === 1 && (
        <div className={b('form')}>
          <TextInput
            label="Email"
            value={formData.email}
            onUpdate={handleChange('email')}
            error={errors.email}
            placeholder="Введите ваш email"
            size="xl"
          />
          <TextInput
            label="Пароль"
            type="password"
            value={formData.password}
            onUpdate={handleChange('password')}
            error={errors.password}
            placeholder="Придумайте пароль"
            size="xl"
          />
        </div>
      )}

      {/* Шаг 2: ФИО */}
      {activeStep === 2 && (
        <div className={b('form')}>
          <TextInput
            label="Фамилия"
            value={formData.last_name}
            onUpdate={handleChange('last_name')}
            error={errors.last_name}
            placeholder="Введите фамилию"
            size="xl"
          />
          <TextInput
            label="Имя"
            value={formData.first_name}
            onUpdate={handleChange('first_name')}
            error={errors.first_name}
            placeholder="Введите имя"
            size="xl"
          />
          <TextInput
            label="Отчество (необязательно)"
            value={formData.middle_name}
            onUpdate={handleChange('middle_name')}
            placeholder="Введите отчество"
            size="xl"
          />
        </div>
      )}

      {/* Шаг 3: О себе (только для тренера) */}
      {role === 'trainer' && activeStep === 3 && (
        <div className={b('form')}>
            <TextInput
            label="Опыт"
            type="number"
            value={formData.experience_years}
            onUpdate={handleChange('experience_years')}
            error={errors.experience_years}
            placeholder="Опыт работы в годах"
            size="xl"
          />
          <TextArea
            rows={4}
            value={formData.description}
            onUpdate={handleChange('description')}
            error={errors.description}
            placeholder="Расскажите о себе"
            size="xl"
          />
        </div>
      )}

      {/* Шаг 4: Фото (только для тренера) */}
      {role === 'trainer' && activeStep === 4 && (
        <div className={b('form')}>
          <PhotoUpload value={formData.profile_photo} onChange={handlePhotoChange} />
          {errors.profile_photo && (
            <div style={{ color: 'red', fontSize: 14 }}>{errors.profile_photo}</div>
          )}
        </div>
      )}

      <div className={b('buttons')}>
        <Button 
          onClick={handlePrev}
          disabled={activeStep === 0 || isSignupPending || isTrainerPending}
          view="outlined"
          size="xl"
        >
          Назад
        </Button>
        <Button 
          onClick={handleFinish}
          view="action"
          size="xl"
          loading={isSignupPending || isTrainerPending}
        >
          {activeStep === steps.length - 1 ? 'Зарегистрироваться' : 'Далее'}
        </Button>
      </div>
      <div className={b('error')}>
                {errorMessage && (
                  <Text variant='body-2' color='danger-heavy'>{errorMessage}</Text>
                )}
              </div>
    </>
  );
}; 