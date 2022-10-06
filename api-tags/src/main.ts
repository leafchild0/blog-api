import { createLightship } from 'lightship';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import * as httpContext from 'express-http-context';
import * as responseTime from 'response-time';

import { AppModule } from './app.module';
import { initSwagger } from './common/swagger-init';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { exceptionFactory } from './common/errors';
import { ConsoleLogger } from '@nestjs/common';
import {
  BASE_PATH,
  CORS_HEADERS,
  DOCS_PATH,
  PORT,
  SHUTDOWN_TIMEOUT,
} from './common/config';

let logger: ConsoleLogger;

const rawRequestBody = (req: any, _, buf: Buffer, encoding): void => {
  try {
    req.bodyRaw = buf.toString(encoding || 'utf8');
  } catch (e) {
    logger.error(JSON.stringify(e), 'body:catch');
  }
};

export const initApp = async (): Promise<INestApplication> => {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
    bufferLogs: true,
  });

  app.useLogger(logger);

  app.enableCors({ exposedHeaders: CORS_HEADERS });
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    bodyParser.json({
      verify: rawRequestBody,
    }),
  );

  return app;
};

async function bootstrap(): Promise<string> {
  const app = await initApp();
  const lightship = await createLightship();

  lightship.registerShutdownHandler(() => {
    setTimeout(() => {
      app.close().catch((err) => {
        logger.error(err);
      });
    }, Number(SHUTDOWN_TIMEOUT));
  });

  app.enableCors();

  app.use(httpContext.middleware);
  app.use(responseTime({ header: 'x-response-time' }));

  if (BASE_PATH !== '/') {
    app.setGlobalPrefix(BASE_PATH);
  }

  app.useGlobalPipes(new ValidationPipe({ exceptionFactory }));
  app.useGlobalFilters(new HttpExceptionFilter());

  initSwagger(app);

  await app.startAllMicroservices();
  await app.listen(PORT, '0.0.0.0');

  lightship.signalReady();

  return app.getUrl();
}

bootstrap()
  .then((url) => {
    logger.log(`api-tags service started`);
    logger.log(`Started on ${url}${BASE_PATH}`);
    logger.log(`Docs available on ${url}${DOCS_PATH}`);

    process.on('uncaughtException', (err) => {
      logger.error(err, 'process:uncaughtException');
    });

    process.on('unhandledRejection', (reason, promise) => {
      logger.error(
        reason,
        `Unhandled Rejection at: ${promise}, reason: ${reason}`,
      );
    });
  })
  .catch((err) => {
    logger.error(err, 'Error during startup');
  });
