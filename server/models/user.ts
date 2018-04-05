import * as mongoose from 'mongoose';
import Post from './post';

const user = new mongoose.Schema({
    name: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }]
}, {
        collection: 'users',
        timestamps: true,
    });

export default mongoose.model('user', user);