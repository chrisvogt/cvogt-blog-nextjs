import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { getServerSideTranslations } from '../utils/get-serverside-translations';

import { ArticleHero, ArticleTileGrid } from '@src/components/features/article';
import { SeoFields } from '@src/components/features/seo';
import { Container } from '@src/components/shared/container';
import { PageBlogPostOrder } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  const page = useContentfulLiveUpdates(props.page);

  return (
    <>
      {page.seoFields && <SeoFields {...page.seoFields} />}

      <Container>
        <div className="my-5 bg-colorTextLightest p-5 text-colorBlueLightest">{page.greeting}</div>
      </Container>

    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, draftMode: preview }) => {
  try {
    const gqlClient = preview ? previewClient : client;

    console.log('About to fetch home page server data');

    const aboutPageData = await gqlClient.pageAbout({ locale, preview });
    const page = aboutPageData.pageAboutCollection?.items[0];

    if (!page) {
      return {
        revalidate: revalidateDuration,
        notFound: true,
      };
    }

    return {
      revalidate: revalidateDuration,
      props: {
        previewActive: !!preview,
        ...(await getServerSideTranslations(locale)),
        page,
      },
    };
  } catch (err) {
    console.log('Failed to fetch server side data', err);
    return {
      revalidate: revalidateDuration,
      notFound: true,
    };
  }
};

export default Page;
