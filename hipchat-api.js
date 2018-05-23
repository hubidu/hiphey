const got = require('got')

const HIPCHAT_URL = process.env.HIPCHAT_URL
if (!HIPCHAT_URL) throw new Error('Please set env variable HIPCHAT_URL to the url of your hipchat server')

const API_TOKEN = process.env.API_TOKEN;
if (!API_TOKEN) throw new Error(`Please set env variable API_TOKEN. You can generate an API_TOKEN here ${HIPCHAT_URL}/sign_in?d=%2Faccount%2Fapi}`)

const listRooms = async () => {
    const res = await got(`${HIPCHAT_URL}/v2/room?auth_token=${API_TOKEN}`)
    return JSON.parse(res.body)
};

const getRoom = async id => {
    const res = await got(`${HIPCHAT_URL}/v2/room/${id}?auth_token=${API_TOKEN}`)
    return JSON.parse(res.body)
};

const sendMessage = async (idOrEmail, message, notify = true, messageFormat = 'html') => {
    const msg = {
        message,
        notify,
        message_format: messageFormat
    }

    const res = await got.post(`${HIPCHAT_URL}/v2/user/${idOrEmail}/message?auth_token=${API_TOKEN}`, {
        body: msg,
        json: true
    })
    return res.body
};

const sendCard = async (idOrEmail, message, card) => {
    const msg = {
        // message,
        // notify: true,
        // message_format: 'html',
        card
    }

    const res = await got.post(`${HIPCHAT_URL}/v2/user/${idOrEmail}/message?auth_token=${API_TOKEN}`, {
        body: msg,
        json: true
    })
    return res.body
};


module.exports = {
    listRooms,
    getRoom,
    sendMessage,
    sendCard,
}