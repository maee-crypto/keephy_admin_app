'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: replace with real auth
    document.cookie = `token=dummytoken; path=/`;
    const next = search.get('next') || '/';
    router.push(next);
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Login</h1>
        <form className="space-y-4" onSubmit={onSubmit}>
          <input className="w-full border rounded px-3 py-2" placeholder="Email" />
          <input className="w-full border rounded px-3 py-2" placeholder="Password" type="password" />
          <button disabled={loading} className="w-full bg-blue-600 text-white rounded px-4 py-2">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </section>
    </main>
  );
}


