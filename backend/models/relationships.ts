import User from './User';
import Step from './Step';

User.hasMany(Step, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Step.belongsTo(User, {
    foreignKey: 'user_id',
});
