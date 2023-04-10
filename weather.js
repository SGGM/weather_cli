#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { getWeather, getIcon } from './services/api.service.js';

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

const saveCity = async (city) => {
	if (!city.length) {
		printError('There was no city provided')
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('City saved!');
	} catch (error) {
		printError(error.message);
	}
};

const getForecast = async () => {
	try {
		const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
		const weather = await getWeather(city);
		printWeather(weather, getIcon(weather.weather[0].icon));
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
		return printHelp();
	}
	if (args.c) {
		return saveCity(args.c);
	}
	if (args.t) {
		return saveToken(args.t);
	}
	return getForecast();
};

initCLI();