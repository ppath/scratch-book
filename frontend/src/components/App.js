import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import RouteAuthenticated from './routing/RouteAuthenticated';
import RouteUnauthenticated from './routing/RouteUnauthenticated';
import Home from './pages/home/Home';
import Faq from './pages/faq/Faq';
import About from './pages/about/About';
import AppBar from './appBar/AppBar';
import NotFound from './pages/notFound/NotFound';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ListInfo from './pages/home/User_Home/ListInfo.js'
import Profile from './pages/profile/Profile.js'
import ShowAll from './pages/home/All_the_list/ShowAllList.js'
import Search from './pages/Search/Search_Results.js';
import BoardPage from './pages/board/BoardPage';
import './App.scss';

/**
 *
 */
export default class App extends React.Component {

    render() {

        return (
            <div className="w-100 h-100 d-flex flex-column bg-secondary">
                <AuthProvider>
                    <Router>
                        <AppBar className="flex-shrink-0" />
                        <div className="flex-grow-1 mt-2 p-2 shadow bg-dark">
                            <Switch>
                                <Route path={['/', 'home']} exact={true} component={Home} />
                                <Route path="/about" component={About} />
                                <Route path="/faq" component={Faq} />
                                <RouteUnauthenticated path="/signup" component={SignUp} />
                                <RouteUnauthenticated path="/login" component={Login} />
                                <RouteUnauthenticated path="/forgot-password" component={ForgotPassword} />
                                <RouteAuthenticated path="/account" component={Profile} />
                                <RouteAuthenticated path="/list" component={ListInfo} />
                                <RouteAuthenticated path="/showAll" component={ShowAll} />
                                <RouteAuthenticated path="/search" component={Search} />
                                <RouteAuthenticated path="/boards/:boardId" component={BoardPage} />
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </Router>
                </AuthProvider>
            </div>
        );
    }
};
