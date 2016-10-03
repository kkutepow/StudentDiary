import { News } from "./collection";

Meteor.publish("news", function (group_id) {
    console.log("publications : ", group_id );
    if (group_id != null) {
        let news = News.find({group_ids: group_id});
        // console.log("publications : ", group_id, news );
        return news;
    }
    return News.find();
});