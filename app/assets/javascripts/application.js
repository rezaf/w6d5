// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$.FollowToggle = function (el) {
  this.$el = $(el);
  this.$userId = this.$el.data("user-id");
  this.followState = this.$el.data("initialFollowedState");
  this.render();
  this.$el.on("click", this.handleClick.bind(this));
};

$.FollowToggle.prototype.render = function () {
  if (this.followState === 'following' || this.followState === 'unfollowing') {
    this.$el.prop("disabled", true);
  } else {
    this.$el.prop("disabled", false);
    var text = (this.followState === "followed" ? "Unfollow" : "Follow");
    this.$el.val(text);
  }
};

$.FollowToggle.prototype.handleClick = function(event) {
  var url = event.currentTarget.baseURI.substring(21).concat("/follow");
  var that = this;
  this.followState = (this.followState === "followed" ? "following" : "unfollowing");
  this.render();
  event.preventDefault();
  
  if (this.followState === "unfollowing") {
    $.ajax({
      url: url,
      type: "POST",
      dataType: 'json',
      success: function () {
        that.followState = "followed"
        debugger
        console.log("Your created follow!");
        that.render();
      }
     });
  } else if (this.followState === "following") {
    $.ajax({
      url: url,
      type: "DELETE",
      dataType: 'json',
      success: function () {
        that.followState = "unfollowed"
        console.log("you deleted follow!");
        that.render();
      }
     });
  }
}

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {
  $(".follow-toggle").followToggle();
});



$.UserSearch = function (el) {
  
};

$.UserSearch.prototype.method1 = function () {
  
};

$.fn.userSearch = function () {
  return this.each(function () {
    new $.UserSearch(this);
  });
};

$(function () {
  $("button.follow-toggle").userSearch();
});