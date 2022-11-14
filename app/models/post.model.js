module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    });

    return Post;
};