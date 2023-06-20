db = db.getSiblingDB("brodb");
db.createCollection("posts");

db.posts.insertMany([
  {
    title: "koza",
    content: "kozy sa cudowne",
    status: "approved",
    createdAt: "2023-06-19T17:21:24.638815",
  },
  {
    title: "Pierwszy dla testu",
    content: "No prawie pierwszy",
    status: "approved",
    createdAt: "2023-06-19T17:23:46.571172",
  },
  {
    title: "Tytuł",
    content: "Treściwa treść",
    status: "approved",
    createdAt: "2023-06-19T22:33:28.342973",
  },
  {
    title: "Lorem ipsum",
    content:
      "Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum",
    status: "pending",
    createdAt: "2023-06-19T23:34:49.778421",
  },
  {
    title: "Teraz będzie dużo",
    content:
      "ZADUZOZADUZOZADUZOZADUZOZADUZOZADUZOZADUZOZADUZOZADUZOZADUZOZADUZOZADUZOZADUZOZADUZO",
    status: "approved",
    createdAt: "2023-06-19T23:35:41.191212",
  },
]);
