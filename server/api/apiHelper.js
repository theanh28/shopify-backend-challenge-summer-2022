/**
 * @param {Object} params
 *
 * transform GET req.query from client into mongoDB/header-suitable params.
 */
const aqp = (query) => {
  // for now it only supports pagination
  let { range = [] } = query;

  // filter exclude documents with isHidden = true
  const filter = {
    $and: [{ isHidden: { $ne: true } }],
  };

  let skip, limit;

  try {
    range = [parseInt(range[0]), parseInt(range[1])];
    if (!isNaN(range[0]) && !isNaN(range[1])) {
      skip = range[0];
      limit = range[1] - range[0];
    }
  } catch (e) {} // req.query.range is not of valid JSON syntax

  return {
    skip,
    limit,
    filter,
  };
};

module.exports = { aqp };
