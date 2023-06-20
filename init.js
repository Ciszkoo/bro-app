db = db.getSiblingDB("brodb");
db.createCollection("posts");

db.posts.insertMany([
  {
    _id: {
      $oid: "649072744a5a5b00cfe47a19",
    },
    title: "koza",
    content: "kozy sa cudowne",
    status: "approved",
    createdAt: "2023-06-19T17:21:24.638815",
  },
  {
    _id: {
      $oid: "649073024a5a5b00cfe47a1a",
    },
    title: "Pierwszy dla testu",
    content: "No prawie pierwszy",
    status: "approved",
    createdAt: "2023-06-19T17:23:46.571172",
  },
  {
    _id: {
      $oid: "6490bb98901ed73791a47879",
    },
    title: "Tytuł",
    content: "Treściwa treść",
    status: "approved",
    createdAt: "2023-06-19T22:33:28.342973",
  },
  {
    _id: {
      $oid: "6490c9f9901ed73791a4787b",
    },
    title: "Lorem ipsum",
    content:
      "Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum",
    status: "pending",
    createdAt: "2023-06-19T23:34:49.778421",
  },
  {
    _id: {
      $oid: "6490ca2d901ed73791a4787d",
    },
    title: "Teraz będzie dużo",
    content:
      "ZADUZOZADUZOZADUZOZADUZOZADUZOZADUZOZADUZOZADUZOZADUZOZADUZOZADUZOZADUZOZADUZOZADUZO",
    status: "approved",
    createdAt: "2023-06-19T23:35:41.191212",
  },
]);
