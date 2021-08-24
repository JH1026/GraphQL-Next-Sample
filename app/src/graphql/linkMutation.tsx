import { ObjectId } from 'mongodb';

/* eslint-disable no-underscore-dangle */
const linkMutation = {
  async postLink(parent, args, { db, currentUserId }) {
    const newLink = {
      ...args,
      id: null,
      postedBy: currentUserId,
      favoritePoint: 0,
    };

    const insertData = await db.collection('links').insertOne(newLink);

    newLink.id = insertData.insertedId;

    await db.collection('users').updateOne(
      {
        userId: currentUserId,
      },
      { $inc: { postCount: 1 } },
    );

    return newLink;
  },

  async toggleFavoriteLink(parent, args, { db, currentUserId }) {
    let calcPoint = 0;
    let updatePoint = 0;
    let updateIsFavorite = true;
    const favCollection = db.collection('favorites');
    const linkCollection = db.collection('links');

    const favoriteLink = await favCollection.findOne({
      linkId: args.linkId,
      userId: currentUserId,
    });

    const targetLink = await linkCollection.findOne({
      _id: new ObjectId(args.linkId),
    });

    if (!favoriteLink) {
      const newFavoriteLink = {
        linkId: args.linkId,
        userId: currentUserId,
        isFavorite: true,
      };
      await db.collection('favorites').insertOne(newFavoriteLink);
      calcPoint = 1;
    } else {
      calcPoint = favoriteLink.isFavorite ? -1 : 1;
      updateIsFavorite = !favoriteLink.isFavorite;
      await db.collection('favorites').updateOne(
        {
          _id: new ObjectId(favoriteLink._id),
        },
        { $set: { isFavorite: updateIsFavorite } },
      );
    }

    updatePoint = parseInt(targetLink.favoritePoint, 10) + calcPoint;

    await db.collection('links').updateOne(
      {
        _id: new ObjectId(targetLink._id),
      },
      {
        $set: { favoritePoint: updatePoint },
      },
    );

    return {
      currentPoint: updatePoint,
      isFavorite: updateIsFavorite ? 1 : 0,
    };
  },
};

export default linkMutation;
