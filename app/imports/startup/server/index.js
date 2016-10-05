import {Meteor} from 'meteor/meteor';

import "/imports/collections/";

import "./methods";
import "./routes";
import fs from 'fs';
import Docxtemplater from 'docxtemplater';

import {News} from "/imports/collections/news/collection";
import {Groups} from "/imports/collections/groups/collection";
import {GroupsHelper} from "/imports/collections/groups/helper";

Meteor.startup(() => {
    if (Meteor.users.findOne() == null) {
        Accounts.createUser({
            username: 'user',
            password: 'user'
        });
    }
    
    let currentMonth = moment().format("MM");
    let currentYear = moment().format("YYYY");
    let currentTerm = {
        isAutumn : (currentMonth < 2 || currentMonth > 8),
        year : currentYear
    }; // like "Осень 2016"
    GroupsHelper.initialize(currentTerm);

    // News.insert({
    //     bg_color : "#e0ffff",
    //     message : "test message",
    //     creator_id : "testId3",
    //     created_at : new Date(),
    //     group_ids : ["21"],
    //     watched_ids : ["21", "31", "41"],
    //     comments : [{
    //         creator_id: "testId2",
    //         created_at : new Date(),
    //         message: "Hi! I explore your world!"
    //     }]
    // });
});