import React from 'react';
import Head from 'react-helmet';
import { View } from "react-primitives";

const PageError = ({ error }) => {
    const status = (error && error.status) || 404;
    const message = error && status !== 404 ? error.statusText : 'Page not found';

    return (
        <View>
            <Head>
                <title>{message}</title>
            </Head>
            <h1>{message}</h1>
        </View>
    );
};

export default PageError;