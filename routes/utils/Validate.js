const Validate = (req, res) => {
    const { destination, body } = req.body;
    if (destination == '') {
        res
            .status(422)
            .json({ message: 'Destination must be at least 1 character long' });
    } else if (body == '') {
        return res
            .status(422)
            .json({ message: 'Body must be at least 1 character long' });
    } else if (
        destination
        && body
        && (typeof destination !== 'string' || typeof body !== 'string')
    ) {
        return res.status(400).json({ message: 'Wrong type of data' });
    } else if (!body) {
        return res.status(400).json({ message: 'Body key missing' });
    } else if (!destination) {
        return res.status(400).json({ message: 'Destination key missing' })
    } else {
        return true;
    }
};

module.exports = Validate;