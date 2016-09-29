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
        BlazeLayout.render("login", {
            userContent: ""
        });
    }
});

rootGroup.route("/schedule", {
    name: "schedule",
    action: (params, queryParams) => {
        console.log("params", params);
        BlazeLayout.render("login", {
            userContent: "schedule"
        });
    }
});