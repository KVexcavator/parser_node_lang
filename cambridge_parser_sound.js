const axios = require('axios')
const cheerio = require('cheerio')
const Nightmare = require('nightmare')
const readlineSync = require('readline-sync')

const word = readlineSync.question('Enter any word(exem: cat): ')
const localization = ['United Kingdom', 'USA']
const index = readlineSync.keyInSelect(localization, 'Which localization?')
console.log('Ok, you have chosen the ' + localization[index]);
console.log('-----------------------------')

const nightmare = Nightmare({ show: true })
const rootUrl = "https://dictionary.cambridge.org"
const wordUrl = rootUrl + "/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/" + word


const getWordSoundUrl = async () => {
	try {
		const { data } = await axios.get(wordUrl)
		const $ = cheerio.load(data)
		let soundUrl = ""
		switch (localization[index]) {
			case 'United Kingdom':
				soundUrl = $(`span.uk > span.daud > amp-audio[id="ampaudio1"] > source[type="audio/mpeg"]`).attr('src')
			case 'USA':
				soundUrl = $(`span.us > span.daud > amp-audio[id="ampaudio2"] > source[type="audio/mpeg"]`).attr('src')
		}		
    
    const fullSoundUrl = rootUrl + soundUrl
    console.log("Sound URL is: ", fullSoundUrl)
		console.log('-----------------------------')

		return fullSoundUrl
	} catch (error) {
		throw error;
	}
}

getWordSoundUrl()
.then((fullSoundUrl) => nightmare.goto(fullSoundUrl))

