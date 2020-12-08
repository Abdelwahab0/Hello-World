import React from 'react'
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';
import { PostCard } from '../components';
import { FETCH_POSTS_QUERY } from '../util/graphql';

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Home() {
  const { data, loading, error } = useQuery(FETCH_POSTS_QUERY);
  if(data) {
    console.log(data);
    var { getPosts: posts } = data;
  }
  if(error) {
    console.log(error);
    return "error";
  }
  
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {/* {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )} */}
     {loading && <div className="loading-spinner"><Loader type="ThreeDots" color="#00BFFF" height={80} width={80}/></div>}
     {data && (
      <Transition.Group>
       {posts &&
        posts.map((post) => (
         <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
           <PostCard post={post} />
         </Grid.Column>
       ))}
   </Transition.Group>
   )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
