input.slide=function(state,evt)
{	
	if(state.view.sliding) return

	logic.toggleInput(state)

	const
	target=evt.path.find(el=>el.matches('.grid')),
	{pointerId:pointer}=evt,
	pt0=util.evt2pt(evt),
	{height:rows,width:cols}=state.file.data,
	move=function(evt)
	{
		if(evt.pointerId!==pointer) return

		const
		{adj}=state.view,
		pt=util.evt2pt(evt),
		{height,width}=target.getClientRects()[0],
		h=(pt.x-pt0.x)/width,
		v=(pt.y-pt0.y)/height,
		//cannot be set earlier as user could back out
			// of previous move & get back to the origin
		unset=!adj.x&&!adj.y,
		[type,val,max]=((unset||adj.x)&&(h*h>v*v))?['x',h,1/cols]:['y',v,1/rows]

		adj[type]=util.numWithinRange(val,-max,max)
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