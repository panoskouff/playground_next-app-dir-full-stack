import Link from 'next/link';
import s from './UserCard.module.css';

interface Props {
  id: string;
  name: string | null;
  age: number | null;
  image: string | null;
}

export default function UserCard({ id, name, age, image }: Props) {
  return (
    <div className={s.card}>
      <img
        src={image ?? '/mememan.webp'}
        alt={`${name}'s profile`}
        className={s.cardImage}
      />
      <div className={s.cardContent}>
        <h3>
          <Link href={`/users/${id}`}>{name}</Link>
        </h3>
        <p>Age: {age}</p>
      </div>
    </div>
  );
}
