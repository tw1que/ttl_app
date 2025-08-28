import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import OpenAPISchemaValidatorPkg from 'openapi-schema-validator';

import { openApiDocument } from '../src/lib/openapi.js';

async function main() {
  const OpenAPISchemaValidator = OpenAPISchemaValidatorPkg.default;
  const validator = new OpenAPISchemaValidator({ version: 3 });
  const result = validator.validate(openApiDocument);
  if (result.errors.length > 0) {
    console.error(result.errors);
    process.exit(1);
  }
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const outPath = resolve(__dirname, '../openapi.json');
  await writeFile(outPath, JSON.stringify(openApiDocument, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
