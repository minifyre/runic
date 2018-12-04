output.render=function(state)
{
	const
	cache=util.mkRendererCache(state),
	tiles=cache.grid.map(curry(output.tile,cache)).filter(x=>!!x),
	
	data={pointerdown:'slide'},
	pointerdown=evt=>input(state,evt)

	return [v('main.grid',{data,on:{pointerdown}},...tiles)]
}
output.tile=function({adj,grid,h,w, max, i2pt,tileset},val,i)
{
	if(!val) return

	const
	{x,y}=i2pt(i),
	[north,west,east,south]=matrix.adjacentPts(w,h,grid,{x,y},false)
	.map(function(pt)
	{
		if(pt.x<0||pt.x===w||pt.y<0||pt.y===h) return 'edge'

		const tile=matrix.at(w,h,grid,pt)

		return tile===0?'empty':
			tile===val?'match':
			'edge'
	}),
	horizontal=!adj.x?adj.x:
		adj.x>0&&east!=='edge'?adj.x:
		adj.x<0&&west!=='edge'?adj.x:
		0,
	vertical=!adj.y?adj.y:
		adj.y>0&&south!=='edge'?adj.y:
		adj.y<0&&north!=='edge'?adj.y:
		0,
	[left,top]=[x/w+horizontal,y/h+vertical]
		.map(n=>util.dec2percent(n,4)+'%'),
	[height,width]=[w,h].map(x=>(100/x)+'%'),
	style=output.style({height,left,top,width}),
	data={north,west,south,east},
	attrs={data,style}

	if(val===max) attrs.class='max'

	return v('.tile',attrs,tileset(val))
}
//@todo upstream to v
output.style=props=>Object.entries(props).map(([key,val])=>key+':'+val+';').join(' ')