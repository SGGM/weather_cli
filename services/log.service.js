import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ' + ' ' + error));
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ' + ' ' + message));
};

const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		No params - showing weather
		-c [CITY] chose and save city
		-h help
		-t [API_KEY] save token
		`
	)
};

const printWeather = (res, icon) => {
	console.log(
		dedent`${chalk.bgYellow(' WEATHER ')} In ${res.name}
		${icon} ${res.weather[0].description}
		Temperature: ${res.main.temp}°C (feels like ${res.main.feels_like}°C)
		Humidity: ${res.main.humidity}%
		Wind: ${res.wind.speed} kph
		`
	)
};

export { printError, printSuccess, printHelp, printWeather };