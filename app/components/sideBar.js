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
        borderColor:"blue",
    };
    const categories = await getCategories();
    return (
        <div className="row" style={sideBarStyle}>
            <div className="col-lg-12">
                <ul style={{listStyle:'none'}}>
                    {
                        Array.isArray(categories) && categories.map((category)=>{
                            return <Link
                                    key={category.node.categoryId}
                                    href={`/pages/categories/${category.node.categoryId}`}
                                ><li style={{marginTop:5}}>{category.node.name}</li>
                            </Link>
                        })
                    }
                </ul>
            </div>
        </div>
    );

}
