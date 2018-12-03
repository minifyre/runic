import matrix from './matrix.js'//'./node_modules/matrix/index.js'
import silo from './node_modules/silo/index.js'
import truth from './node_modules/truth/truth.mjs'
import v from './node_modules/v/v.mjs'

const {config,util,logic,output,input}=silo

export default Object.assign(async function init(initialState)
{
	const
	state=logic(initialState),
	render=truth.compile(({state})=>v.render(document.body,state,output))

	truth(state,render)
},silo)

const {curry}=util