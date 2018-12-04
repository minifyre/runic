output.render=function(state)
{
	const
	cache=util.mkRendererCache(state),
	tiles=cache.grid.map(curry(output.tile,cache)).filter(x=>!!x),
	
	data={pointerdown:'slide'},
	pointerdown=evt=>input(state,evt)

	return [v('main.grid',{data,on:{pointerdown}},...tiles)]
}
output.tile=function({adj,h,w, max, i2pt,tileset},val,i)
{
	if(!val) return

	const
	{x,y}=i2pt(i),
	[left,top]=[x/w+adj.x,y/h+adj.y].map(n=>util.dec2percent(n,4)+'%'),
	[height,width]=[w,h].map(x=>(100/x)+'%'),
	style=output.style({height,left,top,width}),
	attrs={style}

	if(val===max) attrs.class='max'

	return v('.tile',attrs,tileset(val))
}
//@todo upstream to v
output.style=props=>Object.entries(props).map(([key,val])=>key+':'+val+';').join(' ')