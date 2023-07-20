import Link from 'next/link';
import Image from 'next/image';
import s from './NavMenu.module.css';
import AuthCheck from '@/helpers/AuthCheck';
import { SignInButton, SignOutButton } from '../Buttons';

export const NavMenu = () => (
  <nav className={s.nav}>
    <Link href='/'>
      <Image src='/logo.svg' alt='Logo' width={216} height={30} />
    </Link>
    <ul className={s.links}>
      <li>
        <Link href='/about'>About</Link>
      </li>
      <li>
        <Link href='/blog'>Blog</Link>
      </li>
      <li>
        <Link href='/users'>Users</Link>
      </li>
      <li>
        <SignInButton />
      </li>

      <li>
        <AuthCheck>
          <SignOutButton />
        </AuthCheck>
      </li>
    </ul>
  </nav>
);
