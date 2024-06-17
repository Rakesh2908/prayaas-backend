import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number, 
        required: true,
    },
    // orderId: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    paymentStatus: {
        type: String,
        required: true,
        enum: ['created', 'paid', 'failed'], // Possible statuses for payments
        default: 'created',
    },
    message: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

volunteerSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

export const Volunteer = mongoose.model('Volunteer', volunteerSchema);
