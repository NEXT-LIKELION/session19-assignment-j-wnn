import { NextResponse } from "next/server";

// 메모리에 댓글 저장 (실제 프로젝트에서는 데이터베이스 사용)
export let comments = [];

// 특정 게시글의 댓글 목록 조회
export async function GET(req, { params }) {
    const unwrappedParams = await params;
    const postComments = comments.filter(comment => comment.postId.toString() === unwrappedParams.id);
    return NextResponse.json(postComments);
}

// 새 댓글 작성
export async function POST(req, { params }) {
    const unwrappedParams = await params;
    const { author, content } = await req.json();

    // 기본 닉네임 생성 함수
    function getRandomNickname() {
        const adjectives = ["친절한", "활발한", "조용한", "용감한", "재미있는", "신비한", "모험적인"];
        const animals = ["판다 🐼", "펭귄 🐧", "곰 🐻", "여우 🦊", "늑대 🐺", "호랑이 🐯", "사자 🦁"];
        const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
        return `${randomAdj} ${randomAnimal}`;
    }

    const nickname = author ? author : getRandomNickname();

    // 새 댓글 생성
    const newComment = {
        id: comments.length + 1,
        postId: parseInt(unwrappedParams.id),
        author: nickname,
        content,
        createdAt: new Date()
    };

    comments.push(newComment);
    return NextResponse.json(newComment);
} 