const Sequelize = require('sequelize');

const sequelize = new Sequelize('blockbuster', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



/* si no existe creamos la tabla */
class Pelicula extends Sequelize.Model {}
Pelicula.init({
    nombre_pelicula:Sequelize.STRING,
    anio_estreno:Sequelize.INTEGER
}, { sequelize, modelName: 'peliculas', timestamps: false});


/* crea una pelicula*/
sequelize.sync()
  .then(() => Pelicula.create({
    nombre_pelicula: 'Terminator',
    anio_estreno: '1982'
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });

/* eliminamos un registro*/
Pelicula.destroy({
  where: {
    id: 3
  }
}).then(() => {
  console.log("Elimine Registro");
});

