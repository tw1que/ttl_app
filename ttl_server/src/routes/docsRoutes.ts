import { Router } from 'express';

import { openApiDocument } from '../lib/openapi.js';

const router = Router();

router.get('/openapi.json', (_req, res) => {
  res.json(openApiDocument);
});

const html = `<!DOCTYPE html>
<html>
  <head>
    <title>API Docs</title>
    <meta charset="utf-8" />
    <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"></script>
  </head>
  <body>
    <redoc spec-url="/openapi.json"></redoc>
  </body>
</html>`;

router.get('/docs', (_req, res) => {
  res.type('html').send(html);
});

export default router;
