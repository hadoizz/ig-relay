const getId = () => 
  Math.random().toString(36).slice(2)+(new Date).getTime().toString(36)

export default getId