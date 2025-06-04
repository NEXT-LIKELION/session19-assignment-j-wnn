import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, User, Calendar, Clock } from "lucide-react";
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
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-3xl mb-8">
              <span className="text-4xl">😔</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">글을 찾을 수 없습니다</h2>
            <p className="text-muted-foreground mb-8 text-lg">요청하신 게시글이 존재하지 않거나 삭제되었을 수 있습니다.</p>
            <Button asChild variant="outline" size="lg" className="inline-flex items-center gap-2 border-border text-foreground hover:bg-muted/50">
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
                목록으로 돌아가기
              </Link>
            </Button>
          </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* 네비게이션 */}
            <div className="flex items-center justify-between">
                <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        목록으로
                    </Link>
                </Button>
                <Badge variant="secondary" className="text-xs">
                    게시글 #{unwrappedParams.id}
                </Badge>
            </div>

            {/* 게시글 내용 */}
            <Card className="border-border shadow-dark bg-card">
                <CardHeader className="border-b border-border bg-muted/30 rounded-t-lg">
                    <div className="space-y-6">
                        <CardTitle className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                            {post.title}
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center">
                                    <User className="h-5 w-5 text-black" />
                                </div>
                                <span className="font-medium text-foreground">{post.author}</span>
                            </div>
                            <Separator orientation="vertical" className="h-4" />
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : '날짜 정보 없음'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>약 {Math.ceil((post.content?.length || 0) / 200)}분 읽기</span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-8">
                    <div className="prose prose-lg max-w-none prose-invert">
                        <div className="text-foreground leading-relaxed whitespace-pre-wrap text-lg">
                            {post.content}
                        </div>
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