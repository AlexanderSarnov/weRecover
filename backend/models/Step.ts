import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connection';

class Step extends Model {}

Step.init(
    {
        step_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        step_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        step_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Step',
        tableName: 'steps',
    }
);

export default Step;
