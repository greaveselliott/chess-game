import styles from "./page.module.css";
import { Chessboard } from "@/components";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Chessboard />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
