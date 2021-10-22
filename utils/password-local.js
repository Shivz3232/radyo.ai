import Local from 'passport-local';

const verify = (username, password, done) => {
  if (
    username == process.env.ADMIN_USERNAME &&
    password == process.env.ADMIN_PASSWORD
  ) {
    done(null, { isLoggedIn: true, isAdmin: true });
  } else {
    done(new Error('Failed to authorize user'));
  }
};

export const localStrategy = new Local.Strategy(verify);
