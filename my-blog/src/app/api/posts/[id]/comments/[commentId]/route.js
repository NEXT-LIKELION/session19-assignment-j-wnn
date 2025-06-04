import { NextResponse } from "next/server";
import { comments } from "../route";

// 댓글 수정
export async function PUT(req, { params }) {
    const unwrappedParams = await params;
    const { author, content } = await req.json();
    
    const commentIndex = comments.findIndex(
        comment => 
            comment.id.toString() === unwrappedParams.commentId && 
            comment.postId.toString() === unwrappedParams.id
    );

    if (commentIndex === -1) {
        return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // 댓글 수정
    comments[commentIndex] = {
        ...comments[commentIndex],
        author: author || comments[commentIndex].author,
        content: content || comments[commentIndex].content,
        updatedAt: new Date()
    };

    return NextResponse.json(comments[commentIndex]);
}

// 댓글 삭제
export async function DELETE(req, { params }) {
    const unwrappedParams = await params;
    
    const commentIndex = comments.findIndex(
        comment => 
            comment.id.toString() === unwrappedParams.commentId && 
            comment.postId.toString() === unwrappedParams.id
    );

    if (commentIndex === -1) {
        return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // 댓글 삭제
    const deletedComment = comments.splice(commentIndex, 1)[0];
    
    return NextResponse.json({ message: "Comment deleted successfully", comment: deletedComment });
} 