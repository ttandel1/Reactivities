import { history } from './../../index';
import { IUser, IUserFormValues } from './../models/user';
import { observable, computed, action, runInAction } from 'mobx';
import agent from '../api/agent';
import { RootStore } from './rootStore';

// UserStore to store anything related to user

export default class UserStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    @observable user: IUser | null = null;

    @computed get isLoggedIn() { return !!this.user }

    // request to Login API
    @action login = async (values: IUserFormValues) => {
        try {
            console.log(values);
            const user = await agent.User.login(values);
            runInAction(() => {
                this.user = user;
                // storing token to common store (e.g when you refresh you need to use token)
                // common store will help you to store token
                this.rootStore.commonStore.setToken(user.token);
                this.rootStore.modalStore.closeModal();
                history.push('/activities');
            });
        }
        catch (error) {
            throw error;
        }
    }

    // get current user from API
    @action getUser = async () => {
        try {
            const user = await agent.User.current();
            runInAction(() => {
                this.user = user;
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Clear common store and send user to home
    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        history.push('/');
    }

    @action register = async(values: IUserFormValues)=>{
        try{
            const user = await agent.User.register(values);
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            history.push('/activities');
        }
        catch(error){
            throw error;
        }
    }
}