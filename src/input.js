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
		{height,width}=target.getClientRects()[0],
		h=(pt.x-pt0.x)/width,
		v=(pt.y-pt0.y)/height,
		hMax=1/state.file.data.width,
		vMax=1/state.file.data.height

		//@todo dry!
		//@todo could this break if the window resizes during user input?

		if(!adj.x&&!adj.y)
		{
			if(Math.abs(h)>Math.abs(v))
			{
				adj.x=h>0?Math.min(h,hMax):Math.max(h,-hMax)
			}
			else
			{
				adj.y=v>0?Math.min(v,vMax):Math.max(v,-vMax)
			}
		}
		else if(adj.x&&(Math.abs(h)>Math.abs(v)))
		{
			adj.x=h>0?Math.min(h,hMax):Math.max(h,-hMax)
		}
		else if(adj.y)
		{
			adj.y=v>0?Math.min(v,vMax):Math.max(v,-vMax)
		}
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