

export default class APIService {
	static LoginUser(body) {
		const p = new Promise((resolve, reject) => {
			fetch('http://127.0.0.1:8000/api/auth/login/', {
				'method':'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type':'application/json'
				},
				body: JSON.stringify(body)
			}).then(res => res.json())
			.then(data => resolve(data))
			.catch(error => console.log(error))
		});

		return p;
	}
}

