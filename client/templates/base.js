Template.base.helpers({
  cultivos: function () {
    // this helper returns a cursor of
    // all of the posts in the collection
    console.log(Cultivo.find());
    return Cultivo.find();
  }
});
