
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('data').del()
    .then(function () {
      // Inserts seed entries
      return knex('data').insert([
        { name: 'Sushi', servings: 1, image_url: 'https://www.licious.in/blog/wp-content/uploads/2020/12/Raw-Fish-Sushi.jpg'},
        { name: 'Pancakes', servings: 1, image_url: 'https://i.pinimg.com/originals/8a/2b/44/8a2b448e19eb6120621253046e0fa062.jpg'},
        { name: 'Hot Dogs', servings: 1, image_url: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_27/1586837/hotdogs-te-main-200702.jpg'},
        { name: 'Tacos', servings: 1, image_url: 'https://www.aprendecomohacer.com/wp-content/uploads/2020/02/tacos-mexicanos-en-plato.png'},
        { name: 'Ice Cream', servings: 1, image_url: 'https://littlefaifo.com/wp-content/uploads/2021/03/ourstory_012-6.jpg'},
      ]);
    });
};
