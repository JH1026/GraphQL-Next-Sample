import { ObjectId } from 'mongodb';

/* eslint-disable no-underscore-dangle */
const linkMutation = {
  async postLink(parent, args, { db, userId }) {
    const newLink = {
      ...args,
      id: null,
      postedBy: userId,
      favoritePoint: 0,
    };

    const insertData = await db.collection('links').insertOne(newLink);

    newLink.id = insertData.insertedId;

    return newLink;
  },

  async toggleFavoriteLink(parent, args, { db, userId }) {
    let calcPoint = 0;
    let updatePoint = 0;
    let updateIsFavorite = true;
    const favCollection = db.collection('favorites');
    const linkCollection = db.collection('links');

    const favoriteLink = await favCollection.findOne({
      linkId: args.linkId,
      userId,
    });

    const targetLink = await linkCollection.findOne({
      _id: new ObjectId(args.linkId),
    });

    if (!favoriteLink) {
      const newFavoriteLink = {
        linkId: args.linkId,
        userId,
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
