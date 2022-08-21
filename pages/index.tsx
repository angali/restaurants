import React from 'react';
import { NextPage } from 'next'
import { GetServerSideProps } from 'next';
import Places from '../components/places';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="container">
        <Places />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  return {
    props: {
      seoPageTitle: 'Nearby Restaurants'
    }
  }
}

export default Home
