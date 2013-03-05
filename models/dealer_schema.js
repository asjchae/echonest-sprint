var mongoose = require('mongoose');

var dealer_schema = mongoose.Schema({
    submitted_cards: [{type: mongoose.Schema.Types.ObjectId, ref: 'songcard'}],
    theme: [{type: mongoose.Schema.Types.ObjectId, ref: 'themecard'}]
});

var dealer = mongoose.model('dealer', dealer_schema);

module.exports = dealer;