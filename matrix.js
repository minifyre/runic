const matrix=(w=0,h=w,fill)=>({array:Array(h*w).fill(fill),height:h,width:w})
matrix.at=(w,h,a,x,y)=>a[w*y+x]
matrix.col=(w,h,a,x)=>Array(h).fill(1).map((_,i)=>a[i*w+x])
matrix.i2col=(w,h,a,i)=>matrix.col(a,matrix.i2x(a,i))
matrix.i2pt=(w,h,a,i)=>({x:matrix.i2x(w,h,a,i),y:matrix.i2y(w,h,a,i)})
matrix.i2row=(a,i)=>matrix.row(a,matrix.i2y(a,i))
matrix.i2x=(w,h,a,i)=>i%w
matrix.i2y=(w,h,a,i)=>Math.floor(i/w)
matrix.pt2i=(w,h,a,{x,y})=>x+y*w
matrix.row=(w,h,a,y)=>Array(w).fill(1).map((_,i)=>a[y*w+i])
export default matrix