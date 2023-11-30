const { Votes, Auth } = require('../models/');
// const { authCheck } = require('../helper/jwt_helper'); CANCELLED


//vote
const vote = async (req, res) => {
    const user = req.session.user;
    if (!user)
        return res.json({ "message": "Unauthorized" });
    const { candidate } = req.body;
    await Auth.findOne({ username: user, voted: true })
        .then(u => {
            if (u)
                res.send("You already voted");
            else {
                const update = { $inc: { [candidate]: 1 } }
                Votes.updateOne({}, update)
                    .then(r => {
                        Auth.findOneAndUpdate({ username: user }, { voted: true }, { new: true })
                            .then(uu => {
                                req.session.voted = uu.voted
                                res.redirect('/');
                            });
                    })
            }
        })
        .catch(e => res.json(e));
};

//get
const fetch = async (req, res) => {
    await Votes.find()
        .then(r => {
            res.status(200).json(r)
        })
        .catch(e => res.status(401).json(e));
};

module.exports = { vote, fetch };