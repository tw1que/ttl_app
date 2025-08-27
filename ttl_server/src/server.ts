import 'dotenv/config';
import app from './app.js';

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`ttl_server listening on :${PORT}`);
});
