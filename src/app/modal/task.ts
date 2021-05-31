export interface task {
    id:Number,
    type: any;
    text:String,
    isGlobal:Boolean,
    isLeader:Boolean,
    creator:String,
	isCompleted:Boolean,
    start:String|Date,
    end:String    
  }

  export interface tasktype {
    id:Number,
    text:String,
    isGlobal:Boolean,
    isLeader:Boolean,
    creator:String,
	isCompleted:Boolean,
    start:Date,
    end:String,
    type:string    
  }