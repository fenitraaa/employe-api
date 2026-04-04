import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const authUsername = process.env.AUTH_USERNAME;
    const authPassword = process.env.AUTH_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    if (!authUsername || !authPassword || !jwtSecret) {
      return res.status(500).json({
        message: 'Authentication environment variables are not configured',
      });
    }

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    if (
      username !== authUsername ||
      password !== authPassword
    ) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { username: authUsername },
      jwtSecret,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
