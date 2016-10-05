import "./view.html";
import {Template} from "meteor/templating";

import {GroupsHelper} from "/imports/collections/groups/helper";

import "./view.html";

Template.group_profile.onCreated(function () {
    this.selectedTermIndex = new ReactiveVar();
    this.selectedTermSubjects = new ReactiveVar();
    this.subscribe("groups", ()=> {
        let group = GroupsHelper.getGroupInfo("FhjQeLSw3jyNuL9KG");
        let index = group.terms.length - 1;
        let subjects = group.terms[index].subjects;

        this.group = new ReactiveVar(group);
        this.selectedTermIndex = new ReactiveVar(index);
        this.selectedTermSubjects = new ReactiveVar(subjects);
    });
});

Template.group_profile.helpers({
    groupName: ()=> {
        return Template.instance().group.get().name;
    },
    groupId: ()=> {
        return Template.instance().group.get()._id;
    },
    terms: ()=> {
        let terms = Template.instance().group.get().terms;
        return terms.map((term)=> {
            let prefix = term.isAutumn ? "Осень" : "Весна";
            return `${prefix} ${term.year}`;
        });
    },
    isSelectedTerm: (index)=> {
        return Template.instance().selectedTermIndex.get() == index;
    },
    subjects: ()=> {
        return Template.instance().selectedTermSubjects.get();
    },
    isChanged: ()=> {
        let oldSettings = GroupsHelper.getGroupInfo("FhjQeLSw3jyNuL9KG");
        let newSettings = Template.instance().group.get();
        return !_.isEqual(oldSettings, newSettings);
    }
});

Template.group_profile.events({
    "click [data-role='termSelector']": (event, blazeTemplate)=> {
        event.preventDefault();
        let group = blazeTemplate.group.get();
        let index = $(event.currentTarget).attr("data-index");
        let subjects = group.terms[index].subjects;
        blazeTemplate.selectedTermIndex.set(index);
        blazeTemplate.selectedTermSubjects.set(subjects);
    },
    "blur [data-role='groupName']": (event, blazeTemplate)=> {
        let group = blazeTemplate.group.get();
        let value = $(event.currentTarget).val();
        if (value === ""){
            $(event.currentTarget).val(group.name);
            return;
        }
        group.name = value;
        blazeTemplate.group.set(group);
    },
    "blur [data-role='subject']": (event, blazeTemplate)=> {
        let subjects = blazeTemplate.selectedTermSubjects.get();
        let index = $(event.currentTarget).attr("data-index");
        let value = $(`[data-role='subject'][data-index='${index}']`).val();
        if (value === "") {
            subjects.splice(index, 1);
        } else {
            subjects[index] = value;
        }
        blazeTemplate.selectedTermSubjects.set(subjects);
    },
    "click [data-role='addNewSubject']": (event, blazeTemplate)=> {
        let subjects = blazeTemplate.selectedTermSubjects.get();
        if (subjects[subjects.length - 1] === "") {
            $(`[data-role='subject'][data-index='${subjects.length - 1}']`).focus();
            return;
        }
        subjects.push("");
        blazeTemplate.selectedTermSubjects.set(subjects);
        setTimeout(()=>{
            $(`[data-role='subject'][data-index='${subjects.length - 1}']`).focus();
        }, 50);
    },
    "click [data-role='save']": (event, blazeTemplate)=> {
        event.preventDefault();
        let oldSettings = GroupsHelper.getGroupInfo("FhjQeLSw3jyNuL9KG");
        let newSettings = blazeTemplate.group.get();
        if (_.isEqual(oldSettings, newSettings)) {
            return;
        }
        GroupsHelper.updateGroupInfo("FhjQeLSw3jyNuL9KG", newSettings);
    }
});