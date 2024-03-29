import { createContext } from 'react';
import ActivityStore from './activityStore';
import UserStore from './userStore';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import { configure } from 'mobx';

configure({ enforceActions: 'always' });

// master store which contain all other stores

export class RootStore {
    activityStore: ActivityStore;
    userStore: UserStore;
    commonStore!: CommonStore;
    modalStore: ModalStore;

    constructor() {
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);        
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());