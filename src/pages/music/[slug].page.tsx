import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';

import { getServerSideTranslations } from '../utils/get-serverside-translations';

import { ArticleContent, ArticleHero } from '@src/components/features/article';
import { SeoFields } from '@src/components/features/seo';
import { Container } from '@src/components/shared/container';
import { client, previewClient } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const page = useContentfulLiveUpdates(props.page);

  if (!page) return null;

  return (
    <>
      {page.seoFields && <SeoFields {...page.seoFields} />}
      <Container>
        <ArticleHero article={page} isFeatured={props.isFeatured} isReversedLayout={true} />
      </Container>
      <Container className="mt-8 max-w-4xl">
        <ArticleContent article={page} />
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params, locale, draftMode: preview }) => {
  if (!params?.slug || !locale) {
    return {
      notFound: true,
      revalidate: revalidateDuration,
    };
  }

  const gqlClient = preview ? previewClient : client;

  try {
    const [data] = await Promise.all([
      gqlClient.pageMusicMediaArticle({ slug: params.slug.toString(), locale, preview }),
    ]);

    const page = data.pageMusicMediaArticleCollection?.items[0];

    if (!page) {
      return {
        notFound: true,
        revalidate: revalidateDuration,
      };
    }

    return {
      revalidate: revalidateDuration,
      props: {
        ...(await getServerSideTranslations(locale)),
        previewActive: !!preview,
        page,
      },
    };
  } catch {
    return {
      notFound: true,
      revalidate: revalidateDuration,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const dataPerLocale = locales
    ? await Promise.all(
        locales.map(locale => client.pageMusicMediaArticleCollection({ locale, limit: 100 })),
      )
    : [];

  const paths = dataPerLocale
    .flatMap((data, index) =>
      data.pageMusicMediaArticleCollection?.items.map(mediaArticle =>
        mediaArticle?.slug
          ? {
              params: {
                slug: mediaArticle.slug,
              },
              locale: locales?.[index],
            }
          : undefined,
      ),
    )
    .filter(Boolean);

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Page;
