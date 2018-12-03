util.dec2percent=(float,precision=4)=>(float*100).toFixed(precision)
util.mkRendererCache=function(state)
{
	const
	{grid,height:h,width:w}=state.file.data,
	i2pt=i=>matrix.i2pt(w,h,grid,i),
	tileset=util.tilesets[state.view.tileset],
	max=Math.max(...grid)

	return {grid,h,w ,max, i2pt,tileset}//shortcuts, derrived, fns
}
util.tilesets=
{
	'2s':exp=>Math.pow(2,exp)
}