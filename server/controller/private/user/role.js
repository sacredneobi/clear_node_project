const { Op } = require("sequelize");
const { userRole: model } = require("@models");
const { checkVal } = require("@utils");

const get = (req, res) => {
  const { id, search, limit, offset } = req.query;

  if (id) {
    model.findOne({ where: { id } }).defAnswer(res);
    return;
  }

  const where = search ? { caption: { [Op.getLike()]: `%${search}%` } } : null;

  model
    .findAndCountAll({
      where,
      ...(limit ? { limit } : {}),
      ...(offset ? { offset } : {}),
    })
    .defAnswer(res);
};

const post = (req, res) => {
  const { ...other } = req.body;
  model.create(other).defAnswer(res);
};

const update = (req, res) => {
  const { id, ...other } = req.body;
  model.update(other, { where: { id } }).defAnswer(res);
};

const del = (req, res) => {
  const { id, ...other } = req.body;
  model.destroy(other, { where: { id } }).defAnswer(res);
};

module.exports = (router) => {
  router.get("/", get);
  router.post("/", post);
  router.put("/", checkVal(["id"], "body"), update);
  router.delete("/", checkVal(["id"], "body"), del);

  return true;
};
