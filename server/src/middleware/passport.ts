import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { jwtSecret } from "../config";
import { User } from "../entity/User";
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findOne(payload.user_ID);
    console.log("after user");
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log("ERROR SESSIONNNNNNN", error);
  }
});
