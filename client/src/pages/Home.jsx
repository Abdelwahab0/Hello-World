import React from 'react'
import { gql, useQuery } from '@apollo/client';


export default function Home() {
  const { loading, data } = useQuery(FETCH_POST_QUERY);
  if(data){
    console.log(data);
  }
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

const FETCH_POST_QUERY = gql`
  {
      getPosts{
      id
      body
      createdAt
      username
      likeCount
      likes{
        username
      }
      commentCount
      comments{
        id
        username
        createdAt
        body
      }
    }
  }
`;