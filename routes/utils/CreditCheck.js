const Credit = require('../../models/Credit');
const axios = require("axios")

module.exports = {
    add(amount, res) {
        Credit.find({}).then(resp => {
            if (resp.length < 1) {
                const newCredit = new Credit({ credit: amount })
                newCredit.save()
                    .then(resp => { res.status(200).json({ message: `Added ${amount} credit` }); })
            } else {
                Credit.findOneAndUpdate({ _id: `${resp[0]._id}` }, { credit: resp[0].credit + amount })
                    .then(resp => { res.status(200).json({ message: `Added ${amount} credit` }); })
                    .catch(resp => { res.status(400).json({ message: `Error adding credit` }); })
            }
        })
    },
    check() {
        return Credit.find({})
            .then(resp => {
                if (resp[0].credit > 0) {
                    return true;
                }
                return false
            })
            .catch(resp => { return "error" })
    },
    pay() {
        Credit.find({}).then(resp => {
            console.log(resp)
            Credit.findOneAndUpdate({ _id: `${resp[0]._id}` }, { credit: resp[0].credit - 1 })
                .then(resp => console.log("1"))
                .catch(resp => console.log("0"))
        })
    }
}

