import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { User } from "../models/User";

export async function getUsers(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const users = await User.find({ _id: { $ne: userId } })
      .select({
        name: 1,
        email: 1,
        avatar: 1,
      })
      .limit(50);
    res.status(200).json(users);
  } catch (error) {
    res.status(500);
    next(error);
  }
}
