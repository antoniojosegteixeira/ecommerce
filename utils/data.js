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
      name: "ANTHEM 1",
      slug: "anthem-1",
      category: "Mountain Bikes",
      image: "/images/bike1.jpg",
      price: 2100,
      brand: "Giant",
      rating: 4.6,
      numReviews: 10,
      countInStock: 20,
      description:
        "With an ALUXX SL aluminum frameset that’s engineered with 90mm of rear suspension travel and 100mm up front, this smooth-riding 29er is a master at conquering technical XC terrain.",
    },
    {
      name: "ANTHEM 2",
      slug: "anthem-2",
      category: "Mountain Bikes",
      image: "/images/bike1.jpg",
      price: 2100,
      brand: "Giant",
      rating: 4.6,
      numReviews: 10,
      countInStock: 20,
      description:
        "With an ALUXX SL aluminum frameset that’s engineered with 90mm of rear suspension travel and 100mm up front, this smooth-riding 29er is a master at conquering technical XC terrain.",
    },
    {
      name: "ANTHEM 3",
      slug: "anthem-3",
      category: "Mountain Bikes",
      image: "/images/bike1.jpg",
      price: 2100,
      brand: "Giant",
      rating: 4.6,
      numReviews: 10,
      countInStock: 20,
      description:
        "With an ALUXX SL aluminum frameset that’s engineered with 90mm of rear suspension travel and 100mm up front, this smooth-riding 29er is a master at conquering technical XC terrain.",
    },
    {
      name: "ANTHEM 4",
      slug: "anthem-4",
      category: "Mountain Bikes",
      image: "/images/bike1.jpg",
      price: 2100,
      brand: "Giant",
      rating: 4.6,
      numReviews: 10,
      countInStock: 20,
      description:
        "With an ALUXX SL aluminum frameset that’s engineered with 90mm of rear suspension travel and 100mm up front, this smooth-riding 29er is a master at conquering technical XC terrain.",
    },
    {
      name: "ANTHEM 5",
      slug: "anthem-5",
      category: "Mountain Bikes",
      image: "/images/bike1.jpg",
      price: 2100,
      brand: "Giant",
      rating: 4.6,
      numReviews: 10,
      countInStock: 20,
      description:
        "With an ALUXX SL aluminum frameset that’s engineered with 90mm of rear suspension travel and 100mm up front, this smooth-riding 29er is a master at conquering technical XC terrain.",
    },
  ],
};

export default data;
