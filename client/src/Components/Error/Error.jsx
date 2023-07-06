
import styles from './Error.module.css';

const Error= () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.description}>
          Lo siento, la página que buscas no existe.
        </p>
      </div>
    </div>
  );
};

export default Error;
