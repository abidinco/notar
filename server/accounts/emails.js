Accounts.emailTemplates.siteName = "one";
Accounts.emailTemplates.from = "one <seabey@yandex.com>";

Accounts.emailTemplates.verifyEmail = {
	subject() {
		return "One - Email Doğrulama"
	},
	text(user, url) {
		let emailAddress = user.emails[0].address,
				urlWithoutHash = url.replace('#/', ''),
				emailBody = `(${emailAddress}) mail adresini doğrulamak için linki ziyaret edin:\n\n${urlWithoutHash}`;
		return emailBody;
	}
}
// TODO: Email template
