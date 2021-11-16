import React from 'react';
import Layout from '../layout/LayoutComponent';

function Content(){
    return(
        <p>Product</p>
    );
}

function Product() {
    return (
        <Layout children={<Content/>}/>
    );
}

export default Product;