import React from 'react';
// import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Router } from 'react-router';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import PageHeaderView from 'views/page_header_view/PageHeaderView';
import PageFooterView from 'views/page_footer_view/PageFooterView';
import BreadcrumbsView from 'views/breadcrumbs_view/BreadcrumbsView';

import App from 'components/app/App';
import AboutView from 'views/about_view/AboutView';
// import
import EducationView from 'views/education_view/EducationView';
import CareersView from 'views/careers_view/CareersView';

import { default as store } from 'stores/configureStore';

const Routes = () => (
  <Provider store={store()}>
    <Router history={createBrowserHistory()}>
      <div>
        <PageHeaderView />
        <BreadcrumbsView />
        <Switch>
          <Route path="/" exact component={AboutView} />
          <Route path="/education" component={EducationView} />
          <Route path="/careers" component={CareersView} />
          <Redirect to="/" />
        </Switch>
        <PageFooterView />
      </div>
    </Router>
  </Provider>
);

export default Routes;
