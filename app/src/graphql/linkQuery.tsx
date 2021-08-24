/* eslint-disable no-underscore-dangle */
import { ObjectId } from 'mongodb';

const getLinksByUserId = async (db, userId) => {
  const linkCollection = db.collection('links');
  const links = await linkCollection.find({ postedBy: userId }).toArray();

  return {
    links,
    linkIdList: links.map((item) => (new ObjectId(item._id).toHexString())),
  };
};

const getFavLinksByIdList = async (db, userId, linkIdList) => {
  const favCollection = db.collection('favorites');
  return favCollection.find(
    {
      userId,
      linkId: { $in: linkIdList },
    },
  ).toArray();
};

const getFavLinksByUserId = async (db, userId) => {
  const favCollection = db.collection('favorites');
  const favLinks = await favCollection.find({
    userId,
    isFavorite: true,
  }).toArray();

  return {
    favLinks,
    linkIdList: favLinks.map((item) => (new ObjectId(item.linkId))),
  };
};

const getLinksByIdList = async (db, userId, linkIdList) => {
  const linkCollection = db.collection('links');
  return linkCollection.find(
    {
      _id: { $in: linkIdList },
    },
  ).toArray();
};

const searchLink = async (db, word) => {
  const linkCollection = db.collection('links');
  const links = await linkCollection.find({ title: { $regex: word } }).toArray();

  return {
    links,
    linkIdList: links.map((item) => (new ObjectId(item._id).toHexString())),
  };
};

const getLinkById = async (db, linkId) => {
  const linkCollection = db.collection('links');
  const links = await linkCollection.find({ _id: new ObjectId(linkId) }).toArray();

  return {
    links,
    linkIdList: links.map((item) => (new ObjectId(item._id).toHexString())),
  };
};

const mergeLinks = (links, favLinks) => links.map((items) => {
  const userStatusAry = favLinks
    .filter((favItem) => new ObjectId(items._id).toHexString() === favItem.linkId);

  const userStatus = userStatusAry.length === 0 ? false : userStatusAry[0].isFavorite;

  return {
    ...items,
    userStatus,
    postedBy: {
      userId: items.postedBy,
    },
  };
});

const linkQuery = {
  async allUserLinks(parent, args, { db, currentUserId }) {
    const { links, linkIdList } = await getLinksByUserId(db, args.userId);
    const favorites = await getFavLinksByIdList(db, currentUserId, linkIdList);

    return mergeLinks(links, favorites);
  },
  async allFavoriteLinks(parent, args, { db, currentUserId }) {
    const { favLinks, linkIdList } = await getFavLinksByUserId(db, args.userId);
    const links = await getLinksByIdList(db, currentUserId, linkIdList);

    return mergeLinks(links, favLinks);
  },
  async searchLink(parent, args, { db, currentUserId }) {
    const { links, linkIdList } = await searchLink(db, args.word);
    const favorites = await getFavLinksByIdList(db, currentUserId, linkIdList);

    return mergeLinks(links, favorites);
  },
  async linkInfo(parent, args, { db, currentUserId }) {
    const { links, linkIdList } = await getLinkById(db, args.linkId);
    const favorites = await getFavLinksByIdList(db, currentUserId, linkIdList);

    const userStatus = favorites.length === 0 ? false : favorites[0].isFavorite;

    const favCollection = db.collection('favorites');
    const favLinks = await favCollection.find({
      linkId: args.linkId,
      isFavorite: true,
      // userId: { $ne: currentUserId },
    }).toArray();

    const favUsers = favLinks.map((item) => ({
      userId: item.userId,
    }));

    return {
      link: {
        ...links[0],
        id: linkIdList[0],
        postedBy: {
          userId: links[0].postedBy,
        },
        userStatus,
      },
      favUsers,
    };
  },
};

export default linkQuery;
