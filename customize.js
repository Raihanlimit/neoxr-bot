let { Presence } = require('@adiwajshing/baileys')
let util = require('util')
let fs = require('fs')
let { exec } = require('child_process')
let { green, blueBright, redBright } = require('chalk')
let moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = async (conn, m, _func, isOwner, isBlock, isAdmin, isBotAdmin) => {
	
	// console.log([ isOwner, isBlock, isAdmin, isBotAdmin ])
	// here you can make anything like auto download, auto response, etc.
	// and as an example I make the eval within switch case and if else condition
	if (typeof m.text == 'object') return
	let command, text
	let x = m.text.trim().split`\n`, y = ''
	command = x[0].split` `[0]
	y += x[0].split` `.slice`1`.join` `, y += x.slice`1`.join`\n`
	text = y.trim()
	// console.log([ command, text ])
	
	// switch case
	switch (command) {
		case '>': await conn.updatePresence(m.chat, Presence.composing)
		if (!isOwner || !text) return
		try {
			evL = await eval(`(async () => { ${text} })()`)
			m.reply(util.format(evL))
		} catch (e) {
			m.reply(util.format(e))
		} break
	}
	
	// if else
	if (command == '=>') {
		await conn.updatePresence(m.chat, Presence.composing)
		if (!isOwner || !text) return
		try {
			evL = await eval(`(async () => { return ${text} })()`)
			m.reply(util.format(evL))
		} catch (e) {
			m.reply(util.format(e))
		}
	}
	
	if (command == '$') {
		await conn.updatePresence(m.chat, Presence.composing) 
		if (!isOwner || !text) return
		m.reply(`*executing . . .*`)
		exec(text, (err, stdout) => {	
			if (err) return m.reply(err.toString())
			if (stdout) return m.reply(stdout)
		})
	}
	
	// an example auto response
	if (!m.fromMe && m.text.match(/(mksh|mksih|mkasih|makasih|thanks|thx|tq|tysm)/gi)) {
		await conn.updatePresence(m.chat, Presence.composing)
		conn.reply(m.chat, `*Ur Welcome. :)*`, m)
	}
	
	// here your code . . . . :v
	
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(redBright.bold('[ UPDATE ]'), blueBright(moment(new Date() * 1).format('DD/MM/YY HH:mm:ss')), green.bold('~ customize.js'))
	delete require.cache[file]
	require(file)
})
