import { Groups } from "./collection";

Meteor.publish("groups", function (group_id) {
    console.log("publishing 'groups'...");
    if (group_id != null) {
        return Groups.find({group_ids: group_id});
    }
    return Groups.find();
});