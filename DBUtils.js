const mongoose = require('mongoose');
let primaryURL = process.env.DBURL
let secundaryURL = process.env.RSURL
module.exports = {
    connectDB(db1, db2) {
        mongoose.Promise = Promise;
        mongoose
            .connect(db1, { useNewUrlParser: true })
            .then(() => {
                console.log(`Connected to Mongo! ${db1}`);
            }).catch((err) => {
                this.connectDB(db2, db1)
            });
    },

    getPrimary() {
        return primaryURL
    },

    getSecundary() {
        return secundaryURL
    },

    swap() {
        let aux = primaryURL
        primaryURL = secundaryURL
        secundaryURL = aux
    },
}