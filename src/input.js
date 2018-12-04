input.slide=function(state,evt)
{	
	if(state.view.sliding) return

	logic.toggleInput(state)

	const
	target=evt.path.find(el=>el.matches('.grid')),
	{pointerId:pointer}=evt,
	pt0=util.evt2pt(evt),
	move=function(evt)
	{
		if(evt.pointerId!==pointer) return

		const
		{adj}=state.view,
		pt=util.evt2pt(evt),
		h=pt.x-pt0.x,
		v=pt.y-pt0.y,
		{height,width}=target.getClientRects()[0]

		//@todo dry!
		//@todo this could break if the window resizes during user input

		if(!adj.x&&!adj.y)
		{
			if(Math.abs(h)>Math.abs(v)) adj.x=h/width
			else adj.y=v/height
		}
		else if(adj.x&&(Math.abs(h)>Math.abs(v))) adj.x=h/width
		else if(adj.y) adj.y=v/height
	},
	stop=function(evt)
	{
		if(evt.pointerId!==pointer) return

		target.removeEventListener('pointermove',move)
		target.removeEventListener('pointerup',stop)


		//@todo calculate move here

		state.view.adj.x=0
		state.view.adj.y=0
		logic.toggleInput(state)
	}

	target.addEventListener('pointermove',move)
	target.addEventListener('pointerup',stop)
}