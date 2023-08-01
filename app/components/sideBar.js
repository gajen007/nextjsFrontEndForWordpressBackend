import React from "react"

import Link from "next/link"
import { getCategories } from "../api";

export default async function SideBar() {
    const sideBarStyle={
        position:"absolute",
        marginTop:10,
        marginLeft:100,
        border:'solid',
        borderWidth:0.5,
        borderColor:"Blue",
        borderRadius:25
    };
    const categories = await getCategories();
    return (
        <div className="row" style={sideBarStyle}>
            <div className="col-lg-12">
                <ul style={{listStyle:'none'}}>
                    {
                        Array.isArray(categories) && categories.map((category)=>{
                            return <li key={category.node.categoryId} style={{marginTop:10}}>
                                    <span className="bg-dark text-white" style={{marginLeft:5,padding:5,borderRadius:25}}>
                                        <Link style={{ textDecoration: 'none' }} href={`/pages/categories/${category.node.categoryId}`}>{category.node.name}</Link>
                                    </span>
                                </li>;
                        })
                    }
                </ul>
            </div>
        </div>
    );

}
