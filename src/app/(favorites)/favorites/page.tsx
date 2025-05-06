"use client";
import Link from "next/link";
import UserCard from "../../(users)/user-card";
import { useFavorites } from "../../utils/hooks/useFavorites";
import styles from "./page.module.css";
import { PAGES } from "@/app/utils/constants/routes";

export default function Favorites() {
  const { getAllFavorites } = useFavorites();
  return (
    <div className={styles.root}>
      <Link className={styles.link} href={PAGES.homePage}>
        Atras
      </Link>
      <div className={styles.grid}>
        {getAllFavorites().map(
          ({
            username,
            id,
            email,
            image,
            firstName,
            age,
            birthDate,
            gender,
          }) => {
            return (
              <UserCard
                username={username}
                key={id}
                id={id.toString()}
                email={email}
                url={image}
                name={firstName}
                gender={gender}
                birthDate={birthDate}
                age={age}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
