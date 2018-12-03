output.render=function(state)
{
	const
	cache=util.mkRendererCache(state),
	tiles=cache.grid.map(curry(output.tile,cache)).filter(x=>!!x)

	return [v('main.grid',{},...tiles)]
}
output.tile=function({h,w, max, i2pt,tileset},val,i)
{
	if(!val) return

	const
	{x,y}=i2pt(i),
	[left,top]=[x/w,y/h].map(x=>util.dec2percent(x,0)+'%'),
	[height,width]=[w,h].map(x=>(100/x)+'%'),

}
//@todo upstream to v
output.style=props=>Object.entries(props).map(([key,val])=>key+':'+val+';').join(' ')