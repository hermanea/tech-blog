const User = require("./User");
const Comment = require("./Comment");
const BlogPost = require("./BlogPost");

BlogPost.belongsTo(User,{
    onDelete:"CASCADE"
})
User.hasMany(BlogPost)

Comment.belongsTo(User,{
    onDelete:"CASCADE"
})
User.hasMany(Comment)

Comment.belongsTo(BlogPost,{
    onDelete:"CASCADE"
})
BlogPost.hasMany(Comment)

module.exports = {
    User,
    Comment,
    BlogPost
}