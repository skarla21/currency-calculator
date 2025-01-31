import express from "express";

const catchAsync = (fn: Function) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    //ensure the function returns a promise
    const promise = fn(req, res, next);
    if (promise && typeof promise.catch === "function") {
      promise.catch(next); //pass errors to the error-handling middleware
    }
  };
};

export default catchAsync;
