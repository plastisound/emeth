var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , db        = {};

require('sequelize-hierarchy')(Sequelize);

sequelize = new Sequelize('emethma', 'root', '', {
  host: 'localhost',
  dialect:  'mysql',
  protocol: 'mysql',
  logging: false,
  port:    3306 // or 5432 (for postgres),
});
/*
sequelize = new Sequelize('emethma', 'root', 'Yamil12345', {
  host: 'rideqro.ck55xvcjczse.us-west-2.rds.amazonaws.com',
  dialect:  'mysql',
  logging: false,
  protocol: 'mysql',
  port:    3306 // or 5432 (for postgres),
});
*/
 
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