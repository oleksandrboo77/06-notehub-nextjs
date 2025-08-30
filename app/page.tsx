import css from "./page.module.css";

export default function HomePage() {
  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>
        <p className={css.description}>NoteHub is a simple and efficient application…</p>
        <p className={css.description}>The app provides a clean interface…</p>
      </div>
    </main>
  );
}
