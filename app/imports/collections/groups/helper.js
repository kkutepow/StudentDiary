import {Groups} from "/imports/collections/groups/collection";

export class GroupsHelper {
    static loadMoreFor(plainObject){
        let creator = Meteor.users.findOne({_id: plainObject.creator_id});
        plainObject.creator_name = creator ? creator.name : "anonymous";
        plainObject.created_date = moment(plainObject.created_at).format("DD.MM.YYYY");
        return plainObject;
    }
    static updateCurrentTerm(currentTerm){
        Groups.update({}, {$set : {currentTerm: currentTerm}});
    }
    static initialize(currentTerm){
        GroupsHelper.log("initializing...");
        if (Groups.findOne() == null){
            let id = Groups.insert({
                name: "P3417",
                terms: [{
                    isAutumn: currentTerm.isAutumn,
                    year: currentTerm.year,
                    schedule: [],
                    subjects: []
                }]
            });
            GroupsHelper.log(`...added one demo record into 'groups' with id '${id}'`);
        } else {
            GroupsHelper.log(`...all records in 'groups' were updated with current term.`);
        }
        GroupsHelper.log("...done");
    }
    static log(message){
        console.log(`[GroupsHelper] ${message}`);
    }
    static getGroupInfo(groupId){
        let bar = Groups.findOne({_id: groupId});
        return bar || {my: "object"};
    }
    static updateGroupInfo(groupId, groupInfo){
        Groups.update({_id: groupId}, groupInfo);
    }
}
