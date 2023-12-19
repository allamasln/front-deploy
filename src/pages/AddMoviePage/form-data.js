import * as yup from 'yup'

const fields = [
	{
		name: 'title',
		label: 'Título',
	},
	{
		name: 'sinopsis',
		label: 'Sinopsis',
	},
	{
		name: 'image',
		label: 'Cartel',
		type: 'file',
	},
]

const TYPES = {
	'image/jpeg': 'jpeg',
	'image/gif': 'gif',
	'image/png': 'png',
}

const schema = yup
	.object({
		title: yup.string().required('Título obligatorio'),
		sinopsis: yup.string().required('Sinopsis obligatoria'),
		image: yup
			.mixed()
			.test({
				message: 'Cartel obligatorio',
				test: (value) => value.length,
			})
			.test({
				message: 'Cartel debe estar en ' + Object.values(TYPES),
				test: (value) => value.length && TYPES[value[0].type],
			}),
	})
	.required()

export { fields, schema }
