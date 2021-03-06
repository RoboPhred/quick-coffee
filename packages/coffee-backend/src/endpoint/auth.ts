// User authentication.
//  Currently implemented as username-only, with implicit user creation from logins.

// Frustratingly, passport is a singleton.
import _passport from "koa-passport";
export const passport = _passport;

import jwt from "jsonwebtoken";

import HttpStatusCodes from "http-status-codes";

import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

import Router from "koa-router";
import compose from "koa-compose";

import User from "../models/User";

import { JWT_KEY } from "../config";
import { Middleware, Context } from "koa";

// Office365 integration can be done with passport-azure-ad
//  https://github.com/microsoftgraph/msgraph-training-nodeexpressapp/tree/master/Demos/03-add-aad-auth

_passport.serializeUser<User, string>((user: User, callback) => {
  callback(null, user.username);
});

_passport.deserializeUser<User, string>(async (id, callback) => {
  try {
    const user = await User.findByUsername(id);
    if (!user) {
      callback(new Error("User not found"));
      return;
    }
    callback(null, user);
  } catch (e) {
    callback(e);
  }
});

_passport.use(
  new LocalStrategy(async (username, password, callback) => {
    let user = await User.findByUsername(username);

    // Not dealing with passwords for the prototype.

    callback(null, user);
  })
);

_passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_KEY
    },
    async (jwtPayload: User, callback) => {
      try {
        const user = await User.findByUsername(jwtPayload.username);
        callback(null, user);
      } catch (e) {
        callback(e);
      }
    }
  )
);

const authRouter = new Router({ prefix: "/auth" });

authRouter.post("/login", (ctx, next) => {
  return passport.authenticate("local", async function(err, user, info) {
    if (err) {
      ctx.throw(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }

    if (user === false) {
      ctx.body = { success: false };
      ctx.throw("Invalid Username or Password.", HttpStatusCodes.UNAUTHORIZED);
    } else {
      await ctx.login(user, { session: false });
      const token = jwt.sign(user.toJSON(), JWT_KEY, { expiresIn: "2 days" });
      ctx.body = { success: true, token };
      ctx.status = HttpStatusCodes.OK;
    }
  })(ctx, next);
});

authRouter.post("/logout", ctx => {
  ctx.logout();
  ctx.redirect("/");
});

export default authRouter;

export function authenticate(role?: string): Middleware {
  return compose([
    passport.authenticate("jwt", { session: false }),
    (ctx: Context, next) => {
      const user: User | null = ctx.state.user;

      if (!user) {
        ctx.response.status = HttpStatusCodes.UNAUTHORIZED;
        return;
      }

      if (role === "barista" && !user.isBarista) {
        ctx.response.status = HttpStatusCodes.UNAUTHORIZED;
        return;
      }

      return next();
    }
  ]);
}
