import * as firebase from "firebase";

export class Firebase {
	public app: any;
	public appConfig: any = {
		apiKey: "AIzaSyCXx_EKBDzc4XM22EgMwFNnUqzFzmIP4Wc",
		authDomain: "lithe-style-815.firebaseapp.com",
		databaseURL: "https://lithe-style-815.firebaseio.com",
		projectId: "lithe-style-815",
		storageBucket: "lithe-style-815.appspot.com",
		messagingSenderId: "127477820241"
	};

	public init() {
		this.app = firebase.initializeApp(this.appConfig);
	}
}
