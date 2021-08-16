import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../db/db';

const handler = async (req, res) => {
  const session = await getSession({ req: req });
  const userEmail = session.user.email;
  
  const client = await connectToDatabase();

  const usersCollection = client.db().collection('users');
  const skills = client.db().collection('skills');

  const user = await usersCollection.findOne({ email: userEmail });

  let allSkills = [];
  
  allSkills = await skills.find({}).toArray();

  const userSkills = user.skills.map((skill) => skill.name);

  allSkills = allSkills.filter((skill) => !userSkills.includes(skill.name));
    
  allSkills = allSkills.map((skill) => {
    return {
     id: skill._id,
     name: skill.name,
    };
  });


  allSkills = JSON.parse(JSON.stringify(allSkills));

  client.close();

  res.status(200).json({ allSkills });
};

export default handler;
