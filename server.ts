import * as express from 'express';
import * as mongoose from 'mongoose';
import * as gqlEpxress from 'express-graphql'
import {resolvers,schema} from './server/schema';

mongoose.connect('mongodb://localhost/gql',err =>{
    if(err){
        console.error(err);
    }
});

const app = express();

express.static(__dirname+'/index.html');

app.use('/graphql',gqlEpxress({
    schema:schema,
    rootValue:resolvers,
    graphiql:true,
}));

app.use('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});


app.listen(2400,err=>{

    if(err){
        console.error(err);
    }

    console.log('listening port 2400');
})