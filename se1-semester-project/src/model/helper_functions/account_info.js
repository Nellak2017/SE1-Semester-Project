export class AccountInfo {
	constructor(data){
		this.name = data.name;
		this.email = data.email;
        this.chatNames = [];
	}

	serialize(){
		return {
			name: this.name,
			email: this.email, 
            chatNames: this.chatNames,
		}
	}

	static instance() {
		return new AccountInfo({
			name: '', email: '', chatNames: [],
		});
	}
}