import Head from 'next/head';
import Image from 'next/image';
import { getHonorees, getHonoreesBySport } from '@/lib/notion';
import {AspectRatio, Container, Heading, SimpleGrid, Box, Flex, Text} from '@chakra-ui/react';
import { socialImage, url } from '@/lib/config';

import MainLayout from '@/layouts/MainLayout';
import Blocks from '@/components/blocks';

export default function Year({ honorees, sport }) {
    console.log(honorees)
    console.log(sport)
    // const { pageInfo, blocks } = honorees;
    // const { entry, slug, summary, image, social_image } = pageInfo.properties;
    // const image = pageInfo.properties?.Cover_Image?.rich_text[0]?.href;
    // const profileImage = pageInfo.properties?.Profile_Image?.rich_text[0]?.href;
    // const titleContent = pageInfo.properties.Name.title[0].text.content;
    // const sport = pageInfo.properties.Sport.multi_select[0]?.name;
    // const year = pageInfo.properties.Year?.number;
    // const summaryContent = summary.rich_text[0].text.content;
    // const slugContent = slug.rich_text[0].plain_text;
    // console.log(image)
    // const renderFeaturedImage = () => {
    //     if (!image) {
    //         return null;
    //     }
    //
    //     return (
    //         <AspectRatio
    //             ratio={16 / 9}
    //             mb={[4, 8]}
    //             overflow="hidden"
    //             borderRadius="lg"
    //             height={32}
    //         >
    //             <Image
    //                 src={image}
    //                 alt={titleContent}
    //                 layout="responsive"
    //                 objectFit="cover"
    //             />
    //         </AspectRatio>
    //     );
    // };



    return (
        <MainLayout>
            <Head>
                {/* <title>{titleContent}</title>
        <meta name="description" content={summaryContent} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={titleContent} />
        <meta property="og:description" content={summaryContent} />
        <meta property="og:url" content={`${url}/${slugContent}`} />
        <meta
          property="og:image"
          content={social_image ? social_image.url : socialImage}
        /> */}
            </Head>

            <Container maxW="container.lg">
                <Heading
                    as="h1"
                    mb={[4]}
                    alignSelf="start"
                    fontSize={['2xl', '3xl', '4xl']}
                >
                    {sport} Inductees
                </Heading>
            </Container>

            <Container maxW="container.lg" pb={16}>
                <Box mb={[12, 16]}>
                    <SimpleGrid minChildWidth="150px" spacing="40px">
                        {honorees.data.map((honoree, index) => {
                            const hId = honoree.id

                            return (
                                <a key={hId} href={`/honorees/${hId}`}>
                                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">

                                        <Flex direction="column" justify="center" p={3}>
                                            <Heading as="h3" size="md" alignSelf="center">
                                                {honoree.properties.Name.title[0].text?.content}
                                            </Heading>
                                            <Text alignSelf="start" fontSize="sm">
                                                {honoree.properties.Year.select.name}
                                            </Text>
                                            {/*{renderSportsArray()}*/}
                                        </Flex>
                                    </Box>
                                </a>
                            )
                        })}

                    </SimpleGrid>
                </Box>
            </Container>

        </MainLayout>
    );
}

export async function getStaticPaths() {
    const honorees = await getHonorees();
    // console.log(honorees)

    const paths = honorees.data.map((honoree) => ({
        params: { sport: honoree.properties.Sport.select.name},
    }));
    // console.log(paths)
    return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
    // console.log(params)
    const sport = params.sport;
    const honorees = await getHonoreesBySport(sport);
    // console.log(honorees)
    // console.log(sport)

    return { props: { honorees, sport }, revalidate: 30 };
}
