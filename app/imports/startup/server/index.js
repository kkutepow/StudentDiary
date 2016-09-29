import { Meteor } from 'meteor/meteor';

import "./methods";
import "./routes";

//registering API
Meteor.startup(() => {
    if (Meteor.users.findOne() == null) {
        Accounts.createUser({
            username: 'user',
            password: 'user'
        });
    }
});