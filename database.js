const mongoose = require('mongoose');

module.exports = {
    connectDB (db1, db2) {
        mongoose.Promise = Promise;
        mongoose
            .connect(db1, { useNewUrlParser: true })
            .then(() => {
                console.log(`Connected to Mongo! ${db1}`);
            }).catch((err) => {
                this.connectDB(db2, db1)
            });
    }
}