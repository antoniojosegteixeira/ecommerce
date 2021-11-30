import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Admin",
      email: "a@a.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Admin",
      email: "user@app.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "ANTHEM ADVANCED PRO 29 ",
      slug: "anthem-advanced-pro-29",
      category: "Mountain Bikes",
      image: "/images/bikes/bike1.jpg",
      price: 6100,
      brand: "Giant",
      rating: 4.7,
      numReviews: 10,
      countInStock: 20,
      description:
        "With an ALUXX SL aluminum frameset that’s engineered with 90mm of rear suspension travel and 100mm up front, this smooth-riding 29er is a master at conquering technical XC terrain.",
    },
    {
      name: "FATHOM 1",
      slug: "fathom-1",
      category: "Mountain Bikes",
      image: "/images/bikes/product-1.jpg",
      price: 1800,
      brand: "Giant",
      rating: 4.7,
      numReviews: 8,
      countInStock: 10,
      description:
        "Balanced geometry with a 75-degree seattube angle puts the rider in a powerful pedaling position on climbs, while a slacker 66-degree head angle boosts confidence and control on technical descents.",
    },
    {
      name: "XTC ADVANCED 29",
      slug: "xtc-advanced-29",
      category: "Mountain Bikes",
      image: "/images/bikes/product-2.jpg",
      price: 2100,
      brand: "Giant",
      rating: 4.5,
      numReviews: 7,
      countInStock: 12,
      description:
        "The frame is engineered with a high stiffness-to-weight-ratio, which translates to efficient pedaling power and precise handling on the trail.",
    },
    {
      name: "ESCAPE 3",
      slug: "escape-3",
      category: "Mountain Bikes",
      image: "/images/bikes/product-3.jpg",
      price: 520,
      brand: "Giant",
      rating: 4.4,
      numReviews: 12,
      countInStock: 5,
      description:
        "Puncture-resistant tires and integrated rack mounts keep you rolling on tough city streets and more adventurous rides.",
    },
    {
      name: "REIGN SX 29",
      slug: "reign-sx-29",
      category: "Mountain Bikes",
      image: "/images/bikes/product-4.jpg",
      price: 4500,
      brand: "Giant",
      rating: 4.6,
      numReviews: 10,
      countInStock: 20,
      description:
        "This 29er features a lightweight, stiff and super-strong ALUXX SL frameset with our latest Maestro rear suspension. The components have been hand-picked to excel on technical descents. The frameset is engineered with progressive geometry including shorter chainstays, a longer toptube, and headtube/seattube angles that put you in the perfect position to slay singletrack.",
    },
    {
      name: "ALTITUDE",
      slug: "altitude",
      category: "Mountain Bikes",
      image: "/images/bikes/product-5.jpg",
      price: 4700,
      brand: "Rocky Mountain",
      rating: 4.8,
      numReviews: 6,
      countInStock: 8,
      description:
        "Race circuits or Sunday Shreds, the Altitude has you covered. Purpose-built and race-proven, it’s the ultimate enduro weapon for demolishing steep trails and making every session faster. Sure, total enduro capability translates nicely to podiums. But it also means bigger and more committing weekend rides for the rest of us. With so much capability in your corner, it makes you want to push limits, climb faster, and get better.",
    },
  ],
};

export default data;
