let { Presence, MessageType } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
exports.run = {
	usage: ['ig'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
	try {
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return m.reply(`• *Example* : ${isPrefix + command} https://www.instagram.com/p/CK0tLXyAzEI`)
		if (!args[0].match(/(https:\/\/www.instagram.com)/gi)) return m.reply(_func.status.invalid)
		m.reply(_func.status.getdata)
		let json = await (await fetch(global.API('neoxr', '/ig?', { url:https://www.instagram.com/reel/CQngJY4HIhN args[0] }, 'apikey'))).json()
		if (!json.status) return m.reply(_func.status.fail)
		for(let i = 0; i < json.data.length; i++) {
			if(json.data[i].type == 'mp4') {
				await conn.updatePresence(m.chat, Presence.composing) 
				conn.sendVideo(m.chat, json.data[i].url, null, m)
			} else if(json.data[i].type == 'jpg') {
				await conn.updatePresence(m.chat, Presence.composing)
				conn.sendImage(m.chat, json.data[i].url, null, m)
			} await _func.delay(1000)
		}
	} catch {
		return m.reply(_func.status.error)
	}},
	error: false,
	limit: true,
	premium: false
}
