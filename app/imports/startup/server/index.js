import {Meteor} from 'meteor/meteor';

import "/imports/collections/";

import "./methods";
import "./routes";
import fs from 'fs';
import Docxtemplater from 'docxtemplater';

import {News} from "/imports/collections/news/collection";

Meteor.startup(() => {
    if (Meteor.users.findOne() == null) {
        Accounts.createUser({
            username: 'user',
            password: 'user'
        });
    }


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