#! /usr/bin/env node
const {sendMessage} = require('../hipchat-api')

const RECIPIENTS = process.env.RECIPIENTS
if (!RECIPIENTS) throw new Error(`Please set process.env.RECIPIENTS to a comma separated list of email addresses`)

const MESSAGE = process.env.MESSAGE
if (!MESSAGE) throw new Error(`Please set process.env.MESSAGE to an html formatted message`);

(async () => {
	try {
        const rcpts = RECIPIENTS.split(',')

        for (rcpt of rcpts) {
            await sendMessage(rcpt, MESSAGE)
        }
	} catch (error) {
		console.log('ERROR', error);
	}
})()