const Partner = require("../models/partner.modal");

class PartnerService {
  constructor() {
    this.partnerModel = Partner;
  }

  async getAllPartners() {
    return await this.partnerModel.findAll();
  }

  async getPartnerById(partnerId) {
    return await this.partnerModel.findOne({
      where: { gym_id: partnerId },
    });
  }
}

module.exports = new PartnerService();
