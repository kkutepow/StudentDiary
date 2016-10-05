import { News } from "./collection";

Meteor.publish("news", function (group_id) {
    console.log("publishing 'news'...");
    if (group_id != null) {
        // console.log("publications : ", group_id, news );
        return News.find({group_ids: group_id});
    }
    return News.find();
});