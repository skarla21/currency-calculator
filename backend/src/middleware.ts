import express from "express";

const isLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  if (!req.isAuthenticated()) {
    res
      .status(401)
      .json({ error: "You must be logged in to access this resource." });
    return; //just ending the function here, because i cant return 'response type' because of void
  }
  next();
};

export { isLoggedIn };
