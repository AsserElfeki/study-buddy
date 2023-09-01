import { User } from './user';

interface Session {
  user: User;
  accessToken: string;
}

export default Session;
