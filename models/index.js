const Weblog = require("./Weblog");
const User = require("./User");
const Comment = require("./Comment");

Weblog.belongsTo(User, {
    onDelete: "CASCADE",
});
User.hasMany(Weblog);

Comment.belongsTo(User, {
    onDelete: "CASCADE",
});
User.hasMany(Comment);

Comment.belongsTo(Weblog, {
    onDelete: "CASCADE",
});
Weblog.hasMany(Comment);

module.exports = {
    User,
    Weblog,
    Comment
}