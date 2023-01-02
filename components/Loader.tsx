import styles from "../styles/Loader.module.scss"

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.loader}/>
    </div>
  );
};

export default Loader
