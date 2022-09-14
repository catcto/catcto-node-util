import middleware from "./middleware.js";
import debug from "debug";

switch (process.env.NODE_ENV) {
  case 'dev':
    debug.enable('app:*');
    break;
  case 'prod':
    debug.enable('app:error,app:log,app:prod');
    break
}

const error = debug('app:error');
const log = debug('app:log');
const devLog = debug('app:dev');
const prodLog = debug('app:prod');

export default {
  middleware,
  debug: {
    log,
    error,
    devLog,
    prodLog
  }
}
