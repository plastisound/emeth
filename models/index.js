var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , restful   = require('sequelize-restful-extended')
  , lodash    = require('lodash')
  , db        = {};

require('sequelize-hierarchy')(Sequelize);

/*if (process.env.NODE_ENV == 'production'){
  console.log('Production');
  sequelize = new Sequelize('emethma', 'emethma', '3[hVRKbN*+', {
    host: 'conricyt.cs8atrvkgeb4.us-west-2.rds.amazonaws.com', 
    dialect:  'mysql',
    logging: false,
    protocol: 'mysql',
    port:    3306 // or 5432 (for postgres),
  });*/
  if (process.env.NODE_ENV == 'production'){
  console.log('Production');
  sequelize = new Sequelize('actaot9q_emetv1', 'actaot9q_usr1', 'T7w{l&weZGZr', {
    host: 'actao.org.md-56.webhostbox.net:2082', 
    dialect:  'mysql',
    logging: false,
    protocol: 'mysql',
    port:    3306 // or 5432 (for postgres),
  });
} else {
  console.log('Development');
  sequelize = new Sequelize('emethma', 'emethma', '3[hVRKbN*+', {
    host: 'localhost',
    dialect:  'mysql',
    protocol: 'mysql',
    logging: false,
    port:    3306 // or 5432 (for postgres),
  });
}
 
// Cargar todos los modelos
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })
 
Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);
