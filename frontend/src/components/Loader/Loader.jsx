import React from 'react';
import loaderStyle from './Loader.module.scss';

const Loader = () => {
    return (
        <div className={loaderStyle.loader}>
            <div className={loaderStyle.spinner}></div>
            <p>Loading...</p>
        </div>
    );
};

export default Loader;