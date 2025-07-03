import styles from "./Triangle.module.scss";

export default function Triangle({ angle = 0 }) {
  return (
    <div className={styles.Triangle}>
      <div style={{ rotate: `${angle}deg` }}>
        <span>▲</span>
      </div>
    </div>
  );
}
