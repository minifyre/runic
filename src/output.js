output.render=function(state)
{

}//@todo upstream to v
output.style=props=>Object.entries(props).map(([key,val])=>key+':'+val+';').join(' ')