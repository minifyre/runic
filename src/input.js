input.slide=function(state,evt)
{	
	if(state.view.sliding) return

	logic.toggleInput(state)

	const
	target=evt.path.find(el=>el.matches('.grid')),
	{pointerId:pointer}=evt,
	pt0=util.evt2pt(evt),
	{height:rows,width:cols}=state.file.data,
	hMax=1/cols,
	vMax=1/rows,
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
		[type,val,max]=((unset||adj.x)&&(h*h>v*v))?['x',h,hMax]:['y',v,vMax]
		//@todo don't allow user to change direction after exceeding max
		adj[type]=util.getNumInRange(-max,max,val)
	},
	stop=function(evt)
	{
		if(evt.pointerId!==pointer) return

		target.removeEventListener('pointermove',move)
		target.removeEventListener('pointerup',stop)

		const {adj}=state.view
		//@todo make this independent of the dom (pure logic)
		if(Math.abs(adj.x)===hMax||Math.abs(adj.y)===vMax)//make move
		{
			state.file.data.grid=[...target.querySelectorAll('.tile')]
			.reduce(function(arr,el)
			{
				const
				[left,top]=['left','top']
					.map(prop=>el.style[prop])
					.map(txt=>txt.replace('%',''))
					.map(txt=>parseInt(txt)),
				[x,y]=[left/(hMax*100),top/(vMax*100)],
				i=matrix.pt2i(cols,rows,arr,{x,y}),
				val=parseInt(el.getAttribute('data-val'))

				arr[i]=arr[i]?val+1:val

				return arr
			},Array(state.file.data.width*state.file.data.height).fill(0))
		}

		state.view.adj.x=0
		state.view.adj.y=0
		logic.toggleInput(state)
	}

	target.addEventListener('pointermove',move)
	target.addEventListener('pointerup',stop)
}