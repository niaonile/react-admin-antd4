let LOADED = false;
export default {
    namespace: 'global',
  
    state: {
        global: 'global',
        menuKey: '/home',
        menuData: [
            {title: '首页', path: '/home', closable: false, component: null}
        ],
    },
  
    subscriptions: {
        setup({ history, dispatch }) {
            // history.listen((location) => {
            //     if (location.pathname === '/home' && !LOADED) {
            //         LOADED = true;
            //         dispatch({ type: 'init' });
            //     }
            // });
        },
    },
  
    effects: {
        *init({ payload }, { call, put, select }) {
            // const { menuData } = yield select(state => state.global);
            // yield put({
            //     type: 'updateData',
            //     payload: {
            //         menuData: [{title: '首页', path: '/home', closable: false, component: null}]
            //     }
            // });
        },
        *updateData({ payload }, { call, put }) {
            yield put({
                type: 'changeState',
                payload: payload,
            });
        },
    },
  
    reducers: {
        changeState(state, action) {
            return {...state, ...action.payload};
        },
    }
};