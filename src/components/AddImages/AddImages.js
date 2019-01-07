/**
 * Creates a sortable image grid with children added to the end of the created grid.
 *
 * Example:
 * // images = [{ id: 'tempId', imageId: 'realIdFromAPI', file: File }];
 * <AddImages images={images}>
 *   <input type="file" accept="images/*" onChange={handleChange} />
 * </AddImages>
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ImageFromFile, ResponsiveImage, IconSpinner } from '../../components';

import css from './AddImages.css';
import RemoveImageButton from './RemoveImageButton';

const ThumbnailWrapper = props => {
  const { className, image, index, savedImageAltText, onRemoveImage, onUpdateHeaderImage } = props;
  const handleRemoveClick = e => {
    e.stopPropagation();
    onRemoveImage(image.id);
  };

  const handleSelectHeaderImageClick = e => {
    e.stopPropagation();
    onUpdateHeaderImage(image.id);
  };

  if (image.file) {
    // Add remove button only when the image has been uploaded and can be removed
    const removeButton = image.imageId ? <RemoveImageButton onClick={handleRemoveClick} /> : null;

    // While image is uploading we show overlay on top of thumbnail
    const uploadingOverlay = !image.imageId ? (
      <div className={css.thumbnailLoading}>
        <IconSpinner />
      </div>
    ) : null;

    return (
      <ImageFromFile
        id={image.id}
        className={className}
        rootClassName={css.thumbnail}
        file={image.file}
      >
        <button className={index === 0 ?
          classNames(css.headerImage, css.selectHeaderImage) :
          css.selectHeaderImage}
          onClick={handleSelectHeaderImageClick}>H</button>

        {removeButton}
        {uploadingOverlay}
      </ImageFromFile>
    );
  } else {
    const classes = classNames(css.thumbnail, className);
    return (
      <div className={classes}>
        <div className={css.threeToTwoWrapper}>
          <div className={css.aspectWrapper}>
            <ResponsiveImage
              rootClassName={css.rootForImage}
              image={image}
              alt={savedImageAltText}
              variants={['landscape-crop', 'landscape-crop2x']}
            />
          </div>
          <button className={index === 0 ?
            classNames(css.headerImage, css.selectHeaderImage) :
            css.selectHeaderImage}
            onClick={handleSelectHeaderImageClick}>H</button>
          <RemoveImageButton onClick={handleRemoveClick} />
        </div>
      </div>
    );
  }
};

ThumbnailWrapper.defaultProps = { className: null };

const { array, func, node, string, object } = PropTypes;

ThumbnailWrapper.propTypes = {
  className: string,
  image: object.isRequired,
  savedImageAltText: string.isRequired,
  onRemoveImage: func.isRequired,
};

const AddImages = props => {
  const {
    children,
    className,
    thumbnailClassName,
    images,
    savedImageAltText,
    onRemoveImage,
    onUpdateHeaderImage,
  } = props;
  const classes = classNames(css.root, className);
  return (
    <div className={classes}>
      {images.map((image, index) => {
        return (
          <ThumbnailWrapper
            image={image}
            index={index}
            key={image.id.uuid || image.id}
            className={thumbnailClassName}
            savedImageAltText={savedImageAltText}
            onRemoveImage={onRemoveImage}
            onUpdateHeaderImage={onUpdateHeaderImage}
          />
        );
      })}
      {children}
    </div>
  );
};

AddImages.defaultProps = { className: null, thumbnailClassName: null, images: [] };

AddImages.propTypes = {
  images: array,
  children: node.isRequired,
  className: string,
  thumbnailClassName: string,
  savedImageAltText: string.isRequired,
  onRemoveImage: func.isRequired,
  onUpdateHeaderImage: func.isRequired,
};

export default AddImages;
