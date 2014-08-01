exports = module.exports = {};

exports.hasSubString = function (substr) {
  return function (str) {
    return str.indexOf(substr) > -1;
  };
};
