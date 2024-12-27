const Partner = require("../models/partner.modal");
const asyncHandler = require("express-async-handler");

// get all partners details
const allPartners = asyncHandler(async (req, res, next) => {
  const currentUser = req.user;
  const partners = await Partner.findAll();
  res.status(201).json({ currentUser, partners });
  return;
});

const getPartner = asyncHandler(async (req, res) => {
  const user = req.user;

  const partner = await Partner.findOne({
    where: { gym_id: user.id },
  });

  if (!partner) {
    res.status(400).json({ msg: "Partner doesn't exists" });
    return;
  }

  res.json({ msg: partner });
  return;
});

module.exports = {
  allPartners,
  getPartner,
};
