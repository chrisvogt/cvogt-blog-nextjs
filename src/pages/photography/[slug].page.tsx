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
  const { t } = useTranslation();

  const photoGallery = useContentfulLiveUpdates(props.photoGallery);

  if (!photoGallery) return null;

  return (
    <>
      {photoGallery.seoFields && <SeoFields {...photoGallery.seoFields} />}
      <Container>
        <ArticleHero article={photoGallery} isFeatured={props.isFeatured} isReversedLayout={true} />
      </Container>
      <Container className="mt-8 max-w-4xl">
        <ArticleContent article={photoGallery} />
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
    const [photoGalleryData] = await Promise.all([
      gqlClient.pagePhotoGallery({ slug: params.slug.toString(), locale, preview }),
    ]);

    const photoGallery = photoGalleryData.pagePhotoGalleryCollection?.items[0];

    // console.log(JSON.stringify(landingPageData));

    if (!photoGallery) {
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
        photoGallery,
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
        locales.map(locale => client.pagePhotoGalleryCollection({ locale, limit: 100 })),
      )
    : [];

  const paths = dataPerLocale
    .flatMap((data, index) =>
      data.pagePhotoGalleryCollection?.items.map(photoGallery =>
        photoGallery?.slug
          ? {
              params: {
                slug: photoGallery.slug,
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
