"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth(allowedUser) {
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser || loggedInUser !== allowedUser) {
      router.push('/');
    }
  }, [allowedUser]);
}