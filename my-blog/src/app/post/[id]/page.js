import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CommentSection from "@/components/CommentSection";
import PostActions from "@/components/PostActions";

// 게시글 데이터를 서버에서 가져오기
async function getPost(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, { 
      cache: "no-store" 
    });
    
    if (!res.ok) {
      return null;
    }
    
    return await res.json();
  } catch (error) {
    console.error("게시글을 불러오는데 실패했습니다:", error);
    return null;
  }
}

export default async function PostPage({ params }) {
    const unwrappedParams = await params;
    const post = await getPost(unwrappedParams.id);

    if (!post) {
        return (
          <div className="text-center">
            <p className="mb-4 text-lg">글을 찾을 수 없습니다.</p>
            <Button asChild>
              <Link href="/">목록으로</Link>
            </Button>
          </div>
        );
    }

    return (
        <div className="w-full">
            <Button asChild variant="outline" className="mb-8">
                <Link href="/">← 목록으로</Link>
            </Button>
            <Card className="w-full">
                <CardHeader className="border-b">
                    <CardTitle className="text-3xl font-bold mb-2">{post.title}</CardTitle>
                    <CardDescription>작성자: {post.author}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none whitespace-pre-wrap">
                        {post.content}
                    </div>
                </CardContent>
                {/* 수정/삭제 버튼을 별도 클라이언트 컴포넌트로 분리 */}
                <PostActions postId={unwrappedParams.id} />
            </Card>
            
            {/* 댓글 섹션 (CSR 유지) */}
            <CommentSection postId={unwrappedParams.id} />
        </div>
    );
}