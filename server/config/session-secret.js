module.exports = process.env.SESSION_SECRET || require('crypto').randomBytes(32).toString('hex');
