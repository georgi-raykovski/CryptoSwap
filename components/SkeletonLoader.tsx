import { skeletonStyles } from "./styles";

const SkeletonLoader = () => {
  return (
    <div className={skeletonStyles.container}>
      <div className={skeletonStyles.contentContainer}>
        <div className={skeletonStyles.labelContainer}>
          <div className={skeletonStyles.label}></div>
          <div className={skeletonStyles.label}></div>
          <div className={skeletonStyles.label}></div>
          <div className={skeletonStyles.label}></div>
          <div className={skeletonStyles.label}></div>
          <div className={skeletonStyles.label}></div>
          <div className={skeletonStyles.label}></div>
          <div className={skeletonStyles.label}></div>
          <div className={skeletonStyles.label}></div>
        </div>
        <div className={skeletonStyles.tableContainer}>
          <div className={skeletonStyles.tableSkeleton}></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
