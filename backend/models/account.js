const mongoose = require('mongoose');
- Account (sellerId, accountNumber, IFSCCode, UPIId, qrCodeImage, balance)
const accountSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    IFSCCode: {
        type: String,
        required: true
    },
    UPIId: {
        type: String,
    },
    qrCodeImage: {
        type: String,
    },
    balance: {
        type: Number,
        default: 0
    }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
