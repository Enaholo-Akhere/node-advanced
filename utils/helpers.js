module.exports.sum = (a, b) => {
  return a + b;
};

module.exports.deleteUser = (users, id) => {
  return users.filter((user) => user.id !== id);
};

module.exports.findOneUserById = (users, id) => {
  return users.filter((user) => user.id === id);
};
