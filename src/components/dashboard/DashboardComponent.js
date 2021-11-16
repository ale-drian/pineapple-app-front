import React, { ReactNode } from 'react';
import Layout from '../layout/LayoutComponent';

function Content(){
    return(
        <p>Dashboard</p>
    );
}

function Dashboard() {
    return (
        <Layout children={<Content/>}/>
    );
}

export default Dashboard;
