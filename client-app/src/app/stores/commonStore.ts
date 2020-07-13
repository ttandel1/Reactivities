import { RootStore } from './rootStore';
import { observable, action, reaction } from 'mobx';

// common store contain common features

export default class CommonStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        reaction(
            ()=> this.token,
            token => {
                if(token) {
                    window.localStorage.setItem('jwt', token);
                }else{
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    @observable token: string | null = window.localStorage.getItem('jwt');
    @observable appLoaded = false;

    // set Token from localStorage
    @action setToken = (token: string | null) => {
        window.localStorage.setItem('jwt', token!);
        this.token = token;
    }

    // 
    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
}