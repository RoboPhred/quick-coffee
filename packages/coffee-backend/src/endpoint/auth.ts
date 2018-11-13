// User authentication.
//  Currently implemented as username-only, with implicit user creation from logins.

// Frustratingly, passport is a singleton.
//  to keep its logic contained, we re-export it from this file.
import _passport from "koa-passport";
export const passport = _passport;

import HttpStatusCodes from "http-status-codes";

import { Strategy as LocalStrategy } from "passport-local";

import Router from "koa-router";

import { User, findUserByUsername, createUser } from "../data/users";

// Office365 integration can be done with passport-azure-ad
//  https://github.com/microsoftgraph/msgraph-training-nodeexpressapp/tree/master/Demos/03-add-aad-auth

_passport.serializeUser<User, string>((user: User, callback) => {
  callback(null, user.username);
});

_passport.deserializeUser<User, string>((id, callback) => {
  findUserByUsername(id).then(
    user => {
      if (!user) {
        callback(new Error("User not found."));
      } else {
        callback(null, user);
      }
    },
    err => callback(err)
  );
});

_passport.use(
  new LocalStrategy(async (username, password, callback) => {
    let user = await findUserByUsername(username);

    // Just create the user if it does not exist.
    if (!user) {
      user = await createUser(username);
    }

    // Not dealing with passwords for the prototype.

    callback(null, user);
  })
);

const authRouter = new Router({ prefix: "/auth" });

authRouter.post("/login", (ctx, next) => {
  return passport.authenticate("local", function(err, user, info, status) {
    if (err) {
      ctx.throw(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }

    if (user === false) {
      ctx.body = { success: false };
      ctx.throw(info.message, HttpStatusCodes.UNAUTHORIZED);
    } else {
      ctx.body = { success: true };
      ctx.status = HttpStatusCodes.OK;
      return ctx.login(user);
    }
  })(ctx, next);
});

authRouter.post("/logout", ctx => {
  ctx.logout();
  ctx.redirect("/");
});

export default authRouter;
