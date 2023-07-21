import UserCard from '@/components/UserCard/UserCard';
import s from './page.module.css';
import { prisma } from '@/lib/prisma';

export default async function Users() {
  const users = await prisma.user.findMany();

  return (
    <div className={s.grid}>
      {users.map((user) => {
        return <UserCard key={user.id} {...user} />;
      })}
    </div>
  );
}
