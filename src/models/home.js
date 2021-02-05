export default {
    namespace: 'home',
  
    state: {
        data: [
            {
                key: '1',
                name: 'John Brown',
                num: 2,
                address: 'AAA,BBB,CCC,DDD',
            },
        ]
    },
  
    subscriptions: {
      
    },
  
    effects: {
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