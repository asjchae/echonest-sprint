var mongoose = require('mongoose');

var dealer_schema = mongoose.Schema({
    card_hand: [{type: mongoose.Schema.Types.ObjectId, ref: 'songcard'}],
});

var dealer = mongoose.model('dealer', dealer_schema);

module.exports = dealer;