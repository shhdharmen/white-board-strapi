"use strict";

/**
 * `setUser` policy.
 */

module.exports = async (ctx, next) => {
  const { id } = ctx.state.user;
  const { body } = ctx.request;

  body.user = id.toString();

  await next();
};
