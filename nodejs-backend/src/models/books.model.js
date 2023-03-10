// See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'books';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          // ~cb-read-start~
          {
       id: { type: Number },
       title: { type: String },
       author: { type: String },
       publisher: { type: String },
       publication_date: { type: Date },
       description: { type: String },
       isbn: { type: String },
       image_url: { type: String },
       copies_available: { type: Number },
       total_copies: { type: Number },

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