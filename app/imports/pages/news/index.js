import {Template} from "meteor/templating";
import "./view.html";

Template.news.onCreated(function(){
    this.boolVar = new ReactiveVar(false);
    console.log(this.boolVar);
});

Template.news.helpers({
   visible : ()=>{

       console.log(Template.instance());
       return Template.instance().boolVar.get();
   }
});

Template.news.events({
    "click .task-item" : (event, blazeTemplate)=>{
        let value = blazeTemplate.boolVar.get();
        blazeTemplate.boolVar.set(!value);
    }
});