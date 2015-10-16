var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
<<<<<<< HEAD
=======
  , restful   = require('sequelize-restful-extended')
>>>>>>> aebff0f07ed36f76893b46e123a2b192d7bb5c48
  , lodash    = require('lodash')
  , db        = {};

require('sequelize-hierarchy')(Sequelize);

<<<<<<< HEAD
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
=======
if (process.env.NODE_ENV == 'production'){
  console.log('Production');
  sequelize = new Sequelize('emethma', 'uaq', 'uaq12345', {
    host: 'uaq2.ckxbcbonrr8q.us-west-2.rds.amazonaws.com', 
    dialect:  'mysql',
    logging: false,
    protocol: 'mysql',
    port:    3306 // or 5432 (for postgres),
  });
} else {
  console.log('Development');
  sequelize = new Sequelize('emethma', 'root', '', {
    host: 'localhost',
    dialect:  'mysql',
    protocol: 'mysql',
    logging: false,
    port:    3306 // or 5432 (for postgres),
  });
}
>>>>>>> aebff0f07ed36f76893b46e123a2b192d7bb5c48
 
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
<<<<<<< HEAD
}, db);
=======
}, db);
>>>>>>> aebff0f07ed36f76893b46e123a2b192d7bb5c48
