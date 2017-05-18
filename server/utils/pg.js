const Sequelize = require('sequelize');
const cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
const pg_config = appEnv.getServiceCreds(/ElephantSQL/);

module.exports = new Sequelize(pg_config.uri, {
  pool: {
    max: pg_config.max_conns
  },

  define: {
    timestamps: false
  }
});

