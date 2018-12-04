const matrix=(w=0,h=w,fill=1)=>Array(h*w).fill(fill)
matrix.at=(w,h,a,{x,y})=>a[w*y+x]
matrix.col=(w,h,a,x)=>Array(h).fill(1).map((_,i)=>a[i*w+x])
matrix.i2col=(w,h,a,i)=>matrix.col(a,matrix.i2x(a,i))
matrix.i2pt=(w,h,a,i)=>({x:matrix.i2x(w,h,a,i),y:matrix.i2y(w,h,a,i)})
matrix.i2row=(a,i)=>matrix.row(a,matrix.i2y(a,i))
matrix.i2x=(w,h,a,i)=>i%w
matrix.i2y=(w,h,a,i)=>Math.floor(i/w)
matrix.pt2i=(w,h,a,{x,y})=>x+y*w
matrix.row=(w,h,a,y)=>Array(w).fill(1).map((_,i)=>a[y*w+i])
//@todo remove unused array params?

matrix.adjacentPts=function(w,h,a,{x,y},diagonal=true,wrapAround=false)
{
	const [i2x,i2y]=['i2x','i2y'].map(fn=>i=>matrix[fn](3,3,[],i))

	return matrix(3,3)
	.map((_,i)=>[i2x(i)-1,i2y(i)-1])
	.filter(([h,v])=>h||v)//remove 0,0
	.filter(([h,v])=>diagonal||Math.abs(h+v)===1)
	.map(([h,v])=>[x+h,y+v])
	.map(([x,y])=>({x,y}))

	// return (wrapAround?arr.map(function([x,y])
	// {
	// 	x=	x<0?w-1:
	// 		x===w?0:
	// 		x
	// 	y=	y<0?h-1:
	// 		y===h?0:
	// 		y

	// 	return [x,y]
	// }):arr.filter(([x,y])=>(x>-1&&x<w)&&(y>-1&&y<h)))
	// .map(([x,y])=>({x,y}))
}



export default matrix