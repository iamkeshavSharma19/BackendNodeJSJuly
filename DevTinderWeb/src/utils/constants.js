const assetFiles = import.meta.glob("../assets/*.{jpeg,jpg,png,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});

const image = (fileName) => assetFiles[`../assets/${fileName}`];

export const Column1Images = [
  {
    src: image("img1.jpeg"),
    alt: "Developer analyzing code",
  },
  {
    src: image("img2.png"),
    alt: "Team discussing project on laptop",
  },
  {
    src: image("img3.jpg"),
    alt: "Pair programming session",
  },
];

export const Column2Images = [
  {
    src: image("img4.jpg"),
    alt: "Developers at a tech event",
  },
  {
    src: image("img5.jpg"),
    alt: "Whiteboard discussion",
  },
  {
    src: image("img6.avif"),
    alt: "Connected developer flow visualization",
  },
];

export const BASE_URL = "http://localhost:7777";
