const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        enum: ['vegetarian', 'non-vegetarian', 'vegan', 'bakery'],
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    pickupTime: {
        type: Date,
        required: true
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    status: {
        type: String,
        enum: ['available', 'reserved', 'donated'],
        default: 'available'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Geospatial indexing
DonationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Donation', DonationSchema);
