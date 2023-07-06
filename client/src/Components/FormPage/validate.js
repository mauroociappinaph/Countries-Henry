function validate(input) {
	let errors = {};
	let dif = Number(input.difficulty);
	let dur = Number(input.duration);

	if (input.name.length > 0) {
		if (!input.name) errors.name = 'Campo Necesario';
		else if (/[^A-Za-z0-9 ]+/g.test(input.name))
			errors.name =
				'EL nombre no debe contener caracteres especiales o tildes';
	}
	if (!input.difficulty) errors.difficulty = 'Campo Necesario';
	else if (dif <= 0 || dif > 5) errors.difficulty = 'Debe ser entre 1 y 5';

	if (!input.duration) errors.duration = 'Campo Necesario';
	else if (dur <= 0 || dur > 24) errors.duration = 'Debe ser entre 1 y 24';

	if (!input.season || input.season === 'vacio')
		errors.season = 'Campo Necesario';

	if (!input.countries || input.countries.length === 0)
		errors.countries = 'Campo Necesario';

	return errors;
}

export default validate;