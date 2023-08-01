import React from "react"
import Link from "next/link"

export default function PostGrid(props) {
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
          <div className="card-header bg-dark text-white">
            {props.postHeading}
          </div>
            <div className="card-body">
              <div dangerouslySetInnerHTML={{__html: props.postBegining}} ></div>
              <Link href={`/pages/posts/${props.postId}`}>Read More...</Link>
            </div>
        </div>
    );
}
