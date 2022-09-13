import utils from "./index.js";
import _ from "lodash";
import i18next from "i18next";
import i18nextBackend from "i18next-fs-backend"
import i18nextMiddleware from "i18next-http-middleware"

const web = {
  view: (req, res, next) => {
    res.locals['$'] = {
      req: {
        url: req.url,
        query: req.query,
        body: req.body,
        headers: req.headers,
        cookies: req.cookies,
      },
      env: process.env
    };
    if (req.t && req.i18n) {
      res.locals['t'] = req.t;
      res.locals['i18n'] = req.i18n;
    }
    next();
  },
  i18n: (loadPath, config) => {
    const defaultConfig = {
      backend: {
        loadPath: loadPath
      },
      fallbackLng: 'en',
      load: 'languageOnly',
      saveMissing: true
    };
    i18next
      .use(i18nextBackend)
      .use(i18nextMiddleware.LanguageDetector)
      .init(_.isEmpty(config) ? defaultConfig : _.extend(defaultConfig, config));
    return i18nextMiddleware.handle(i18next);
  },
  notfound: (req, res, next) => res.status(404).send('Not Found'),
  error: (err, req, res, next) => {
    utils.debug.error(err);
    res.status(500).send('Internal Server Error')
  }
}

const restful = {
  notfound: (req, res, next) => {
    res.status(404);
    res.json({success: false, error: 'Not found'})
  },
  error: (err, req, res, next) => {
    utils.debug.error(err);
    res.status(500);
    res.json({success: false, error: 'Internal Server Error'})
  }
}


export default {
  web,
  restful
};
