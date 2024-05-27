// migrations/20220418160000-add-field-to-users.js

module.exports = {
  async up(db, client) {
    // Add a new field to the users collection
    await db.collection('users').updateMany({}, { $set: { isAdmin: false } });
  },

  async down(db, client) {
    // Rollback the migration by removing the added field
    await db.collection('users').updateMany({}, { $unset: { isAdmin: "" } });
  }
};
