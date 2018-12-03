output.render=function(state)
{


	return [v('main.grid',{},...tiles)]
}
output.tile=function({file},txt,{x,y})
{
	const
	{height:h,width:w}=file.data,
	[left,top]=[x/w,y/h].map(x=>util.dec2percent(x,0)+'%'),
	style=output.style({left,top})

	return v('.tile',{style},txt)
}
//@todo upstream to v
output.style=props=>Object.entries(props).map(([key,val])=>key+':'+val+';').join(' ')