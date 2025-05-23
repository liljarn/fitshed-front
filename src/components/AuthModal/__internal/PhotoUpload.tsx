import { Button } from '@gravity-ui/uikit';
import { useRef, useState, useEffect } from 'react';
import block from 'bem-cn-lite';
import './PhotoUpload.scss';

const b = block('photoUpload');

interface PhotoUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
}

export const PhotoUpload = ({ value, onChange }: PhotoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div className={b()}>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button size='xl' type="button" onClick={() => inputRef.current?.click()} className={b('button')}>
        Загрузить фото
      </Button>
      {preview && (
        <img src={preview} alt="Превью" className={b('preview')} />
      )}
    </div>
  );
} 