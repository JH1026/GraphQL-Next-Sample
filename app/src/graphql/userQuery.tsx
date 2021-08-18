const userQuery = {
  allUsers(parent, args, context) {
    return [
      { name: 'データ2', id: 'xxx', postedLinks: [] },
    ];
  },

};

export default userQuery;
