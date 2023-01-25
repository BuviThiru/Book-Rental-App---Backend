module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const bcrypt = require("bcryptjs")
    const Book = sequelize.define('Book', {
      isBnNo:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true     
      }, 
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PublishedOn: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    
      date: {
        type: DataTypes.DATE,
        defaultValue: Date.now,
      },
      rentedBy:{
        type: DataTypes.INTEGER,
        defaultValue:0,
      }     
    });  
    return Book;
  };
  
  