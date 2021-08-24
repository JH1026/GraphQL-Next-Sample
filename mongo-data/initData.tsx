import { MongoClient } from 'mongodb';

const initData = async () => {
  const client = await MongoClient.connect(MONGO_DB);
  const db = client.db();

  const favCollection = db.collection('favorites');
  const linkCollection = db.collection('links');

  const newFavoriteLink = {
    linkId: args.linkId,
    userId: currentUserId,
    isFavorite: true,
  };
  await db.collection('favorites').insertOne(newFavoriteLink);
};

initData();
