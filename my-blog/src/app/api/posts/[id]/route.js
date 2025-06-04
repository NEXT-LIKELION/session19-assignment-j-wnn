import { NextResponse } from "next/server";
import { posts } from "../route";

export async function GET(req, { params }) {
    const post= posts.find(p => p.id.toString() === params.id);

    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    return NextResponse.json(post);
}

// 게시글 수정 API
export async function PUT(req, { params }) {
    const { title, content, author } = await req.json();
    const postIndex = posts.findIndex(p => p.id.toString() === params.id);

    if (postIndex === -1) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // 기존 게시글 정보를 유지하면서 수정
    posts[postIndex] = {
        ...posts[postIndex],
        title: title || posts[postIndex].title,
        content: content || posts[postIndex].content,
        author: author || posts[postIndex].author,
        updatedAt: new Date()
    };

    return NextResponse.json(posts[postIndex]);
}

// 게시글 삭제 API
export async function DELETE(req, { params }) {
    const postIndex = posts.findIndex(p => p.id.toString() === params.id);

    if (postIndex === -1) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // 게시글 삭제
    const deletedPost = posts.splice(postIndex, 1)[0];
    
    return NextResponse.json({ message: "Post deleted successfully", post: deletedPost });
}