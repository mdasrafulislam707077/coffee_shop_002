import Cors from "cors";
const cors = Cors({
  methods: ["GET", "HEAD", "POST"],
  origin: "*",
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default function withCors(handler) {
  return async (req, res) => {
    await runMiddleware(req, res, cors);

    return handler(req, res);
  };
}
