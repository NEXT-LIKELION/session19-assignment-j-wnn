'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, PenSquare, Send, User, FileText } from "lucide-react";
import Link from "next/link";

export default function WritePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({title, content, author}),
        });
        
        if (res.ok) {
            router.push("/");
        } else {
            console.error("Failed to submit post");
        }
    }

    return (
        <div className="space-y-8">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
                <Button asChild variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        목록으로
                    </Link>
                </Button>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <PenSquare className="h-4 w-4" />
                    <span>새 글 작성</span>
                </div>
            </div>

            {/* 제목 섹션 */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-4">
                    <PenSquare className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-green-900 to-blue-900 bg-clip-text text-transparent">
                    새로운 이야기를 들려주세요
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    당신의 생각과 경험을 다른 사람들과 공유해보세요
                </p>
            </div>

            <Separator className="my-8" />

            {/* 작성 폼 */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-t-lg">
                    <CardTitle className="text-2xl text-black font-bold flex items-center gap-2">
                        <FileText className="text-black h-6 w-6" />
                        글 작성하기
                    </CardTitle>
                    <CardDescription>
                        아래 양식을 채워서 새로운 블로그 글을 작성해주세요
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
                                <Label htmlFor="author" className="text-sm text-black font-medium">작성자</Label>
                                <Input 
                                    id="author" 
                                    type="text" 
                                    value={author} 
                                    placeholder="이름 또는 닉네임을 입력하세요" 
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="focus:ring-2 focus:ring-blue-500 text-black"
                                />
                                <p className="text-xs text-gray-500">비워두면 랜덤 닉네임이 자동으로 생성됩니다</p>
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
                                    <Label htmlFor="title" className="text-sm text-black font-medium">제목</Label>
                                    <Input 
                                        id="title" 
                                        type="text" 
                                        value={title} 
                                        placeholder="글의 제목을 입력하세요" 
                                        onChange={(e) => setTitle(e.target.value)} 
                                        className="focus:ring-2 focus:ring-blue-500 text-black"
                                    />
                                    <p className="text-xs text-gray-500">비워두면 오늘의 고양이 TMI로 자동 설정됩니다</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="content" className="text-sm text-black font-medium">내용</Label>
                                    <Textarea 
                                        id="content" 
                                        value={content} 
                                        placeholder="여기에 글의 내용을 작성해주세요. 마크다운 형식도 지원됩니다." 
                                        onChange={(e) => setContent(e.target.value)} 
                                        rows={20} 
                                        required 
                                        className="focus:ring-2 focus:ring-blue-500 resize-none text-black"
                                    />
                                    <p className="text-xs text-gray-500">최소 1자 이상 입력해주세요</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t bg-gray-50/50 rounded-b-lg">
                        <div className="flex items-center justify-between w-full">
                            <div className="text-sm text-gray-600">
                                작성 중인 글이 자동으로 저장되지 않습니다
                            </div>
                            <div className="flex gap-3">
                                <Button type="button" variant="outline" asChild>
                                    <Link href="/" className="inline-flex items-center gap-2">
                                        <ArrowLeft className="h-4 w-4" />
                                        취소
                                    </Link>
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                                >
                                    <Send className="h-4 w-4 mr-2" />
                                    게시하기
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}