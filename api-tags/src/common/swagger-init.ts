import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { API_VERSION, DOCS_PATH } from './config';
import { INestApplication } from '@nestjs/common';

/**
 * Utils to init swagger
 */

const writeSwaggerJson = (path: string, document): void => {
  fs.writeFileSync(`${path}/swagger.json`, JSON.stringify(document, null, 2), {
    encoding: 'utf8',
  });
};

export const initSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription(
      'Swagger specification for api-tags | [swagger.json](swagger.json)',
    )
    .setVersion(API_VERSION)
    .addBearerAuth({ type: 'apiKey', name: 'access-token', in: 'header' })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  writeSwaggerJson(`${process.cwd()}`, document);

  app.use('/docs/swagger.json', (_, res) => {
    // swagger json
    res.json(document);
  });

  SwaggerModule.setup(DOCS_PATH, app, document, {
    swaggerOptions: {
      displayOperationId: true,
    },
    customSiteTitle: 'Blog tags API',
  });
};
