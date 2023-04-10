#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { printHelp, printSuccess, printError } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';

const saveToken = async (token) => {
	if (!token.length) {
		printError('There was no token provided')
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Token saved!');
	} catch (error) {
		printError(error.message);
	}
};

const getForecast = async () => {
	try {
		const weather = await getWeather('moscow');
		console.log(weather);		
	} catch (error) {
		if (error?.response?.status == 404) {
			printError('Wrong city name');
		} else if (error?.response?.status == 401) {
			printError('Wrong token');
		} else {
			printError(error.message);
		}
	}
};

const initCLI = () => {
	const args = getArgs(process.argv);
	if (args.h) {
		printHelp();
	}
	if (args.c) {
		// Save city
	}
	if (args.t) {
		return saveToken(args.t);
	}
	getForecast();
};

initCLI();