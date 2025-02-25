const {google} = require("googleapis");

module.exports.oauth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	"postmessage"
)

