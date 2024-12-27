const partnerService = require("../services/partner.service");
const asyncHandler = require("express-async-handler");

class PartnerController {
  constructor(partnerService) {
    this.partnerService = partnerService;
  }

  allPartners = asyncHandler(async (req, res) => {
    const currentUser = req.user;
    const partners = await this.partnerService.getAllPartners();
    res.status(200).json({ currentUser, partners });
  });

  getPartner = asyncHandler(async (req, res) => {
    const user = req.user;
    const partner = await this.partnerService.getPartnerById(user.id);

    if (!partner) {
      return res.status(404).json({ msg: "Partner doesn't exist" });
    }

    res.status(200).json({ msg: partner });
  });
}

module.exports = new PartnerController(partnerService);
