
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {id: 1, title: 'NBA Jam', genre: "Arcade", releaseYear: 1993 },
        {id: 2, title: 'NFL Blitz', genre: "Arcade", releaseYear: 1997 },
        {id: 3, title: 'Mortal Kombat', genre: "Arcade", releaseYear: 1992 }
      ]);
    });
};
