import { MDX } from '@/interface';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CustomTag from '../semanticTag';
import styles from './content.module.scss';

const MDXContent = ({ content, meta }: MDX.Props) => {
  return (
    <>
      <div className={styles.markdown}>
        <MDXRemote source={content as string} components={CustomTag} />
      </div>
    </>
  );
};
export default MDXContent;
