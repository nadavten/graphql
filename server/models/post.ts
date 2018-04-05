import * as mongoose from 'mongoose';
import User from './user';

const post = new mongoose.Schema({
    text: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
        collection: 'posts',
        timestamps: true,
    })

export default mongoose.model('post', post);