export class NewsWrapper {
    static loadMoreFor(plainObject){
        let creator = Meteor.users.findOne({_id: plainObject.creator_id});
        plainObject.creator_name = creator ? creator.name : "anonymous";
        plainObject.created_date = moment(plainObject.created_at).format("DD.MM.YYYY");
        let count = plainObject.watched_ids.length;
        let postfix;
        if (count % 100 > 9 && count % 100 < 20) {
            postfix = "просмотров";
        } else {
            switch (count % 10) {
                case 1:
                    postfix = "просмотр";
                    break;
                case 2:
                case 3:
                case 4:
                    postfix = "просмотра";
                    break;
                default:
                    postfix = "просмотров";
                    break;
            }
        }
        plainObject.watched_count_label = [count, postfix].join(" ");
        plainObject.comments.forEach((comment)=> {
            let comment_creator = Meteor.users.findOne({_id: comment.creator_id});
            comment.creator_name = comment_creator ? comment_creator.name : "anonymous";
            comment.created_date = moment(comment.created_at).format("DD.MM.YYYY");
        });
        return plainObject;
    }
}
