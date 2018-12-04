logic.normalize=function(opts)
{
	const
	state=util.mkState(opts),
	{height:h,width:w}=state.file.data,
	l=w*h,
	grid=Array(l).fill(0)
	//populate grid
	Array(Math.floor(l/2)).fill(1).forEach(()=>grid[logic.rand(l)]+=1)

	state.file.data.grid=grid

	return state
}

logic.rand=(num,seed=Math.random())=>Math.floor(seed*num)

logic.toggleInput=state=>state.view.sliding=!state.view.sliding