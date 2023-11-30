const assert = require("assert");

const auth = require("./AuthM");
const votes = require("./VotesM");

assert(auth, "Auth Model is Required");
assert(votes, "Votes Model is Required");


module.exports = {
  Auth: auth,
  Votes: votes
};
