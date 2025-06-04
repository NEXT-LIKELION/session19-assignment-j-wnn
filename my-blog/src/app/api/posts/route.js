import { NextResponse } from "next/server";

export let posts = [];

export async function GET() {
    return NextResponse.json(posts);
}

export async function POST(req) {
    const { title: originalTitle, content, author } = await req.json();

    let title = originalTitle;

    if (!title) {
        try {
            const response = await fetch("https://catfact.ninja/fact");
            if (response.ok) {
                const data = await response.json();
                title = data.fact;
            } else {
                title = "오늘의 고양이 tmi";
            }
        } catch (error) {
            console.error("Error fetching cat fact:", error);
            title = "오늘의 고양이 tmi";
        }
    }

    function getRandomNickname() {
        const adjectives = ["Happy", "Crazy", "Silent", "Brave", "Funny", "Misterious", "Adventurous"];
        const animals = ["Panda 🐼", "Penguin 🐧", "Bear 🐻", "Fox 🦊", "Wolf 🐺", "Tiger 🐯", "Lion 🦁"];
        const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
        return `${randomAdj} ${randomAnimal}`;
    }

    

    const nickname = author ? author : getRandomNickname();

    // 새로운 글 추가
    const newPost = { id: posts.length + 1, title, author: nickname, content, createdAt: new Date() };
    posts.push(newPost);

    return NextResponse.json(newPost);
}