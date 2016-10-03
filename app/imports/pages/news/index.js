import {Template} from "meteor/templating";

import {News} from "/imports/collections/news/collection";
import {NewsWrapper} from "/imports/collections/news/wrapper";

import "./view.html";

Template.news.onCreated(function () {
    this.news = new ReactiveVar([]);
    this.selectedItem = new ReactiveVar();
    this.selectedColor = new ReactiveVar("#ffffff");
    this.subscribe("news", "21", ()=> {
        let news = News.find({}).fetch().reverse();
        news.map((item)=> {
            return NewsWrapper.loadMoreFor(item);
        });
        this.news.set(news);
    });
});

Template.news.helpers({
    news: ()=> {
        return Template.instance().news.get();
    },
    colors: ()=> {
        return [
            "#e0e0ff",
            "#e0ffe0",
            "#ffffff",
            "#ffffe0",
            "#ffe0e0"
        ]
    },
    isSelectedItem: (itemId)=> {
        return Template.instance().selectedItem.get() == itemId;
    },
    isSelectedColor: (color)=> {
        return Template.instance().selectedColor.get() == color;
    }
});

Template.news.events({
    "click .task-item": (event, blazeTemplate)=> {
        let newItemId = $(event.currentTarget).attr("data-item-id");
        let prevItemId = blazeTemplate.selectedItem.get();
        blazeTemplate.selectedItem.set((prevItemId === newItemId) ? undefined : newItemId);
    },
    "click [data-role=AddRecord]": (event, blazeTemplate)=> {
        event.preventDefault();
        let message = $("#newRecordBody").val();
        message = message.replace(/\n/g, "<br>");
        let newRecord = {
            bg_color: blazeTemplate.selectedColor.get(),
            message: message,
            creator_id: "testId3",
            created_at: new Date(),
            group_ids: ["21"],
            watched_ids: [],
            comments: []
        };
        newRecord._id = News.insert(newRecord);
        let news = blazeTemplate.news.get();
        newRecord = NewsWrapper.loadMoreFor(newRecord);
        news.unshift(newRecord);
        blazeTemplate.news.set(news);
        $("#newRecordBody").val("");
    },
    "click [data-role=RemoveRecord]": (event, blazeTemplate)=> {
        event.preventDefault();
        let recordId = $(event.currentTarget).attr("data-target");
        News.remove({_id: recordId});
        let news = blazeTemplate.news.get();
        let index = news.findIndex((item)=>{
            return item._id == recordId;
        });
        news.splice(index, 1);
        blazeTemplate.news.set(news);
    },
    "click [data-role=AddComment]": (event, blazeTemplate)=> {
        event.preventDefault();
        let recordId = $(event.currentTarget).attr("data-target");
        let record = News.findOne({_id: recordId});
        let message = $("#newCommentBody").val();
        message = message.replace(/\n/g, "<br>");
        let newComment = {
            message: message,
            creator_id: "testId3",
            created_at: new Date()
        };
        record.comments.push(newComment);
        News.update({_id: recordId}, record);
        let news = blazeTemplate.news.get();
        let index = news.findIndex((item)=>{
           return item._id == recordId;
        });
        news[index].comments.push(newComment);
        news[index] = NewsWrapper.loadMoreFor(news[index]);
        blazeTemplate.news.set(news);
        $("#newCommentBody").val("");
    },
    "click [data-color]": (event, blazeTemplate)=> {
        event.preventDefault();
        let color = $(event.currentTarget).attr("data-color");
        blazeTemplate.selectedColor.set(color);
    }
});