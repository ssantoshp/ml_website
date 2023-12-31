import fs from "fs";
import Link from "next/link";
import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { IoIosArrowRoundBack } from "react-icons/io";
import matter from "gray-matter";
import getPostMetadata from "@/components/getPostMetadata";


const getPostContent = (slug: string) => {
    const folder = "blog/";
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    return matterResult;
};

export const generateStaticParams = async () => {
    const posts = getPostMetadata();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}


const PostPage = (props: any) => {
    const slug = props.params.slug;
    const post = getPostContent(slug);
    return (
    <main className="flex min-h-screen flex-col bg-white">

<div className='flex flex-col items-center justify-center w-full text-center'>

<div className='flex row justify-between pt-4 pb-4 w-3/4 lg:w-1/2 xl:w-1/2 2xl:w-1/2'>
<Link href="/blog">
    <p className="flex items-center text-xl hover:underline">McGill Machine Learning Reading Group</p>
</Link>

<Link href="/">
    <p className="flex items-center text-lg hover:underline">About</p>
</Link>
</div>

<hr className="w-full"/>
</div>
        <div className="flex flex-col items-center mt-10"> 
            <div className="w-3/4 lg:w-1/2 xl:w-1/2 2xl:w-1/2">
            <h1 className="text-4xl font-bold">{post.data.title}</h1>
            <p className="text-slate-500">{post.data.date}</p>
            <ReactMarkdown
            className={"mt-5 mb-10"}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}>
            {post.content}
            </ReactMarkdown>
            </div>
        </div>

    </main>
    );
};

export default PostPage;