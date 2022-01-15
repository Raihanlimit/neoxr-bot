let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['swm'],
	async: async (m, { conn, _func, text }) => {
		await conn.updatePresence(m.chat, Presence.composing)
		if (!text) return conn.reply(m.chat, `• *Example* : ${usedPrefix + command} Punya R | RenBot`, m)
		if (!text.match(/[|]/gi)) {
			x = text
			y = global.db.setting.sk_author
		} else {
			let [ pack, author ] = text.split`|`
			x = pack
			y = author
		}
	try {
		let q = m.quoted ? m.quoted : m
		let mime = (q.msg || q).mimetype || ''
		if (/image/.test(mime)) {
			let img = await q.download()
			if (!img) return m.reply(_func.status.wrong)
			await conn.sendSticker(m.chat, img, x, y, false, m)
		} else if (/video/.test(mime)) {
			if ((q.msg || q).seconds > 11) return m.reply(`*Maximum video duration is 10 seconds.*`)
			let img = await q.download()
			if (!img) return m.reply(_func.status.wrong)
			await conn.sendSticker(m.chat, img, x, y, true, m)
		}
	} catch {
		return m.reply(_func.status.error) 
	}},
	limit: true
}
