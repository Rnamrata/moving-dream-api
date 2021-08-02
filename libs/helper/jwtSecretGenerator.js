const crypto = require('crypto');

// const randomSalt = require('crypto').randomBytes(512).toString('base64');
// console.log(randomSalt);
randomSalt = 'SkkGZj2Cxu4B6ndbI1rf9CxCX5nG2VhjAL5FVsLixBlObkiUwC7+yN7KWfBeB7Jcj6YguTPRHB/5gsaFK+PFnDKip8A4jLwfxhxnAxxb6KGo6J31Hx+6iZKlnh3gOJF7QNhnm3sJo9QLsN4JQ4TifYicIfm8QnlVPYaBHtmGo+uIdOAeawl3lHrpQiqJg3swjOqkB/mIqNq64+q5lVo5IIN+GQPH7J1hbU5E2+T2hGb51QB+/ER3Xbvkf69wV3Wwi0H1jBU1sAhBF270T1hnYKiSpdGHXc42srC3j/J/T0ckaw/kDPVc3M3S3f9V5WZ6KcCb6gz7LernZNqAWWezzDIToZUcNmjCKX40T4mNNJgR7cuxSqoaVvz1+gzuKGXRIx8kqTa59XRDOARGVi/r9UPMT6DSEVIhqZCkJrbbCzGL/6FfhE97Kbjq3hLmXncN0hi2XSnr0R47kespR/Swvz8t4n/3927iTTpgeQlW8U0+dAnRmSh16SdlUhALuh71kfFmZGiztUt/L/IlHMPyRkbeVoe+e/7Gykk+z/RX2r4987wjkl/BW/dXzlE6WEAPmS7uVC7v6artitMTC6iqkCyWMpxzQRk/3UIhyTZVkXTEZtMHTG8JwQddtpxt6HdaXeDmaXGjoOR3H17vy8zf8LQHJYVLVkY3NHK/jstbbHs=';

const string = 'Moving Dream';
const hash = crypto.createHmac('sha512', randomSalt).update(string).digest('base64');

console.log(hash);
//9ndPDgv9hZ/NkX+TBVJJR1nhxLaqio5aMtdjHFVqBlP5SdbmgTahsOLKxYK1JXOHj5V4aw6dvSN7cvmAe7dsRA==
