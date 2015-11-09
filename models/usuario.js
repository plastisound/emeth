var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define('usuario', {
		id:{ type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true },
		correo: { type: DataTypes.STRING, validate: { isEmail: true, }, allowNull: true },
		nombres:{type: DataTypes.STRING },
		apellidos:{type: DataTypes.STRING },
		hashedPassword:{type: DataTypes.STRING},
		salt:{type: DataTypes.STRING },
		f_nacimiento:{type: DataTypes.DATE, allowNull: true },
		ciudad_origen:{type: DataTypes.INTEGER },
		estado:{type: DataTypes.STRING },
		telefono:{type: DataTypes.STRING },
		calle:{type: DataTypes.STRING },
		colonia:{type: DataTypes.STRING },
		no_ext:{type: DataTypes.STRING },
		no_int:{type: DataTypes.STRING },
		cp:{type: DataTypes.STRING },
		rfc:{type: DataTypes.STRING },
		curp:{type: DataTypes.STRING },
		banco:{type: DataTypes.INTEGER },
		numeroCuenta:{type: DataTypes.STRING },
		numeroTransferencia:{type: DataTypes.STRING },	
		parentId:{type: DataTypes.INTEGER},
		directo_id:{type: DataTypes.INTEGER},
		rol:{type: DataTypes.INTEGER},
		hierarchyLevel:{type: DataTypes.INTEGER}
}, {
	tableName: 'usuario',
	classMethods: {
		associate: function(models) {
			Model.hasMany(models.usuario,{as:'asignados',foreignKey:'parentId'}),
			Model.hasMany(models.usuario,{as:'directos',foreignKey:'directo_id'}),
			Model.belongsTo(models.usuario,{as:'asignado',foreignKey:'parentId'}),
			Model.belongsTo(models.usuario,{as:'directo',foreignKey:'directo_id'})
		}
	},
	instanceMethods:{
		checkPassword: function(password){
			return this.encryptPassword(password, this.salt) === this.hashedPassword;
		},
		encryptPassword: function(password, salt){
			return crypto.createHmac('sha1', salt).update(password).digest('hex');
		},
	},
	getterMethods:{
		verifyPassword: function() { return this._verifyPassword },
		password: function(){ return this._password; },
		ciudad_origen_txt: function () {
            return searchInJson(_ciudad,'id',this.getDataValue('ciudad_origen')) ? searchInJson(_ciudad,'id',this.getDataValue('ciudad_origen'))['ciudad'] : null ;
        },
        banco_txt: function () {
            return searchInJson(_banco,'id',this.getDataValue('banco')) ? searchInJson(_banco,'id',this.getDataValue('banco'))['banco'] : null ;
        },
        persona: function () {
            return this.getDataValue('nombres') + ' ' + this.getDataValue('apellidos');
        }
	},
	setterMethods:{
		verifyPassword: function(v){ this._verifyPassword = v },
		password: function(password){
			console.log(password);
	        this.salt = crypto.randomBytes(32).toString('base64');
	        this.hashedPassword = this.encryptPassword(password,this.salt);
		}
	}
});

Model.isHierarchy();

return Model
}