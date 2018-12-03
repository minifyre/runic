output.render=function(state)
{
	const
	{grid,height:h,width:w}=state.file.data,
	i2pt=i=>matrix.i2pt(w,h,grid,i),
	tileset=util.tilesets[state.view.tileset],
	tiles=state.file.data.grid
	.reduce(function(arr,val,i)
	{
		if(!val) return arr

		const
		tile=tileset(val)
		return arr.concat([output.tile(state,tile,i2pt(i))])
	},[])

	return [v('main.grid',{},...tiles)]
}
output.tile=function({file},txt,{x,y})
{
	const
	{height:h,width:w}=file.data,
	[left,top]=[x/w,y/h].map(x=>util.dec2percent(x,0)+'%'),
	[height,width]=[w,h].map(x=>(100/x)+'%'),
	style=output.style({height,left,top,width})

	return v('.tile',{style},txt)
}
//@todo upstream to v
output.style=props=>Object.entries(props).map(([key,val])=>key+':'+val+';').join(' ')