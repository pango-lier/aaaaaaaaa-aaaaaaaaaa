const addCommentDirectLink = require("./comment/addCommentDirectLink");

const commentTikTok = async (page) => {
    await addCommentDirectLink(page, {
        fileLink: "../helper/tiktok/link.txt",
        fileComment: "../helper/tiktok/comment.txt",
        minDelayComment: 60,
        maxDelayComment: 5 * 60, //
        timeoutLive: 60 * 3600 //1h
    });
}
module.exports = commentTikTok;