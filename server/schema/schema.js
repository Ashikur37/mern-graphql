

const Project=require('../models/Project.js');
const Client=require('../models/Client.js');

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql');

//client type
const ClientType= new GraphQLObjectType({
    name:'Client',
    fields:()=>({
     id:{type:GraphQLID}, 
    name:{type:GraphQLString},
    email:{type:GraphQLString},
    phone:{type:GraphQLString}
    })
});

//project type
const ProjectType= new GraphQLObjectType({
    name:'Project',
    fields:()=>({
     id:{type:GraphQLID}, 
    name:{type:GraphQLString},
    description:{type:GraphQLString},
    status:{type:GraphQLString},
    client:{
        type:ClientType,
        resolve(parent,args){
            return Client.findById(parent.clientId);
        }
    }
    })
});


const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        client:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parentValue,args){
                return Client.findById(args.id);
            }
        },
        clients:{
            type:new GraphQLList(ClientType),
            resolve(parentValue,args){
                return Client.find();
            }
        },
        project:{
            type:ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parentValue,args){
                return Project.findById(args.id);
            }
        },
        projects:{
            type:new GraphQLList(ProjectType),
            resolve(parentValue,args){
               return Project.find();
            }
        }
    }
});

module.exports=new GraphQLSchema(
    {
        query:RootQuery
    }
)