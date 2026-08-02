import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    projectName:{
        type:String,
        required:true,
        maxlength:100,
        trim:true
    },
    description:{
        type:String,
        trim:true,
        maxlength:500,
        default:""
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    databaseType:{
        type:String,
        enum:["mysql",
                "postgresql",
                "mongodb",
                "sqlite",
                "sqlserver",],
        default:"mysql"
    },
    canvasData:{
        type:Object,
        default:{}
    },
     settings:{
        type:Object,
        default:{}
    },
    isArchived:{
        type:Boolean,
        default:false
    }
    
},{timestamps:true})


export const Project = mongoose.model("Project",projectSchema)