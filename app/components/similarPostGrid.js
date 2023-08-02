import React from "react"
import Link from "next/link"

export default function SimilarPostGrid(props) {
    return (
      <div
          style={{
            marginBottom: "1%",
            marginLeft: "1%",
            marginTop: "1%",
            marginRight: "1%",
          }}
          className="card border-dark"
        >
            <div className="card-body">
              {props.postHeading}
              <Link href={`/pages/posts/${props.postId}`}>
                <button className="btn btn-sm border-dark text-dark">Read More...</button>
            </Link>
            </div>
        </div>
    );
}
