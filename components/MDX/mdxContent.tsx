import { MDX } from '@/interface'
import { MDXRemote } from 'next-mdx-remote/rsc'
import styles from './content.module.scss'
import CustomTag from '../semanticTag'
import Head from 'next/head'

const MDXContent = ({ content, meta }: MDX.Props) => {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `</script><link rel='preload' href='style.css' as='style' onload="this.onload=null;this.rel='stylesheet'"/><script>`,
          }}
        />
      </Head>
      <div className={styles.markdown}>
        <MDXRemote source={content as string} components={CustomTag} />
      </div>
    </>
  )
}
export default MDXContent
