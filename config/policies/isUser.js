"use strict";

/**
 * `isUser` policy.
 */

module.exports = async (ctx, next) => {
  const { id, role } = ctx.state.user;
  if (role !== "administrator") {
    ctx.query.user = id;
  }

  await next();
  const responseBody = ctx.response.body;
  const user = responseBody.user && responseBody.user.id;

  if (user) {
    if (user !== id && role !== "administrator") {
      return ctx.unauthorized("You are not allowed to perform this action.");
    }
  } else if (role !== "administrator") {
    ctx.send(responseBody.filter(item => item.user.id === id));
  }
};
