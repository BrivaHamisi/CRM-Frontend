export default class APIService{
    static LoginUsercd (body){
        return fetch('http://127.0.0.1:8000/api/users/', {
      'method':'GET',
      headers:{
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": "true",
        // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        'Content-Type':'application/json',
        'authorization':'Token 782d582308a88ae82d4d3cee3175c1753afa02e2'
      },
      body:JSON.stringify(body)
    })
    .then(resp => resp.json())
    
    .catch(error => console.log(error))
    
  },
}
