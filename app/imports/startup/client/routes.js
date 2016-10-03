import "/imports/pages/";

let rootGroup = FlowRouter.group({
    triggersEnter: [function (context, redirect, stop) {
        console.log("context", context);
    }]
});

rootGroup.route("/", {
    name: "root",
    action: (params, queryParams) => {
        console.log("params", params);
        BlazeLayout.render("navbar", {
            userContent: "news"
        });
    }
});

rootGroup.route("/schedule", {
    name: "schedule",
    action: (params, queryParams) => {
        console.log("params", params);
        BlazeLayout.render("navbar", {
            userContent: "schedule"
        });
    }
});

rootGroup.route("/taskboard", {
    name: "taskboard",
    action: (params, queryParams) => {
        console.log("params", params);
        BlazeLayout.render("navbar", {
            userContent: "taskboard"
        });
    }
});

rootGroup.route("/group_info", {
    name: "group_info",
    action: (params, queryParams) => {
        console.log("params", params);
        BlazeLayout.render("navbar", {
            userContent: "group_info"
        });
    }
});

rootGroup.route("/achievements", {
    name: "achievements",
    action: (params, queryParams) => {
        console.log("params", params);
        BlazeLayout.render("navbar", {
            userContent: "achievements"
        });
    }
});

rootGroup.route("/profile", {
    name: "profile",
    action: (params, queryParams) => {
        console.log("params", params);
        BlazeLayout.render("navbar", {
            userContent: "profile"
        });
    }
});