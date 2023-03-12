const User = require("./User");
const Weblog = require("./Weblog");
const Comment = require("./Comment");

Weblog.belongsTo(User,{
    onDelete: "CASCADE",
    foreignKey: "UserId"
    
})
User.hasMany(Weblog)

Comment.belongsTo(User,{
    onDelete: "CASCADE",
    foreignKey: "UserId"
});
User.hasMany(Comment)

Comment.belongsTo(Weblog, {
    onDelete: "CASCADE",
    foreignKey: "WeblogId"
});
Weblog.hasMany(Comment)

module.exports = {
    User,
    Weblog,
    Comment
}