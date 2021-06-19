
const storage =  window.localStorage;

const read = ()=>{
	return JSON.parse(storage.getItem('_ifv_manager_')||"{}");
}

const write = (data) => {
	storage.setItem('_ifv_manager_',JSON.stringify(data));
}

export default {
	set(k,v){
		let data = read();
		data[k] = v;
		write(data);
	},
	get(k){
		let data = read();
		return data[k];
	}
}
