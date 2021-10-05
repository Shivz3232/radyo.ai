import { getLoginSession } from '../../../utils/auth';
import { removeTokenCookie } from '../../../utils/auth-cookies';

export default async function user(req, res) {
  try {
    const session = await getLoginSession(req);
    const user = session?.isLoggedIn ? { isLoggedIn: true } : null;

    res.status(200).json({ user });
  } catch (error) {
    removeTokenCookie(res);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
