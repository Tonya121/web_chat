import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SignUpForm from "./components/form/SignUpForm";
import SignInForm from "./components/form/SignInForm";

import Main from "./pages/main/Main";

import NavBar from "./components/navbar/NavBar";
import instance from "./utils/api";

const App = () => {
    const user = localStorage.getItem("name");

    const [data, setData] = useState([]);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                const result = await instance.get(`/users`);
                setData(result);
            };

            fetchData();
        }
    }, []);
    console.log(data);
    return (
        <>
            <NavBar user={user} />
            <Router>
                {user ? (
                    <>
                        <Route
                            exact
                            path="/"
                            render={() => <Main data={data} />}
                        />
                        <Route path="/login" component={SignInForm} />{" "}
                    </>
                ) : (
                    <Route path="/auth" component={SignUpForm} />
                )}
            </Router>
        </>
    );
};

export default App;
