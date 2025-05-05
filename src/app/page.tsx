import { fetchUsers } from "./utils/api/users";
import styles from "./page.module.css";
import UsersList from "./(users)/users-list";

export default async function Home() {
  const response = await fetchUsers({ limit: 20, skip: 0 });
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <UsersList initialData={response} />
      </div>
    </div>
  );
}
