// Mongo Setup
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnalyticsSchema = new Schema({
    canvasHash: {
        type: String,
        required: true,
        default: ""
    },
    lastVisited: {
        type: Date,
        required: true,
        default: Date.now()
    },
    sites: {
        type: [String],
        required: true,
        default: []
    }
    // Add other beacons later for timing and CSS :visited
});

module.exports = Analytics = mongoose.model("analytics", AnalyticsSchema);