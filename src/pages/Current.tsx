import React from 'react';
import CurrentGallery from '../components/Gallery/CurrentGallery';
import layoutStyles from '../components/Layout/Layout.module.scss';

const Current: React.FC = () => {
  return (
    <div className={layoutStyles.pageContent}>
      <CurrentGallery />
    </div>
  );
};

export default Current;
