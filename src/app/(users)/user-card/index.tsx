import { FC, PropsWithChildren } from "react";
import styles from "./user-card.module.css";
import Card from "@/app/components/shared/card";
import Badge from "@/app/components/shared/badge";
import Email from "../../assets/email.svg";
import FavoriteButtonWrapper from "@/app/components/ui/buttons/favorite-button-wrapper";

interface Props {
  id: string;
  url: string;
  name: string;
  email: string;
  username: string;
  gender: string;
  birthDate: string;
  age: number;
}

const UserCard: FC<PropsWithChildren<Props>> = ({
  id,
  name,
  url,
  email,
  username,
  gender,
  birthDate,
  age,
}) => {
  return (
    <Card src={url} alt={name}>
      <div className={styles.details}>
        <div className={styles.title}>
          <h1 className={styles.headline}>{name}</h1>
          <FavoriteButtonWrapper
            id={id}
            email={email}
            firstName={name}
            image={url}
            username={username}
            age={age}
            birthDate={birthDate}
            gender={gender}
          />
        </div>
        <div className={styles.userInfo}>
          <h4>{username}</h4>
          <div className={styles.email}>
            <Email />
            <a href={`mailto:${email}`}>Contact</a>
          </div>
        </div>
        <div className={styles.group}>
          <Badge label="Fecha Nac." description={birthDate} />
          <Badge label="Edad" description={age} />
          <Badge label="Genero" description={gender} />
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
