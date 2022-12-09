import {app,db} from '../firebaseConfig'
import { collection, addDoc, getDoc, } from 'firebase/firestore';
import 'firebase/auth';
import 'firebase/firestore';
import { updateDoc } from "firebase/firestore";
import { AccountInfo } from "../src/model/helper_functions/account_info.js";



const COLLECTION_NAMES = {
    CHATROOMS: 'se1_chatrooms',
    MESSAGES: 'se1_messages',
    USERINFO: 'se1_userInfo',
}


export async function addMessage(smilString, chatroom){
    const data = {
        message: smilString,
        chatroom: chatroom,
    }
    const ref = await db.collection(COLLECTION_NAMES.MESSAGES).addDoc(data);
    return ref.id;
}

export async function addChatRoom(uid1, uid2){
    const data = {
        chatter1: uid1,
        chatter2: uid2,
        timestamp: Date.now(),
    }
    const ref = await db.collection(COLLECTION_NAMES.CHATROOMS).addDoc(data);
    return ref.id;
}

export async function setUserInfo(uid, updateInfo){
    let docRef = doc(db, COLLECTION_NAMES.USERINFO, uid);
    await updateDoc(docRef, updateInfo);
}

export async function getUserList(){
    let result = await admin.auth().listUsers(MAXRESULTS);
		userList.push(...result.users);
		let nextPageToken = result.pageToken;
		while (nextPageToken) {
			result = await admin.auth().listUsers(MAXRESULTS, nextPageToken);
			userList.push(...result.users);
			nextPageToken = result.pageToken;
		}
		return userList;
}

export async function getUserInfo(uid){
    const docRef = doc(db, COLLECTION_NAMES.USERINFO, uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        return new AccountInfo(docSnap.data());
    } else {
        const defaultInfo = AccountInfo.instance();
        const accountDocRef = doc(db, COLLECTION_NAMES.USERINFO, uid);
        await setDoc(accountDocRef, defaultInfo.serialize());
        return defaultInfo;
    }
}

export async function getMessages(chatroom){
    const [snapshot, loading, error] = useCollectionOnce(query, options);
    return snapshot;
}

export async function getUsername(uID) {
    const accountDocRef = doc(db, COLLECTION_NAMES.USERINFO, uid);
    const result = await getDoc(docRef);
    return result.name;
}