
import { useState } from 'react';
import styles from './EjemploSelect.module.css';

export const EjemploSelect = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFocus = () => setIsOpen(true);
  const handleBlur = () => setIsOpen(false);

  return (
    <div className={styles.selectContainer}>
      <select
        className={`${styles.select} ${isOpen ? styles.open : ''}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <option value="">Selecciona una opción</option>
        <option value="rojo">Rojo</option>
        <option value="azul">Azul</option>
        <option value="verde">Verde</option>
      </select>
      <span className={`${styles.icon} ${isOpen ? styles.rotate : ''}`}>&#9662;</span>
    </div>
  );
};

