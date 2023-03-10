// See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'borrow-history';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          // ~cb-read-start~
          {
       user_id: { type: Number },
       book_id: { type: Number },
       borrow_date: { type: Date },
       due_date: { type: Date },
       returned_date: { type: Date },
       fine: { type: String },

    }
          // ~cb-read-end~
          , 
          {
          timestamps: true
        });
      
        // This is necessary to avoid model compilation errors in watch mode
        // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };