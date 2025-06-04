'use client'
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Edit3, Save, User, FileText } from "lucide-react";
import Link from "next/link";

export default function EditPage({ params }) {
    const unwrappedParams = use(params);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // 기존 게시글 데이터 불러오기
    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch(`/api/posts/${unwrappedParams.id}`);
                if (res.ok) {
                    const post = await res.json();
                    setTitle(post.title);
                    setContent(post.content);
                    setAuthor(post.author);
                }
            } catch (error) {
                console.error("게시글을 불러오는데 실패했습니다:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [unwrappedParams.id]);

    // 게시글 수정 처리
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch(`/api/posts/${unwrappedParams.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({title, content, author}),
            });
            
            if (res.ok) {
                router.push(`/post/${unwrappedParams.id}`);
            } else {
                console.error("게시글 수정에 실패했습니다");
            }
        } catch (error) {
            console.error("게시글 수정 중 오류가 발생했습니다:", error);
        }
    }

    if (loading) {
        return (
            <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">게시글을 불러오는 중...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
                <Button asChild variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                    <Link href={`/post/${unwrappedParams.id}`} className="inline-flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        게시글로 돌아가기
                    </Link>
                </Button>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                        게시글 #{unwrappedParams.id}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Edit3 className="h-4 w-4" />
                        <span>수정 모드</span>
                    </div>
                </div>
            </div>

            {/* 제목 섹션 */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4">
                    <Edit3 className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-orange-900 to-red-900 bg-clip-text text-transparent">
                    게시글 수정하기
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    기존 내용을 수정하여 더 나은 글로 만들어보세요
                </p>
            </div>

            <Separator className="my-8" />

            {/* 수정 폼 */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50/50 rounded-t-lg">
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                        <FileText className="h-6 w-6" />
                        글 수정하기
                    </CardTitle>
                    <CardDescription>
                        아래 양식을 수정하여 게시글을 업데이트해주세요
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-8 pt-8">
                        {/* 작성자 정보 */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <User className="h-5 w-5 text-gray-600" />
                                <h3 className="text-lg font-semibold text-gray-900">작성자 정보</h3>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="author" className="text-sm font-medium">작성자</Label>
                                <Input 
                                    id="author" 
                                    type="text" 
                                    value={author} 
                                    placeholder="작성자 이름을 입력하세요" 
                                    onChange={(e) => setAuthor(e.target.value)}
                                    required 
                                    className="focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* 글 내용 */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <FileText className="h-5 w-5 text-gray-600" />
                                <h3 className="text-lg font-semibold text-gray-900">글 내용</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-sm font-medium">제목</Label>
                                    <Input 
                                        id="title" 
                                        type="text" 
                                        value={title} 
                                        placeholder="게시글 제목을 입력하세요" 
                                        onChange={(e) => setTitle(e.target.value)} 
                                        required 
                                        className="focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="content" className="text-sm font-medium">내용</Label>
                                    <Textarea 
                                        id="content" 
                                        value={content} 
                                        placeholder="게시글 내용을 입력하세요" 
                                        onChange={(e) => setContent(e.target.value)} 
                                        rows={20} 
                                        required 
                                        className="focus:ring-2 focus:ring-orange-500 resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t bg-orange-50/50 rounded-b-lg">
                        <div className="flex items-center justify-between w-full">
                            <div className="text-sm text-gray-600">
                                수정 사항이 자동으로 저장되지 않습니다
                            </div>
                            <div className="flex gap-3">
                                <Button type="button" variant="outline" asChild>
                                    <Link href={`/post/${unwrappedParams.id}`} className="inline-flex items-center gap-2">
                                        <ArrowLeft className="h-4 w-4" />
                                        취소
                                    </Link>
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    수정 완료
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
} 