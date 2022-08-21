import React from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Place from '../../components/place';
import Layout from '../../components/Layout';
import { withRouter } from 'next/router'
import { Router } from 'next/router'

type Props = {}

type PropsWithRouter = Props & {
  router: Router
}

const Home: NextPage = ({ router }: any) => {

  const { slug } = router.query;

  return (
    <Layout>
      <div className="container">
        <Place id={slug} />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  const slug: any = query.slug;

  return {
    props: {
      seoPageTitle: slug,
    }
  }

}


export default withRouter(Home)
