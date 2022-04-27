import { useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';

export default function Home() {
  const [session, loading] = useSession();
  const router = useRouter();

  if (!loading && !session) {
    router.push('/login');
  }

  return (
    <>
      <div>Content</div>
    </>
  );
}
