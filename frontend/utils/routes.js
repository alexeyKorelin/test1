import React from 'react';
import {Route} from 'mobx-router';
import Main from 'components/Modules/Main';
import Referals from 'components/Modules/Referals';

const views = {
  home: new Route({
    path: '/',
    component: <Main/>
  }),
  referals: new Route({
    path: '/referals',
    component: <Referals />,
    // onEnter: () => {
    //   console.log('entering user profile!');
    // },
    // beforeExit: () => {
    //   console.log('exiting user profile!');
    // },
    // onParamsChange: (route, params, store) => {
    //   console.log('params changed to', params);
    // }
  })
};
export default views;
