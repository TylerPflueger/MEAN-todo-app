
var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
    createdAt: Date,
    updatedAt: Date
});

TodoSchema.pre('save', function(next, done) {
    if (this.isNew) {
        this.createdAt = Date.now();
    }
    this.updatedAt = Date.now();
    next();
});

mongoose.model('Todo', TodoSchema);