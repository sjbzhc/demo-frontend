import { getToken } from 'next-auth/jwt';

const secret = process.env.GOOGLE_SECRET;

const handler = async (req, res) => {
  const token = await getToken({ req, secret });

  const data = await fetch('http://localhost:8080/profile', {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.idToken}`,
    }),
  });
  const profile = await data.json();

  res.status(200).json(profile);
};

export default handler;
