import { JwtPayload } from "jsonwebtoken";

export interface JwtPayload {
  id: string | number;
  [key: string]: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
