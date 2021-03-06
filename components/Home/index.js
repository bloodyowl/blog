import React from 'react';
import { createContainer, query } from '@phenomic/preset-react-app/lib/client';
import { Link } from 'react-router';
import Head from 'react-helmet';

const title = "omegalul";

const Home = ({ posts }) =>
    <div>
        <h1>Home</h1>
          <Head>
              <title>{ title }</title>
          </Head>
          <ul>
            {posts &&
            posts.node &&
            posts.node.list &&
            posts.node.list.map(post =>
                <li key={post.id}>
                    <Link to={`/${post.id}`}>{post.title || post.id}</Link>
                </li>
            )}
        </ul>
    </div>;


const HomeContainer = createContainer(Home, props => ({
    posts: query({ collection: 'posts', limit: 10 })
}));

export default HomeContainer;
