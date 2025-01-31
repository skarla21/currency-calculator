import express from "express";
import passport from "passport";
import User, { IUser } from "../models/User.js";

const currentUser = (req: express.Request, res: express.Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  return res.status(200).json(req.user);
};

const register = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { email, username, password } = req.body;
  const user = new User({ email, username });

  try {
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      return res
        .status(200)
        .json({ message: "Registration successful", user: registeredUser });
    });
  } catch (registerError: any) {
    return res
      .status(500)
      .json({ message: "Registration failed", error: registerError.message });
  }
};

// const login = (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   passport.authenticate(
//     "local",
//     (err: Error | null, user: IUser | false | null, info: any) => {
//       if (err) {
//         return next(err);
//       }
//       console.log("Session data:", req.session); // Debugging line
//       console.log("User data:", req.user); // Debugging line
//       if (!user) {
//         return res
//           .status(401)
//           .json({ message: "Authentication failed", error: info.message });
//       }
//       req.login(user, (loginErr) => {
//         if (loginErr) {
//           return next(loginErr);
//         }
//         return res.status(200).json({ message: "Login successful", user });
//       });
//     }
//   )(req, res, next);
// };

const login = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  passport.authenticate(
    "local",
    (err: Error | null, user: IUser | false | null, info: any) => {
      if (err) {
        return next(err);
      }
      console.log("Session data before login:", req.session); // Debugging line
      console.log("Session ID:", req.session.id);
      console.log("User data before login:", req.user); // Debugging line
      if (!user) {
        return res
          .status(401)
          .json({ message: "Authentication failed", error: info.message });
      }
      req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        console.log("Session data after login:", req.session); // Debugging line
        console.log("Session ID:", req.session.id);
        console.log("User data after login:", req.user); // Debugging line

        res.cookie("test_cookie", "hello_world");

        return res.status(200).json({ message: "Login successful", user });
      });
    }
  )(req, res, next);
};

const logout = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  req.logout((err) => {
    if (err) {
      return next(err); // pass the error to the error-handling middleware
    }
    return res.status(200).json({ message: "Logout successful" });
  });
};

export { currentUser, register, login, logout };
