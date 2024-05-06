import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
// import Link from 'next/link';

import { getServerSideTranslations } from '../utils/get-serverside-translations';

import { ArticleTileGrid } from '@src/components/features/article';
import { SeoFields } from '@src/components/features/seo';
import { Container } from '@src/components/shared/container';
import { PagePhotoGalleryOrder } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  const page = useContentfulLiveUpdates(props.page);
  const photoGalleries = useContentfulLiveUpdates(props.photoGalleries);

  //   if (!page?.featuredBlogPost || !posts) return;

  return (
    <>
      {page.seoFields && <SeoFields {...page.seoFields} />}
      {/* <Container>
        <Link href={`/${page.featuredBlogPost.slug}`}>
          <ArticleHero article={page.featuredBlogPost} />
        </Link>
      </Container> */}

      <Container>
        <div className="bg-colorTextLightest text-colorBlueLightest my-5 p-5">
          This is the photography page.
        </div>
      </Container>

      <Container className="my-8  md:mb-10 lg:mb-16">
        <h2 className="mb-4 md:mb-6">{t('photographyPage.latestGalleries')}</h2>
        <ArticleTileGrid className="md:grid-cols-2 lg:grid-cols-3" articles={photoGalleries} />
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, draftMode: preview }) => {
  try {
    const gqlClient = preview ? previewClient : client;

    const photographyPageData = await gqlClient.pagePhotographyCollection({ locale, preview });
    const page = photographyPageData.pagePhotographyCollection?.items[0];

    const blogPostsData = await gqlClient.pagePhotoGalleryCollection({
      limit: 6,
      locale,
      order: PagePhotoGalleryOrder.PublishedDateDesc,
      // where: {
      //   slug_not: page?.featuredPhotoGallery?.slug,
      // },
      preview,
    });
    const photoGalleries = blogPostsData.pagePhotoGalleryCollection?.items;

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
        photoGalleries,
      },
    };
  } catch {
    return {
      revalidate: revalidateDuration,
      notFound: true,
    };
  }
};

export default Page;
