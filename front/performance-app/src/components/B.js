import React, { useCallback } from 'react'

// 컴포넌트로 구분해서 구현

const Message = React.memo(({ message }) => {
    return (
        <p>{message}</p>
    )
})

const ListItem = React.memo(({ post }) => {
    return (
        <li>
            <p>{post.title}</p>
        </li>
    )
})

const List = React.memo(({ posts, testFunction }) => {
    console.log('List component is Rendering');
    return (
        <ul>
            {posts.map(post => (
                <ListItem key={post.id} post={post} />
            ))}
        </ul>
    )
})

const B = React.memo(({ message, posts }) => {

    console.log('B component is Rendering');
    const testFunction = useCallback(() => { }, []);

    return (
        <div>
            <h1>B Component</h1>
            <Message message={message} />
            <List posts={posts} testFunction={testFunction} />
        </div>
    )
})

export default B