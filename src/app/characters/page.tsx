"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux';
import { Bangers } from 'next/font/google'

import { fetchPosts, fetchImageById, selectAllPosts } from '@/features/posts';
import { AppDispatch } from '@/redux/store';
import { fetchMedia, selectAllMedia } from '@/features/media';
import CharacterListingItem from '@/components/CharacterListingItem';

const bangers = Bangers({ subsets: ['latin'], weight: ["400"] })

const CharactersListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Fetch posts from the API when the component mounts
  useEffect(() => {
    dispatch(fetchMedia());
    dispatch(fetchPosts());
  }, [dispatch]);

  // Use the selector to get all posts from the state
  const posts = useSelector(selectAllPosts);
  const media = useSelector(selectAllMedia);
  const postsStatus = useSelector((state: any) => state.posts.status);
  const error = useSelector((state: any) => state.posts.error);

  if (postsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (postsStatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      <main>
        <h2 className={bangers.className}>Posts</h2>

        <div className="post-item-container">
          {posts.map((post) => {
            const mediaObj = media.find((obj) => obj.id === post.featured_media)
            const imageThumbnail: string | undefined = mediaObj?.media_details.sizes.thumbnail.source_url

            return <CharacterListingItem key={post.id} post={post} imageThumbnail={imageThumbnail} />
          })}
        </div>
      </main>
    </motion.div>
  );
};

export default CharactersListPage;
