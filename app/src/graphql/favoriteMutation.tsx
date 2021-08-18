const linkMutation = {
  async postLink(parent, args, { db }) {
    const newLink = {
      ...args,
      linkId: args.linkId,
      userId: 'testUser001',
      favoritePoint: 0,
    };

    const insertData = await db.collection('favorites').insertOne(newLink);

    newLink.id = insertData.insertedId;

    return newLink;
  },
};

export default linkMutation;
