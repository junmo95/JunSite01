import React from 'react'
// 직접구현
const A = ({ message, posts }) => {
    return (
        <div>
            <h1>A Component</h1>
            <p>{message}</p>
            <ul>
                {posts.map(post => {
                    return (
                        <li key={post.id}>
                            <p>{post.title}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default A