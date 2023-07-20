'use client';

import { useSession } from 'next-auth/react';

type Props = {
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export default function AuthCheck({ children, fallback }: Props) {
  const { data: session, status } = useSession();

  console.log(session, status);

  if (status === 'authenticated') {
    return <>{children}</>;
  } else {
    if (fallback || fallback === null) {
      return <>{fallback}</>;
    } else {
      return <>You need to be logged in to be able to see this</>;
    }
  }
}
