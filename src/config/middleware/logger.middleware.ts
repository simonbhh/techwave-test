import { Request, Response, NextFunction } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  let logMessage = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}`;
  if (req.method === 'POST' || req.method === 'PUT') {
    logMessage += ` - Request body: ${JSON.stringify(req.body)}`;
  }
  console.log(logMessage);

  next();
}
