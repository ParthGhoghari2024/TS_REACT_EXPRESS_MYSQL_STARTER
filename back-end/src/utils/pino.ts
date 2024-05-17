import pino from "pino";
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      destination: `logs.log`,
      colorize: true,
    },
  },
});

export default logger;
