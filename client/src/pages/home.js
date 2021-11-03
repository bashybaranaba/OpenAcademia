import React from 'react'

import PostCard from '../components/PostCard'

import Container from '@mui/material/Container';

function Home() {
    return (
        <div>
            <Container maxWidth="md">
                <PostCard/>
                <PostCard/>
            </Container>
        </div>
    )
}

export default Home
