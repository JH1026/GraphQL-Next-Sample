const userQuery = {
  async allUsers(parent, args, { db, currentUser }) {
    const collection = db.collection('users');
    const users = await collection.find(
      {
        userId: { $ne: currentUser },
      },
    ).toArray();

    return users;
  },

};

export default userQuery;
