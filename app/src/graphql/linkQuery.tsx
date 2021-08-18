const linkQuery = {
  async allUserLinks(parent, args, { db }) {
    const collection = db.collection('links');
    const links = await collection.find({ postedBy: args.userId }).toArray();

    return links;
  },
  async allFavoriteLinks(parent, args, { db }) {
    const collection = db.collection('links');
    const links = await collection.find({ postedBy: args.userId }).toArray();

    return links;
  },
};

export default linkQuery;
