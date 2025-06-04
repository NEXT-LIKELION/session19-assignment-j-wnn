'use client'
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
        return <div>댓글을 불러오는 중...</div>;
    }

    return (
        <div className="mt-8 space-y-6">
            <div className="border-t pt-8">
                <h3 className="text-2xl font-bold mb-6">댓글 ({comments.length})</h3>
                
                {/* 새 댓글 작성 폼 */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg">댓글 작성</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmitComment} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="comment-author">작성자</Label>
                                <Input
                                    id="comment-author"
                                    type="text"
                                    value={newComment.author}
                                    placeholder="이름 또는 닉네임 (비워두면 랜덤 닉네임)"
                                    onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="comment-content">내용</Label>
                                <Textarea
                                    id="comment-content"
                                    value={newComment.content}
                                    placeholder="댓글을 입력하세요"
                                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                                    rows={3}
                                    required
                                />
                            </div>
                            <Button type="submit">댓글 작성</Button>
                        </form>
                    </CardContent>
                </Card>

                {/* 댓글 목록 */}
                <div className="space-y-4">
                    {comments.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">
                            아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
                        </p>
                    ) : (
                        comments.map((comment) => (
                            <Card key={comment.id}>
                                <CardContent className="pt-4">
                                    {editingComment === comment.id ? (
                                        // 수정 모드
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>작성자</Label>
                                                <Input
                                                    value={editingData.author}
                                                    onChange={(e) => setEditingData({ ...editingData, author: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>내용</Label>
                                                <Textarea
                                                    value={editingData.content}
                                                    onChange={(e) => setEditingData({ ...editingData, content: e.target.value })}
                                                    rows={3}
                                                    required
                                                />
                                            </div>
                                            <div className="flex gap-2">
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
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{comment.author}</span>
                                                    <span className="text-sm text-muted-foreground">
                                                        {new Date(comment.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm"
                                                        onClick={() => startEditing(comment)}
                                                    >
                                                        수정
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm"
                                                        onClick={() => handleDeleteComment(comment.id)}
                                                        className="text-destructive hover:text-destructive"
                                                    >
                                                        삭제
                                                    </Button>
                                                </div>
                                            </div>
                                            <p className="whitespace-pre-wrap">{comment.content}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
} 