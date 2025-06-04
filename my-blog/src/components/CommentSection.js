'use client'
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MessageCircle, User, Calendar, Edit3, Trash2, Send } from "lucide-react";

export default function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ author: '', content: '' });
    const [editingComment, setEditingComment] = useState(null);
    const [editingData, setEditingData] = useState({ author: '', content: '' });
    const [loading, setLoading] = useState(true);

    // 댓글 목록 불러오기
    async function fetchComments() {
        try {
            const res = await fetch(`/api/posts/${postId}/comments`);
            if (res.ok) {
                const commentsData = await res.json();
                setComments(commentsData);
            }
        } catch (error) {
            console.error("댓글을 불러오는데 실패했습니다:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchComments();
    }, [postId]);

    // 새 댓글 작성
    async function handleSubmitComment(e) {
        e.preventDefault();
        try {
            const res = await fetch(`/api/posts/${postId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newComment),
            });

            if (res.ok) {
                setNewComment({ author: '', content: '' });
                fetchComments(); // 댓글 목록 새로고침
            }
        } catch (error) {
            console.error("댓글 작성에 실패했습니다:", error);
        }
    }

    // 댓글 수정 시작
    function startEditing(comment) {
        setEditingComment(comment.id);
        setEditingData({ author: comment.author, content: comment.content });
    }

    // 댓글 수정 완료
    async function handleEditComment(commentId) {
        try {
            const res = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingData),
            });

            if (res.ok) {
                setEditingComment(null);
                setEditingData({ author: '', content: '' });
                fetchComments(); // 댓글 목록 새로고침
            }
        } catch (error) {
            console.error("댓글 수정에 실패했습니다:", error);
        }
    }

    // 댓글 삭제
    async function handleDeleteComment(commentId) {
        if (!confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
            return;
        }

        try {
            const res = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                fetchComments(); // 댓글 목록 새로고침
            }
        } catch (error) {
            console.error("댓글 삭제에 실패했습니다:", error);
        }
    }

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">댓글을 불러오는 중...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <Separator className="my-12" />
            
            {/* 댓글 헤더 */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-2xl">
                        <MessageCircle className="h-6 w-6 text-black" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-foreground">댓글</h3>
                        <p className="text-muted-foreground">이 글에 대한 의견을 남겨보세요</p>
                    </div>
                </div>
                <Badge variant="secondary" className="text-sm">
                    {comments.length}개
                </Badge>
            </div>
            
            {/* 새 댓글 작성 폼 */}
            <Card className="border-l-4 border-l-primary bg-card">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                        <Send className="h-6 w-6" />
                        댓글 작성
                    </CardTitle>
                    <CardDescription className="text-base">
                        여러분의 소중한 의견을 듣고 싶습니다
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmitComment} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label htmlFor="comment-author" className="text-sm font-medium">작성자</Label>
                                <Input
                                    id="comment-author"
                                    type="text"
                                    value={newComment.author}
                                    placeholder="이름 또는 닉네임"
                                    onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                                    className="bg-background border-border"
                                />
                                <p className="text-xs text-muted-foreground">비워두면 랜덤 닉네임이 생성됩니다</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="comment-content" className="text-sm font-medium">내용</Label>
                            <Textarea
                                id="comment-content"
                                value={newComment.content}
                                placeholder="댓글을 입력하세요..."
                                onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                                rows={4}
                                required
                                className="bg-background border-border"
                            />
                        </div>
                        <Button type="submit" className="shadow-dark">
                            <Send className="h-4 w-4 mr-2" />
                            댓글 작성
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* 댓글 목록 */}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <Card className="border-dashed border-2 border-muted bg-muted/20">
                        <CardContent className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-2xl mb-6">
                                <MessageCircle className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <p className="text-xl font-medium text-foreground mb-2">아직 댓글이 없습니다</p>
                            <p className="text-muted-foreground">첫 번째 댓글을 작성해보세요!</p>
                        </CardContent>
                    </Card>
                ) : (
                    comments.map((comment, index) => (
                        <Card key={comment.id} className="group hover:shadow-dark transition-all duration-300 bg-card">
                            <CardContent className="pt-6">
                                {editingComment === comment.id ? (
                                    // 수정 모드
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <Label className="text-sm font-medium">작성자</Label>
                                                <Input
                                                    value={editingData.author}
                                                    onChange={(e) => setEditingData({ ...editingData, author: e.target.value })}
                                                    required
                                                    className="bg-background border-border"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-sm font-medium">내용</Label>
                                            <Textarea
                                                value={editingData.content}
                                                onChange={(e) => setEditingData({ ...editingData, content: e.target.value })}
                                                rows={3}
                                                required
                                                className="bg-background border-border"
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <Button 
                                                onClick={() => handleEditComment(comment.id)}
                                                size="sm"
                                            >
                                                수정 완료
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                onClick={() => setEditingComment(null)}
                                                size="sm"
                                            >
                                                취소
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    // 일반 모드
                                    <div className="space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center">
                                                    <User className="h-6 w-6 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-semibold text-foreground text-lg">{comment.author}</span>
                                                        <Badge variant="outline" className="text-xs">
                                                            #{index + 1}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    onClick={() => startEditing(comment)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:bg-primary/10"
                                                >
                                                    <Edit3 className="h-4 w-4" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="pl-16">
                                            <p className="text-foreground leading-relaxed whitespace-pre-wrap text-base">
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
} 