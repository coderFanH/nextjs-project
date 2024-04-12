import { NextResponse } from 'next/server';
import {
  jwtMiddleware,
  identityMiddleware,
  validateMiddleware,
  errorHandler,
} from '.';
import _ from 'lodash';

function isPublic(req) {
  const publicPaths = ['POST:/api/auth/login', 'POST/api/auth/register'];
  return _.includes(publicPaths, `${req.method}:${req.nextUrl.pathname}`);
}

function apiHandler(handler, { identity, schema, isJwt } = {}) {
  return async (req, ...args) => {
    try {
      if (!isPublic(req)) {
        await jwtMiddleware(req, isJwt);
        await identityMiddleware(req, identity, isJwt);
        await validateMiddleware(req, schema);
      }
      const NextResponseBody = await handler(req, ...args);
      return NextResponse.json(NextResponseBody || {});
    } catch (err) {
      console.log('global error handler', err);
      return errorHandler(err);
    }
  };
}

export { apiHandler };
