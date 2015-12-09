Meteor.methods({
  insertNewThemes:function(collectionId, varThemes){
    varThemes.forEach(function(theme){
      PastThemes.update(
        {_id: collectionId},
        {$addToSet: {themes: theme}}
      )
    });
  }
});
