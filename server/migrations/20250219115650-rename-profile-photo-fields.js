"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Rename fields for consistency
    await queryInterface.renameColumn("admin", "profilephoto", "profile_photo");
    await queryInterface.renameColumn("user", "profile_photo", "profile_photo");
    await queryInterface.renameColumn(
      "gym_profile",
      "profile_pic",
      "profile_photo"
    );

    // Add profile_photo to Partner
    await queryInterface.addColumn("gym", "profile_photo", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });

    // Remove profile_photo from gym_profile (if necessary)
    await queryInterface.removeColumn("gym_profile", "profile_photo");
  },

  async down(queryInterface, Sequelize) {
    // Revert changes
    await queryInterface.renameColumn("admin", "profile_photo", "profilephoto");
    await queryInterface.renameColumn("user", "profile_photo", "profile_photo");
    await queryInterface.renameColumn(
      "gym_profile",
      "profile_photo",
      "profile_pic"
    );

    await queryInterface.removeColumn("gym", "profile_photo");
    await queryInterface.addColumn("gym_profile", "profile_photo", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },
};
