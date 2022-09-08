import utils from "./index.js";

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
    next();
  },
  notFound: (req, res, next) => res.status(404).send('Not Found'),
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
